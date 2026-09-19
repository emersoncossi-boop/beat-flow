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
        
        const prompt = `VocÃª Ã© um curador e copywriter musical de elite para a indÃºstria fonogrÃ¡fica e de eventos de alto padrÃ£o no Brasil.
Escreva uma biografia profissional curta, elegante e impactante (2 a 3 frases no mÃ¡ximo, em portuguÃªs brasileiro) para o Press Kit oficial do artista no Beat Flow.

Dados do Artista:
- Nome artÃ­stico: ${artisticName || 'DJ'}
- GÃªneros musicais: ${genres && genres.length > 0 ? genres.join(', ') : 'Tech House, Melodic Techno'}
- Cidade base: ${city || 'SÃ£o Paulo - SP'}
- Faixa de cachÃª: ${rateRange || 'R$ 2.500 - 7.000'}
- PÃºblico e Foco de ContrataÃ§Ã£o: ${targetAudience}

Retorne APENAS o texto da biografia, sem aspas, sem tÃ­tulos ou explicaÃ§Ãµes extras.`;

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
    const genreText = genres && genres.length > 0 ? genres.slice(0, 2).join(' e ') : 'mÃºsica eletrÃ´nica contemporÃ¢nea';
    const cityText = city ? city.split('-')[0].trim() : 'SÃ£o Paulo';
    
    let fallbackBio = '';
    if (targetAudience === 'Corporativo Premium') {
      fallbackBio = `Com sonoridade refinada em ${genreText}, ${artisticName || 'o artista'} cria ambientaÃ§Ãµes sonoras elegantes e imersivas para marcas globais e eventos de alto padrÃ£o, garantindo sofisticaÃ§Ã£o tÃ©cnica a partir de ${cityText}.`;
    } else if (targetAudience === 'Casamentos & Privados') {
      fallbackBio = `Especialista em unir a energia de ${genreText} com uma sensibilidade Ãºnica para pistas exclusivas, ${artisticName || 'o artista'} transforma celebraÃ§Ãµes privadas e casamentos memorÃ¡veis em experiÃªncias sonoras inesquecÃ­veis, partindo de ${cityText}.`;
    } else {
      fallbackBio = `Com repertÃ³rio focado em ${genreText} e sound design envolvente, ${artisticName || 'o artista'} constrÃ³i narrativas sonoras de alto impacto para festivais e clubs de vanguarda em todo o paÃ­s, partindo de ${cityText}.`;
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