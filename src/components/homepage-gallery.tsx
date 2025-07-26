'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { GalleryItem } from '@/types/gallery';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  Camera,
  Video,
  Newspaper,
  Play,
  Calendar,
  Eye,
  ExternalLink,
  Star,
  Loader2
} from 'lucide-react';

export function HomepageGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState<{[key: string]: boolean}>({});
  const [imageError, setImageError] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    fetchHomepageGalleryItems();
  }, []);

  const fetchHomepageGalleryItems = async () => {
    try {
      const q = query(
        collection(db, 'gallery'),
        where('isPublished', '==', true),
        where('isHomepage', '==', true),
        orderBy('isFeatured', 'desc'),
        orderBy('order'),
        orderBy('createdAt', 'desc'),
        limit(6)
      );
      const querySnapshot = await getDocs(q);
      const itemsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GalleryItem[];
      setItems(itemsList);
    } catch (error) {
      console.error('Error fetching homepage gallery items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageLoad = (itemId: string) => {
    setImageLoaded(prev => ({ ...prev, [itemId]: true }));
  };

  const handleImageError = (itemId: string) => {
    setImageError(prev => ({ ...prev, [itemId]: true }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderMediaPreview = (item: GalleryItem) => {
    if (item.type === 'image' && item.imageUrl) {
      return (
        <div className="relative aspect-[4/3] overflow-hidden group cursor-pointer">
          {/* Loading State */}
          {!imageLoaded[item.id] && !imageError[item.id] && (
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/40 dark:to-blue-900/40 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {/* Error State */}
          {imageError[item.id] && (
            <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/40 dark:to-orange-900/40 flex items-center justify-center">
              <div className="text-center">
                <Camera className="h-16 w-16 text-red-400 mx-auto mb-4 opacity-80" />
                <h3 className="text-xl font-semibold mb-2 text-red-600">Image Preview</h3>
                <p className="text-sm opacity-90 text-red-500">Image not available</p>
              </div>
            </div>
          )}

          {/* Image */}
          <img
            src={item.imageUrl}
            alt={item.title}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded[item.id] ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => handleImageLoad(item.id)}
            onError={() => handleImageError(item.id)}
            loading="lazy"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30 shadow-lg">
              <Eye className="h-6 w-6 text-white" />
            </div>
          </div>

          {/* Featured Badge */}
          {item.isFeatured && (
            <div className="absolute top-3 right-3 z-10">
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg border-0">
                <Star className="h-3 w-3 mr-1 fill-current" />
                Featured
              </Badge>
            </div>
          )}
        </div>
      );
    }

    if (item.type === 'video' && item.thumbnailUrl) {
      return (
        <div className="relative aspect-[4/3] overflow-hidden group cursor-pointer">
          {/* Loading State */}
          {!imageLoaded[item.id] && !imageError[item.id] && (
            <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/40 dark:to-pink-900/40 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-red-500" />
            </div>
          )}

          {/* Error State */}
          {imageError[item.id] && (
            <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/40 dark:to-pink-900/40 flex items-center justify-center">
              <div className="text-center">
                <Video className="h-16 w-16 text-red-400 mx-auto mb-4 opacity-80" />
                <h3 className="text-xl font-semibold mb-2 text-red-600">Video Preview</h3>
                <p className="text-sm opacity-90 text-red-500">Video not available</p>
              </div>
            </div>
          )}

          {/* Video Thumbnail */}
          <img
            src={item.thumbnailUrl}
            alt={item.title}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded[item.id] ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => handleImageLoad(item.id)}
            onError={() => handleImageError(item.id)}
            loading="lazy"
          />
          
          {/* Video Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 group-hover:via-black/30 transition-all duration-500 flex items-center justify-center">
            <div className="transform scale-95 group-hover:scale-100 transition-all duration-300">
              <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-full p-4 shadow-2xl border border-red-500/30">
                <Play className="h-8 w-8 text-white fill-white ml-1" />
              </div>
            </div>
          </div>

          {/* Featured Badge */}
          {item.isFeatured && (
            <div className="absolute top-3 right-3 z-10">
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg border-0">
                <Star className="h-3 w-3 mr-1 fill-current" />
                Featured
              </Badge>
            </div>
          )}
        </div>
      );
    }

    if (item.type === 'news' && item.imageUrl) {
      return (
        <div className="relative aspect-[4/3] overflow-hidden group cursor-pointer">
          {/* Loading State */}
          {!imageLoaded[item.id] && !imageError[item.id] && (
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-green-500" />
            </div>
          )}

          {/* Error State */}
          {imageError[item.id] && (
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 flex items-center justify-center">
              <div className="text-center">
                <Newspaper className="h-16 w-16 text-green-400 mx-auto mb-4 opacity-80" />
                <h3 className="text-xl font-semibold mb-2 text-green-600">News Preview</h3>
                <p className="text-sm opacity-90 text-green-500">News image not available</p>
              </div>
            </div>
          )}

          {/* News Image */}
          <img
            src={item.imageUrl}
            alt={item.title}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded[item.id] ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => handleImageLoad(item.id)}
            onError={() => handleImageError(item.id)}
            loading="lazy"
          />
          
          {/* News Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 group-hover:via-black/40 transition-all duration-500">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white mb-2 shadow-lg border-0">
                <Newspaper className="h-3 w-3 mr-1" />
                News
              </Badge>
              {item.newsDate && (
                <p className="text-white text-xs opacity-90 font-medium">
                  {formatDate(item.newsDate)}
                </p>
              )}
            </div>
          </div>

          {/* Featured Badge */}
          {item.isFeatured && (
            <div className="absolute top-3 right-3 z-10">
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg border-0">
                <Star className="h-3 w-3 mr-1 fill-current" />
                Featured
              </Badge>
            </div>
          )}
        </div>
      );
    }

    // Fallback for no image
    return (
      <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center overflow-hidden">
        <div className="text-center">
          <Camera className="h-16 w-16 text-slate-400 mx-auto mb-4 opacity-80" />
          <h3 className="text-xl font-semibold mb-2 text-slate-600">Media Preview</h3>
          <p className="text-sm opacity-90 text-slate-500">No preview available</p>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              📸 Agricultural Gallery
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our training facilities, farming activities, and success stories through visual documentation
            </p>
          </div>
          
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Loading gallery...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              📸 Agricultural Gallery
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our training facilities, farming activities, and success stories through visual documentation
            </p>
          </div>
          
          <div className="text-center py-16">
            <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">Gallery Coming Soon</h3>
            <p className="text-muted-foreground">We&apos;re preparing amazing content for you!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            📸 Agricultural Gallery
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our training facilities, farming activities, and success stories through visual documentation
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <Card key={item.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              {renderMediaPreview(item)}
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={`text-xs font-medium ${
                    item.type === 'image' ? 'bg-blue-100 text-blue-800' :
                    item.type === 'video' ? 'bg-red-100 text-red-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {item.type === 'image' && <Camera className="h-3 w-3 mr-1" />}
                    {item.type === 'video' && <Video className="h-3 w-3 mr-1" />}
                    {item.type === 'news' && <Newspaper className="h-3 w-3 mr-1" />}
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </Badge>
                  {item.type === 'news' && item.newsDate && (
                    <span className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(item.newsDate)}
                    </span>
                  )}
                </div>
                
                <h4 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h4>
                
                {item.description && (
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {item.description}
                  </p>
                )}

                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.slice(0, 2).map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {item.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{item.tags.length - 2} more
                      </Badge>
                    )}
                  </div>
                )}
                
                <Button size="sm" variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/media-gallery">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <ExternalLink className="mr-2 h-5 w-5" />
              View Complete Gallery
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}