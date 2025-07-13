"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Menu, 
  X, 
  Leaf
} from 'lucide-react';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground rounded-full p-2">
              <Leaf className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-primary">BAF Trust</span>
              <span className="text-xs text-muted-foreground hidden sm:block">
                Bharat Agro Foundation
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              About Us
            </Link>
            <Link
              href="/training-programs"
              className="text-foreground hover:text-primary transition-colors font-medium flex items-center space-x-1"
            >
                <span>Training Programs</span>
                <Badge variant="secondary" className="ml-1 bg-accent text-accent-foreground">
                  Popular
                </Badge>
                  </Link>
                  <Link
              href="/media-gallery"
              className="text-foreground hover:text-primary transition-colors font-medium"
                  >
              Media & Gallery
                  </Link>
                  <Link
              href="/team"
              className="text-foreground hover:text-primary transition-colors font-medium"
                  >
              Our Team
                  </Link>
            <Link
              href="/contact"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Contact
            </Link>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <BookOpen className="h-4 w-4 mr-2" />
              Enroll Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="text-foreground"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                onClick={toggleMenu}
              >
                About Us
              </Link>
                  <Link
                href="/training-programs"
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                    onClick={toggleMenu}
                  >
                Training Programs
                  </Link>
                  <Link
                href="/media-gallery"
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                    onClick={toggleMenu}
                  >
                Media & Gallery
                  </Link>
                  <Link
                href="/team"
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                    onClick={toggleMenu}
                  >
                Our Team
                  </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                onClick={toggleMenu}
              >
                Contact
              </Link>
              <div className="px-3 py-2">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Enroll Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 