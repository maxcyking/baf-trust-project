import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/navigation";
import { 
  BookOpen, 
  Users, 
  Mail,
  MapPin,
  Building2,
  Shield,
  TrendingUp,
  Heart,
  MessageCircle,
  FileCheck,
  Target,
  Handshake,
  Globe,
  Calendar,
  GraduationCap,
  Zap,
  UserCheck,
  Home,
  ArrowRight
} from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-1">
                🏛️ NITI Aayog Registered | RJ/2024/0454178
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              About <span className="text-primary">BAF Trust</span>
            </h1>
            <h2 className="text-2xl sm:text-3xl text-primary mb-4">
              भारत एग्रो फाउंडेशन
            </h2>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto">
              निसार इंडियन गोट ब्रीडिंग फार्म - ट्रेनिंग सेंटर
              <br />
              माडावासी, राजगढ़ (चूरू) राजस्थान 331023
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp: 80790-43733
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3">
                <BookOpen className="mr-2 h-5 w-5" />
                View Our Programs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                🎯 Our Mission & Vision
              </h2>
              <div className="space-y-6">
                <Card className="border-l-4 border-l-primary bg-primary/5">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-primary mb-3">Our Mission</h3>
                    <p className="text-muted-foreground">
                      To empower farmers across India with modern agricultural techniques, comprehensive training programs, 
                      and government subsidy assistance. We bridge the gap between traditional farming and scientific methods 
                      to ensure sustainable and profitable agriculture.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-secondary bg-secondary/5">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-secondary-foreground mb-3">Our Vision</h3>
                    <p className="text-muted-foreground">
                      To become India&apos;s leading agricultural foundation, transforming rural livelihoods through quality education, 
                      practical training, and innovative farming solutions. Building a prosperous and self-reliant agricultural community.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">10,000+</h3>
                <p className="text-muted-foreground">Farmers Trained</p>
              </Card>
              
              <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">95%</h3>
                <p className="text-muted-foreground">Success Rate</p>
              </Card>
              
              <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">25+</h3>
                <p className="text-muted-foreground">States Covered</p>
              </Card>
              
              <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">5+</h3>
                <p className="text-muted-foreground">Years Experience</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Government Recognition Section */}
      <section className="py-20 bg-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              🏛️ Government Recognition & Certifications
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              BAF Trust is officially registered and recognized by the Government of India
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300 border-2 border-primary/20">
              <CardContent className="p-8">
                <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Building2 className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">NITI Aayog Registered</h3>
                <p className="text-muted-foreground mb-4">
                  Officially registered under NITI Aayog, Government of India
                </p>
                <Badge className="bg-primary/20 text-primary px-4 py-2">
                  Registration: RJ/2024/0454178
                </Badge>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 border-2 border-green-200">
              <CardContent className="p-8">
                <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Government Certified</h3>
                <p className="text-muted-foreground mb-4">
                  All training programs certified by relevant government authorities
                </p>
                <Badge className="bg-green-100 text-green-700 px-4 py-2">
                  Verified ✓
                </Badge>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 border-2 border-blue-200">
              <CardContent className="p-8">
                <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <FileCheck className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Authorized Training Center</h3>
                <p className="text-muted-foreground mb-4">
                  Licensed to provide agricultural and livestock training programs
                </p>
                <Badge className="bg-blue-100 text-blue-700 px-4 py-2">
                  Licensed
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Training Center Details */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                🏫 Our Training Center
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                निसार इंडियन गोट ब्रीडिंग फार्म - ट्रेनिंग सेंटर located in माडावासी, राजगढ़ (चूरू) राजस्थान 
                offers state-of-the-art facilities for comprehensive agricultural training.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 rounded-full p-2">
                    <Home className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Modern Infrastructure</h4>
                    <p className="text-muted-foreground">Well-equipped classrooms, laboratories, and demonstration areas</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 rounded-full p-2">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Live Animal Training</h4>
                    <p className="text-muted-foreground">Hands-on experience with goats, sheep, poultry, and other livestock</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 rounded-full p-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Expert Faculty</h4>
                    <p className="text-muted-foreground">Experienced professionals with decades of farming expertise</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 rounded-full p-2">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Practical Learning</h4>
                    <p className="text-muted-foreground">100% practical, field-based training approach</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <Card className="aspect-square bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-4xl mb-4">🐐</div>
                  <h3 className="text-lg font-semibold">Goat Breeding</h3>
                  <p className="text-sm opacity-90">Live Training</p>
                </div>
              </Card>
              
              <Card className="aspect-square bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-4xl mb-4">🐔</div>
                  <h3 className="text-lg font-semibold">Poultry Farm</h3>
                  <p className="text-sm opacity-90">Modern Facility</p>
                </div>
              </Card>
              
              <Card className="aspect-square bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-4xl mb-4">🏫</div>
                  <h3 className="text-lg font-semibold">Classrooms</h3>
                  <p className="text-sm opacity-90">Theory Sessions</p>
                </div>
              </Card>
              
              <Card className="aspect-square bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-4xl mb-4">🔬</div>
                  <h3 className="text-lg font-semibold">Laboratory</h3>
                  <p className="text-sm opacity-90">Research & Testing</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Overview */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              🎓 पशुपालन सेवाएं - Our Training Programs
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              ऑनलाइन और ऑफलाइन पशुपालन प्रशिक्षण और सरकारी योजनाओं की जानकारी प्राप्त करें
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-xl">
              <CardHeader className="bg-green-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-6xl">🐐🐑</div>
                  <Badge className="bg-green-500 text-white px-4 py-2">
                    सबसे लोकप्रिय
                  </Badge>
                </div>
                <CardTitle className="text-2xl text-center text-green-700">
                  भेड़ बकरी पालन प्रशिक्षण + सर्टिफिकेट
                </CardTitle>
                <CardDescription className="text-center text-lg">
                  उत्कृष्ट देखभाल और पोषण के साथ भेड़-बकरी पालन करें
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    ₹2,999 <span className="text-lg font-normal text-muted-foreground">+ Certificate</span>
                  </div>
                  <Badge variant="outline" className="border-green-500 text-green-600 px-4 py-2">
                    5 दिवसीय ऑफलाइन प्रशिक्षण
                  </Badge>
                </div>
                <p className="text-muted-foreground text-center mb-6">
                  उत्कृष्ट देखभाल और पोषण के साथ भेड़-बकरी पालन करें और अधिक लाभ उठाएं।
                  व्यावहारिक प्रशिक्षण के साथ सरकारी सब्सिडी की पूरी जानकारी।
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3">
                  <BookOpen className="mr-2 h-5 w-5" />
                  अभी एडमिशन लें
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl">
              <CardHeader className="bg-blue-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-6xl">🐔🥚</div>
                  <Badge className="bg-blue-500 text-white px-4 py-2">
                    उच्च ROI
                  </Badge>
                </div>
                <CardTitle className="text-2xl text-center text-blue-700">
                  मुर्गी पालन प्रशिक्षण + सर्टिफिकेट
                </CardTitle>
                <CardDescription className="text-center text-lg">
                  अच्छी देखभाल और पोषण से मुर्गी पालन करें और अधिक लाभ उठाएं
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    ₹3,000 <span className="text-lg font-normal text-muted-foreground">+ Certificate</span>
                  </div>
                  <Badge variant="outline" className="border-blue-500 text-blue-600 px-4 py-2">
                    4 दिवसीय ऑफलाइन प्रशिक्षण
                  </Badge>
                </div>
                <p className="text-muted-foreground text-center mb-6">
                  अच्छी देखभाल और पोषण से मुर्गी पालन करें और अधिक लाभ उठाएं।
                  25 लाख तक की सब्सिडी की पूरी जानकारी के साथ।
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                  <BookOpen className="mr-2 h-5 w-5" />
                  अभी एडमिशन लें
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              ऑनलाइन प्रशिक्षण से जुड़ें और व्यावहारिक ज्ञान प्राप्त करें
            </p>
            <Link href="/courses">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
                सभी कोर्स देखें
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Government Subsidy Support */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              💰 NLM योजना 2025 - सरकारी सब्सिडी सहायता
            </h2>
            <p className="text-xl opacity-90">
              केंद्र सरकार की राष्ट्रीय पशुधन मिशन योजना से जुड़ें और बड़ी सब्सिडी का लाभ उठाएं
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <Card className="bg-white/10 border-white/20 text-white text-center">
              <CardContent className="p-8">
                <div className="text-5xl mb-4">🐐🐑</div>
                <h3 className="text-xl font-semibold mb-2">भेड़-बकरी पालन</h3>
                <div className="text-2xl font-bold mb-2">10 से 50 लाख</div>
                <p className="opacity-80">तक सब्सिडी उपलब्ध</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 text-white text-center">
              <CardContent className="p-8">
                <div className="text-5xl mb-4">🐔</div>
                <h3 className="text-xl font-semibold mb-2">लेयर मुर्गी पालन</h3>
                <div className="text-2xl font-bold mb-2">25 लाख</div>
                <p className="opacity-80">तक सब्सिडी उपलब्ध</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 text-white text-center">
              <CardContent className="p-8">
                <div className="text-5xl mb-4">🐷</div>
                <h3 className="text-xl font-semibold mb-2">पिग फार्म</h3>
                <div className="text-2xl font-bold mb-2">15 से 30 लाख</div>
                <p className="opacity-80">तक सब्सिडी उपलब्ध</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <div className="bg-green-500 inline-block px-6 py-3 rounded-lg mb-4">
              <span className="font-bold text-xl">
                📱 WhatsApp सहायता: 80790-43733
              </span>
            </div>
            <p className="text-lg opacity-90 mb-6">
              सरकारी योजनाओं की पूरी जानकारी और आवेदन प्रक्रिया के लिए संपर्क करें
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3">
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp पर संपर्क करें
            </Button>
          </div>
        </div>
      </section>

      {/* Team & Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              🤝 Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide our commitment to agricultural excellence
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Dedication</h3>
                <p className="text-muted-foreground text-sm">
                  Committed to farmer success and agricultural development
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Quality</h3>
                <p className="text-muted-foreground text-sm">
                  High-standard training and certified programs
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Handshake className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Trust</h3>
                <p className="text-muted-foreground text-sm">
                  Building lasting relationships with farming communities
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Results</h3>
                <p className="text-muted-foreground text-sm">
                  Proven track record of farmer income improvement
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              📞 Get in Touch
            </h2>
            <p className="text-xl text-muted-foreground">
              Ready to start your agricultural transformation journey?
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">WhatsApp Support</h3>
                <p className="text-2xl font-bold text-green-600 mb-2">80790-43733</p>
                <p className="text-muted-foreground">24/7 उपलब्ध सहायता</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Training Center</h3>
                <p className="text-muted-foreground">
                  माडावासी, राजगढ़ (चूरू)<br />
                  राजस्थान 331023
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Email Us</h3>
                <p className="text-lg font-semibold text-purple-600 mb-2">info@baftrust.org</p>
                <p className="text-muted-foreground">General inquiries</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 mr-4">
              <MessageCircle className="mr-2 h-5 w-5" />
              Contact Us Now
            </Button>
            <Link href="/">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3">
                <Home className="mr-2 h-5 w-5" />
                Back to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 