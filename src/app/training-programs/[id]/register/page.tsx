'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { doc, getDoc, addDoc, collection, Timestamp, updateDoc, increment } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { TrainingProgram } from '@/types/training';
import { INDIAN_STATES } from '@/types/registration';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast, Toaster } from 'react-hot-toast';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  CreditCard,
  User,
  Phone,
  Calendar,
  MapPin,
  QrCode,
  AlertCircle,
  Loader2,
  Copy,
  Download,
  Eye
} from 'lucide-react';

const step1Schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Invalid mobile number'),
  fatherMotherHusbandName: z.string().min(2, 'Father/Mother/Husband name is required'),
  aadharNumber: z.string().regex(/^\d{12}$/, 'Aadhar number must be 12 digits'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  address: z.object({
    street: z.string().min(5, 'Street address is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(1, 'State is required'),
    pinCode: z.string().regex(/^\d{6}$/, 'Pin code must be 6 digits')
  }),
});

const step2Schema = z.object({
  transactionId: z.string().min(10, 'Transaction ID is required'),
  paymentMethod: z.enum(['upi', 'qr_code'])
});

type Step1FormData = z.infer<typeof step1Schema>;
type Step2FormData = z.infer<typeof step2Schema>;

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [program, setProgram] = useState<TrainingProgram | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  
  // Document upload states
  const [aadharFrontFile, setAadharFrontFile] = useState<File | null>(null);
  const [aadharBackFile, setAadharBackFile] = useState<File | null>(null);
  const [passportPhotoFile, setPassportPhotoFile] = useState<File | null>(null);
  const [aadharFrontPreview, setAadharFrontPreview] = useState<string | null>(null);
  const [aadharBackPreview, setAadharBackPreview] = useState<string | null>(null);
  const [passportPhotoPreview, setPassportPhotoPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  
  // Form data storage
  const [step1Data, setStep1Data] = useState<Step1FormData | null>(null);
  
  const router = useRouter();
  const params = useParams();
  const programId = params.id as string;

  // Step 1 form
  const {
    register: registerStep1,
    handleSubmit: handleSubmitStep1,
    formState: { errors: step1Errors }
  } = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema)
  });

  // Step 2 form
  const {
    register: registerStep2,
    handleSubmit: handleSubmitStep2,
    formState: { errors: step2Errors },
    watch: watchStep2
  } = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema)
  });

  const watchedPaymentMethod = watchStep2('paymentMethod');

  useEffect(() => {
    fetchProgram();
  }, [programId]);

  const fetchProgram = async () => {
    try {
      const docRef = doc(db, 'trainingPrograms', programId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const programData = { id: docSnap.id, ...docSnap.data() } as TrainingProgram;
        setProgram(programData);
        
        // Check if registration is still open
        const now = new Date();
        const regEndDate = new Date(programData.registrationEndDate);
        
        if (now > regEndDate) {
          toast.error('Registration for this program has ended');
          router.push('/training-programs');
          return;
        }
        
        if (programData.currentParticipants >= programData.maxParticipants) {
          toast.error('This program is full');
          router.push('/training-programs');
          return;
        }
      } else {
        toast.error('Program not found');
        router.push('/training-programs');
      }
    } catch (error) {
      console.error('Error fetching program:', error);
      toast.error('Failed to load program details');
    } finally {
      setLoading(false);
    }
  };

  const generateRegistrationId = () => {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `BAF${timestamp.slice(-6)}${random}`;
  };

  const handleFileSelect = (type: 'aadharFront' | 'aadharBack' | 'passportPhoto', file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      
      switch (type) {
        case 'aadharFront':
          setAadharFrontFile(file);
          setAadharFrontPreview(preview);
          break;
        case 'aadharBack':
          setAadharBackFile(file);
          setAadharBackPreview(preview);
          break;
        case 'passportPhoto':
          setPassportPhotoFile(file);
          setPassportPhotoPreview(preview);
          break;
      }
    };
    reader.readAsDataURL(file);
  };

  const uploadDocuments = async (): Promise<{ aadharFront: string; aadharBack: string; passportPhoto: string } | null> => {
    if (!aadharFrontFile || !aadharBackFile || !passportPhotoFile) {
      toast.error('Please upload all required documents');
      return null;
    }

    setUploading(true);
    try {
      const timestamp = Date.now();
      const aadharFrontRef = ref(storage, `registrations/${timestamp}-aadhar-front-${aadharFrontFile.name}`);
      const aadharBackRef = ref(storage, `registrations/${timestamp}-aadhar-back-${aadharBackFile.name}`);
      const passportPhotoRef = ref(storage, `registrations/${timestamp}-passport-${passportPhotoFile.name}`);

      const [aadharFrontUrl, aadharBackUrl, passportPhotoUrl] = await Promise.all([
        uploadBytes(aadharFrontRef, aadharFrontFile).then(snapshot => getDownloadURL(snapshot.ref)),
        uploadBytes(aadharBackRef, aadharBackFile).then(snapshot => getDownloadURL(snapshot.ref)),
        uploadBytes(passportPhotoRef, passportPhotoFile).then(snapshot => getDownloadURL(snapshot.ref))
      ]);

      return {
        aadharFront: aadharFrontUrl,
        aadharBack: aadharBackUrl,
        passportPhoto: passportPhotoUrl
      };
    } catch (error) {
      console.error('Error uploading documents:', error);
      toast.error('Failed to upload documents');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const onSubmitStep1 = async (data: Step1FormData) => {
    // Validate documents
    if (!aadharFrontFile || !aadharBackFile || !passportPhotoFile) {
      toast.error('Please upload all required documents');
      return;
    }

    setStep1Data(data);
    setCurrentStep(2);
  };

  const onSubmitStep2 = async (data: Step2FormData) => {
    if (!step1Data || !program) return;

    setSubmitting(true);
    try {
      // Upload documents
      const documentUrls = await uploadDocuments();
      if (!documentUrls) {
        setSubmitting(false);
        return;
      }

      // Generate registration ID
      const regId = generateRegistrationId();

      // Create registration document
      const registrationData = {
        registrationId: regId,
        
        // Personal Information
        name: step1Data.name,
        email: step1Data.email,
        mobile: step1Data.mobile,
        fatherMotherHusbandName: step1Data.fatherMotherHusbandName,
        aadharNumber: step1Data.aadharNumber,
        dateOfBirth: step1Data.dateOfBirth,
        
        // Address Information
        address: step1Data.address,
        
        // Document URLs
        documents: documentUrls,
        
        // Payment Information
        payment: {
          transactionId: data.transactionId,
          amount: program.fees,
          paymentMethod: data.paymentMethod,
          paymentDate: new Date().toISOString()
        },
        
        // Program Information
        programId: program.id,
        programTitle: program.title,
        programFees: program.fees,
        
        // Status and Timestamps
        status: 'pending',
        registrationDate: Timestamp.now(),
        lastUpdated: Timestamp.now()
      };

      // Save to Firestore
      await addDoc(collection(db, 'registrations'), registrationData);
      
      // Update program participant count
      await updateDoc(doc(db, 'trainingPrograms', program.id), {
        currentParticipants: increment(1)
      });

      setRegistrationId(regId);
      setStep1Data(step1Data!);
      setCurrentStep(3);
      toast.success('Registration submitted successfully!');
    } catch (error) {
      console.error('Error submitting registration:', error);
      toast.error('Failed to submit registration');
    } finally {
      setSubmitting(false);
    }
  };

  const copyRegistrationId = () => {
    if (registrationId) {
      navigator.clipboard.writeText(registrationId);
      toast.success('Registration ID copied to clipboard');
    }
  };

  const downloadConfirmation = () => {
    if (!registrationId || !program || !step1Data) return;

    const content = `
BAF Trust - Training Program Registration Confirmation

Registration ID: ${registrationId}
Program: ${program.title}
Name: ${step1Data.name}
Email: ${step1Data.email}
Mobile: ${step1Data.mobile}
Registration Date: ${new Date().toLocaleDateString('en-IN')}

Status: Pending Review

Please keep this Registration ID for your records.
You can track your registration status using this ID.

Thank you for registering with BAF Trust!
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BAF-Registration-${registrationId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading registration form...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-2xl mx-auto px-4 py-16">
          <Card>
            <CardContent className="p-8 text-center">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">Program Not Found</h1>
              <p className="text-muted-foreground mb-4">The training program you&apos;re looking for could not be found.</p>
              <Button onClick={() => router.push('/training-programs')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Programs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Toaster position="top-right" />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push('/training-programs')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Programs
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">Program Registration</h1>
            <p className="text-muted-foreground">Complete your registration for the training program</p>
          </div>
        </div>

        {/* Program Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{program.title}</span>
              <Badge variant="outline" className="text-primary">
                ₹{program.fees.toLocaleString()}
              </Badge>
            </CardTitle>
            <CardDescription>
              {program.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(program.startDate).toLocaleDateString('en-IN')} - {new Date(program.endDate).toLocaleDateString('en-IN')}
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                {program.location}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[
              { step: 1, icon: User, label: 'Personal Details' },
              { step: 2, icon: CreditCard, label: 'Payment' },
              { step: 3, icon: CheckCircle, label: 'Confirmation' }
            ].map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= item.step 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <span className={`ml-2 text-sm ${
                  currentStep >= item.step ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}>
                  {item.label}
                </span>
                {index < 2 && (
                  <div className={`w-16 h-0.5 ml-4 ${
                    currentStep > item.step ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Personal Details */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Personal Details | व्यक्तिगत विवरण</CardTitle>
              <CardDescription>
                Please fill in your personal information | कृपया अपनी व्यक्तिगत जानकारी भरें
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitStep1(onSubmitStep1)} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Basic Information | मूल जानकारी</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name | पूरा नाम *</Label>
                      <Input
                        id="name"
                        {...registerStep1('name')}
                        placeholder="Enter your full name | अपना पूरा नाम दर्ज करें"
                        className={`mt-2 ${step1Errors.name ? 'border-red-500' : ''}`}
                      />
                      {step1Errors.name && (
                        <p className="text-sm text-red-500 mt-1">{step1Errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address | ईमेल पता *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...registerStep1('email')}
                        placeholder="Enter your email | अपना ईमेल दर्ज करें"
                        className={`mt-2 ${step1Errors.email ? 'border-red-500' : ''}`}
                      />
                      {step1Errors.email && (
                        <p className="text-sm text-red-500 mt-1">{step1Errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="mobile">Mobile Number | मोबाइल नंबर *</Label>
                      <Input
                        id="mobile"
                        {...registerStep1('mobile')}
                        placeholder="Enter 10-digit mobile number | 10 अंकों का मोबाइल नंबर दर्ज करें"
                        className={`mt-2 ${step1Errors.mobile ? 'border-red-500' : ''}`}
                      />
                      {step1Errors.mobile && (
                        <p className="text-sm text-red-500 mt-1">{step1Errors.mobile.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="fatherMotherHusbandName">Father/Mother/Husband Name | पिता/माता/पति का नाम *</Label>
                      <Input
                        id="fatherMotherHusbandName"
                        {...registerStep1('fatherMotherHusbandName')}
                        placeholder="Enter father/mother/husband name | पिता/माता/पति का नाम दर्ज करें"
                        className={`mt-2 ${step1Errors.fatherMotherHusbandName ? 'border-red-500' : ''}`}
                      />
                      {step1Errors.fatherMotherHusbandName && (
                        <p className="text-sm text-red-500 mt-1">{step1Errors.fatherMotherHusbandName.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="aadharNumber">Aadhar Number | आधार संख्या *</Label>
                      <Input
                        id="aadharNumber"
                        {...registerStep1('aadharNumber')}
                        placeholder="Enter 12-digit Aadhar number | 12 अंकों की आधार संख्या दर्ज करें"
                        className={`mt-2 ${step1Errors.aadharNumber ? 'border-red-500' : ''}`}
                      />
                      {step1Errors.aadharNumber && (
                        <p className="text-sm text-red-500 mt-1">{step1Errors.aadharNumber.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth | जन्म तिथि *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        {...registerStep1('dateOfBirth')}
                        className={`mt-2 ${step1Errors.dateOfBirth ? 'border-red-500' : ''}`}
                      />
                      {step1Errors.dateOfBirth && (
                        <p className="text-sm text-red-500 mt-1">{step1Errors.dateOfBirth.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Address Information */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Address Information | पता जानकारी</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="street">Street Address | सड़क का पता *</Label>
                      <Input
                        id="street"
                        {...registerStep1('address.street')}
                        placeholder="Enter your street address | अपना सड़क का पता दर्ज करें"
                        className={`mt-2 ${step1Errors.address?.street ? 'border-red-500' : ''}`}
                      />
                      {step1Errors.address?.street && (
                        <p className="text-sm text-red-500 mt-1">{step1Errors.address.street.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="city">City | शहर *</Label>
                      <Input
                        id="city"
                        {...registerStep1('address.city')}
                        placeholder="Enter city | शहर दर्ज करें"
                        className={`mt-2 ${step1Errors.address?.city ? 'border-red-500' : ''}`}
                      />
                      {step1Errors.address?.city && (
                        <p className="text-sm text-red-500 mt-1">{step1Errors.address.city.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="state">State | राज्य *</Label>
                      <select
                        id="state"
                        {...registerStep1('address.state')}
                        className={`mt-2 w-full px-3 py-2 border rounded-md ${
                          step1Errors.address?.state ? 'border-red-500' : 'border-input'
                        }`}
                      >
                        <option value="">Select State | राज्य चुनें</option>
                        {INDIAN_STATES.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                      {step1Errors.address?.state && (
                        <p className="text-sm text-red-500 mt-1">{step1Errors.address.state.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="pinCode">Pin Code | पिन कोड *</Label>
                      <Input
                        id="pinCode"
                        {...registerStep1('address.pinCode')}
                        placeholder="Enter 6-digit pin code | 6 अंकों का पिन कोड दर्ज करें"
                        className={`mt-2 ${step1Errors.address?.pinCode ? 'border-red-500' : ''}`}
                      />
                      {step1Errors.address?.pinCode && (
                        <p className="text-sm text-red-500 mt-1">{step1Errors.address.pinCode.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Document Upload */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Document Upload | दस्तावेज़ अपलोड</h3>
                  <div className="space-y-4">
                    {/* Aadhar Front */}
                    <div>
                      <Label htmlFor="aadharFront">Aadhar Card Front | आधार कार्ड का अगला हिस्सा *</Label>
                      <div className="mt-2 flex items-center space-x-4">
                        <Input
                          id="aadharFront"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileSelect('aadharFront', file);
                          }}
                          className="flex-1"
                        />
                        {aadharFrontPreview && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(aadharFrontPreview, '_blank')}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      {aadharFrontPreview && (
                        <img src={aadharFrontPreview} alt="Aadhar Front" className="mt-2 h-20 w-32 object-cover rounded" />
                      )}
                    </div>

                    {/* Aadhar Back */}
                    <div>
                      <Label htmlFor="aadharBack">Aadhar Card Back | आधार कार्ड का पिछला हिस्सा *</Label>
                      <div className="mt-2 flex items-center space-x-4">
                        <Input
                          id="aadharBack"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileSelect('aadharBack', file);
                          }}
                          className="flex-1"
                        />
                        {aadharBackPreview && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(aadharBackPreview, '_blank')}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      {aadharBackPreview && (
                        <img src={aadharBackPreview} alt="Aadhar Back" className="mt-2 h-20 w-32 object-cover rounded" />
                      )}
                    </div>

                    {/* Passport Photo */}
                    <div>
                      <Label htmlFor="passportPhoto">Passport Size Photo | पासपोर्ट साइज़ फोटो *</Label>
                      <div className="mt-2 flex items-center space-x-4">
                        <Input
                          id="passportPhoto"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileSelect('passportPhoto', file);
                          }}
                          className="flex-1"
                        />
                        {passportPhotoPreview && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(passportPhotoPreview, '_blank')}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      {passportPhotoPreview && (
                        <img src={passportPhotoPreview} alt="Passport Photo" className="mt-2 h-20 w-16 object-cover rounded" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    Next Step | अगला चरण
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Payment */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Payment | भुगतान</CardTitle>
              <CardDescription>
                Complete your payment for the training program | प्रशिक्षण कार्यक्रम के लिए अपना भुगतान पूरा करें
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitStep2(onSubmitStep2)} className="space-y-6">
                {/* Payment Amount */}
                <div className="text-center p-6 bg-primary/10 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-2">
                    ₹{program.fees.toLocaleString()}
                  </div>
                  <p className="text-muted-foreground">Training Program Fee | प्रशिक्षण कार्यक्रम शुल्क</p>
                </div>

                {/* Payment Method */}
                <div>
                  <Label>Payment Method | भुगतान की विधि *</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="upi"
                        value="upi"
                        {...registerStep2('paymentMethod')}
                        className="w-4 h-4 text-primary"
                      />
                      <label htmlFor="upi" className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        UPI Payment | UPI भुगतान
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="qr_code"
                        value="qr_code"
                        {...registerStep2('paymentMethod')}
                        className="w-4 h-4 text-primary"
                      />
                      <label htmlFor="qr_code" className="flex items-center">
                        <QrCode className="h-4 w-4 mr-2" />
                        QR Code Payment | QR कोड भुगतान
                      </label>
                    </div>
                  </div>
                </div>

                {/* Payment Details */}
                {watchedPaymentMethod && (
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-4">Payment Details | भुगतान विवरण</h4>
                    
                    {watchedPaymentMethod === 'upi' && (
                      <div className="space-y-4">
                        <div>
                          <Label>UPI ID | UPI आईडी</Label>
                          <div className="flex items-center space-x-2 mt-2">
                            <Input
                              value={program.paymentDetails.upiId}
                              readOnly
                              className="bg-muted"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                navigator.clipboard.writeText(program.paymentDetails.upiId);
                                toast.success('UPI ID copied to clipboard');
                              }}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            Please send ₹{program.fees.toLocaleString()} to the above UPI ID and enter the transaction ID below. |
                            कृपया उपरोक्त UPI ID पर ₹{program.fees.toLocaleString()} भेजें और नीचे transaction ID दर्ज करें।
                          </AlertDescription>
                        </Alert>
                      </div>
                    )}

                    {watchedPaymentMethod === 'qr_code' && (
                      <div className="space-y-4">
                        <div className="text-center">
                          <img
                            src={program.paymentDetails.qrCodeUrl}
                            alt="QR Code"
                            className="mx-auto h-48 w-48 border rounded-lg"
                          />
                        </div>
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            Please scan the QR code and pay ₹{program.fees.toLocaleString()}, then enter the transaction ID below. |
                            कृपया QR कोड स्कैन करें और ₹{program.fees.toLocaleString()} का भुगतान करें, फिर नीचे transaction ID दर्ज करें।
                          </AlertDescription>
                        </Alert>
                      </div>
                    )}

                    <div className="mt-4">
                      <Label htmlFor="transactionId">Transaction ID | लेनदेन आईडी *</Label>
                      <Input
                        id="transactionId"
                        {...registerStep2('transactionId')}
                        placeholder="Enter transaction ID | लेनदेन आईडी दर्ज करें"
                        className={`mt-2 ${step2Errors.transactionId ? 'border-red-500' : ''}`}
                      />
                      {step2Errors.transactionId && (
                        <p className="text-sm text-red-500 mt-1">{step2Errors.transactionId.message}</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous | पिछला
                  </Button>
                  <Button type="submit" disabled={submitting || uploading}>
                    {submitting ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <CheckCircle className="h-4 w-4 mr-2" />
                    )}
                    {submitting ? 'Submitting...' : 'Complete Registration | पंजीकरण पूरा करें'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Confirmation */}
        {currentStep === 3 && registrationId && (
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-green-600">
                Registration Successful! | पंजीकरण सफल!
              </CardTitle>
              <CardDescription className="text-center">
                Your registration has been submitted successfully | आपका पंजीकरण सफलतापूर्वक जमा हो गया है
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Registration ID | पंजीकरण आईडी</h3>
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <span className="text-2xl font-bold text-primary">{registrationId}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyRegistrationId}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-muted-foreground">
                  Please save this Registration ID for future reference | कृपया भविष्य के संदर्भ के लिए इस पंजीकरण आईडी को सुरक्षित रखें
                </p>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Your registration is currently under review. You will receive an email confirmation once approved. |
                  आपका पंजीकरण वर्तमान में समीक्षा के तहत है। अनुमोदित होने पर आपको एक ईमेल पुष्टि प्राप्त होगी।
                </AlertDescription>
              </Alert>

              <div className="flex justify-center space-x-4">
                <Button onClick={downloadConfirmation} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Confirmation | पुष्टि डाउनलोड करें
                </Button>
                <Button onClick={() => router.push('/training-programs')}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Programs | कार्यक्रमों पर वापस जाएं
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 