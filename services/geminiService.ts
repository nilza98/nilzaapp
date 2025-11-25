import { GoogleGenAI } from "@google/genai";
import { HairstyleType } from "../types";

const apiKey = process.env.API_KEY;
// Initialize the client. The key is guaranteed to be available per instructions.
const ai = new GoogleGenAI({ apiKey: apiKey });

export const generateHairstyle = async (
  base64Image: string,
  style: string
): Promise<string> => {
  try {
    // Clean base64 string if it has the prefix
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

    const prompt = `
      Atue como um cabeleireiro profissional e especialista em visagismo.
      Tarefa: Edite a foto fornecida para alterar o cabelo da pessoa.
      
      Novo Estilo Desejado: ${style}.
      
      Público Alvo: O sujeito é uma mulher madura (50+).
      
      Diretrizes:
      1. Se o "Novo Estilo Desejado" for uma descrição (ex: "curto com franja"), interprete e aplique artisticamente.
      2. Se for um nome de corte (ex: "Pixie"), aplique o corte clássico.
      3. O cabelo deve parecer saudável, com volume adequado e realista.
      4. MANTENHA o rosto, a expressão facial, a iluminação e as roupas da pessoa originais intactos. Apenas o cabelo deve mudar.
      5. Resultado deve ser fotorrealista de alta qualidade.
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