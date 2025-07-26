'use client';

import Link from 'next/link';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  Clock,
  Users,
  Award,
  BookOpen,
  TrendingUp,
  Shield,
  Heart,
  Star,
  ArrowRight,
  Phone,
  Mail,
  Calendar,
  Target,
  DollarSign,
  Zap,
  Milk
} from 'lucide-react';

export default function DairyFarmingPage() {
  const programHighlights = [
    {
      icon: Target,
      title: "Cattle Breed Selection",
      description: "Master the art of selecting high-yielding dairy cattle breeds",
      features: ["Breed characteristics", "Selection criteria", "Genetic improvement"]
    },
    {
      icon: Heart,
      title: "Milk Quality & Hygiene",
      description: "Ensure premium milk quality through proper milking and hygiene practices",
      features: ["Milking techniques", "Hygiene protocols", "Quality testing"]
    },
    {
      icon: Zap,
      title: "Dairy Processing & Value Addition",
      description: "Learn to process milk and create value-added dairy products",
      features: ["Milk processing", "Product development", "Quality control"]
    },
    {
      icon: TrendingUp,
      title: "Business & Marketing",
      description: "Build a profitable dairy business with effective marketing strategies",
      features: ["Market channels", "Brand building", "Business scaling"]
    }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "Steady Income",
      description: "Daily income from milk sales with consistent cash flow"
    },
    {
      icon: TrendingUp,
      title: "Growing Market",
      description: "Increasing demand for milk and dairy products in India"
    },
    {
      icon: Shield,
      title: "Government Support",
      description: "Various government schemes and subsidies available"
    },
    {
      icon: Zap,
      title: "Value Addition",
      description: "Multiple revenue streams through processing and products"
    }
  ];

  const successStories = [
    {
      name: "मनीषा देवी",
      location: "Punjab",
      income: "₹80,000/month",
      story: "Started with 10 cows, now manages 50+ dairy animals. Monthly income doubled through proper management."
    },
    {
      name: "राजेश कुमार",
      location: "Haryana",
      income: "₹1,20,000/month",
      story: "Integrated dairy farming with processing. Supplies milk products to local markets and schools."
    },
    {
      name: "सुमित्रा शर्मा",
      location: "Uttar Pradesh",
      income: "₹60,000/month",
      story: "Buffalo dairy specialist. Focuses on high-fat milk production for premium market pricing."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-yellow-900/30 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 px-4 py-2">
                  🐄 Profitable Program
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                <span className="text-yellow-600">Dairy Farming</span> Success Course
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Build a profitable dairy business with our comprehensive 12-week program. 
                Learn modern dairy farming techniques for sustainable income generation.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">12</div>
                  <div className="text-sm text-muted-foreground">Weeks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">4800+</div>
                  <div className="text-sm text-muted-foreground">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">91%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">₹80K</div>
                  <div className="text-sm text-muted-foreground">Avg Income</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Enroll Now - ₹4,499
                </Button>
                <Button size="lg" variant="outline" className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white px-8 py-3">
                  <Phone className="mr-2 h-5 w-5" />
                  Call for Demo
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-600 rounded-2xl p-8 text-white shadow-2xl">
                <div className="text-center">
                  <div className="text-6xl mb-4">🐄</div>
                  <h3 className="text-2xl font-bold mb-4">Start Dairy Farming</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span>Daily Income</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span>Modern Techniques</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span>Value Addition</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose Dairy Farming?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the benefits of dairy farming for sustainable income generation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 bg-card shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Program Highlights */}
      <section className="py-20 bg-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              What You'll Master
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive training modules designed to make you a dairy farming expert
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {programHighlights.map((highlight, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="bg-yellow-100 rounded-full p-3 flex-shrink-0">
                      <highlight.icon className="h-8 w-8 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-3">{highlight.title}</h3>
                      <p className="text-muted-foreground mb-4">{highlight.description}</p>
                      <div className="space-y-2">
                        {highlight.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-yellow-600 mr-2 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real farmers building successful dairy businesses
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="border-0 bg-gradient-to-br from-yellow-50 to-orange-50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                      {story.name.charAt(0)}
                    </div>
                    <h3 className="font-bold text-foreground">{story.name}</h3>
                    <p className="text-sm text-muted-foreground">{story.location}</p>
                    <Badge className="bg-yellow-600 text-white mt-2">{story.income}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground text-center italic">
                    "{story.story}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-600 to-orange-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Start Dairy Farming?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Build a profitable dairy business with our proven training program
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-white text-yellow-600 hover:bg-gray-100 px-8 py-3">
              <BookOpen className="mr-2 h-5 w-5" />
              Enroll Now - ₹4,499
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-yellow-600 px-8 py-3">
              <Phone className="mr-2 h-5 w-5" />
              Call: +91-9876543210
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-6 text-sm opacity-90">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              30-Day Money Back Guarantee
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Lifetime Access
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Expert Support
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}