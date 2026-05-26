import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Smartphone, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Admin', path: '/admin' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-zinc-950/80 backdrop-blur-lg border-b border-white/5 py-4 shadow-lg'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            {/* Custom SVG Logo (Golden, Black, White) */}
            <div className="relative flex items-center justify-center w-12 h-12 bg-black rounded-full border border-gold-500/50 shadow-[0_0_15px_rgba(212,175,55,0.2)] group-hover:border-gold-400 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all overflow-hidden shrink-0">
              {/* Inner subtle glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/20 to-transparent"></div>
              
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 relative z-10 transition-transform group-hover:scale-105 duration-300">
                {/* Smartphone base - White */}
                <rect x="5" y="2" width="14" height="20" rx="3" stroke="white" strokeWidth="1.5" />
                {/* Golden elements */}
                {/* Top speaker/camera */}
                <path d="M10 4.5H14" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
                {/* Home button / Bottom accent */}
                <circle cx="12" cy="19.5" r="1.5" fill="#D4AF37" />
                {/* Signal waves (Golden) */}
                <path d="M8.5 11C8.5 11 10.5 9.5 12 9.5C13.5 9.5 15.5 11 15.5 11" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M6.5 8C6.5 8 9.5 6 12 6C14.5 6 17.5 8 17.5 8" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
                {/* Connectivity dots */}
                <circle cx="12" cy="14" r="1.5" fill="white" />
                <circle cx="9" cy="15.5" r="1" fill="#D4AF37" opacity="0.7" />
                <circle cx="15" cy="15.5" r="1" fill="#D4AF37" opacity="0.7" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-script font-bold text-2xl tracking-normal leading-none gold-text-gradient">
                Limon Telecom
              </span>
              <span className="text-[10px] tracking-widest text-zinc-400 uppercase mt-1">Premium Retailer</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-gold-400 ${
                  location.pathname === link.path ? 'text-gold-500' : 'text-zinc-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            <Link to="/admin" className="hidden md:flex p-2 group">
              <User className="h-5 w-5 text-zinc-300 group-hover:text-gold-400 transition-colors" />
            </Link>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-zinc-950 px-4 pt-2 pb-6 space-y-1"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-3 rounded-md text-base font-medium ${
                  location.pathname === link.path
                    ? 'bg-zinc-900 text-gold-500'
                    : 'text-zinc-300 hover:bg-zinc-900/50 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
