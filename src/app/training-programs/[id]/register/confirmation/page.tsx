'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CheckCircle,
  Download, 
  Printer, 
  ArrowLeft,
  Copy,
  Calendar,
  MapPin,
  Phone,
  Mail,
  FileText,
  AlertCircle
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ConfirmationPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const registrationId = searchParams.get('id');

  useEffect(() => {
    if (registrationId) {
      fetchRegistrationDetails();
    } else {
      router.push('/training-programs');
    }
  }, [registrationId, router]);

  const fetchRegistrationDetails = async () => {
    try {
      // This would need to be implemented with a query to find registration by registrationId
      // For now, we'll create a mock confirmation based on the registration ID
      // In a real implementation, you'd query the registrations collection
      setLoading(false);
    } catch (error) {
      console.error('Error fetching registration details:', error);
      toast.error('Failed to load registration details');
      setLoading(false);
    }
  };

  const copyRegistrationId = () => {
    if (registrationId) {
      navigator.clipboard.writeText(registrationId);
      toast.success('Registration ID copied to clipboard');
    }
  };

  const downloadConfirmation = () => {
    if (!registrationId) return;

    const content = `
BAF Trust - Training Program Registration Confirmation

Registration ID: ${registrationId}
Registration Date: ${new Date().toLocaleDateString('en-IN')}
Status: Pending Review

Dear Participant,

Thank you for registering for our training program. Your registration has been successfully submitted and is currently under review.

Registration Details:
- Registration ID: ${registrationId}
- Submitted on: ${new Date().toLocaleDateString('en-IN')}
- Status: Pending Review

Next Steps:
1. Keep this Registration ID for your records
2. You will receive an email confirmation once your registration is approved
3. Our team will contact you with further details about the program

You can track your registration status using your Registration ID on our website.

For any queries, please contact us at:
Phone: +91 8079043733
Email: support@nisarindia.com

Thank you for choosing BAF Trust for your training needs.

Best regards,
BAF Trust Team
Bharat Agro Foundation
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BAF-Registration-Confirmation-${registrationId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Confirmation downloaded successfully');
  };

  const printConfirmation = () => {
    if (!registrationId) return;

    const printContent = `
    <html>
      <head>
        <title>BAF Trust - Registration Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; border-bottom: 2px solid #22c55e; padding-bottom: 10px; margin-bottom: 20px; }
          .logo { color: #22c55e; font-size: 24px; font-weight: bold; }
          .reg-id { background: #f0f9ff; padding: 10px; border-radius: 5px; text-align: center; margin: 20px 0; }
          .details { margin: 20px 0; }
          .footer { border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; }
          .success { color: #22c55e; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">BAF Trust</div>
          <div>Bharat Agro Foundation</div>
          <div style="margin-top: 10px;">Training Program Registration Confirmation</div>
        </div>
        
        <div class="success">
          <h2>✓ Registration Successful</h2>
        </div>
        
        <div class="reg-id">
          <strong>Registration ID: ${registrationId}</strong>
        </div>
        
        <div class="details">
          <p><strong>Registration Date:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
          <p><strong>Status:</strong> Pending Review</p>
          <p><strong>Next Steps:</strong></p>
          <ul>
            <li>Keep this Registration ID for your records</li>
            <li>You will receive an email confirmation once approved</li>
            <li>Our team will contact you with program details</li>
          </ul>
        </div>
        
        <div class="footer">
          <p><strong>Contact Information:</strong></p>
          <p>Phone: +91 8079043733</p>
          <p>Email: support@nisarindia.com</p>
          <p>Website: www.baftrust.org</p>
          <br>
          <p><em>Thank you for choosing BAF Trust for your training needs.</em></p>
        </div>
      </body>
    </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading confirmation...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!registrationId) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-2xl mx-auto px-4 py-16">
          <Card>
            <CardContent className="p-8 text-center">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">Invalid Registration</h1>
              <p className="text-muted-foreground mb-4">No registration ID provided.</p>
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
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Registration Successful!
          </h1>
          <p className="text-xl text-muted-foreground">
            Your training program registration has been submitted successfully
          </p>
        </div>

        {/* Registration ID Card */}
        <Card className="mb-8 border-2 border-green-200">
          <CardHeader className="text-center bg-green-50">
            <CardTitle className="text-green-800">Registration ID</CardTitle>
            <p className="text-muted-foreground">
              Please save this ID for future reference
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="text-3xl font-bold text-primary">{registrationId}</div>
              <Button
                variant="outline"
                size="sm"
                onClick={copyRegistrationId}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy ID
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Status Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Registration Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Current Status:</span>
                <p className="font-medium">Pending Review</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Submitted Date:</span>
                <span className="font-medium">{new Date().toLocaleDateString('en-IN')}</span>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                    Your registration is currently under review by our team
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                    You will receive an email confirmation once approved
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                    Our team will contact you with program details and schedule
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                    You can track your registration status using your Registration ID
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              Important Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-900 mb-2">Please Note:</h4>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Keep your Registration ID safe for future reference</li>
                  <li>• Check your email regularly for updates</li>
                  <li>• Contact us if you don&apos;t receive confirmation within 24-48 hours</li>
                  <li>• Your payment will be processed once registration is approved</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">+91 8079043733</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">support@nisarindia.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">Rajgarh, Churu, Rajasthan</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Support Hours</p>
                  <p className="text-sm text-muted-foreground">Mon-Sat: 9AM-7PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <Button onClick={downloadConfirmation} variant="outline" className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Download Confirmation
          </Button>
          <Button onClick={printConfirmation} variant="outline" className="flex items-center">
            <Printer className="h-4 w-4 mr-2" />
            Print Confirmation
          </Button>
          <Button onClick={() => router.push('/training-programs')} className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Programs
          </Button>
        </div>

        {/* Footer Message */}
        <div className="text-center p-6 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">Thank You!</h3>
          <p className="text-green-700">
            Thank you for choosing BAF Trust for your training needs. We look forward to helping you enhance your agricultural skills and knowledge.
          </p>
        </div>
      </div>
    </div>
  );
} 