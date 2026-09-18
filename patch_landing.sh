cat << 'INNEREOF' > temp_landing.tsx
      {/* ---------------------------------------------------- */}
      {/* SECTION: BENTO GRID DE FEATURES */}
      {/* ---------------------------------------------------- */}
      <section id="produto-como-prova" className="py-24 px-5 sm:px-8 md:px-12 lg:px-16 bg-[#08080F] relative">
        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
              Não é uma bio com links.<br/>
              <span className="text-[#00D1FF]">É um ecossistema de booking.</span>
            </h2>
            <p className="text-base sm:text-lg text-white/60 leading-relaxed font-medium">
              Apresentação impecável, ferramentas técnicas e negociação em um único link.
            </p>
          </div>

          {/* Bento Grid: 1 Large Left, 2 Stacked Right */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
            
            {/* Bento Card 1: Player & Identidade (Large) */}
            <div className="lg:col-span-2 rounded-[32px] bg-[#0c0b18]/80 border border-white/5 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8A3FFC]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="p-8 md:p-12 h-full flex flex-col justify-between relative z-10">
                <div className="mb-12 max-w-md">
                  <div className="w-12 h-12 rounded-2xl bg-[#8A3FFC]/20 border border-[#8A3FFC]/30 flex items-center justify-center text-[#C084FC] mb-6">
                    <Headphones className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-4">
                    O seu som no centro do palco.
                  </h3>
                  <p className="text-white/60 text-base leading-relaxed">
                    A primeira coisa que o contratante vê é o seu melhor set. Player integrado, sem redirecionamentos que quebram o fluxo.
                  </p>
                </div>
                
                {/* Visual Mockup inside Card */}
                <div className="w-full bg-black/60 rounded-2xl border border-white/10 p-4 backdrop-blur-xl shadow-2xl relative overflow-hidden group-hover:border-[#8A3FFC]/40 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg bg-zinc-800 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="h-4 w-32 bg-white/20 rounded-full mb-2" />
                      <div className="h-3 w-48 bg-white/10 rounded-full mb-4" />
                      {/* Fake Waveform */}
                      <div className="flex items-end gap-1 h-6">
                        {[...Array(20)].map((_, i) => (
                          <div key={i} className="flex-1 bg-gradient-to-t from-[#8A3FFC] to-[#00D1FF] rounded-t-sm" style={{ height: `${Math.max(20, Math.random() * 100)}%`, opacity: 0.7 }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column Stack */}
            <div className="flex flex-col gap-6">
              
              {/* Bento Card 2: Rider */}
              <div className="flex-1 rounded-[32px] bg-[#0c0b18]/80 border border-white/5 overflow-hidden relative group p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00D1FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-10 h-10 rounded-xl bg-[#00D1FF]/20 border border-[#00D1FF]/30 flex items-center justify-center text-[#00D1FF] mb-5">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-black text-white tracking-tight mb-3">
                    Rider Técnico Claro
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-6 flex-1">
                    Elimine a troca de PDFs. Seu setup exigido (CDJs, Mixers, PA) formatado profissionalmente e sempre atualizado.
                  </p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-white/50 uppercase">CDJ-3000</span>
                    <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-white/50 uppercase">DJM-900NXS2</span>
                  </div>
                </div>
              </div>

              {/* Bento Card 3: Booking */}
              <div className="flex-1 rounded-[32px] bg-[#0c0b18]/80 border border-white/5 overflow-hidden relative group p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF4DB8]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-10 h-10 rounded-xl bg-[#FF4DB8]/20 border border-[#FF4DB8]/30 flex items-center justify-center text-[#FF4DB8] mb-5">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-black text-white tracking-tight mb-3">
                    Funil de Contratação
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Botão de booking direto no perfil que captura cidade, data, cachê e dados do produtor em um CRM simples.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/login?mode=signup">
              <Button size="sm" className="bg-[#8A3FFC] hover:bg-[#8A3FFC]/90 text-white font-bold text-sm px-8 py-3 h-12 rounded-full cursor-pointer shadow-[0_0_20px_rgba(138,63,252,0.4)]">
                Comece a usar grátis
              </Button>
            </Link>
          </div>
        </div>
      </section>
INNEREOF

# Backup the original first
cp app/page.tsx app/page.tsx.bak

# Delete lines from PRODUTO COMO PROVA & BENEFÍCIOS to just before Luminous Light Beam Divider
awk '/\{\/\* PRODUTO COMO PROVA & BENEFÍCIOS \*\/\}/{f=1; print; system("cat temp_landing.tsx"); next} /\{\/\* Luminous Light Beam Divider \*\/\}/{if (f) {f=0}} !f' app/page.tsx.bak > app/page.tsx

rm temp_landing.tsx
