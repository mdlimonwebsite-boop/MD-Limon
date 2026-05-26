import React from 'react';
import { Outlet } from 'react-router';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Phone as WhatsappIcon, MessageCircle as MessengerIcon } from 'lucide-react';

export function Layout() {
  return (
    <div className="flex flex-col min-h-[100dvh] overflow-x-hidden w-full bg-zinc-950 text-zinc-50 font-sans relative">
      <Navbar />
      <main className="flex-grow pt-16 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
