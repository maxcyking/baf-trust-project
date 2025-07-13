'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { TrainingProgram } from '@/types/training';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Users, 
  Clock, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  Badge as BadgeIcon
} from 'lucide-react';

export default function TrainingProgramsPage() {
  const [programs, setPrograms] = useState<TrainingProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const q = query(
        collection(db, 'trainingPrograms'),
        where('isActive', '==', true),
        orderBy('order'),
        orderBy('startDate')
      );
      const querySnapshot = await getDocs(q);
      const programsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TrainingProgram[];
      setPrograms(programsList);
    } catch (error) {
      console.error('Error fetching programs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isProgramUpcoming = (startDate: string) => {
    return new Date(startDate) > new Date();
  };

  const getRegistrationStatus = (program: TrainingProgram) => {
    const now = new Date();
    const regEndDate = new Date(program.registrationEndDate);
    const startDate = new Date(program.startDate);
    
    if (now > regEndDate) {
      return { status: 'closed', text: 'Registration Closed', color: 'bg-red-100 text-red-800' };
    }
    
    if (program.currentParticipants >= program.maxParticipants) {
      return { status: 'full', text: 'Program Full', color: 'bg-orange-100 text-orange-800' };
    }
    
    if (now > startDate) {
      return { status: 'ongoing', text: 'Program Ongoing', color: 'bg-blue-100 text-blue-800' };
    }
    
    return { status: 'open', text: 'Registration Open', color: 'bg-green-100 text-green-800' };
  };

  const handleRegister = (programId: string) => {
    router.push(`/training-programs/${programId}/register`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading training programs...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Training Programs
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Enhance your agricultural skills with our comprehensive training programs designed to help you succeed in modern farming.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Available Programs</h2>
            <p className="text-muted-foreground">
              Choose from our range of specialized training programs
            </p>
          </div>

          {programs.length === 0 ? (
            <div className="text-center py-12">
              <BadgeIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-xl text-muted-foreground">No training programs available at the moment.</p>
              <p className="text-muted-foreground">Please check back later for new programs.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program) => {
                const registrationStatus = getRegistrationStatus(program);
                const canRegister = registrationStatus.status === 'open';
                
                return (
                  <Card key={program.id} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2 text-foreground line-clamp-2">
                            {program.title}
                          </CardTitle>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge 
                              variant={isProgramUpcoming(program.startDate) ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {isProgramUpcoming(program.startDate) ? 'Upcoming' : 'Ongoing'}
                            </Badge>
                            <Badge className={`text-xs ${registrationStatus.color}`}>
                              {registrationStatus.text}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            ₹{program.fees.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Program Fee
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <CardDescription className="mb-4 line-clamp-3">
                        {program.description}
                      </CardDescription>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2 text-primary" />
                          <span>{formatDate(program.startDate)} - {formatDate(program.endDate)}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-2 text-primary" />
                          <span>{program.duration}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-2 text-primary" />
                          <span>{program.location}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-2 text-primary" />
                          <span>{program.currentParticipants}/{program.maxParticipants} participants</span>
                        </div>

                        <div className="flex items-center text-sm text-muted-foreground">
                          <BadgeIcon className="h-4 w-4 mr-2 text-primary" />
                          <span>Registration ends: {formatDate(program.registrationEndDate)}</span>
                        </div>
                      </div>

                      {/* Requirements */}
                      {program.requirements && program.requirements.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-medium text-foreground mb-2">Requirements:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {program.requirements.slice(0, 3).map((req, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="line-clamp-1">{req}</span>
                              </li>
                            ))}
                            {program.requirements.length > 3 && (
                              <li className="text-xs text-muted-foreground">
                                +{program.requirements.length - 3} more requirements
                              </li>
                            )}
                          </ul>
                        </div>
                      )}

                      {/* Benefits */}
                      {program.benefits && program.benefits.length > 0 && (
                        <div className="mb-6">
                          <h4 className="font-medium text-foreground mb-2">Benefits:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {program.benefits.slice(0, 2).map((benefit, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="line-clamp-1">{benefit}</span>
                              </li>
                            ))}
                            {program.benefits.length > 2 && (
                              <li className="text-xs text-muted-foreground">
                                +{program.benefits.length - 2} more benefits
                              </li>
                            )}
                          </ul>
                        </div>
                      )}

                      <Button 
                        onClick={() => handleRegister(program.id)}
                        disabled={!canRegister}
                        className="w-full"
                        variant={canRegister ? "default" : "secondary"}
                      >
                        {canRegister ? (
                          <>
                            <BookOpen className="h-4 w-4 mr-2" />
                            Register Now
                          </>
                        ) : (
                          <>
                            <BadgeIcon className="h-4 w-4 mr-2" />
                            {registrationStatus.text}
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 