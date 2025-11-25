import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      // Ajuste para o cabeçalho fixo
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Sobre', href: '#about' },
    { name: 'Nossa Filosofia', href: '#emotional' },
    { name: 'Estilista Virtual', href: '#stylist' },
    { name: 'Contato', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass-panel py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a 
              href="#home" 
              onClick={(e) => handleScrollToSection(e, '#home')}
              className="flex items-center gap-3 text-brand-accent hover:text-pink-400 transition-colors"
            >
              <img 
                src="https://i.im.ge/2025/11/25/4UFFlT.Gemini-Generated-Image-exs7cxexs7cxexs7.png" 
                alt="Nilza Alves Logo" 
                className="h-10 w-auto object-contain"
              />
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollToSection(e, link.href)}
                className="text-gray-300 hover:text-brand-accent transition-colors text-sm uppercase tracking-widest font-medium cursor-pointer"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="https://wa.me/5548999553603" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-accent hover:bg-pink-500 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-all"
            >
              WhatsApp
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none p-2"
              aria-label="Menu Principal"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-panel absolute w-full border-t border-pink-900/30 shadow-xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollToSection(e, link.href)}
                className="block px-3 py-4 rounded-md text-base font-medium text-gray-300 hover:text-brand-accent hover:bg-brand-base border-b border-pink-900/10 cursor-pointer"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 px-3 pb-2">
              <a 
                href="https://wa.me/5548999553603"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-3 py-3 rounded-md text-base font-medium text-white bg-brand-accent hover:bg-pink-600 shadow-lg"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};