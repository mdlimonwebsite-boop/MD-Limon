import React from 'react';
import { Eye, Send } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { Product } from '../types';

export function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0f0f11] border border-zinc-800 rounded-xl overflow-hidden group hover:border-gold-500/50 transition-colors duration-300 flex flex-col h-full relative">
      {/* Image Container */}
      <div className="relative aspect-square md:aspect-[4/3] overflow-hidden bg-zinc-900">
        <img
          src={product.images[0] || "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Category Badge overlay */}
        <div className="absolute top-2 left-2 bg-black/90 px-2 py-1 rounded text-[10px] md:text-xs font-bold text-gold-500 uppercase tracking-wider z-10 border border-zinc-800">
          {product.category}
        </div>

        {/* Quick Actions Hover Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            to={`/products/${product.id}`}
             className="h-8 md:h-10 px-4 md:px-6 rounded-full bg-gold-500 text-black font-bold text-sm flex items-center justify-center shadow-lg hover:bg-gold-400 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 gap-2"
          >
            <Eye className="w-4 h-4 md:w-5 md:h-5" /> View
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 md:p-4 flex flex-col flex-grow">
        <h3 className="text-sm md:text-base font-semibold text-white mb-3 line-clamp-1">
          {product.name}
        </h3>
        
        <div className="mt-auto flex flex-col">
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">Price</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-base md:text-lg font-bold text-gold-500">
              ৳{product.discountPrice || product.price}
            </span>
            {product.discountPrice && (
              <span className="text-xs text-zinc-600 line-through">
                ৳{product.price}
              </span>
            )}
          </div>
          
          <button 
            onClick={() => navigate(`/checkout/${product.id}`)}
            className="mt-4 w-full bg-gold-500 hover:bg-gold-400 text-black font-bold py-2 md:py-2.5 rounded flex items-center justify-center gap-2 uppercase text-xs md:text-sm transition-colors"
          >
            <Send className="w-4 h-4" /> Order
          </button>
        </div>
      </div>
    </div>
  );
}

