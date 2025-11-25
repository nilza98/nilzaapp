import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-10 border-t border-pink-900/30 text-center">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
        <div className="mb-4">
           <img 
              src="https://i.im.ge/2025/11/25/4UFFlT.Gemini-Generated-Image-exs7cxexs7cxexs7.png" 
              alt="Nilza Alves Logo" 
              className="h-16 w-auto object-contain"
            />
        </div>
        
        <div className="flex justify-center space-x-6 mb-6 mt-2">
          <a 
            href="https://www.instagram.com/nilza_cabeleireira7/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            Instagram
          </a>
        </div>
        <p className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} Nilza Alves. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};