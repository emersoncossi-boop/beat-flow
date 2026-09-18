const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

const heroSectionRegex = /<section className="relative h-auto min-h-\[calc\(100svh-88px\)\] bg-black flex flex-col justify-center overflow-hidden">([\s\S]*?)<\/section>/;

const newHeroContent = `<section className="relative h-auto min-h-[calc(100svh-88px)] bg-[#05060A] flex flex-col justify-center overflow-hidden">
        {/* Abstract Particle Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#8A3FFC]/10 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#00D1FF]/10 blur-[150px]" />
        </div>

        <div className="max-w-4xl w-full mx-auto px-6 sm:px-10 lg:px-12 relative z-10 flex flex-col items-center justify-center text-center py-20 lg:py-28">
          {/* Eyebrow Label */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
            <span className="text-[12px] sm:text-[14px] font-bold tracking-[0.22em] text-[#00D1FF] uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00D1FF] shadow-[0_0_8px_#00D1FF] animate-pulse" />
              PRESS KIT OFICIAL PARA DJS
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[38px] sm:text-[50px] lg:text-[68px] font-black tracking-[-0.03em] text-white leading-[1.05] mb-6 drop-shadow-xl">
            Seu som abre a porta.<br />
            O Beat Flow transforma interesse em{' '}
            <span className="bg-gradient-to-r from-[#00D1FF] via-[#8A3FFC] to-[#FF4DB8] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(138,63,252,0.45)]">
              contratação.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-[15px] sm:text-[17px] lg:text-[19px] text-zinc-400 font-medium max-w-[640px] mx-auto mb-12 leading-[1.6]">
            Música, identidade, agenda, rider e pedidos de booking em um único perfil profissional. Compartilhe seu link e deixe contratantes entenderem seu trabalho sem uma sequência interminável de mensagens.
          </p>

          {/* Conversion Form */}
          <div className="w-full max-w-xl mx-auto mb-8">
            <form 
              id="hero-slug-reservation-form"
              className="p-1.5 rounded-2xl bg-[#0A0C14]/90 border border-white/10 hover:border-white/20 focus-within:border-[#00D1FF]/60 focus-within:ring-2 focus-within:ring-[#00D1FF]/20 shadow-2xl transition-all flex flex-col sm:flex-row items-center gap-2 backdrop-blur-md"
            >
              <div className="flex items-center w-full px-4 h-14 bg-white/5 rounded-xl border border-transparent transition-colors focus-within:bg-white/10">
                <span className="text-white/40 font-mono text-sm sm:text-base select-none shrink-0" aria-hidden="true">
                  beatflow.me/@
                </span>
                <input
                  id="hero-handle-input"
                  type="text"
                  placeholder="seunomeartistico"
                  className="bg-transparent text-white font-mono text-base sm:text-lg focus:outline-none w-full placeholder:text-white/20 ml-1 py-1"
                />
              </div>

              <button
                type="submit"
                id="hero-claim-submit-button"
                className="w-full sm:w-auto h-14 px-8 rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#8A3FFC] to-[#00D1FF] hover:brightness-110 text-white font-bold text-sm sm:text-base tracking-tight shadow-[0_0_24px_rgba(138,63,252,0.65)] hover:shadow-[0_0_30px_rgba(0,209,255,0.5)] flex items-center justify-center gap-2 whitespace-nowrap transition-all cursor-pointer shrink-0"
              >
                <span>Reivindicar Link</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            {/* Instant Feedback Text */}
            <div className="mt-4 text-center">
               <span className="text-[12px] sm:text-[13px] font-mono text-zinc-500 flex items-center justify-center gap-1.5">
                 <Sparkles className="w-3.5 h-3.5 text-[#00D1FF]/70" />
                 <span>Garante seu endereço oficial antes que outro artista registre</span>
               </span>
            </div>
          </div>

          {/* Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link href="/explorar" className="w-full sm:w-auto">
              <button 
                type="button"
                className="w-full sm:w-auto h-12 px-6 rounded-xl border border-white/10 hover:border-[#00D1FF]/50 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white font-medium text-sm tracking-tight flex items-center justify-center gap-2.5 transition-colors cursor-pointer group"
              >
                <div className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-[#00D1FF]/20 flex items-center justify-center transition-colors">
                  <Play className="w-3 h-3 fill-white text-white group-hover:text-[#00D1FF] ml-0.5 transition-colors" />
                </div>
                <span>Ver perfis de DJs ao vivo</span>
              </button>
            </Link>
            <button
              type="button"
              className="w-full sm:w-auto h-12 px-5 rounded-xl border border-dashed border-white/15 hover:border-purple-400/50 text-white/60 hover:text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer bg-black/20"
            >
              <Calendar className="w-4 h-4 text-purple-400/70" />
              <span>Sou contratante: buscar datas</span>
            </button>
          </div>

          {/* Product Proofs */}
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 pt-8 border-t border-white/5 w-full max-w-2xl mx-auto">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-400">
              <CheckCircle2 className="w-4 h-4 text-[#8A3FFC]" />
              <span>Perfil profissional oficial</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-400">
              <CheckCircle2 className="w-4 h-4 text-[#00D1FF]" />
              <span>Link próprio @seunome</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-400">
              <CheckCircle2 className="w-4 h-4 text-[#FF4DB8]" />
              <span>Sinal de 50% em custódia</span>
            </div>
          </div>
        </div>
      </section>`;

if (heroSectionRegex.test(content)) {
  content = content.replace(heroSectionRegex, newHeroContent);
  fs.writeFileSync('app/page.tsx', content);
  console.log('Replaced entire hero section with centered layout');
} else {
  console.log('Regex did not match!');
}
