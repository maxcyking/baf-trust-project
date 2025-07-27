import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navigation } from "@/components/navigation";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Building, 
  Award, 
  Users, 
  Star,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-1">
                📞 हमसे जुड़ें - Connect With Us
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              <span className="text-primary">संपर्क करें</span> - Contact Us
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto">
              Feel free to contact us with any questions or concerns. You can use the form on our website or email us directly. We appreciate your interest and look forward to hearing from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
                onClick={() => window.open('https://wa.me/918079043733?text=नमस्कार, मुझे आपकी सेवाओं के बारे में जानकारी चाहिए', '_blank')}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Chat
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3"
                onClick={() => window.open('tel:+918079043733', '_self')}
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Phone */}
            <Card className="border border-border hover:shadow-lg transition-all duration-300 hover:border-primary/50 text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground">Phone</CardTitle>
                <CardDescription>
                  24/7 सहायता उपलब्ध - Available 24/7
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-primary">+91 8079043733</div>
                  <div className="text-sm text-muted-foreground">WhatsApp Available</div>
                </div>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="border border-border hover:shadow-lg transition-all duration-300 hover:border-primary/50 text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground">Email</CardTitle>
                <CardDescription>
                  त्वरित उत्तर - Quick Response
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-lg font-semibold text-primary">support@nisarindia.com</div>
                  <div className="text-sm text-muted-foreground">Response within 24 hours</div>
                </div>
              </CardContent>
            </Card>

            {/* Address */}
            <Card className="border border-border hover:shadow-lg transition-all duration-300 hover:border-primary/50 text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground">Address</CardTitle>
                <CardDescription>
                  ट्रेनिंग सेंटर - Training Center
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-lg font-semibold text-primary">निसार इंडियन गोट ब्रीडिंग फार्म</div>
                  <div className="text-sm text-muted-foreground">Rajgarh, Churu, Rajasthan</div>
                  <div className="text-sm text-muted-foreground">331023</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form and Map Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  संदेश भेजें - Send Message
                </h2>
                <p className="text-muted-foreground">
                  हमें अपनी आवश्यकताओं के बारे में बताएं और हमारे विशेषज्ञ आपसे संपर्क करेंगे।
                </p>
              </div>
              
              <Card className="border border-border">
                <CardContent className="p-6">
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">नाम - Name *</Label>
                        <Input 
                          id="name" 
                          placeholder="Your full name"
                          className="border-border focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">फोन - Phone *</Label>
                        <Input 
                          id="phone" 
                          placeholder="+91 XXXXX XXXXX"
                          className="border-border focus:border-primary"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">ईमेल - Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your.email@example.com"
                        className="border-border focus:border-primary"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="training">रुचि का क्षेत्र - Area of Interest</Label>
                      <select
                        name="training"
                        id="training"
                        aria-label="Select training program"
                        className="w-full px-3 py-2 border border-border rounded-md focus:border-primary focus:ring-1 focus:ring-primary bg-background"
                      >
                        <option value="">Select Training Program</option>
                        <option value="goat">Goat Farming - बकरी पालन</option>
                        <option value="poultry">Poultry Farming - मुर्गी पालन</option>
                        <option value="sheep">Sheep Farming - भेड़ पालन</option>
                        <option value="organic">Organic Farming - जैविक खेती</option>
                        <option value="all">All Programs - सभी कार्यक्रम</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">संदेश - Message</Label>
                      <textarea 
                        id="message" 
                        rows={4}
                        placeholder="Tell us about your requirements..."
                        className="w-full px-3 py-2 border border-border rounded-md focus:border-primary focus:ring-1 focus:ring-primary bg-background resize-none"
                      />
                    </div>
                    
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3">
                      <ArrowRight className="mr-2 h-5 w-5" />
                      संदेश भेजें - Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Map Section */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  स्थान - Location
                </h2>
                <p className="text-muted-foreground">
                  हमारा ट्रेनिंग सेंटर राजस्थान के चूरू जिले में स्थित है।
                </p>
              </div>
              
              <Card className="border border-border">
                <CardContent className="p-0">
                  <div className="relative h-96 bg-muted rounded-lg overflow-hidden">
                    <div style={{zIndex: 3, position: 'absolute', height: '100%', width: '100%', padding: '0px', borderWidth: '0px', margin: '0px', left: '0px', top: '0px', touchAction: 'pan-x pan-y'}}>
                      <div style={{zIndex: 4, position: 'absolute', left: '50%', top: '50%', width: '100%', willChange: 'transform', transform: 'translate(0px, 0px)'}}>
                        <div style={{position: 'absolute', left: '0px', top: '0px', zIndex: 104, width: '100%'}}></div>
                        <div style={{position: 'absolute', left: '0px', top: '0px', zIndex: 105, width: '100%'}}></div>
                        <div style={{position: 'absolute', left: '0px', top: '0px', zIndex: 106, width: '100%'}}>
                          <slot></slot>
                          <span id="3DBDDC71-401B-4EE7-9F0C-6B6687AF7B2F" aria-live="polite" style={{position: 'absolute', width: '1px', height: '1px', margin: '-1px', padding: '0px', overflow: 'hidden', clipPath: 'inset(100%)', whiteSpace: 'nowrap', border: '0px'}}></span>
                        </div>
                        <div style={{position: 'absolute', left: '0px', top: '0px', zIndex: 107, width: '100%'}}></div>
                      </div>
                    </div>
                    
                    {/* Map Placeholder with location info */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-background/90 p-6 rounded-lg text-center">
                        <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                        <div className="text-sm font-medium text-foreground">निसार इंडियन गोट ब्रीडिंग फार्म</div>
                        <div className="text-xs text-muted-foreground">Rajgarh, Churu, Rajasthan 331023</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Office Hours & Quick Links */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Office Hours */}
            <Card className="border border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-foreground">कार्यालय समय - Office Hours</CardTitle>
                    <CardDescription>
                      हमारी उपलब्धता का समय
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">सोमवार - शुक्रवार</span>
                    <span className="font-semibold text-foreground">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">शनिवार</span>
                    <span className="font-semibold text-foreground">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">रविवार</span>
                    <span className="font-semibold text-foreground">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        WhatsApp 24/7 Available
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links & Support */}
            <Card className="border border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-foreground">त्वरित सहायता - Quick Support</CardTitle>
                    <CardDescription>
                      तुरंत मदद पाने के लिए
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-green-200 text-green-700 hover:bg-green-50"
                    onClick={() => window.open('https://wa.me/918079043733?text=नमस्कार, मुझे आपकी सेवाओं के बारे में जानकारी चाहिए', '_blank')}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp Chat - +91 8079043733
                    <ExternalLink className="ml-auto h-4 w-4" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-blue-200 text-blue-700 hover:bg-blue-50"
                    onClick={() => window.open('tel:+918079043733', '_self')}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Direct Call - तुरंत कॉल करें
                    <ExternalLink className="ml-auto h-4 w-4" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-purple-200 text-purple-700 hover:bg-purple-50"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Email Support
                    <ExternalLink className="ml-auto h-4 w-4" />
                  </Button>
                  
                  <div className="pt-4 border-t border-border">
                    <div className="text-sm text-muted-foreground">
                      <strong>Emergency:</strong> किसी भी आपातकालीन स्थिति में तुरंत WhatsApp करें
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us for Contact */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              हमसे क्यों जुड़ें - Why Choose Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              हमारी विशेषज्ञ टीम आपकी सफलता के लिए प्रतिबद्ध है
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border border-border hover:shadow-lg transition-all duration-300 hover:border-primary/50 text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg text-foreground">NITI Aayog Certified</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  सरकारी मान्यता प्राप्त संस्था
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border hover:shadow-lg transition-all duration-300 hover:border-primary/50 text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg text-foreground">10,000+ Happy Farmers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  संतुष्ट किसान हमारी सफलता
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border hover:shadow-lg transition-all duration-300 hover:border-primary/50 text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Building className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg text-foreground">Expert Training</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  व्यावहारिक प्रशिक्षण कार्यक्रम
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border hover:shadow-lg transition-all duration-300 hover:border-primary/50 text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg text-foreground">95% Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  सिद्ध परिणाम और सफलता
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            आज ही शुरू करें - Start Today
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            आपकी सफलता की यात्रा यहीं से शुरू होती है। हमारे साथ जुड़ें और एक बेहतर कल का निर्माण करें।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-background text-primary hover:bg-background/90 px-8 py-3"
              onClick={() => window.open('tel:+918079043733', '_self')}
            >
              <Phone className="mr-2 h-5 w-5" />
              अभी कॉल करें
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-3"
              onClick={() => window.open('https://wa.me/918079043733?text=नमस्कार, मुझे आपकी सेवाओं के बारे में जानकारी चाहिए', '_blank')}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp Message
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Building className="h-8 w-8 text-primary" />
                <div>
                  <div className="font-bold text-foreground">BAF Trust</div>
                  <div className="text-sm text-muted-foreground">भारतीय एग्रो फाउंडेशन</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering farmers with modern agricultural training and sustainable farming practices.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Training Programs</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Goat Farming</li>
                <li>Poultry Farming</li>
                <li>Sheep Farming</li>
                <li>Organic Farming</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
                <li>Success Stories</li>
                <li>Gallery</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Contact Info</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  +91 8079043733
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  support@nisarindia.com
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Rajgarh, Churu, Rajasthan
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 BAF Trust - भारतीय एग्रो फाउंडेशन. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 