import React from 'react';
import { Heart, Phone, MapPin, MessageCircle, Home, Clock, Scissors } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-brand-base text-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Foto centralizada acima da seção */}
        <div className="flex justify-center mb-12">
             <div className="relative w-64 h-80 md:w-80 md:h-96 transform hover:scale-105 transition-transform duration-500 group">
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-brand-accent/50 rounded-2xl transition-all group-hover:-top-6 group-hover:-left-6"></div>
                <div className="absolute -bottom-4 -right-4 w-full h-full bg-brand-light/30 rounded-2xl -z-10 transition-all group-hover:-bottom-6 group-hover:-right-6"></div>
                <img 
                  src="/nilza.jpg" 
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1584687353967-59637dd5192b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
                    e.currentTarget.parentElement?.setAttribute('title', 'Salve sua foto como nilza.jpg na pasta public');
                  }}
                  alt="Nilza Alves" 
                  className="w-full h-full object-cover rounded-2xl shadow-2xl border-2 border-pink-500/20"
                />
             </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">Nilza Alves</h2>
          <p className="text-brand-accent font-medium text-xl tracking-widest uppercase mb-8">Personal Stylist & Home Care</p>
          
          <div className="space-y-6 text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            <p>
              Olá! Sou a Nilza. Com anos de experiência dedicados à beleza feminina, decidi revolucionar a forma como cuido de minhas clientes.
              Entendo que seu tempo é precioso e seu conforto é inegociável.
            </p>
            <p>
              Por isso, <strong>eu vou até você</strong>. Esqueça o trânsito, a espera em recepções ou o barulho de salões lotados.
              Meu atendimento é exclusivo, personalizado e realizado no ambiente onde você se sente mais à vontade: sua casa.
            </p>
            <p>
               Especialista em texturas, cortes modernos e coloração para mulheres maduras, levo todos os equipamentos profissionais necessários
               para garantir um resultado de salão, com a exclusividade de um atendimento particular.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-brand-dark/30 p-6 rounded-xl border border-pink-900/20 text-center hover:bg-brand-dark/50 transition-colors">
             <Home className="text-brand-accent h-8 w-8 mx-auto mb-4" />
             <h3 className="text-white font-bold mb-2">No Seu Conforto</h3>
             <p className="text-gray-400 text-sm">Atendimento completo na segurança do seu lar.</p>
          </div>
          <div className="bg-brand-dark/30 p-6 rounded-xl border border-pink-900/20 text-center hover:bg-brand-dark/50 transition-colors">
             <Scissors className="text-brand-accent h-8 w-8 mx-auto mb-4" />
             <h3 className="text-white font-bold mb-2">Material Profissional</h3>
             <p className="text-gray-400 text-sm">Levo lavatório portátil, toalhas e produtos premium.</p>
          </div>
          <div className="bg-brand-dark/30 p-6 rounded-xl border border-pink-900/20 text-center hover:bg-brand-dark/50 transition-colors">
             <Clock className="text-brand-accent h-8 w-8 mx-auto mb-4" />
             <h3 className="text-white font-bold mb-2">Horário Flexível</h3>
             <p className="text-gray-400 text-sm">Agenda adaptada à sua rotina e conveniência.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const EmotionalSection: React.FC = () => {
  return (
    <section id="emotional" className="py-24 bg-brand-dark relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-pink-900/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <Heart className="h-12 w-12 text-brand-accent mx-auto mb-8 animate-pulse" />
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8">
          "Sua beleza, suas regras, seu espaço."
        </h2>
        <p className="text-xl md:text-2xl text-pink-100/90 leading-relaxed font-light italic mb-12">
          Você passou anos cuidando dos outros. Agora, permita-se ser cuidada sem sair do seu santuário.
          Seu cabelo conta sua história — de sabedoria e elegância. 
          Deixe-me realçar sua melhor versão com toda a comodidade que você merece.
        </p>
        <div className="h-1 w-24 bg-brand-accent mx-auto rounded-full"></div>
      </div>
    </section>
  );
};

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-brand-base to-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Agende Sua Visita</h2>
          <p className="text-gray-400">Eu vou até você.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Contact Info */}
          <div className="glass-panel p-8 rounded-xl text-center hover:transform hover:-translate-y-1 transition-all duration-300">
            <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone className="h-8 w-8 text-pink-300" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Fale Comigo</h3>
            <p className="text-gray-300 mb-1">+55 (11) 91234-5678</p>
            <p className="text-gray-300">contato@nilzaalves.com.br</p>
            <div className="mt-6">
              <button className="bg-transparent border border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white px-6 py-2 rounded-full transition-colors text-sm font-bold uppercase tracking-wide">
                Ligar Agora
              </button>
            </div>
          </div>

          {/* Card 2: Location Service Area */}
          <div className="glass-panel p-8 rounded-xl text-center hover:transform hover:-translate-y-1 transition-all duration-300">
            <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="h-8 w-8 text-pink-300" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Área de Atendimento</h3>
            <p className="text-gray-300 mb-1">São Paulo Capital</p>
            <p className="text-gray-300">e Grande ABC</p>
            <div className="mt-6">
              <span className="inline-block px-4 py-2 bg-pink-900/30 rounded-lg text-pink-200 text-sm">
                Consulte taxa de deslocamento
              </span>
            </div>
          </div>

           {/* Card 3: WhatsApp */}
           <div className="glass-panel p-8 rounded-xl text-center hover:transform hover:-translate-y-1 transition-all duration-300 border-green-900/50">
            <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-700">
              <MessageCircle className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Agendamento Rápido</h3>
            <p className="text-gray-300 mb-4">Combine o melhor horário pelo WhatsApp.</p>
            <div className="mt-2">
              <a 
                href="https://wa.me/1234567890"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-full transition-colors font-bold shadow-lg shadow-green-900/50"
              >
                <MessageCircle className="h-5 w-5" />
                Chamar no Zap
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};