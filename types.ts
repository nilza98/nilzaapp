export interface GeneratedImage {
  id: string;
  url: string;
  styleName: string;
}

export enum HairstyleType {
  PIXIE = 'Pixie Moderno',
  BOB = 'Bob Clássico em Camadas',
  SHAG = 'Shag Moderno Suave',
  LONG_LAYERS = 'Camadas Longas e Elegantes',
  WAVY_LOB = 'Lob Ondulado Texturizado'
}

export interface StylistState {
  originalImage: string | null;
  generatedImages: GeneratedImage[];
  isGenerating: boolean;
  error: string | null;
}