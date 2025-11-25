import React, { useState, useRef } from 'react';
import { Upload, RefreshCw, Wand2, Download, AlertCircle, ChevronRight, ArrowRight, Edit3 } from 'lucide-react';
import { generateHairstyle } from '../services/geminiService';
import { GeneratedImage, HairstyleType } from '../types';

export const VirtualStylist: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // State for style selection
  const [selectedStyle, setSelectedStyle] = useState<string>(HairstyleType.PIXIE);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("O arquivo é muito grande. Por favor, envie uma imagem com menos de 5MB.");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setGeneratedImages([]); // Reset previous generations
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStyleSelect = (style: string) => {
    setIsCustomMode(false);
    setSelectedStyle(style);
    setError(null);
  };

  const handleCustomModeSelect = () => {
    setIsCustomMode(true);
    setSelectedStyle('custom'); // Just a flag
    setError(null);
  };

  const handleGenerate = async () => {
    if (!selectedImage) return;

    // Determine final prompt
    let styleToGenerate = selectedStyle;
    if (isCustomMode) {
        if (!customPrompt.trim()) {
            setError("Por favor, descreva o estilo que você deseja.");
            return;
        }
        styleToGenerate = customPrompt;
    }

    setLoading(true);
    setError(null);

    try {
      const generatedUrl = await generateHairstyle(selectedImage, styleToGenerate);
      
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        url: generatedUrl,
        styleName: isCustomMode ? "Estilo Personalizado" : selectedStyle,
      };

      // Add new image to the BEGINNING of the array so it appears first on the left
      setGeneratedImages(prev => [newImage, ...prev]);
    } catch (err: any) {
      setError(err.message || "Falha ao gerar o penteado. Por favor, tente uma foto ou estilo diferente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="stylist" className="py-20 relative bg-brand-dark">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-light/20 via-brand-dark to-brand-dark pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">Sua Estilista Virtual</h2>
          <p className="text-pink-200/80 text-lg max-w-2xl mx-auto">
            Em dúvida sobre um novo visual? Envie uma foto e escolha um estilo ou descreva exatamente como você imagina.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls & Upload Column (Left side - takes 4 columns) */}
          <div className="lg:col-span-4 glass-panel p-6 md:p-8 rounded-2xl h-fit">
            <h3 className="text-xl font-serif text-pink-100 mb-4">1. Envie Sua Foto</h3>
            
            <div 
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer mb-6
                ${selectedImage ? 'border-brand-accent bg-brand-base/50' : 'border-gray-600 hover:border-brand-accent hover:bg-brand-base/30'}`}
              onClick={() => fileInputRef.current?.click()}
            >
              {selectedImage ? (
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg mx-auto max-h-64 object-contain flex justify-center bg-black/50">
                   <img src={selectedImage} alt="Enviada" className="h-full object-contain" />
                </div>
              ) : (
                <div className="py-8 flex flex-col items-center">
                  <Upload className="h-10 w-10 text-pink-400 mb-3" />
                  <p className="text-base font-medium text-gray-300">Clique para enviar foto</p>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG até 5MB</p>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
                accept="image/*"
              />
            </div>

            <h3 className="text-xl font-serif text-pink-100 mb-4">2. Escolha ou Descreva</h3>
            <div className="flex flex-col gap-2 mb-6">
              {Object.values(HairstyleType).map((style) => (
                <button
                  key={style}
                  onClick={() => handleStyleSelect(style)}
                  className={`px-4 py-3 rounded-lg text-left text-sm font-medium transition-all flex justify-between items-center
                    ${!isCustomMode && selectedStyle === style 
                      ? 'bg-brand-accent text-white shadow-lg shadow-pink-900/50' 
                      : 'bg-brand-base text-gray-300 hover:bg-brand-light'}`}
                >
                  {style}
                  {!isCustomMode && selectedStyle === style && <ChevronRight className="h-4 w-4" />}
                </button>
              ))}
              
              {/* Botão para modo personalizado */}
              <button
                onClick={handleCustomModeSelect}
                className={`px-4 py-3 rounded-lg text-left text-sm font-medium transition-all flex justify-between items-center
                    ${isCustomMode 
                      ? 'bg-brand-accent text-white shadow-lg shadow-pink-900/50' 
                      : 'bg-brand-base text-gray-300 hover:bg-brand-light border border-pink-500/30'}`}
              >
                 <span className="flex items-center gap-2">
                    <Edit3 className="h-4 w-4" />
                    Outro / Descrever meu estilo
                 </span>
                 {isCustomMode && <ChevronRight className="h-4 w-4" />}
              </button>

              {/* Campo de texto para descrição personalizada */}
              {isCustomMode && (
                <div className="mt-2 animate-fade-in">
                    <label className="block text-xs text-pink-300 mb-1 ml-1">Descreva como você quer o cabelo:</label>
                    <textarea
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        placeholder="Ex: Curto na nuca, com franja longa lateral, cor castanho iluminado e bastante volume..."
                        className="w-full bg-black/40 border border-brand-accent/50 rounded-lg p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent resize-none h-24"
                    />
                </div>
              )}
            </div>

            <button
              onClick={handleGenerate}
              disabled={!selectedImage || loading}
              className={`w-full py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-2 transition-all
                ${!selectedImage || loading
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-600 to-brand-accent text-white hover:from-pink-500 hover:to-pink-600 shadow-xl shadow-pink-900/40 hover:scale-[1.02]'}`}
            >
              {loading ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  Estilizando...
                </>
              ) : (
                <>
                  <Wand2 className="h-5 w-5" />
                  Gerar Visual
                </>
              )}
            </button>
            
            {error && (
              <div className="mt-4 p-3 bg-red-900/30 border border-red-800 rounded-lg flex items-start gap-3 text-red-200">
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <p className="text-xs">{error}</p>
              </div>
            )}
          </div>

          {/* Results Column (Right side - takes 8 columns) */}
          <div className="lg:col-span-8 flex flex-col min-w-0 overflow-hidden">
            <h3 className="text-2xl font-serif text-pink-100 mb-6 flex justify-between items-center">
              <span>3. Seus Resultados</span>
              {generatedImages.length > 0 && (
                <span className="text-sm text-pink-400 font-sans flex items-center gap-1">
                  <ArrowRight className="w-4 h-4" /> Role para ver mais
                </span>
              )}
            </h3>
            
            <div className="glass-panel rounded-2xl p-6 min-h-[500px] flex flex-col justify-center relative">
              {generatedImages.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-gray-500 opacity-60 py-12">
                  <Wand2 className="h-20 w-20 mb-6" />
                  <p className="text-xl font-light">Os estilos gerados aparecerão aqui.</p>
                  <p className="text-sm mt-2">Eles serão exibidos lado a lado para fácil comparação.</p>
                </div>
              ) : (
                <div className="w-full overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-brand-accent scrollbar-track-brand-dark/30">
                  <div className="flex gap-6 px-2 min-w-max">
                    {generatedImages.map((img) => (
                      <div 
                        key={img.id} 
                        className="w-[300px] md:w-[360px] flex-shrink-0 animate-fade-in group relative rounded-xl overflow-hidden shadow-2xl bg-black border border-pink-900/50 transform transition-transform hover:scale-[1.01]"
                      >
                         <div className="aspect-[3/4] w-full relative">
                           <img src={img.url} alt={img.styleName} className="absolute inset-0 w-full h-full object-cover" />
                         </div>
                         
                         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 pt-12">
                           <p className="text-white font-serif text-lg font-bold">{img.styleName}</p>
                           <p className="text-pink-300 text-xs uppercase tracking-wider mt-1">Visual Gerado por IA</p>
                         </div>
                         
                         <a 
                           href={img.url} 
                           download={`novo-estilo-${img.id}.png`}
                           className="absolute top-4 right-4 p-3 bg-black/60 hover:bg-brand-accent rounded-full text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                           title="Baixar Imagem"
                         >
                           <Download className="h-5 w-5" />
                         </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {generatedImages.length > 0 && (
                <div className="mt-auto pt-6 text-center border-t border-pink-900/20">
                  <p className="text-gray-300">
                    Gostou de algum estilo? 
                    <a href="#contact" className="ml-2 text-brand-accent font-bold hover:text-pink-300 underline decoration-2 underline-offset-4 transition-all">
                      Agende uma visita em casa agora!
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};