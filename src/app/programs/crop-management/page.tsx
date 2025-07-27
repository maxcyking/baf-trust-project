'use client';

import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  BookOpen,
  TrendingUp,
  Shield,
  Phone,
  Target,
  DollarSign,
  Zap
} from 'lucide-react';

export default function CropManagementPage() {
  const programHighlights = [
    {
      icon: Zap,
      title: "फसल प्रबंधन प्रशिक्षण",
      description: "आधुनिक कृषि तकनीक और सटीक खेती की तकनीकों में महारत हासिल करें",
      features: ["GPS तकनीक", "ड्रोन अनुप्रयोग", "डेटा प्रबंधन"]
    },
    {
      icon: Target,
      title: "उन्नत फसल योजना",
      description: "अधिकतम उपज और लाभ के लिए वैज्ञानिक फसल चयन और योजना",
      features: ["बाजार विश्लेषण", "जोखिम मूल्यांकन", "मौसमी योजना"]
    },
    {
      icon: Shield,
      title: "एकीकृत कीट प्रबंधन",
      description: "वैज्ञानिक विधियों का उपयोग करके व्यापक कीट और रोग नियंत्रण",
      features: ["IPM रणनीतियां", "जैविक नियंत्रण", "रोग प्रबंधन"]
    },
    {
      icon: TrendingUp,
      title: "उपज अनुकूलन",
      description: "वैज्ञानिक प्रबंधन प्रथाओं के माध्यम से फसल उत्पादकता को अधिकतम करें",
      features: ["पोषक तत्व प्रबंधन", "जल अनुकूलन", "फसल कटाई का समय"]
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "उच्च उपज",
      description: "वैज्ञानिक विधियों से फसल उत्पादकता में 40-60% की वृद्धि"
    },
    {
      icon: DollarSign,
      title: "लागत अनुकूलन",
      description: "उत्पादन और लाभ को अधिकतम करते हुए इनपुट लागत कम करें"
    },
    {
      icon: Shield,
      title: "जोखिम प्रबंधन",
      description: "उचित योजना और प्रबंधन के माध्यम से फसल हानि को कम करें"
    },
    {
      icon: Zap,
      title: "आधुनिक तकनीक",
      description: "नवीनतम सटीक खेती और स्मार्ट कृषि तकनीकें सीखें"
    }
  ];

  const successStories = [
    {
      name: "विकास गुप्ता",
      location: "Madhya Pradesh",
      income: "₹1,50,000/month",
      story: "सटीक खेती तकनीकों को लागू किया। गेहूं की उपज 25 से बढ़कर 45 क्विंटल प्रति एकड़ हो गई।"
    },
    {
      name: "संजय पटेल",
      location: "Gujarat",
      income: "₹2,00,000/month",
      story: "आधुनिक तकनीकों का उपयोग करने वाले कपास खेती विशेषज्ञ। लाभ दोगुना करते हुए इनपुट लागत 30% कम की।"
    },
    {
      name: "रमेश सिंह",
      location: "Haryana",
      income: "₹1,80,000/month",
      story: "एकीकृत फसल प्रबंधन विशेषज्ञ। वैज्ञानिक विधियों से 50 एकड़ का सफलतापूर्वक प्रबंधन करते हैं।"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-blue-900/30 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-4 py-2">
                  🌾 व्यापक कार्यक्रम
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                <span className="text-blue-600">फसल प्रबंधन</span> प्रशिक्षण कार्यक्रम
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                नमस्कार किसान भाइयों! हमारे "Nisar Indian किसान साथी" ऐप के माध्यम से फसल प्रबंधन की संपूर्ण जानकारी प्राप्त करें। 
                सटीक खेती और आधुनिक कृषि प्रथाओं को सीखें अधिकतम उपज के लिए।
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">उन्नत</div>
                  <div className="text-sm text-muted-foreground">तकनीक</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">सटीक</div>
                  <div className="text-sm text-muted-foreground">खेती</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">अधिकतम</div>
                  <div className="text-sm text-muted-foreground">उपज</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">विशेषज्ञ</div>
                  <div className="text-sm text-muted-foreground">मार्गदर्शन</div>
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
                  onClick={() => window.open('https://wa.me/918079043733?text=मुझे फसल प्रबंधन प्रशिक्षण के बारे में जानकारी चाहिए', '_blank')}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  डेमो के लिए कॉल करें
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl">
                <div className="text-center">
                  <div className="text-6xl mb-4">🌾</div>
                  <h3 className="text-2xl font-bold mb-4">Master Crop Management</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span>Precision Farming</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span>Modern Technology</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span>Higher Yields</span>
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
              Why Choose Advanced Crop Management?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform your farming with scientific methods and modern technology
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
              What You&apos;ll Master
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive training modules designed to make you a crop management expert
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
              Real farmers achieving exceptional results with advanced crop management
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                      {story.name.charAt(0)}
                    </div>
                    <h3 className="font-bold text-foreground">{story.name}</h3>
                    <p className="text-sm text-muted-foreground">{story.location}</p>
                    <Badge className="bg-blue-600 text-white mt-2">{story.income}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground text-center italic">
                    "                    &quot;{story.story}&quot;"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            फसल प्रबंधन में महारत हासिल करने के लिए तैयार हैं?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            वैज्ञानिक विधियों से अपनी खेती को बदलें और असाधारण उपज प्राप्त करें
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
              onClick={() => window.open('https://wa.me/918079043733?text=मुझे फसल प्रबंधन प्रशिक्षण के बारे में जानकारी चाहिए', '_blank')}
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
              Technology Training
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}