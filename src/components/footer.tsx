'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Leaf,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ExternalLink,
  Smartphone,
  Play
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* App Download Section */}
        <div className="py-12">
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

        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-primary text-primary-foreground rounded-full p-2">
                <Leaf className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-primary">BAF Trust</span>
                <span className="text-xs text-muted-foreground">
                  Bharat Agro Foundation
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm">
              Empowering farmers across India with modern agricultural techniques and comprehensive training programs.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <div className="h-5 w-5 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">f</div>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <div className="h-5 w-5 bg-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">t</div>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <div className="h-5 w-5 bg-pink-500 rounded flex items-center justify-center text-white text-xs font-bold">i</div>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <div className="h-5 w-5 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">y</div>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/training-programs" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Training Programs
                </Link>
              </li>
              <li>
                <Link href="/media-gallery" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Media & Gallery
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Training Programs */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Training Programs</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/programs/goat-farming" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Goat Farming
                </Link>
              </li>
              <li>
                <Link href="/programs/poultry-farming" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Poultry Farming
                </Link>
              </li>
              <li>
                <Link href="/programs/sheep-farming" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Sheep Farming
                </Link>
              </li>
              <li>
                <Link href="/programs/organic-farming" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Organic Farming
                </Link>
              </li>
              <li>
                <Link href="/programs/crop-management" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Crop Management
                </Link>
              </li>
              <li>
                <Link href="/programs/dairy-farming" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Dairy Farming
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <p>निसार इंडियन गोट ब्रीडिंग फार्म</p>
                  <p>मोड़ावासी, राजगढ़ (चूरू)</p>
                  <p>राजस्थान 331023</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MessageCircle className="h-4 w-4 text-primary flex-shrink-0" />
                <Link
                  href="https://wa.me/918079043733"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  WhatsApp: 80790-43733
                </Link>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">+91-80790-43733</span>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <Link
                  href="mailto:info@baftrust.org"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  info@baftrust.org
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              <p>© 2024 BAF Trust - Bharat Agro Foundation. All rights reserved.</p>
              <p className="text-xs mt-1">NITI Aayog Registered: RJ/2024/0454178</p>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link
                href="https://play.google.com/store/apps/details?id=com.nisarindian.classes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors flex items-center"
              >
                Download App
                <ExternalLink className="h-3 w-3 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}