'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Smartphone, Play } from 'lucide-react';

interface AppDownloadSectionProps {
  variant?: 'full' | 'compact' | 'footer';
  className?: string;
}

export function AppDownloadSectionNew({ variant = 'full', className = '' }: AppDownloadSectionProps) {
  if (variant === 'compact') {
    return (
      <section className={`py-16 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Download Our Mobile App
            </h2>
            <p className="text-muted-foreground mb-6">
              Learn agriculture on-the-go with our mobile app
            </p>
            <Link 
              href="https://play.google.com/store/apps/details?id=com.nisarindian.classes"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Play className="h-4 w-4 mr-2" />
                Download from Play Store
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Download Our Mobile App
          </h2>
          <p className="text-muted-foreground mb-6">
            Learn agriculture on-the-go with our mobile app
          </p>
          <Link 
            href="https://play.google.com/store/apps/details?id=com.nisarindian.classes"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Play className="h-4 w-4 mr-2" />
              Download from Play Store
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}