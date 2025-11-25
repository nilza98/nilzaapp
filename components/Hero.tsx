import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1574722772633-e401c59da317?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay strengthened for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/90 via-brand-base/70 to-brand-dark"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-10">
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-accent/20 border border-pink-500/40 backdrop-blur-md mb-8 animate-fade-in hover:bg-brand-accent/30 transition-colors cursor-default">
           <Sparkles className="w-5 h-5 text-pink-300" />
           <span className="text-pink-100 text-sm md:text-base font-semibold uppercase tracking-widest">Atendimento Vip a Domicílio</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 animate-fade-in-up leading-tight drop-shadow-2xl">
          Nilza Alves <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-brand-accent">Cabeleireira a Domicílio</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-200 mb-12 font-light tracking-wide max-w-3xl mx-auto leading-relaxed drop-shadow-md">
          Especialista em realçar a beleza da mulher madura.
          Levamos o salão completo até o conforto do seu lar, com elegância e segurança.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a
            href="#stylist"
            onClick={(e) => scrollToSection(e, 'stylist')}
            className="w-full sm:w-auto px-10 py-4 bg-brand-accent hover:bg-pink-500 text-white text-lg font-bold rounded-full transition-all shadow-lg shadow-pink-900/60 hover:scale-105 hover:shadow-pink-500/40 cursor-pointer"
          >
            Simular Novo Visual
          </a>
          <a
            href="https://wa.me/5548999553603"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-10 py-4 border-2 border-pink-400/50 text-pink-100 hover:bg-pink-900/30 hover:border-pink-400 rounded-full text-lg font-semibold transition-all hover:scale-105 backdrop-blur-sm"
          >
            Agendar Visita
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-brand-accent opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
        <a href="#about" onClick={(e) => scrollToSection(e, 'about')}><ArrowDown className="h-10 w-10" /></a>
      </div>
    </div>
  );
};