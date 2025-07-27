'use client';

import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
    Phone,
    Target,
    DollarSign,
    Zap,
} from 'lucide-react';

export default function PigFarmingPage() {
    const programHighlights = [
        {
            icon: Target,
            title: "नस्ल चयन विशेषज्ञता",
            description: "सर्वोत्तम सुअर नस्लों का चयन करना सीखें जो अधिकतम लाभप्रदता देती हैं",
            features: ["नस्ल विश्लेषण", "चयन मानदंड", "प्रदर्शन तुलना"]
        },
        {
            icon: Shield,
            title: "स्वास्थ्य प्रबंधन",
            description: "स्वस्थ पशुधन सुनिश्चित करने के लिए व्यापक स्वास्थ्य देखभाल प्रोटोकॉल",
            features: ["रोग निवारण", "टीकाकरण कार्यक्रम", "आपातकालीन देखभाल"]
        },
        {
            icon: TrendingUp,
            title: "व्यवसाय और विपणन",
            description: "सिद्ध विपणन और बिक्री रणनीतियों के साथ लाभदायक सुअर पालन व्यवसाय बनाएं",
            features: ["बाजार विश्लेषण", "मूल्य निर्धारण रणनीति", "लाभ अनुकूलन"]
        },
        {
            icon: Heart,
            title: "व्यावहारिक प्रशिक्षण",
            description: "जीवित सुअरों और वास्तविक खेती परिदृश्यों के साथ व्यावहारिक अनुभव",
            features: ["लाइव प्रदर्शन", "फील्ड विजिट", "व्यावहारिक अभ्यास"]
        }
    ];

    const benefits = [
        {
            icon: DollarSign,
            title: "उच्च ROI",
            description: "2 साल के भीतर निवेश पर औसतन 400-500% रिटर्न"
        },
        {
            icon: Clock,
            title: "त्वरित रिटर्न",
            description: "शुरुआत के 8-10 महीने के भीतर कमाई शुरू करें"
        },
        {
            icon: TrendingUp,
            title: "बढ़ता बाजार",
            description: "सुअर के मांस और उत्पादों की बढ़ती मांग"
        },
        {
            icon: Shield,
            title: "कम जोखिम",
            description: "सुअर मजबूत जानवर हैं जिनमें कम मृत्यु दर होती है"
        }
    ];

    const successStories = [
        {
            name: "राकेश कुमार",
            location: "बिहार",
            income: "₹60,000/month",
            story: "10 सुअरों से शुरुआत की, अब 100+ सुअरों का मालिक है। मासिक आय ₹20,000 से बढ़कर ₹60,000 हो गई।"
        },
        {
            name: "सुनीता देवी",
            location: "झारखंड",
            income: "₹45,000/month",
            story: "एकल माता जो सुअर पालन के माध्यम से आर्थिक रूप से स्वतंत्र हो गई। अब स्थानीय बाजारों में आपूर्ति करती है।"
        },
        {
            name: "अमित सिंह",
            location: "उत्तर प्रदेश",
            income: "₹80,000/month",
            story: "अपनी कॉर्पोरेट नौकरी छोड़कर सुअर पालन शुरू किया। अब एक सफल प्रजनन केंद्र चलाते हैं।"
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 dark:from-pink-900/20 dark:via-rose-900/20 dark:to-pink-900/30 py-20 overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="flex items-center mb-6">
                                <Badge className="bg-pink-100 text-pink-800 border-pink-200 px-4 py-2">
                                    🐷 उच्च लाभ कार्यक्रम
                                </Badge>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                                <span className="text-pink-600">पिग फार्मिंग</span> ट्रेनिंग
                            </h1>
                            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                                नमस्कार किसान भाइयों! हमारे "Nisar Indian किसान साथी" ऐप के माध्यम से पिग फार्मिंग की संपूर्ण जानकारी प्राप्त करें। 
                                5+ वीडियो के साथ व्यावहारिक प्रशिक्षण और 3 दिन का प्रमाण पत्र।
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-pink-600">5+</div>
                                    <div className="text-sm text-muted-foreground">वीडियो</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-pink-600">3</div>
                                    <div className="text-sm text-muted-foreground">दिन सर्टिफिकेट</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-pink-600">व्यावहारिक</div>
                                    <div className="text-sm text-muted-foreground">प्रशिक्षण</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-pink-600">विशेषज्ञ</div>
                                    <div className="text-sm text-muted-foreground">मार्गदर्शन</div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button 
                                    size="lg" 
                                    className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3"
                                    onClick={() => window.open('https://play.google.com/store/apps/details?id=com.nisarindian.classes', '_blank')}
                                >
                                    <BookOpen className="mr-2 h-5 w-5" />
                                    अभी डाउनलोड करें
                                </Button>
                                <Button 
                                    size="lg" 
                                    variant="outline" 
                                    className="border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white px-8 py-3"
                                    onClick={() => window.open('https://wa.me/918079043733?text=मुझे पिग फार्मिंग ट्रेनिंग के बारे में जानकारी चाहिए', '_blank')}
                                >
                                    <Phone className="mr-2 h-5 w-5" />
                                    डेमो के लिए कॉल करें
                                </Button>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl p-8 text-white shadow-2xl">
                                <div className="text-center">
                                    <div className="text-6xl mb-4">🐷</div>
                                    <h3 className="text-2xl font-bold mb-4">आज ही शुरू करें</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-center">
                                            <CheckCircle className="h-5 w-5 mr-2" />
                                            <span>5+ वीडियो ट्रेनिंग</span>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <CheckCircle className="h-5 w-5 mr-2" />
                                            <span>3 दिन का सर्टिफिकेट</span>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <CheckCircle className="h-5 w-5 mr-2" />
                                            <span>विशेषज्ञ सहायता</span>
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
                            पिग फार्मिंग क्यों चुनें?
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            जानिए पिग फार्मिंग के अद्भुत फायदे और क्यों यह सबसे लाभदायक कृषि व्यवसाय है
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
                            <Card key={index} className="border-0 bg-card shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                                <CardContent className="p-6 text-center">
                                    <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                        <benefit.icon className="h-8 w-8 text-pink-600" />
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
                            आप क्या सीखेंगे
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            व्यापक प्रशिक्षण मॉड्यूल जो आपको पिग फार्मिंग का विशेषज्ञ बनाएंगे
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {programHighlights.map((highlight, index) => (
                            <Card key={index} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                                <CardContent className="p-8">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-pink-100 rounded-full p-3 flex-shrink-0">
                                            <highlight.icon className="h-8 w-8 text-pink-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-foreground mb-3">{highlight.title}</h3>
                                            <p className="text-muted-foreground mb-4">{highlight.description}</p>
                                            <div className="space-y-2">
                                                {highlight.features.map((feature, featureIndex) => (
                                                    <div key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                                                        <CheckCircle className="h-4 w-4 text-pink-600 mr-2 flex-shrink-0" />
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
                            सफलता की कहानियां
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            वास्तविक किसान, वास्तविक परिणाम। देखें कि हमारे छात्रों ने अपना जीवन कैसे बदला
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {successStories.map((story, index) => (
                            <Card key={index} className="border-0 bg-gradient-to-br from-pink-50 to-rose-50 hover:shadow-lg transition-all duration-300">
                                <CardContent className="p-6">
                                    <div className="text-center mb-4">
                                        <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                                            {story.name.charAt(0)}
                                        </div>
                                        <h3 className="font-bold text-foreground">{story.name}</h3>
                                        <p className="text-sm text-muted-foreground">{story.location}</p>
                                        <Badge className="bg-pink-600 text-white mt-2">{story.income}</Badge>
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
            <section className="py-20 bg-gradient-to-br from-pink-600 to-rose-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                        पिग फार्मिंग की यात्रा शुरू करने के लिए तैयार हैं?
                    </h2>
                    <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                        हजारों सफल किसानों के साथ जुड़ें जिन्होंने हमारे सिद्ध पिग फार्मिंग कार्यक्रम से अपना जीवन बदला है
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                        <Button 
                            size="lg" 
                            className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-3"
                            onClick={() => window.open('https://play.google.com/store/apps/details?id=com.nisarindian.classes', '_blank')}
                        >
                            <BookOpen className="mr-2 h-5 w-5" />
                            अभी डाउनलोड करें
                        </Button>
                        <Button 
                            size="lg" 
                            variant="outline" 
                            className="border-white text-white hover:bg-white hover:text-pink-600 px-8 py-3"
                            onClick={() => window.open('https://wa.me/918079043733?text=मुझे पिग फार्मिंग ट्रेनिंग के बारे में जानकारी चाहिए', '_blank')}
                        >
                            <Phone className="mr-2 h-5 w-5" />
                            कॉल: +91-8079043733
                        </Button>
                    </div>

                    <div className="flex items-center justify-center space-x-6 text-sm opacity-90">
                        <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            30-दिन मनी बैक गारंटी
                        </div>
                        <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            लाइफटाइम एक्सेस
                        </div>
                        <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            विशेषज्ञ सहायता
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}