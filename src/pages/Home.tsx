import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Zap, Shield, Headphones } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';

export function Home() {
  const { products, loading } = useProducts();

  return (
    <div className="w-full">

      {/* Hero Section */}
      <section className="relative py-6 flex items-center overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-gold-600/20 rounded-full blur-[120px] mix-blend-screen opacity-30" />
        <div className="absolute bottom-0 -left-1/4 w-[600px] h-[600px] bg-amber-900/40 rounded-full blur-[100px] mix-blend-screen opacity-30" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center space-x-2 px-2 py-0.5 rounded-full bg-zinc-900 border border-gold-500/30 text-gold-400 text-[10px] font-semibold tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
              <span>PREMIUM GADGETS</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-script font-bold leading-tight mb-2">
              Your Trusted <span className="gold-text-gradient">Mobile Partner</span>
            </h1>
            <p className="text-zinc-400 text-xs md:text-sm max-w-lg leading-relaxed">
              Discover a curated collection of luxury smartphones & premium accessories.
            </p>
          </motion.div>
        </div>
      </section>

      {/* All Products */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                All Products
              </h2>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
               {[1, 2, 3, 4, 5, 6].map(n => <div key={n} className="h-[200px] sm:h-[300px] glass-card rounded-2xl animate-pulse bg-zinc-900/50" />)}
             </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      
    </div>
  );
}
