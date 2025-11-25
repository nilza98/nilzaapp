import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-10 border-t border-pink-900/30 text-center">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-brand-accent font-serif text-2xl font-bold mb-4">Nilza Alves</p>
        <div className="flex justify-center space-x-6 mb-6">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Pinterest</a>
        </div>
        <p className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} Nilza Alves. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};