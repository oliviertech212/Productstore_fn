'use client';

import { useGetPublicProductsQuery } from '@/store/services/productsApi';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, ShoppingCart, Package, Star, TrendingUp, Users } from 'lucide-react';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <div className="relative h-[600px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80')"
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Premium Products For Everyone
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Discover quality products at unbeatable prices with fast delivery
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-feli-green hover:bg-feli-dark-green text-white px-8 py-4 text-lg">
              Shop Now
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
              Learn More
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-feli-yellow">1000+</div>
              <div className="text-gray-400">Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-feli-yellow">50+</div>
              <div className="text-gray-400">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-feli-yellow">5000+</div>
              <div className="text-gray-400">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureSection = () => {
  const features = [
    {
      icon: Package,
      title: 'Quality Products',
      description: 'Carefully curated products from trusted suppliers'
    },
    {
      icon: TrendingUp,
      title: 'Best Prices',
      description: 'Competitive pricing with regular discounts and offers'
    },
    {
      icon: Users,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your needs'
    },
    {
      icon: Star,
      title: 'Top Rated',
      description: 'Highly rated by thousands of satisfied customers'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">We're committed to providing the best shopping experience with quality products and exceptional service.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="bg-feli-green p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default function HomePage() {
  const { data, isLoading } = useGetPublicProductsQuery({ page: 1, limit: 8 });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-feli-green rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">ProductStore Store</h1>
            </div>
            <div className="flex gap-4">
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-feli-green hover:bg-feli-dark-green">Register</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20">
        <HeroSection />
        <FeatureSection />

        {/* Products Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600">Discover our most popular products</p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
                  <div className="bg-gray-200 h-48 rounded mb-4"></div>
                  <div className="bg-gray-200 h-4 rounded mb-2"></div>
                  <div className="bg-gray-200 h-4 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data?.data?.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 group">
                  <div className="relative h-48 bg-gray-100 rounded-t-lg overflow-hidden">
                    {product.thumbnail ? (
                      <Image
                        src={product.thumbnail}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <Package className="w-12 h-12" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h4>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.shortDescription}</p>
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <span className="text-2xl font-bold text-feli-green">${product.price}</span>
                        {product.compareAtPrice && (
                          <span className="text-sm text-gray-400 line-through ml-2">
                            ${product.compareAtPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button className="w-full bg-feli-green hover:bg-feli-dark-green" size="sm">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-feli-green rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">ProductStore Store</span>
              </div>
              <p className="text-gray-400">Your trusted partner for quality products and exceptional service.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-feli-green">Home</Link></li>
                <li><Link href="/products" className="hover:text-feli-green">Products</Link></li>
                <li><Link href="/about" className="hover:text-feli-green">About</Link></li>
                <li><Link href="/contact" className="hover:text-feli-green">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-feli-green">Help Center</Link></li>
                <li><Link href="/shipping" className="hover:text-feli-green">Shipping Info</Link></li>
               
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <p>Email: support@ProductStore.com</p>
               
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy;  All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
