import React from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { AboutSection, EmotionalSection, ContactSection } from './components/InfoSections';
import { VirtualStylist } from './components/VirtualStylist';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-dark text-gray-100 selection:bg-brand-accent selection:text-white">
      <Navigation />
      
      <main>
        <Hero />
        <AboutSection />
        <EmotionalSection />
        <VirtualStylist />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default App;
