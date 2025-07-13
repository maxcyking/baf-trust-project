'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { GalleryItem, MediaType, MEDIA_TYPE_LABELS } from '@/types/gallery';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Camera,
  Video,
  Newspaper,
  Search,
  Play,
  Calendar,
  Eye,
  ExternalLink,
  Grid,
  List,
  Star,
  ArrowRight,
  Share2,
  Heart,
  Sparkles
} from 'lucide-react';

export default function MediaGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | MediaType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [imageLoaded, setImageLoaded] = useState<{[key: string]: boolean}>({});
  const [imageError, setImageError] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [items, activeTab, searchQuery]);

  const fetchGalleryItems = async () => {
    try {
      const q = query(
        collection(db, 'gallery'),
        where('isPublished', '==', true),
        orderBy('isFeatured', 'desc'),
        orderBy('order'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const itemsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GalleryItem[];
      setItems(itemsList);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterItems = () => {
    let filtered = items;

    if (activeTab !== 'all') {
      filtered = filtered.filter(item => item.type === activeTab);
    }

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredItems(filtered);
  };



  const getFeaturedItems = () => {
    return items.filter(item => item.isFeatured).slice(0, 6);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleViewItem = (item: GalleryItem) => {
    setSelectedItem(item);
    setShowDialog(true);
  };

  const handleImageLoad = (itemId: string) => {
    setImageLoaded(prev => ({ ...prev, [itemId]: true }));
  };

  const handleImageError = (itemId: string) => {
    setImageError(prev => ({ ...prev, [itemId]: true }));
  };

  const renderMediaPreview = (item: GalleryItem, size: 'small' | 'medium' | 'large' = 'medium') => {
    const sizeClasses = {
      small: 'h-32 w-full',
      medium: 'h-48 w-full',
      large: 'h-64 w-full'
    };

    if (item.type === 'image' && item.imageUrl) {
      return (
        <div className={`${sizeClasses[size]} relative overflow-hidden rounded-lg group cursor-pointer bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900`}
             onClick={() => handleViewItem(item)}>
          
          {/* Loading State */}
          {!imageLoaded[item.id] && !imageError[item.id] && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
            </div>
          )}

          {/* Error State */}
          {imageError[item.id] && (
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 flex items-center justify-center">
              <div className="text-center">
                <Camera className="h-12 w-12 text-red-400 mx-auto mb-2" />
                <p className="text-xs text-red-600 dark:text-red-400">Image not available</p>
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
          
          {/* Overlay with beautiful gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-transparent group-hover:from-black/40 group-hover:via-black/10 transition-all duration-500 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30 shadow-lg">
                <Eye className="h-6 w-6 text-white" />
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

    if (item.type === 'video' && item.thumbnailUrl) {
      return (
        <div className={`${sizeClasses[size]} relative overflow-hidden rounded-lg group cursor-pointer bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900`}
             onClick={() => handleViewItem(item)}>
          
          {/* Loading State */}
          {!imageLoaded[item.id] && !imageError[item.id] && (
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-red-500 border-t-transparent"></div>
            </div>
          )}

          {/* Error State */}
          {imageError[item.id] && (
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 flex items-center justify-center">
              <div className="text-center">
                <Video className="h-12 w-12 text-red-400 mx-auto mb-2" />
                <p className="text-xs text-red-600 dark:text-red-400">Video not available</p>
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
          
          {/* Video Overlay with gradient */}
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
        <div className={`${sizeClasses[size]} relative overflow-hidden rounded-lg group cursor-pointer bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900`}
             onClick={() => handleViewItem(item)}>
          
          {/* Loading State */}
          {!imageLoaded[item.id] && !imageError[item.id] && (
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-500 border-t-transparent"></div>
            </div>
          )}

          {/* Error State */}
          {imageError[item.id] && (
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 flex items-center justify-center">
              <div className="text-center">
                <Newspaper className="h-12 w-12 text-green-400 mx-auto mb-2" />
                <p className="text-xs text-green-600 dark:text-green-400">News image not available</p>
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
          
          {/* News Overlay with beautiful gradient */}
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
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700`}>
        <div className="text-center">
          <Camera className="h-12 w-12 text-slate-400 mx-auto mb-2" />
          <p className="text-xs text-slate-500 dark:text-slate-400">No preview available</p>
        </div>
      </div>
    );
  };

  const featuredItems = getFeaturedItems();

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading media gallery...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-blue-50 to-green-50 dark:from-emerald-900/20 dark:via-blue-900/20 dark:to-green-900/20 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-black/30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-emerald-500 to-blue-600 p-2 rounded-full shadow-lg">
                <Sparkles className="h-8 w-8 text-white animate-pulse" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-700 via-blue-700 to-green-700 bg-clip-text text-transparent mb-6">
              Media & Gallery
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore our collection of agricultural training moments, success stories, and educational content
            </p>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      {featuredItems.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-full shadow-lg">
                  <Star className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
                Featured Content
              </h2>
              <p className="text-muted-foreground text-lg">Highlighted media from our agricultural community</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredItems.map((item, index) => (
                <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up overflow-hidden h-80" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-0 h-full relative cursor-pointer overflow-hidden" onClick={() => handleViewItem(item)}>
                    {/* Full Background Image */}
                    <div className="absolute inset-0 overflow-hidden">
                      {item.type === 'image' && item.imageUrl && (
                        <div className="w-full h-full relative overflow-hidden">
                          {/* Loading State */}
                          {!imageLoaded[item.id] && !imageError[item.id] && (
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/40 dark:to-green-900/40 flex items-center justify-center">
                              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
                            </div>
                          )}

                          {/* Error State */}
                          {imageError[item.id] && (
                            <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/40 dark:to-orange-900/40 flex items-center justify-center">
                              <div className="text-center">
                                <Camera className="h-16 w-16 text-red-400 mx-auto mb-2" />
                                <p className="text-sm text-red-600 dark:text-red-400">Image not available</p>
                              </div>
                            </div>
                          )}

                          {/* Background Image */}
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                              imageLoaded[item.id] ? 'opacity-100' : 'opacity-0'
                            }`}
                            onLoad={() => handleImageLoad(item.id)}
                            onError={() => handleImageError(item.id)}
                            loading="lazy"
                          />
                        </div>
                      )}

                      {item.type === 'video' && item.thumbnailUrl && (
                        <div className="w-full h-full relative overflow-hidden">
                          {/* Loading State */}
                          {!imageLoaded[item.id] && !imageError[item.id] && (
                            <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/40 dark:to-pink-900/40 flex items-center justify-center">
                              <div className="animate-spin rounded-full h-8 w-8 border-2 border-red-500 border-t-transparent"></div>
                            </div>
                          )}

                          {/* Background Image */}
                          <img
                            src={item.thumbnailUrl}
                            alt={item.title}
                            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                              imageLoaded[item.id] ? 'opacity-100' : 'opacity-0'
                            }`}
                            onLoad={() => handleImageLoad(item.id)}
                            onError={() => handleImageError(item.id)}
                            loading="lazy"
                          />
                        </div>
                      )}

                      {item.type === 'news' && item.imageUrl && (
                        <div className="w-full h-full relative overflow-hidden">
                          {/* Loading State */}
                          {!imageLoaded[item.id] && !imageError[item.id] && (
                            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 flex items-center justify-center">
                              <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-500 border-t-transparent"></div>
                            </div>
                          )}

                          {/* Background Image */}
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                              imageLoaded[item.id] ? 'opacity-100' : 'opacity-0'
                            }`}
                            onLoad={() => handleImageLoad(item.id)}
                            onError={() => handleImageError(item.id)}
                            loading="lazy"
                          />
                        </div>
                      )}

                      {/* Fallback for no image */}
                      {!item.imageUrl && !item.thumbnailUrl && (
                        <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center overflow-hidden">
                          <div className="text-center">
                            <Camera className="h-16 w-16 text-slate-400 mx-auto mb-2" />
                            <p className="text-sm text-slate-500 dark:text-slate-400">No preview available</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/90 group-hover:via-black/50 group-hover:to-black/30 transition-all duration-500"></div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                      {/* Top Section - Media Type Badge & Featured */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge className={`text-xs font-medium shadow-lg border-0 ${
                            item.type === 'image' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                            item.type === 'video' ? 'bg-gradient-to-r from-red-500 to-pink-500' :
                            'bg-gradient-to-r from-green-500 to-emerald-500'
                          }`}>
                            {item.type === 'image' && <Camera className="h-3 w-3 mr-1" />}
                            {item.type === 'video' && <Video className="h-3 w-3 mr-1" />}
                            {item.type === 'news' && <Newspaper className="h-3 w-3 mr-1" />}
                            {MEDIA_TYPE_LABELS[item.type]}
                          </Badge>
                          
                          {/* Play Button for Videos */}
                          {item.type === 'video' && (
                            <div className="bg-black/30 backdrop-blur-sm rounded-full p-2 group-hover:bg-black/50 transition-all duration-300">
                              <Play className="h-4 w-4 text-white fill-white" />
                            </div>
                          )}
                        </div>

                        {item.isFeatured && (
                          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg border-0 text-xs">
                            <Star className="h-3 w-3 mr-1 fill-current" />
                            Featured
                          </Badge>
                        )}
                      </div>

                      {/* Bottom Section - Title, Description, Date */}
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-bold text-xl mb-2 line-clamp-2 group-hover:text-yellow-300 transition-colors duration-300">
                            {item.title}
                          </h3>
                          {item.description && (
                            <p className="text-white/90 text-sm line-clamp-2 mb-3">
                              {item.description}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          {item.type === 'news' && item.newsDate && (
                            <span className="flex items-center text-white/80 text-xs">
                              <Calendar className="h-3 w-3 mr-1" />
                              {formatDate(item.newsDate)}
                            </span>
                          )}
                          
                          <div className="flex items-center space-x-2 ml-auto">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 group-hover:bg-white/30 transition-all duration-300">
                              <Eye className="h-4 w-4 text-white" />
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 group-hover:bg-white/30 transition-all duration-300">
                              <ArrowRight className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Gallery Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header and Controls */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-6">All Media</h2>
            
            {/* Tabs and Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
              {/* Tabs */}
              <div className="flex items-center space-x-1 bg-muted p-1 rounded-lg">
                <Button
                  variant={activeTab === 'all' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab('all')}
                  className="text-xs"
                >
                  All Media
                </Button>
                <Button
                  variant={activeTab === 'image' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab('image')}
                  className="text-xs"
                >
                  <Camera className="h-3 w-3 mr-1" />
                  Images
                </Button>
                <Button
                  variant={activeTab === 'video' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab('video')}
                  className="text-xs"
                >
                  <Video className="h-3 w-3 mr-1" />
                  Videos
                </Button>
                <Button
                  variant={activeTab === 'news' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab('news')}
                  className="text-xs"
                >
                  <Newspaper className="h-3 w-3 mr-1" />
                  News
                </Button>
              </div>

              {/* Search and View Controls */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search media..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-64"
                  />
                </div>
                
                <div className="flex items-center space-x-1 bg-muted p-1 rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-3 w-3" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Grid/List */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">No media found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
            }>
              {filteredItems.map((item, index) => (
                viewMode === 'grid' ? (
                  <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up overflow-hidden h-64" style={{ animationDelay: `${index * 50}ms` }}>
                    <CardContent className="p-0 h-full relative cursor-pointer overflow-hidden" onClick={() => handleViewItem(item)}>
                      {/* Full Background Image */}
                      <div className="absolute inset-0 overflow-hidden">
                        {item.type === 'image' && item.imageUrl && (
                          <div className="w-full h-full relative overflow-hidden">
                            {!imageLoaded[item.id] && !imageError[item.id] && (
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/40 dark:to-green-900/40 flex items-center justify-center">
                                <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
                              </div>
                            )}
                            {imageError[item.id] && (
                              <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/40 dark:to-orange-900/40 flex items-center justify-center">
                                <div className="text-center">
                                  <Camera className="h-12 w-12 text-red-400 mx-auto mb-2" />
                                  <p className="text-xs text-red-600 dark:text-red-400">Image not available</p>
                                </div>
                              </div>
                            )}
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                                imageLoaded[item.id] ? 'opacity-100' : 'opacity-0'
                              }`}
                              onLoad={() => handleImageLoad(item.id)}
                              onError={() => handleImageError(item.id)}
                              loading="lazy"
                            />
                          </div>
                        )}

                        {item.type === 'video' && item.thumbnailUrl && (
                          <div className="w-full h-full relative overflow-hidden">
                            {!imageLoaded[item.id] && !imageError[item.id] && (
                              <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/40 dark:to-pink-900/40 flex items-center justify-center">
                                <div className="animate-spin rounded-full h-6 w-6 border-2 border-red-500 border-t-transparent"></div>
                              </div>
                            )}
                            <img
                              src={item.thumbnailUrl}
                              alt={item.title}
                              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                                imageLoaded[item.id] ? 'opacity-100' : 'opacity-0'
                              }`}
                              onLoad={() => handleImageLoad(item.id)}
                              onError={() => handleImageError(item.id)}
                              loading="lazy"
                            />
                          </div>
                        )}

                        {item.type === 'news' && item.imageUrl && (
                          <div className="w-full h-full relative overflow-hidden">
                            {!imageLoaded[item.id] && !imageError[item.id] && (
                              <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 flex items-center justify-center">
                                <div className="animate-spin rounded-full h-6 w-6 border-2 border-green-500 border-t-transparent"></div>
                              </div>
                            )}
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                                imageLoaded[item.id] ? 'opacity-100' : 'opacity-0'
                              }`}
                              onLoad={() => handleImageLoad(item.id)}
                              onError={() => handleImageError(item.id)}
                              loading="lazy"
                            />
                          </div>
                        )}

                        {(!item.imageUrl && !item.thumbnailUrl) && (
                          <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center overflow-hidden">
                            <div className="text-center">
                              <Camera className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                              <p className="text-xs text-slate-500 dark:text-slate-400">No preview available</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/90 group-hover:via-black/40 group-hover:to-black/20 transition-all duration-500"></div>

                      {/* Content Overlay */}
                      <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
                        {/* Top Section - Badge & Featured */}
                        <div className="flex items-start justify-between">
                          <Badge className={`text-xs font-medium shadow-lg border-0 ${
                            item.type === 'image' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                            item.type === 'video' ? 'bg-gradient-to-r from-red-500 to-pink-500' :
                            'bg-gradient-to-r from-green-500 to-emerald-500'
                          }`}>
                            {item.type === 'image' && <Camera className="h-3 w-3 mr-1" />}
                            {item.type === 'video' && <Video className="h-3 w-3 mr-1" />}
                            {item.type === 'news' && <Newspaper className="h-3 w-3 mr-1" />}
                            {MEDIA_TYPE_LABELS[item.type]}
                          </Badge>

                          {item.isFeatured && (
                            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg border-0 text-xs">
                              <Star className="h-3 w-3 mr-1 fill-current" />
                              Featured
                            </Badge>
                          )}
                        </div>

                        {/* Bottom Section - Title & Actions */}
                        <div className="space-y-2">
                          <div>
                            <h3 className="font-bold text-lg mb-1 line-clamp-2 group-hover:text-yellow-300 transition-colors duration-300">
                              {item.title}
                            </h3>
                            {item.description && (
                              <p className="text-white/90 text-sm line-clamp-2 mb-2">
                                {item.description}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            {item.type === 'news' && item.newsDate && (
                              <span className="flex items-center text-white/80 text-xs">
                                <Calendar className="h-3 w-3 mr-1" />
                                {formatDate(item.newsDate)}
                              </span>
                            )}
                            
                            <div className="flex items-center space-x-2 ml-auto">
                              {item.type === 'video' && (
                                <div className="bg-black/30 backdrop-blur-sm rounded-full p-2 group-hover:bg-black/50 transition-all duration-300">
                                  <Play className="h-3 w-3 text-white fill-white" />
                                </div>
                              )}
                              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 group-hover:bg-white/30 transition-all duration-300">
                                <Eye className="h-3 w-3 text-white" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card key={item.id} className="group hover:shadow-md transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 30}ms` }}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-24 h-16">
                          {renderMediaPreview(item, 'small')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                                {item.title}
                              </h3>
                              {item.description && (
                                <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
                                  {item.description}
                                </p>
                              )}
                              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                <Badge variant="outline" className="text-xs">
                                  {MEDIA_TYPE_LABELS[item.type]}
                                </Badge>
                                {item.newsDate && (
                                  <span className="flex items-center">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    {formatDate(item.newsDate)}
                                  </span>
                                )}
                                {item.newsSource && (
                                  <span>{item.newsSource}</span>
                                )}
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleViewItem(item)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Media Detail Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedItem.title}</DialogTitle>
                <DialogDescription>
                  View detailed information about this media item
                </DialogDescription>
              </DialogHeader>
              
              {/* Media badges and info */}
              <div className="flex items-center space-x-4 -mt-2">
                <Badge className="text-xs">
                  {MEDIA_TYPE_LABELS[selectedItem.type]}
                </Badge>
                {selectedItem.isFeatured && (
                  <Badge className="bg-yellow-500 text-white text-xs">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
                {selectedItem.newsDate && (
                  <span className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(selectedItem.newsDate)}
                  </span>
                )}
              </div>
              
              <div className="space-y-6">
                {/* Media Content */}
                <div className="w-full">
                  {selectedItem.type === 'image' && selectedItem.imageUrl && (
                    <div className="relative group">
                      <img
                        src={selectedItem.imageUrl}
                        alt={selectedItem.title}
                        className="w-full h-auto max-h-96 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-transparent rounded-lg"></div>
                    </div>
                  )}
                  
                  {selectedItem.type === 'video' && selectedItem.videoUrl && (
                    <div className="relative w-full rounded-lg overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        src={`https://www.youtube.com/embed/${selectedItem.videoId}`}
                        title={selectedItem.title}
                        className="absolute inset-0 w-full h-full"
                        allowFullScreen
                      />
                    </div>
                  )}
                  
                  {selectedItem.type === 'news' && selectedItem.imageUrl && (
                    <div className="relative group">
                      <img
                        src={selectedItem.imageUrl}
                        alt={selectedItem.title}
                        className="w-full h-auto max-h-96 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-transparent rounded-lg"></div>
                    </div>
                  )}
                </div>

                {/* Description */}
                {selectedItem.description && (
                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-muted-foreground">{selectedItem.description}</p>
                  </div>
                )}

                {/* News Details */}
                {selectedItem.type === 'news' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedItem.newsDate && (
                      <div>
                        <h4 className="font-semibold mb-1">Date</h4>
                        <p className="text-muted-foreground">{formatDate(selectedItem.newsDate)}</p>
                      </div>
                    )}
                    {selectedItem.newsSource && (
                      <div>
                        <h4 className="font-semibold mb-1">Source</h4>
                        <p className="text-muted-foreground">{selectedItem.newsSource}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Tags */}
                {selectedItem.tags && selectedItem.tags.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center space-x-4 pt-4 border-t">
                  {selectedItem.type === 'video' && selectedItem.videoUrl && (
                    <Button
                      variant="outline"
                      onClick={() => window.open(selectedItem.videoUrl, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Watch on YouTube
                    </Button>
                  )}
                  <Button variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline">
                    <Heart className="h-4 w-4 mr-2" />
                    Like
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .bg-grid-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
} 