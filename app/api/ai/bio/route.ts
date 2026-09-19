import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  try {
    const { artisticName, genres, city, rateRange, audienceContext } = await req.json();

    const targetAudience = audienceContext || 'Clubs & Festivais';
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        
        const prompt = `Você é um curador e copywriter musical de elite para a indústria fonográfica e de eventos de alto padrão no Brasil.
Escreva uma biografia profissional curta, elegante e impactante (2 a 3 frases no máximo, em português brasileiro) para o Press Kit oficial do artista no Beat Flow.

Dados do Artista:
- Nome artístico: ${artisticName || 'DJ'}
- Gêneros musicais: ${genres && genres.length > 0 ? genres.join(', ') : 'Tech House, Melodic Techno'}
- Cidade base: ${city || 'São Paulo - SP'}
- Faixa de cachê: ${rateRange || 'R$ 2.500 - 7.000'}
- Público e Foco de Contratação: ${targetAudience}

Retorne APENAS o texto da biografia, sem aspas, sem títulos ou explicações extras.`;

        const result = await model.generateContent(prompt);
        const generatedBio = result.response.text()?.trim();
        if (generatedBio) {
          return NextResponse.json({ bio: generatedBio });
        }
      } catch (aiErr) {
        console.warn('[Gemini AI] Fallback generated:', aiErr);
      }
    }

    // High quality intelligent fallback tailored to audience
    const genreText = genres && genres.length > 0 ? genres.slice(0, 2).join(' e ') : 'música eletrônica contemporânea';
    const cityText = city ? city.split('-')[0].trim() : 'São Paulo';
    
    let fallbackBio = '';
    if (targetAudience === 'Corporativo Premium') {
      fallbackBio = `Com sonoridade refinada em ${genreText}, ${artisticName || 'o artista'} cria ambientações sonoras elegantes e imersivas para marcas globais e eventos de alto padrão, garantindo sofisticação técnica a partir de ${cityText}.`;
    } else if (targetAudience === 'Casamentos & Privados') {
      fallbackBio = `Especialista em unir a energia de ${genreText} com uma sensibilidade única para pistas exclusivas, ${artisticName || 'o artista'} transforma celebrações privadas e casamentos memoráveis em experiências sonoras inesquecíveis, partindo de ${cityText}.`;
    } else {
      fallbackBio = `Com repertório focado em ${genreText} e sound design envolvente, ${artisticName || 'o artista'} constrói narrativas sonoras de alto impacto para festivais e clubs de vanguarda em todo o país, partindo de ${cityText}.`;
    }

    return NextResponse.json({ bio: fallbackBio });
  } catch (error) {
    console.error('Error in bio generation route:', error);
    return NextResponse.json(
      { bio: 'Produtora e DJ especializada em sets envolventes de alta energia, combinando melodias sofisticadas e linhas de baixo marcantes para as melhores pistas do Brasil.' },
      { status: 200 }
    );
  }
}