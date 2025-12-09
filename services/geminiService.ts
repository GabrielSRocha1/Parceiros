import { GoogleGenAI, Type } from "@google/genai";
import { Business, Department } from '../types';

// In a real production app, this would be a backend endpoint, but for this demo 
// we initialize it here.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

/**
 * Uses Gemini to generate business suggestions based on a vague or semantic query.
 * This is useful if the local database doesn't have an exact match, or to suggest
 * real places in Paraguay that might not be in our mock DB.
 */
export const searchWithGemini = async (query: string, department?: string): Promise<Business[]> => {
  if (!apiKey) {
    console.warn("API Key not found. Skipping AI search.");
    return [];
  }

  const model = "gemini-2.5-flash";
  const departmentContext = department ? ` in the department/area of ${department}` : ' in Paraguay';
  
  const prompt = `
    The user is searching for "${query}"${departmentContext}.
    Please generate a list of 3 REAL and popular businesses/places in Paraguay that match this request.
    If the request is generic (e.g., "mechanic"), invent 3 plausible realistic businesses.
    Include approximate latitude and longitude if the place is real, or reasonable coordinates for the city/area if invented.
    Ensure the data is in Spanish.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              address: { type: Type.STRING },
              city: { type: Type.STRING },
              category: { type: Type.STRING },
              rating: { type: Type.NUMBER },
              tags: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING } 
              },
              lat: { type: Type.NUMBER, description: "Latitude of the location" },
              lng: { type: Type.NUMBER, description: "Longitude of the location" }
            },
            required: ["name", "description", "city", "category"]
          }
        }
      }
    });

    const jsonStr = response.text;
    if (!jsonStr) return [];

    const rawData = JSON.parse(jsonStr);

    // Map to our Business interface
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return rawData.map((item: any, index: number) => ({
      id: `ai-gen-${Date.now()}-${index}`,
      name: item.name,
      description: item.description,
      address: item.address || 'Dirección no disponible',
      city: item.city,
      department: department as Department || Department.ASUNCION, // Fallback
      category: item.category,
      phone: 'Consultar',
      rating: item.rating || 4.5,
      reviews: Math.floor(Math.random() * 100) + 10,
      imageUrl: `https://picsum.photos/800/600?random=${index + 100}`,
      isVerified: false,
      tags: item.tags || [],
      coordinates: (item.lat && item.lng) ? { lat: item.lat, lng: item.lng } : undefined
    }));

  } catch (error) {
    console.error("Gemini Search Error:", error);
    return [];
  }
};