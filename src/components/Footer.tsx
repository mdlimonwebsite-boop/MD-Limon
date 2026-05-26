import React from 'react';

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-zinc-500 text-xs text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Trusted Mobile Care. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 text-zinc-500 text-xs">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
