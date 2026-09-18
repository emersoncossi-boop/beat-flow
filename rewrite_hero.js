const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

const heroRegex = /<section className="relative h-auto min-h-\[calc\(100svh-88px\)\][^>]*>.*?<\/section>/s;

const newHero = `<section className="relative h-auto min-h-[calc(100svh-88px)] w-full flex flex-col justify-center pt-24 pb-16 lg:py-0 overflow-hidden bg-[#05060A]">
        {/* Abstract Background / Lighting */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-b from-[#8A3FFC]/10 via-[#00D1FF]/5 to-transparent blur-[120px] opacity-70" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-[#FF4DB8]/5 blur-[150px] opacity-40" />
        </div>

        <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Left Column: Text & CTAs */}
          <div className="w-full lg:w-[54%] flex flex-col items-center lg:items-start text-center lg:text-left mt-8 lg:mt-0">
            <div className="mb-6 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <span className="text-[11px] sm:text-[13px] font-bold tracking-[0.25em] text-[#00D1FF] uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D1FF] shadow-[0_0_8px_#00D1FF] animate-pulse" />
                PRESS KIT OFICIAL PARA DJS
              </span>
            </div>

            <h1 className="text-[44px] sm:text-[56px] lg:text-[68px] xl:text-[76px] font-black tracking-[-0.03em] text-white leading-[1.05] mb-6 drop-shadow-xl">
              Seu som abre a porta.<br />
              O Beat Flow transforma interesse em{' '}
              <span className="bg-gradient-to-r from-[#00D1FF] via-[#8A3FFC] to-[#FF4DB8] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(138,63,252,0.45)]">
                contratação.
              </span>
            </h1>

            <p className="text-[15px] sm:text-[17px] lg:text-[19px] text-[var(--bf-text-secondary,#A7ADC0)] font-medium max-w-2xl mb-10 leading-[1.6]">
              Música, identidade, agenda, rider e pedidos de booking em um único perfil profissional. Compartilhe seu link e deixe contratantes entenderem seu trabalho sem uma sequência interminável de mensagens.
            </p>

            <div className="w-full max-w-[520px] mb-6 relative">
              <form 
                id="hero-slug-reservation-form"
                onSubmit={handleClaimSlug}
                className="p-1.5 rounded-2xl bg-[#0A0C14]/90 border border-white/10 hover:border-white/20 focus-within:border-[#00D1FF]/60 focus-within:ring-2 focus-within:ring-[#00D1FF]/20 shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all flex flex-col sm:flex-row items-center gap-2 backdrop-blur-md"
              >
                <div className="flex items-center w-full px-4 h-14 bg-white/5 rounded-xl border border-transparent transition-colors focus-within:bg-white/10">
                  <span className="text-white/40 font-mono text-sm sm:text-base select-none shrink-0" aria-hidden="true">
                    beatflow.me/@
                  </span>
                  <input
                    id="hero-handle-input"
                    type="text"
                    placeholder="seunomeartistico"
                    value={djHandleInput}
                    onChange={(e) => setDjHandleInput(e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ''))}
                    className="bg-transparent text-white font-mono text-base sm:text-lg focus:outline-none w-full placeholder:text-white/20 ml-1 py-1"
                  />
                </div>
                <button
                  type="submit"
                  id="hero-claim-submit-button"
                  className="w-full sm:w-auto h-14 px-8 rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#8A3FFC] to-[#00D1FF] hover:brightness-110 text-white font-bold text-sm sm:text-base tracking-tight shadow-[0_0_24px_rgba(138,63,252,0.65)] hover:shadow-[0_0_30px_rgba(0,209,255,0.5)] flex items-center justify-center gap-2 whitespace-nowrap transition-all cursor-pointer shrink-0"
                >
                  <span>Reivindicar</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
              <div className="mt-4 min-h-[24px] text-left px-2">
                {djHandleInput.trim().length > 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: -3 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] font-mono text-emerald-400"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>
                        beatflow.me/@<strong>{djHandleInput}</strong> disponível!
                      </span>
                    </motion.div>
                  ) : (
                 <span className="text-[12px] sm:text-[13px] font-mono text-[#00D1FF]/60 flex items-center gap-1.5">
                   <Sparkles className="w-3.5 h-3.5" />
                   <span>Garante seu endereço oficial antes que outro artista registre</span>
                 </span>
                 )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/[0.08] w-full max-w-[520px]">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[var(--bf-text-secondary,#A7ADC0)]">
                <CheckCircle2 className="w-4 h-4 text-[#8A3FFC]" />
                <span>Perfil oficial</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[var(--bf-text-secondary,#A7ADC0)]">
                <CheckCircle2 className="w-4 h-4 text-[#00D1FF]" />
                <span>Link próprio</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[var(--bf-text-secondary,#A7ADC0)]">
                <CheckCircle2 className="w-4 h-4 text-[#FF4DB8]" />
                <span>Custódia de 50%</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-End 3D Motion Core */}
          <div className="hidden lg:flex w-[46%] flex-col items-center justify-center relative z-20 [perspective:1200px]">
            {/* Volumetric ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#8A3FFC]/30 via-[#00D1FF]/20 to-transparent blur-[100px] pointer-events-none -z-10 rounded-full" />
            
            <div className="relative w-[440px] h-[440px] flex items-center justify-center [transform-style:preserve-3d]">
              
              {/* Core Sphere */}
              <motion.div 
                animate={{ scale: [1, 1.05, 1], rotateY: [0, 360] }}
                transition={{ 
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  rotateY: { duration: 25, repeat: Infinity, ease: "linear" }
                }}
                className="absolute z-10 w-32 h-32 rounded-full bg-gradient-to-tr from-[#8A3FFC] to-[#00D1FF] shadow-[0_0_80px_rgba(138,63,252,0.8)] flex items-center justify-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 mix-blend-overlay backdrop-blur-md" />
                <Disc3 className="w-12 h-12 text-white animate-[spin_10s_linear_infinite]" />
              </motion.div>

              {/* Orbital Ring 1 (Cyan) */}
              <motion.div 
                animate={{ rotateX: [60, 60], rotateY: [0, 360], rotateZ: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full border-[1px] border-[#00D1FF]/40 shadow-[inset_0_0_20px_rgba(0,209,255,0.1)]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#00D1FF] rounded-full shadow-[0_0_20px_#00D1FF]" />
              </motion.div>

              {/* Orbital Ring 2 (Purple) */}
              <motion.div 
                animate={{ rotateX: [75, 75], rotateY: [360, 0], rotateZ: [0, -360] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-12 rounded-full border-[2px] border-[#8A3FFC]/30 shadow-[0_0_30px_rgba(138,63,252,0.15)]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#8A3FFC] rounded-full shadow-[0_0_15px_#8A3FFC]" />
              </motion.div>

              {/* Data Node: Agenda Sync */}
              <motion.div 
                animate={{ y: [-15, 15, -15], rotateY: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 top-16 p-3.5 rounded-2xl bg-[#0A0C14]/80 border border-white/10 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] flex items-center gap-3 z-30"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="pr-2">
                  <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-0.5">Live Sync</p>
                  <p className="text-sm font-bold text-white">Agenda Conectada</p>
                </div>
              </motion.div>

              {/* Data Node: Contract */}
              <motion.div 
                animate={{ y: [15, -15, 15], rotateY: [10, -10, 10] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-12 bottom-24 p-3.5 rounded-2xl bg-[#0A0C14]/80 border border-white/10 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] flex items-center gap-3 z-30"
              >
                <div className="w-10 h-10 rounded-full bg-[#00D1FF]/20 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#00D1FF]" />
                </div>
                <div className="pr-2">
                  <p className="text-[10px] font-bold text-[#00D1FF] uppercase tracking-widest mb-0.5">Automated</p>
                  <p className="text-sm font-bold text-white">Rider & Contratos</p>
                </div>
              </motion.div>
              
            </div>
          </div>

        </div>
      </section>`;

if (heroRegex.test(content)) {
  content = content.replace(heroRegex, newHero);
  fs.writeFileSync('app/page.tsx', content);
  console.log('Successfully rewrote Hero section');
} else {
  console.log('Regex did not match hero section');
}
