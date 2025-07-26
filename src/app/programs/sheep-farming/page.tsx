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

} from 'lucide-react';

export default function SheepFarmingPage() {
  const programHighlights = [
    {
      icon: Target,
      title: "Dual Production Systems",
      description: "Master both wool and meat production for maximum profitability",
      features: ["Wool production", "Meat production", "Integrated systems"]
    },
    {
      icon: Shield,
      title: "Pasture & Grazing Management",
      description: "Optimize grazing systems and pasture management for healthy sheep",
      features: ["Rotational grazing", "Pasture improvement", "Feed supplementation"]
    },
    {
      icon: Heart,
      title: "Wool Processing & Value Addition",
      description: "Learn wool processing techniques to increase product value",
      features: ["Shearing techniques", "Wool grading", "Processing methods"]
    },
    {
      icon: TrendingUp,
      title: "Seasonal Business Planning",
      description: "Develop strategies for seasonal farming and year-round income",
      features: ["Seasonal planning", "Market timing", "Income diversification"]
    }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "Dual Income",
      description: "Earn from both wool and meat production throughout the year"
    },
    {
      icon: Clock,
      title: "Seasonal Advantage",
      description: "Perfect for seasonal farming with low maintenance requirements"
    },
    {
      icon: TrendingUp,
      title: "Growing Market",
      description: "Increasing demand for organic wool and mutton in premium markets"
    },
    {
      icon: Shield,
      title: "Hardy Animals",
      description: "Sheep are resilient and adapt well to various climatic conditions"
    }
  ];

  const successStories = [
    {
      name: "सुनील कुमार",
      location: "Bihar",
      income: "₹35,000/month",
      story: "Started with 50 sheep, now manages 200+ sheep. Earning from both wool and meat sales."
    },
    {
      name: "गीता देवी",
      location: "Rajasthan",
      income: "₹25,000/month",
      story: "Focused on wool production with premium breeds. Supplies to textile companies directly."
    },
    {
      name: "महेश यादव",
      location: "Haryana",
      income: "₹40,000/month",
      story: "Integrated sheep farming with crop production. Utilizing sheep manure for organic farming."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-purple-900/30 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Badge className="bg-purple-100 text-purple-800 border-purple-200 px-4 py-2">
                  🐑 Seasonal Program
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                <span className="text-purple-600">Sheep Farming</span> Mastery Course
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Learn sustainable sheep farming for wool and meat production with our comprehensive 8-week program. 
                Perfect for seasonal farming with excellent returns.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">8</div>
                  <div className="text-sm text-muted-foreground">Weeks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">2500+</div>
                  <div className="text-sm text-muted-foreground">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">88%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">₹35K</div>
                  <div className="text-sm text-muted-foreground">Avg Income</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Enroll Now - ₹2,999
                </Button>
                <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-3">
                  <Phone className="mr-2 h-5 w-5" />
                  Call for Demo
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
                <div className="text-center">
                  <div className="text-6xl mb-4">🐑</div>
                  <h3 className="text-2xl font-bold mb-4">Start Sheep Farming</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span>Wool & Meat Production</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span>Seasonal Farming</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span>Low Maintenance</span>
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
              Why Choose Sheep Farming?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the unique advantages of sheep farming for sustainable agriculture
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 bg-card shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-purple-600" />
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
              Comprehensive training modules designed to make you a sheep farming expert
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {programHighlights.map((highlight, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 rounded-full p-3 flex-shrink-0">
                      <highlight.icon className="h-8 w-8 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-3">{highlight.title}</h3>
                      <p className="text-muted-foreground mb-4">{highlight.description}</p>
                      <div className="space-y-2">
                        {highlight.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-purple-600 mr-2 flex-shrink-0" />
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
              Real farmers building successful sheep farming businesses
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="border-0 bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                      {story.name.charAt(0)}
                    </div>
                    <h3 className="font-bold text-foreground">{story.name}</h3>
                    <p className="text-sm text-muted-foreground">{story.location}</p>
                    <Badge className="bg-purple-600 text-white mt-2">{story.income}</Badge>
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
      <section className="py-20 bg-gradient-to-br from-purple-600 to-pink-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Start Sheep Farming?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join successful sheep farmers and build a sustainable agricultural business
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3">
              <BookOpen className="mr-2 h-5 w-5" />
              Enroll Now - ₹2,999
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3">
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