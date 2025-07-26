'use client';

import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

export default function GoatFarmingPage() {
    const programHighlights = [
        {
            icon: Target,
            title: "Breed Selection Mastery",
            description: "Learn to choose the best goat breeds for maximum profitability and local climate adaptation",
            features: ["Popular breed analysis", "Selection criteria", "Performance comparison"]
        },
        {
            icon: Shield,
            title: "Health Management",
            description: "Comprehensive health care protocols to ensure healthy livestock and minimize losses",
            features: ["Disease prevention", "Vaccination schedules", "Emergency care"]
        },
        {
            icon: TrendingUp,
            title: "Business & Marketing",
            description: "Build a profitable goat farming business with proven marketing and sales strategies",
            features: ["Market analysis", "Pricing strategies", "Profit optimization"]
        },
        {
            icon: Heart,
            title: "Practical Training",
            description: "Hands-on experience with live goats and real farming scenarios",
            features: ["Live demonstrations", "Field visits", "Practical exercises"]
        }
    ];

    const benefits = [
        {
            icon: DollarSign,
            title: "High ROI",
            description: "Average 300-400% return on investment within 2 years"
        },
        {
            icon: Clock,
            title: "Quick Returns",
            description: "Start earning within 6-8 months of starting"
        },
        {
            icon: TrendingUp,
            title: "Growing Market",
            description: "Increasing demand for goat meat and milk products"
        },
        {
            icon: Shield,
            title: "Low Risk",
            description: "Goats are hardy animals with low mortality rates"
        }
    ];

    const successStories = [
        {
            name: "राज कुमार शर्मा",
            location: "Rajasthan",
            income: "₹45,000/month",
            story: "Started with 10 goats, now owns 150+ goats. Monthly income increased from ₹15,000 to ₹45,000."
        },
        {
            name: "सुनीता देवी",
            location: "Haryana",
            income: "₹35,000/month",
            story: "Single mother who became financially independent through goat farming. Now supplies to local markets."
        },
        {
            name: "अमित पटेल",
            location: "Gujarat",
            income: "₹60,000/month",
            story: "Left his corporate job to start goat farming. Now runs a successful breeding center."
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-green-900/30 py-20 overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="flex items-center mb-6">
                                <Badge className="bg-green-100 text-green-800 border-green-200 px-4 py-2">
                                    🐐 Most Popular Program
                                </Badge>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                                <span className="text-green-600">Goat Farming</span> Mastery Course
                            </h1>
                            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                                Transform your agricultural journey with our comprehensive 12-week goat farming program.
                                Learn from industry experts and join thousands of successful farmers across India.
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">12</div>
                                    <div className="text-sm text-muted-foreground">Weeks</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">5000+</div>
                                    <div className="text-sm text-muted-foreground">Students</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">95%</div>
                                    <div className="text-sm text-muted-foreground">Success Rate</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">₹45K</div>
                                    <div className="text-sm text-muted-foreground">Avg Income</div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                                    <BookOpen className="mr-2 h-5 w-5" />
                                    Enroll Now - ₹4,999
                                </Button>
                                <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3">
                                    <Phone className="mr-2 h-5 w-5" />
                                    Call for Demo
                                </Button>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-8 text-white shadow-2xl">
                                <div className="text-center">
                                    <div className="text-6xl mb-4">🐐</div>
                                    <h3 className="text-2xl font-bold mb-4">Start Your Goat Farm Today</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-center">
                                            <CheckCircle className="h-5 w-5 mr-2" />
                                            <span>Practical Training</span>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <CheckCircle className="h-5 w-5 mr-2" />
                                            <span>Expert Mentorship</span>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <CheckCircle className="h-5 w-5 mr-2" />
                                            <span>Lifetime Support</span>
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
                            Why Choose Goat Farming?
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Discover the incredible benefits of goat farming and why it's the perfect agricultural business
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
                            Comprehensive training modules designed to make you a goat farming expert
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
                            Real farmers, real results. See how our students transformed their lives
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {successStories.map((story, index) => (
                            <Card key={index} className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-all duration-300">
                                <CardContent className="p-6">
                                    <div className="text-center mb-4">
                                        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
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

            {/* What You'll Get */}
            <section className="py-20 bg-accent/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                            What You'll Get
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Complete package for your goat farming success
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="border-0 bg-card shadow-sm">
                            <CardContent className="p-6">
                                <BookOpen className="h-12 w-12 text-green-600 mb-4" />
                                <h3 className="text-xl font-semibold text-foreground mb-2">Complete Course Material</h3>
                                <p className="text-muted-foreground">Comprehensive study materials, videos, and practical guides</p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-card shadow-sm">
                            <CardContent className="p-6">
                                <Users className="h-12 w-12 text-green-600 mb-4" />
                                <h3 className="text-xl font-semibold text-foreground mb-2">Expert Mentorship</h3>
                                <p className="text-muted-foreground">Direct access to experienced goat farming experts</p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-card shadow-sm">
                            <CardContent className="p-6">
                                <Heart className="h-12 w-12 text-green-600 mb-4" />
                                <h3 className="text-xl font-semibold text-foreground mb-2">Lifetime Support</h3>
                                <p className="text-muted-foreground">Ongoing support even after course completion</p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-card shadow-sm">
                            <CardContent className="p-6">
                                <Award className="h-12 w-12 text-green-600 mb-4" />
                                <h3 className="text-xl font-semibold text-foreground mb-2">Certification</h3>
                                <p className="text-muted-foreground">Government recognized certificate upon completion</p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-card shadow-sm">
                            <CardContent className="p-6">
                                <Target className="h-12 w-12 text-green-600 mb-4" />
                                <h3 className="text-xl font-semibold text-foreground mb-2">Business Plan</h3>
                                <p className="text-muted-foreground">Customized business plan for your goat farm</p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-card shadow-sm">
                            <CardContent className="p-6">
                                <Zap className="h-12 w-12 text-green-600 mb-4" />
                                <h3 className="text-xl font-semibold text-foreground mb-2">Quick Start Guide</h3>
                                <p className="text-muted-foreground">Step-by-step guide to start your farm immediately</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                        Ready to Start Your Goat Farming Journey?
                    </h2>
                    <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                        Join thousands of successful farmers who have transformed their lives with our proven goat farming program
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                        <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3">
                            <BookOpen className="mr-2 h-5 w-5" />
                            Enroll Now - ₹4,999
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
                            Expert Support
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}