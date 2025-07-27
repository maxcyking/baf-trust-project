'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Smartphone,
    Download,
    Star,
    Users,
    BookOpen,
    Award,
    CheckCircle,
    Play,
    Zap,
    Heart,
    TrendingUp
} from 'lucide-react';

interface AppDownloadSectionProps {
    variant?: 'full' | 'compact' | 'footer';
    className?: string;
}

export function AppDownloadSection({ variant = 'full', className = '' }: AppDownloadSectionProps) {
    const appFeatures = [
        {
            icon: BookOpen,
            title: "Complete Courses",
            description: "Access all training programs offline"
        },
        {
            icon: Users,
            title: "Expert Support",
            description: "24/7 mentor guidance and support"
        },
        {
            icon: Award,
            title: "Certificates",
            description: "Get certified upon course completion"
        },
        {
            icon: TrendingUp,
            title: "Track Progress",
            description: "Monitor your learning journey"
        }
    ];

    if (variant === 'footer') {
        return (
            <div className={`${className}`}>
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 border border-primary/20">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                        <div className="text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start mb-2">
                                <Smartphone className="h-6 w-6 text-primary mr-2" />
                                <h3 className="text-lg font-bold text-foreground">Download Our App</h3>
                            </div>
                            <p className="text-muted-foreground text-sm">
                                Learn agriculture on-the-go with our mobile app
                            </p>
                        </div>
                        <Link
                            href="https://play.google.com/store/apps/details?id=com.nisarindian.classes"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                <Play className="h-4 w-4 mr-2" />
                                Get on Play Store
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'compact') {
        return (
            <section className={`py-16 ${className}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Card className="overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 border-primary/20">
                        <CardContent className="p-8">
                            <div className="grid lg:grid-cols-2 gap-8 items-center">
                                <div>
                                    <div className="flex items-center mb-4">
                                        <Badge className="bg-primary/20 text-primary border-primary/30 px-3 py-1 mr-3">
                                            📱 Mobile App
                                        </Badge>
                                        <div className="flex items-center space-x-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                            <span className="text-sm text-muted-foreground ml-2">4.8 Rating</span>
                                        </div>
                                    </div>

                                    <h2 className="text-3xl font-bold text-foreground mb-4">
                                        Learn Agriculture <span className="text-primary">Anywhere, Anytime</span>
                                    </h2>

                                    <p className="text-muted-foreground mb-6 text-lg">
                                        Download our mobile app and access all training programs, expert guidance,
                                        and agricultural resources right from your smartphone.
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        {appFeatures.map((feature, index) => (
                                            <div key={index} className="flex items-start space-x-3">
                                                <div className="bg-primary/10 rounded-full p-2 flex-shrink-0">
                                                    <feature.icon className="h-4 w-4 text-primary" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-sm text-foreground">{feature.title}</h4>
                                                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <Link
                                        href="https://play.google.com/store/apps/details?id=com.nisarindian.classes"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                            <Play className="h-5 w-5 mr-2" />
                                            Download from Play Store
                                        </Button>
                                    </Link>
                                </div>

                                <div className="relative">
                                    <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-8 text-white shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                                        <div className="text-center">
                                            <Smartphone className="h-16 w-16 mx-auto mb-4 opacity-90" />
                                            <h3 className="text-2xl font-bold mb-4">BAF Trust App</h3>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-center">
                                                    <CheckCircle className="h-5 w-5 mr-2" />
                                                    <span>Offline Learning</span>
                                                </div>
                                                <div className="flex items-center justify-center">
                                                    <CheckCircle className="h-5 w-5 mr-2" />
                                                    <span>Expert Mentorship</span>
                                                </div>
                                                <div className="flex items-center justify-center">
                                                    <CheckCircle className="h-5 w-5 mr-2" />
                                                    <span>Progress Tracking</span>
                                                </div>
                                                <div className="flex items-center justify-center">
                                                    <CheckCircle className="h-5 w-5 mr-2" />
                                                    <span>Community Support</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        );
    }

    // Full variant (default)
    return (
        <section className={`py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center mb-6">
                        <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-2">
                            📱 Mobile Learning Revolution
                        </Badge>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                        Take Your <span className="text-primary">Agricultural Education</span> Mobile
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Download our feature-rich mobile app and transform your smartphone into a powerful
                        agricultural learning companion. Learn from experts, track progress, and grow your farming business.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                    <div>
                        <div className="flex items-center mb-6">
                            <div className="flex items-center space-x-1 mr-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <span className="text-lg font-semibold text-foreground">4.8/5</span>
                            <span className="text-muted-foreground ml-2">(2,500+ Reviews)</span>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                                <div className="text-sm text-muted-foreground">Downloads</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary mb-2">25+</div>
                                <div className="text-sm text-muted-foreground">Courses</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary mb-2">100+</div>
                                <div className="text-sm text-muted-foreground">Expert Videos</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                                <div className="text-sm text-muted-foreground">Support</div>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            {appFeatures.map((feature, index) => (
                                <div key={index} className="flex items-start space-x-4">
                                    <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                                        <feature.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground mb-1">{feature.title}</h3>
                                        <p className="text-muted-foreground">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="https://play.google.com/store/apps/details?id=com.nisarindian.classes"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
                                    <Play className="h-5 w-5 mr-2" />
                                    Get it on Google Play
                                </Button>
                            </Link>
                            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3">
                                <Download className="h-5 w-5 mr-2" />
                                Download APK
                            </Button>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-gradient-to-br from-primary to-accent rounded-3xl p-12 text-white shadow-2xl transform hover:scale-105 transition-transform duration-300">
                            <div className="text-center">
                                <div className="bg-white/20 rounded-full p-6 inline-block mb-6">
                                    <Smartphone className="h-20 w-20 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold mb-6">BAF Trust Mobile App</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-center">
                                        <CheckCircle className="h-6 w-6 mr-3" />
                                        <span className="text-lg">Complete Offline Access</span>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <CheckCircle className="h-6 w-6 mr-3" />
                                        <span className="text-lg">Interactive Video Lessons</span>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <CheckCircle className="h-6 w-6 mr-3" />
                                        <span className="text-lg">Progress Tracking & Analytics</span>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <CheckCircle className="h-6 w-6 mr-3" />
                                        <span className="text-lg">Community & Expert Support</span>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <CheckCircle className="h-6 w-6 mr-3" />
                                        <span className="text-lg">Multilingual Content</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating elements for visual appeal */}
                        <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-3 shadow-lg animate-bounce">
                            <Star className="h-6 w-6 text-white fill-current" />
                        </div>
                        <div className="absolute -bottom-4 -left-4 bg-green-500 rounded-full p-3 shadow-lg animate-pulse">
                            <Heart className="h-6 w-6 text-white fill-current" />
                        </div>
                    </div>
                </div>

                {/* App Screenshots or Additional Info */}
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-foreground mb-8">
                        Join Thousands of Successful Farmers
                    </h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="border-0 bg-card shadow-sm hover:shadow-lg transition-all duration-300">
                            <CardContent className="p-6 text-center">
                                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <Zap className="h-8 w-8 text-blue-600" />
                                </div>
                                <h4 className="font-bold text-foreground mb-2">Fast Learning</h4>
                                <p className="text-muted-foreground text-sm">
                                    Learn at your own pace with bite-sized lessons designed for busy farmers
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-card shadow-sm hover:shadow-lg transition-all duration-300">
                            <CardContent className="p-6 text-center">
                                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <Users className="h-8 w-8 text-green-600" />
                                </div>
                                <h4 className="font-bold text-foreground mb-2">Community Support</h4>
                                <p className="text-muted-foreground text-sm">
                                    Connect with fellow farmers and share experiences in our community
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-card shadow-sm hover:shadow-lg transition-all duration-300">
                            <CardContent className="p-6 text-center">
                                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <Award className="h-8 w-8 text-purple-600" />
                                </div>
                                <h4 className="font-bold text-foreground mb-2">Certified Learning</h4>
                                <p className="text-muted-foreground text-sm">
                                    Earn recognized certificates to boost your agricultural credentials
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}