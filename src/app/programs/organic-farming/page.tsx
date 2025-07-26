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
  Leaf
} from 'lucide-react';

export default function OrganicFarmingPage() {
  const programHighlights = [
    {
      icon: Leaf,
      title: "Soil Health & Composting",
      description: "Master organic soil management and natural composting techniques",
      features: ["Soil testing", "Composting methods", "Vermicomposting"]
    },
    {
      icon: Shield,
      title: "Natural Pest Management",
      description: "Learn chemical-free pest control using integrated pest management",
      features: ["Beneficial insects", "Organic pesticides", "Disease prevention"]
    },
    {
      icon: Target,
      title: "Organic Certification",
      description: "Navigate the certification process and access premium markets",
      features: ["Certification process", "Documentation", "Market access"]
    },
    {
      icon: TrendingUp,
      title: "Premium Marketing",
      description: "Build your organic brand and access high-value market channels",
      features: ["Brand building", "Premium pricing", "Direct marketing"]
    }
  ];

  const benefits = [
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Sustainable farming practices that protect the environment"
    },
    {
      icon: DollarSign,
      title: "Premium Pricing",
      description: "Organic products command 30-50% higher prices in the market"
    },
    {
      icon: Shield,
      title: "Health Benefits",
      description: "Chemical-free produce that's safer for consumers and farmers"
    },
    {
      icon: TrendingUp,
      title: "Growing Demand",
      description: "Rapidly expanding organic food market in India and globally"
    }
  ];

  const successStories = [
    {
      name: "अमित वर्मा",
      location: "Uttar Pradesh",
      income: "₹80,000/month",
      story: "Converted 5 acres to organic farming. Now supplies premium vegetables to urban markets with 40% higher profits."
    },
    {
      name: "सुधा शर्मा",
      location: "Maharashtra",
      income: "₹60,000/month",
      story: "Organic spice farming specialist. Exports organic turmeric and chili to international markets."
    },
    {
      name: "राकेश कुमार",
      location: "Punjab",
      income: "₹1,20,000/month",
      story: "Organic wheat and rice farmer. Supplies to organic food companies and has his own brand."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-lime-50 to-emerald-100 dark:from-green-900/20 dark:via-lime-900/20 dark:to-emerald-900/30 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Badge className="bg-green-100 text-green-800 border-green-200 px-4 py-2">
                  🌱 Eco-Friendly Program
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                <span className="text-green-600">Organic Farming</span> Excellence Course
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Master sustainable agriculture with our comprehensive 14-week organic farming program. 
                Learn chemical-free farming techniques for premium market access.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">14</div>
                  <div className="text-sm text-muted-foreground">Weeks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">4200+</div>
                  <div className="text-sm text-muted-foreground">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">90%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">₹80K</div>
                  <div className="text-sm text-muted-foreground">Avg Income</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Enroll Now - ₹5,999
                </Button>
                <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3">
                  <Phone className="mr-2 h-5 w-5" />
                  Call for Demo
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl p-8 text-white shadow-2xl">
                <div className="text-center">
                  <div className="text-6xl mb-4">🌱</div>
                  <h3 className="text-2xl font-bold mb-4">Go Organic Today</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span>Chemical-Free Farming</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span>Premium Market Access</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span>Certification Support</span>
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
              Why Choose Organic Farming?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the benefits of sustainable agriculture for you and the environment
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 bg-card shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-green-600" />
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
              Comprehensive training modules designed to make you an organic farming expert
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {programHighlights.map((highlight, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 rounded-full p-3 flex-shrink-0">
                      <highlight.icon className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-3">{highlight.title}</h3>
                      <p className="text-muted-foreground mb-4">{highlight.description}</p>
                      <div className="space-y-2">
                        {highlight.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
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
              Real farmers achieving premium profits with organic farming
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="border-0 bg-gradient-to-br from-green-50 to-lime-50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                      {story.name.charAt(0)}
                    </div>
                    <h3 className="font-bold text-foreground">{story.name}</h3>
                    <p className="text-sm text-muted-foreground">{story.location}</p>
                    <Badge className="bg-green-600 text-white mt-2">{story.income}</Badge>
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
      <section className="py-20 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Go Organic?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join the organic farming revolution and build a sustainable, profitable farm
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3">
              <BookOpen className="mr-2 h-5 w-5" />
              Enroll Now - ₹5,999
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3">
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
              Certification Support
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}