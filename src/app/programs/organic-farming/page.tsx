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
      title: "जैविक खेती प्रशिक्षण",
      description: "रासायनिक मुक्त खेती की संपूर्ण जानकारी और तकनीक",
      features: ["मिट्टी परीक्षण", "कंपोस्ट बनाना", "वर्मी कंपोस्टिंग"]
    },
    {
      icon: Shield,
      title: "प्राकृतिक कीट प्रबंधन",
      description: "रसायन मुक्त कीट नियंत्रण और एकीकृत कीट प्रबंधन",
      features: ["लाभकारी कीट", "जैविक कीटनाशक", "रोग निवारण"]
    },
    {
      icon: Target,
      title: "जैविक प्रमाणीकरण",
      description: "प्रमाणीकरण प्रक्रिया और प्रीमियम बाजार तक पहुंच",
      features: ["प्रमाणीकरण प्रक्रिया", "दस्तावेजीकरण", "बाजार पहुंच"]
    },
    {
      icon: TrendingUp,
      title: "प्रीमियम मार्केटिंग",
      description: "अपना जैविक ब्रांड बनाएं और उच्च मूल्य बाजार चैनलों तक पहुंच प्राप्त करें",
      features: ["ब्रांड निर्माण", "प्रीमियम मूल्य निर्धारण", "प्रत्यक्ष विपणन"]
    }
  ];

  const benefits = [
    {
      icon: Leaf,
      title: "पर्यावरण अनुकूल",
      description: "टिकाऊ खेती प्रथाएं जो पर्यावरण की रक्षा करती हैं"
    },
    {
      icon: DollarSign,
      title: "प्रीमियम मूल्य निर्धारण",
      description: "जैविक उत्पाद बाजार में 30-50% अधिक कीमत पर बिकते हैं"
    },
    {
      icon: Shield,
      title: "स्वास्थ्य लाभ",
      description: "रसायन मुक्त उत्पाद जो उपभोक्ताओं और किसानों के लिए सुरक्षित हैं"
    },
    {
      icon: TrendingUp,
      title: "बढ़ती मांग",
      description: "भारत और विश्व स्तर पर तेजी से बढ़ता जैविक खाद्य बाजार"
    }
  ];

  const successStories = [
    {
      name: "अमित वर्मा",
      location: "Uttar Pradesh",
      income: "₹80,000/month",
      story: "5 एकड़ को जैविक खेती में परिवर्तित किया। अब 40% अधिक लाभ के साथ शहरी बाजारों में प्रीमियम सब्जियों की आपूर्ति करते हैं।"
    },
    {
      name: "सुधा शर्मा",
      location: "Maharashtra",
      income: "₹60,000/month",
      story: "जैविक मसाला खेती विशेषज्ञ। अंतर्राष्ट्रीय बाजारों में जैविक हल्दी और मिर्च का निर्यात करती हैं।"
    },
    {
      name: "राकेश कुमार",
      location: "Punjab",
      income: "₹1,20,000/month",
      story: "जैविक गेहूं और चावल किसान। जैविक खाद्य कंपनियों को आपूर्ति करते हैं और अपना ब्रांड भी है।"
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
                  🌱 पर्यावरण अनुकूल कार्यक्रम
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                <span className="text-green-600">जैविक खेती</span> प्रशिक्षण कार्यक्रम
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                नमस्कार किसान भाइयों! हमारे "Nisar Indian किसान साथी" ऐप के माध्यम से जैविक खेती की संपूर्ण जानकारी प्राप्त करें। 
                रसायन मुक्त खेती तकनीक सीखें और प्रीमियम बाजार तक पहुंच प्राप्त करें।
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">व्यापक</div>
                  <div className="text-sm text-muted-foreground">प्रशिक्षण</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">रसायन</div>
                  <div className="text-sm text-muted-foreground">मुक्त</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">प्रीमियम</div>
                  <div className="text-sm text-muted-foreground">बाजार</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">विशेषज्ञ</div>
                  <div className="text-sm text-muted-foreground">मार्गदर्शन</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                  onClick={() => window.open('https://play.google.com/store/apps/details?id=com.nisarindian.classes', '_blank')}
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  अभी डाउनलोड करें
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3"
                  onClick={() => window.open('https://wa.me/918079043733?text=मुझे जैविक खेती प्रशिक्षण के बारे में जानकारी चाहिए', '_blank')}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  डेमो के लिए कॉल करें
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl p-8 text-white shadow-2xl">
                <div className="text-center">
                  <div className="text-6xl mb-4">🌱</div>
                  <h3 className="text-2xl font-bold mb-4">आज ही शुरू करें</h3>
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
            जैविक खेती शुरू करने के लिए तैयार हैं?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            जैविक खेती क्रांति में शामिल हों और एक टिकाऊ, लाभदायक फार्म बनाएं
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3"
              onClick={() => window.open('https://play.google.com/store/apps/details?id=com.nisarindian.classes', '_blank')}
            >
              <BookOpen className="mr-2 h-5 w-5" />
              अभी डाउनलोड करें
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3"
              onClick={() => window.open('https://wa.me/918079043733?text=मुझे जैविक खेती प्रशिक्षण के बारे में जानकारी चाहिए', '_blank')}
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
              Certification Support
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}