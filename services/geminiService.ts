import { GoogleGenAI } from "@google/genai";
import { HairstyleType } from "../types";

const apiKey = process.env.API_KEY;
// Initialize the client. The key is guaranteed to be available per instructions.
const ai = new GoogleGenAI({ apiKey: apiKey });

export const generateHairstyle = async (
  base64Image: string,
  style: HairstyleType
): Promise<string> => {
  try {
    // Clean base64 string if it has the prefix
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

    const prompt = `
      Crie um retrato fotorrealista baseado nesta imagem de entrada.
      Transforme o penteado da pessoa para um: ${style}.
      O sujeito é uma mulher com mais de 50 anos.
      Garanta que o cabelo pareça saudável, volumoso e adequado à idade, mas moderno e elegante.
      Mantenha os traços faciais e a expressão da pessoa o máximo possível.
      Alta qualidade, fotografia profissional de salão, iluminação suave.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: 'image/jpeg', // Assuming jpeg for simplicity, though flash handles others
            },
          },
          {
            text: prompt,
          },
        ],
      },
      // Using flash-image for generation/editing as per guidelines
    });

    // Iterate through parts to find the image
    const parts = response.candidates?.[0]?.content?.parts;
    
    if (!parts) {
      throw new Error("Nenhum conteúdo gerado");
    }

    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    throw new Error("O modelo gerou texto, mas nenhuma imagem. Por favor, tente novamente.");

  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};