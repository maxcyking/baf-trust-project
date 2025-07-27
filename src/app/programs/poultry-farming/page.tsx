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

export default function PoultryFarmingPage() {
  const programHighlights = [
    {
      icon: Target,
      title: "मुर्गीपालन प्रशिक्षण",
      description: "3+ वीडियो के साथ व्यापक मुर्गी पालन प्रशिक्षण",
      features: ["3+ प्रशिक्षण वीडियो", "3 दिन का सर्टिफिकेट", "3 महीने तक वीडियो एक्सेस"]
    },
    {
      icon: Zap,
      title: "आधुनिक तकनीक",
      description: "नवीनतम मुर्गी पालन तकनीक और उपकरणों की जानकारी",
      features: ["स्वचालित फीडिंग", "जलवायु नियंत्रण", "अंडा संग्रह प्रणाली"]
    },
    {
      icon: Shield,
      title: "स्वास्थ्य प्रबंधन",
      description: "मुर्गियों के स्वास्थ्य और रोग निवारण की संपूर्ण जानकारी",
      features: ["टीकाकरण कार्यक्रम", "जैव सुरक्षा उपाय", "रोग निदान"]
    },
    {
      icon: TrendingUp,
      title: "व्यापार अनुकूलन",
      description: "कुशल उत्पादन और स्मार्ट मार्केटिंग के माध्यम से अधिकतम लाभ",
      features: ["लागत अनुकूलन", "बाजार विश्लेषण", "व्यापार विस्तार"]
    }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "High ROI",
      description: "Return on investment within 6-8 months with proper management"
    },
    {
      icon: Clock,
      title: "Quick Turnaround",
      description: "Broiler ready in 35-42 days, layers start producing in 18-20 weeks"
    },
    {
      icon: TrendingUp,
      title: "Growing Demand",
      description: "Increasing consumption of eggs and chicken meat in India"
    },
    {
      icon: Shield,
      title: "Stable Income",
      description: "Consistent daily income from egg production"
    }
  ];

  const successStories = [
    {
      name: "प्रीति कुमारी",
      location: "Haryana",
      income: "₹3,00,000 profit",
      story: "Started with 1000 birds, achieved ₹3 lakh profit in 6 months. Now planning to expand to 5000 birds."
    },
    {
      name: "रमेश गुप्ता",
      location: "Punjab",
      income: "₹50,000/month",
      story: "Layer farming with 2000 birds generating consistent monthly income of ₹50,000."
    },
    {
      name: "सुमित्रा देवी",
      location: "Uttar Pradesh",
      income: "₹40,000/month",
      story: "Integrated poultry farming with both layers and broilers. Diversified income streams."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 dark:from-blue-900/20 dark:via-cyan-900/20 dark:to-blue-900/30 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-4 py-2">
                  🐔 उच्च लाभ कार्यक्रम
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                <span className="text-blue-600">मुर्गीपालन</span> प्रशिक्षण
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                नमस्कार किसान भाइयों! हमारे "Nisar Indian किसान साथी" ऐप के माध्यम से मुर्गीपालन की संपूर्ण जानकारी प्राप्त करें। 
                3+ वीडियो के साथ व्यावहारिक प्रशिक्षण और 3 दिन का प्रमाण पत्र। वीडियो देखने का मौका 3 महीने तक।
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">3+</div>
                  <div className="text-sm text-muted-foreground">वीडियो</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">3</div>
                  <div className="text-sm text-muted-foreground">दिन सर्टिफिकेट</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">3</div>
                  <div className="text-sm text-muted-foreground">महीने एक्सेस</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">व्यावहारिक</div>
                  <div className="text-sm text-muted-foreground">प्रशिक्षण</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                  onClick={() => window.open('https://play.google.com/store/apps/details?id=com.nisarindian.classes', '_blank')}
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  अभी डाउनलोड करें
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3"
                  onClick={() => window.open('https://wa.me/918079043733?text=मुझे मुर्गीपालन प्रशिक्षण के बारे में जानकारी चाहिए', '_blank')}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  डेमो के लिए कॉल करें
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-8 text-white shadow-2xl">
                <div className="text-center">
                  <div className="text-6xl mb-4">🐔</div>
                  <h3 className="text-2xl font-bold mb-4">Start Your Poultry Farm</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span>Layer & Broiler Training</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span>Modern Equipment</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span>Market Linkage</span>
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
              Why Choose Poultry Farming?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover why poultry farming is one of the most profitable agricultural businesses
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 bg-card shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-blue-600" />
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
              Comprehensive training modules designed to make you a poultry farming expert
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {programHighlights.map((highlight, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 rounded-full p-3 flex-shrink-0">
                      <highlight.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-3">{highlight.title}</h3>
                      <p className="text-muted-foreground mb-4">{highlight.description}</p>
                      <div className="space-y-2">
                        {highlight.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
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
              Real farmers achieving remarkable success with poultry farming
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="border-0 bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                      {story.name.charAt(0)}
                    </div>
                    <h3 className="font-bold text-foreground">{story.name}</h3>
                    <p className="text-sm text-muted-foreground">{story.location}</p>
                    <Badge className="bg-blue-600 text-white mt-2">{story.income}</Badge>
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
      <section className="py-20 bg-gradient-to-br from-blue-600 to-cyan-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Start Your Poultry Farm?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join thousands of successful poultry farmers and build a profitable business
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3"
              onClick={() => window.open('https://play.google.com/store/apps/details?id=com.nisarindian.classes', '_blank')}
            >
              <BookOpen className="mr-2 h-5 w-5" />
              अभी डाउनलोड करें
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3"
              onClick={() => window.open('https://wa.me/918079043733?text=मुझे मुर्गीपालन प्रशिक्षण के बारे में जानकारी चाहिए', '_blank')}
            >
              <Phone className="mr-2 h-5 w-5" />
              कॉल: +91-8079043733
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