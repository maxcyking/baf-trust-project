import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/navigation";
import { HomepageGallery } from "@/components/homepage-gallery";
import { AppDownloadSectionNew } from "@/components/app-download-section-new";
import { Footer } from "@/components/footer";
import { 
  BookOpen, 
  Users, 
  Award, 
  CheckCircle, 
  Star,
  Phone,
  Shield,
  TrendingUp,
  Heart,
  Clock,
  Quote
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-1">
                🌾 Empowering Farmers Since 2020
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              <span className="text-primary">BAF Trust</span> - Bharat Agro Foundation
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto">
              Transforming agriculture through comprehensive training programs in goat farming, 
              poultry, sheep farming, and modern agricultural techniques. Join thousands of 
              successful farmers across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
                <BookOpen className="mr-2 h-5 w-5" />
                Start Learning Today
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3">
                <Users className="mr-2 h-5 w-5" />
                View Success Stories
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground">Farmers Trained</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">25+</div>
              <div className="text-muted-foreground">States Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">5+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Programs Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Training Programs
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive courses designed to help you succeed in modern agriculture. 
              From basic techniques to advanced practices, we&apos;ve got you covered.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Goat Farming */}
            <Card className="border border-border hover:shadow-lg transition-all duration-300 hover:border-primary/50">
              <CardHeader>
                <div className="text-4xl mb-4">🐐</div>
                <CardTitle className="text-xl text-foreground">Goat Farming</CardTitle>
                <CardDescription>
                  Complete guide to profitable goat farming with modern techniques
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Breed selection & management
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Nutrition & feeding practices
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Disease prevention & care
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Marketing & profit maximization
                  </li>
                </ul>
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="secondary">12 Weeks</Badge>
                  <Badge className="bg-primary/20 text-primary">Most Popular</Badge>
                </div>
                <Link href="/programs/goat-farming">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Poultry Farming */}
            <Card className="border border-border hover:shadow-lg transition-all duration-300 hover:border-primary/50">
              <CardHeader>
                <div className="text-4xl mb-4">🐔</div>
                <CardTitle className="text-xl text-foreground">Poultry Farming</CardTitle>
                <CardDescription>
                  Modern poultry farming techniques for maximum productivity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Layer & broiler management
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Housing & equipment setup
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Feed formulation
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Health management
                  </li>
                </ul>
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="secondary">10 Weeks</Badge>
                  <Badge className="bg-accent text-accent-foreground">High ROI</Badge>
                </div>
                <Link href="/programs/poultry-farming">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Sheep Farming */}
            <Card className="border border-border hover:shadow-lg transition-all duration-300 hover:border-primary/50">
              <CardHeader>
                <div className="text-4xl mb-4">🐑</div>
                <CardTitle className="text-xl text-foreground">Sheep Farming</CardTitle>
                <CardDescription>
                  Sustainable sheep farming for wool and meat production
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Pasture management
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Breeding techniques
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Wool processing
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Market linkages
                  </li>
                </ul>
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="secondary">8 Weeks</Badge>
                  <Badge className="bg-secondary text-secondary-foreground">Seasonal</Badge>
                </div>
                <Link href="/programs/sheep-farming">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Organic Farming */}
            <Card className="border border-border hover:shadow-lg transition-all duration-300 hover:border-primary/50">
              <CardHeader>
                <div className="text-4xl mb-4">🌱</div>
                <CardTitle className="text-xl text-foreground">Organic Farming</CardTitle>
                <CardDescription>
                  Sustainable agriculture without harmful chemicals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Soil health management
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Natural pest control
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Organic certification
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Premium market access
                  </li>
                </ul>
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="secondary">14 Weeks</Badge>
                  <Badge className="bg-green-100 text-green-800">Eco-Friendly</Badge>
                </div>
                <Link href="/programs/organic-farming">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Crop Management */}
            <Card className="border border-border hover:shadow-lg transition-all duration-300 hover:border-primary/50">
              <CardHeader>
                <div className="text-4xl mb-4">🌾</div>
                <CardTitle className="text-xl text-foreground">Crop Management</CardTitle>
                <CardDescription>
                  Advanced techniques for higher crop yields
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Precision farming
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Water management
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Integrated pest management
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Post-harvest handling
                  </li>
                </ul>
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="secondary">16 Weeks</Badge>
                  <Badge className="bg-blue-100 text-blue-800">Comprehensive</Badge>
                </div>
                <Link href="/programs/crop-management">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Dairy Farming */}
            <Card className="border border-border hover:shadow-lg transition-all duration-300 hover:border-primary/50">
              <CardHeader>
                <div className="text-4xl mb-4">🐄</div>
                <CardTitle className="text-xl text-foreground">Dairy Farming</CardTitle>
                <CardDescription>
                  Modern dairy farming for sustainable income
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Cattle breed selection
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Milking techniques
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Feed management
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Dairy processing
                  </li>
                </ul>
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="secondary">12 Weeks</Badge>
                  <Badge className="bg-yellow-100 text-yellow-800">Profitable</Badge>
                </div>
                <Link href="/programs/dairy-farming">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose BAF Trust Section */}
      <section className="py-20 bg-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose BAF Trust?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We are committed to transforming Indian agriculture through quality education and practical training.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 bg-card shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Expert Faculty</h3>
                <p className="text-muted-foreground">
                  Learn from industry experts with decades of practical farming experience.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-card shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Flexible Learning</h3>
                <p className="text-muted-foreground">
                  Both online and offline training options to suit your schedule.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-card shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Lifetime Support</h3>
                <p className="text-muted-foreground">
                  Ongoing mentorship and support even after course completion.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-card shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Government Certified</h3>
                <p className="text-muted-foreground">
                  All our programs are recognized and certified by relevant authorities.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-card shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Proven Results</h3>
                <p className="text-muted-foreground">
                  95% of our graduates report increased income within 6 months.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-card shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Community Network</h3>
                <p className="text-muted-foreground">
                  Join a thriving community of 10,000+ successful farmers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <HomepageGallery />

      {/* App Download Section */}
      <AppDownloadSectionNew variant="compact" />

      {/* Testimonials Section */}
      <section className="py-20 bg-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              💬 What Our Farmers Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real testimonials from farmers who have transformed their lives through our training programs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card className="border-0 bg-card shadow-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-primary/50 mr-3" />
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  &quot;BAF Trust का goat farming training लेने के बाद मेरी monthly income 15,000 से बढ़कर 45,000 हो गई। 
                  इतनी practical और detailed training कहीं नहीं मिलती।&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    R
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">राज कुमार शर्मा</h4>
                    <p className="text-sm text-muted-foreground">Farmer, Rajasthan</p>
                    <p className="text-xs text-primary">Goat Farming Graduate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 2 */}
            <Card className="border-0 bg-card shadow-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-primary/50 mr-3" />
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  &quot;Poultry farming course complete करने के बाद मैंने 1000 birds का farm start किया। 
                  6 महीने में ही 3 लाख का profit हुआ। Training quality excellent है!&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    P
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">प्रीति कुमारी</h4>
                    <p className="text-sm text-muted-foreground">Farmer, Haryana</p>
                    <p className="text-xs text-primary">Poultry Farming Graduate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 3 */}
            <Card className="border-0 bg-card shadow-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-primary/50 mr-3" />
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  &quot;Organic farming के बारे में सीखने के बाद अब मैं chemical-free vegetables produce करता हूं। 
                  Market में premium price मिलता है और health भी अच्छी रहती है।&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    A
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">अमित वर्मा</h4>
                    <p className="text-sm text-muted-foreground">Farmer, Uttar Pradesh</p>
                    <p className="text-xs text-primary">Organic Farming Graduate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 4 */}
            <Card className="border-0 bg-card shadow-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-primary/50 mr-3" />
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  &quot;Online training बहुत convenient था। घर बैठे सीखा और अब sheep farming में expert हो गया। 
                  BAF Trust team का support भी 24/7 available रहता है।&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    S
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">सुनील कुमार</h4>
                    <p className="text-sm text-muted-foreground">Farmer, Bihar</p>
                    <p className="text-xs text-primary">Sheep Farming Graduate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 5 */}
            <Card className="border-0 bg-card shadow-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-primary/50 mr-3" />
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  &quot;Dairy farming course के बाद मेरी monthly income double हो गई। Cattle management और 
                  milk quality improvement के techniques बहुत उपयोगी हैं।&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">मनीषा देवी</h4>
                    <p className="text-sm text-muted-foreground">Farmer, Punjab</p>
                    <p className="text-xs text-primary">Dairy Farming Graduate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 6 */}
            <Card className="border-0 bg-card shadow-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-primary/50 mr-3" />
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  &quot;Government subsidy की complete information मिली और loan approval भी जल्दी हो गया। 
                  अब मेरा modern poultry farm successfully चल रहा है। Thank you BAF Trust!&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    V
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">विकास गुप्ता</h4>
                    <p className="text-sm text-muted-foreground">Farmer, Madhya Pradesh</p>
                    <p className="text-xs text-primary">Multi-course Graduate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <div className="mb-6">
              <div className="text-4xl font-bold text-primary mb-2">4.9/5</div>
              <div className="flex justify-center text-yellow-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground">Based on 2,500+ farmer reviews</p>
            </div>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Users className="mr-2 h-5 w-5" />
              Read More Success Stories
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Transform Your Agricultural Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Join thousands of successful farmers who have revolutionized their practices with BAF Trust. 
            Start your journey today and secure a prosperous future in agriculture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-3">
              <BookOpen className="mr-2 h-5 w-5" />
              Browse All Courses
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-3">
              <Phone className="mr-2 h-5 w-5" />
              Talk to Our Experts
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
