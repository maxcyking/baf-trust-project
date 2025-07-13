'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { TeamMember, TEAM_CATEGORY_LABELS } from '@/types/team';
import { Navigation } from '@/components/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Users, 
  Crown, 
  Award, 
  Mail, 
  Phone, 
  LinkedinIcon, 
  GraduationCap, 
  Briefcase, 
  Star,
  Sparkles
} from 'lucide-react';

export default function TeamPage() {
  const [loading, setLoading] = useState(true);
  const [coreTeam, setCoreTeam] = useState<TeamMember[]>([]);
  const [advisoryTeam, setAdvisoryTeam] = useState<TeamMember[]>([]);
  const [activeTab, setActiveTab] = useState<'core' | 'advisory'>('core');

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const q = query(
        collection(db, 'team'),
        where('isActive', '==', true),
        orderBy('order'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const membersList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TeamMember[];

      const core = membersList.filter(member => member.category === 'core');
      const advisory = membersList.filter(member => member.category === 'advisory');

      setCoreTeam(core);
      setAdvisoryTeam(advisory);
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderMemberCard = (member: TeamMember) => (
    <Card key={member.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          {member.imageUrl ? (
            <div className="relative h-80 overflow-hidden">
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            </div>
          ) : (
            <div className="h-80 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
              <User className="h-24 w-24 text-slate-400" />
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <Badge className={`${
              member.category === 'core' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700' 
                : 'bg-gradient-to-r from-purple-600 to-purple-700'
            } text-white shadow-lg`}>
              {member.category === 'core' ? (
                <Crown className="h-3 w-3 mr-1" />
              ) : (
                <Award className="h-3 w-3 mr-1" />
              )}
              {TEAM_CATEGORY_LABELS[member.category]}
            </Badge>
          </div>

          {/* Member Info Overlay */}
          {member.imageUrl && (
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
              <p className="text-white/90 text-lg mb-2">{member.designation}</p>
              {member.specialty && (
                <p className="text-blue-300 text-sm font-medium">{member.specialty}</p>
              )}
            </div>
          )}
        </div>

        {/* Member Details */}
        <div className="p-6 space-y-4">
          {!member.imageUrl && (
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-gray-600 text-lg mb-2">{member.designation}</p>
              {member.specialty && (
                <p className="text-blue-600 text-sm font-medium">{member.specialty}</p>
              )}
            </div>
          )}

          {member.bio && (
            <p className="text-gray-700 leading-relaxed">{member.bio}</p>
          )}

          {member.education && (
            <div className="flex items-start space-x-3">
              <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Education</h4>
                <p className="text-gray-700 text-sm">{member.education}</p>
              </div>
            </div>
          )}

          {member.experience && (
            <div className="flex items-start space-x-3">
              <Briefcase className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Experience</h4>
                <p className="text-gray-700 text-sm">{member.experience}</p>
              </div>
            </div>
          )}

          {member.achievements && member.achievements.length > 0 && (
            <div className="flex items-start space-x-3">
              <Star className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Achievements</h4>
                <ul className="space-y-1">
                  {member.achievements.map((achievement, index) => (
                    <li key={index} className="text-gray-700 text-sm flex items-start">
                      <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-200">
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="flex items-center justify-center w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors duration-200"
                title="Email"
              >
                <Mail className="h-4 w-4 text-blue-600" />
              </a>
            )}
            {member.phone && (
              <a
                href={`tel:${member.phone}`}
                className="flex items-center justify-center w-10 h-10 bg-green-100 hover:bg-green-200 rounded-full transition-colors duration-200"
                title="Phone"
              >
                <Phone className="h-4 w-4 text-green-600" />
              </a>
            )}
            {member.linkedIn && (
              <a
                href={member.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors duration-200"
                title="LinkedIn"
              >
                <LinkedinIcon className="h-4 w-4 text-blue-600" />
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading team members...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-blue-900/20 dark:via-slate-800 dark:to-green-900/20 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-black/30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-green-600 p-3 rounded-full shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-700 via-green-700 to-blue-700 bg-clip-text text-transparent mb-6">
              Our Team
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Meet the dedicated professionals driving agricultural innovation and sustainable development at BAF Trust
            </p>
          </div>
        </div>
      </section>

      {/* Team Navigation */}
      <section className="py-12 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-1 bg-muted p-1 rounded-lg">
              <Button
                variant={activeTab === 'core' ? "default" : "ghost"}
                onClick={() => setActiveTab('core')}
                className="flex items-center space-x-2"
              >
                <Crown className="h-4 w-4" />
                <span>Core Team ({coreTeam.length})</span>
              </Button>
              <Button
                variant={activeTab === 'advisory' ? "default" : "ghost"}
                onClick={() => setActiveTab('advisory')}
                className="flex items-center space-x-2"
              >
                <Award className="h-4 w-4" />
                <span>Advisory Team ({advisoryTeam.length})</span>
              </Button>
            </div>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeTab === 'core' && coreTeam.map(renderMemberCard)}
            {activeTab === 'advisory' && advisoryTeam.map(renderMemberCard)}
          </div>

          {/* Empty State */}
          {((activeTab === 'core' && coreTeam.length === 0) || 
            (activeTab === 'advisory' && advisoryTeam.length === 0)) && (
            <div className="text-center py-16">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                No {activeTab === 'core' ? 'core' : 'advisory'} team members yet
              </h3>
              <p className="text-muted-foreground">
                Team members will appear here once they are added.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-8 w-8 text-yellow-300 mr-3 animate-pulse" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join Our Mission
          </h2>
          <p className="text-xl text-green-100 max-w-2xl mx-auto mb-8">
            Interested in contributing to sustainable agriculture and rural development? 
            We&apos;re always looking for passionate individuals to join our cause.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
              <Mail className="h-5 w-5 mr-2" />
              Contact Us
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
              <Users className="h-5 w-5 mr-2" />
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .bg-grid-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
} 