import React from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { HeroSection } from './components/layout/HeroSection';

export default function App() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
          <HeroSection />
        </main>
      </div>
    </div>
  );
}
