const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

// Remove Halo Ring and Light Motes
const ringRegex = /\{\/\* Subtle Ambient Light Motes drifting in the stage beam \*\/\}.*?<\/svg>\s*<\/motion\.div>\s*<\/div>/s;
content = content.replace(ringRegex, '');

// Replace the right column and update left column classes
const rightColRegex = /\{\/\* Right Column: Floating Glass Audio Player with Neon Stage Alignment \*\/\}.*?<\/div>\s*<\/div>\s*<\/section>/s;

const newRightCol = `{/* Right Column: Interactive Profile Mockup */}
          <div className="hidden lg:flex w-[44%] flex-col items-center justify-center relative z-20">
            {/* Ambient Glow behind Mockup */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[500px] bg-gradient-to-tr from-[#8A3FFC]/20 via-[#00D1FF]/15 to-transparent blur-[80px] pointer-events-none -z-10" />
            
            {/* iPhone Frame Mockup */}
            <motion.div 
              initial={{ opacity: 0, y: 40, rotateX: 10, rotateY: -10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-[320px] h-[650px] bg-[#0A0C13] rounded-[40px] border-[6px] border-[#1A1D24] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col"
            >
              {/* iPhone Notch */}
              <div className="absolute top-0 inset-x-0 h-6 bg-[#1A1D24] rounded-b-2xl w-32 mx-auto z-50" />
              
              {/* Mockup Header - DJ Image */}
              <div className="h-[220px] relative shrink-0">
                <Image 
                  src="/assets/landing/hero-dj-stage.jpg"
                  alt="DJ Cover"
                  fill
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C13] to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34D399]" />
                    <span className="text-[10px] font-bold text-white tracking-widest uppercase">Live Now</span>
                  </div>
                  <h3 className="text-2xl font-black text-white leading-tight">Luna Martins</h3>
                  <p className="text-xs text-zinc-400">Melodic Techno & House</p>
                </div>
              </div>

              {/* Mockup Content */}
              <div className="flex-1 px-5 pt-2 pb-6 flex flex-col gap-3 overflow-hidden">
                
                {/* Audio Player Snippet */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3 backdrop-blur-md">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800 relative overflow-hidden shrink-0">
                    <Image src="/assets/landing/hero-dj-stage.jpg" alt="Track" fill className="object-cover opacity-50" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <Play className="w-4 h-4 text-white ml-0.5" />
                    </div>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-[11px] text-white/50 font-medium truncate uppercase tracking-widest">Set Oficial</p>
                    <p className="text-sm font-bold text-white truncate">Midnight Flow</p>
                  </div>
                  <div className="flex items-end gap-0.5 h-4 px-1">
                    <div className="w-0.5 h-full bg-[#00D1FF] animate-[pulse_1s_ease-in-out_infinite]" />
                    <div className="w-0.5 h-[60%] bg-[#00D1FF] animate-[pulse_1.2s_ease-in-out_infinite_0.1s]" />
                    <div className="w-0.5 h-[80%] bg-[#00D1FF] animate-[pulse_0.9s_ease-in-out_infinite_0.2s]" />
                    <div className="w-0.5 h-[40%] bg-[#00D1FF] animate-[pulse_1.1s_ease-in-out_infinite_0.3s]" />
                  </div>
                </div>

                {/* Validation Checks */}
                <div className="space-y-2 mt-2">
                  <div className="flex items-center gap-3 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <Calendar className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span className="text-xs font-bold text-emerald-100">Agenda Sincronizada</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 ml-auto" />
                  </div>
                  
                  <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white/5 border border-white/10">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Sliders className="w-3 h-3 text-zinc-300" />
                    </div>
                    <span className="text-xs font-bold text-zinc-300">Tech Rider CDJ-3000</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 ml-auto" />
                  </div>
                </div>

                {/* Book Button */}
                <div className="mt-auto pt-2">
                  <div className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00D1FF] to-[#8A3FFC] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,209,255,0.3)]">
                    <span>Solicitar Booking</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>`;

content = content.replace(rightColRegex, newRightCol);

// Also we need to improve the HUD (Left Column) spacing.
// Let's modify classes for margins in the left column.
content = content.replace(/mb-6 sm:mb-7 leading-\[1\.55\] text-center lg:text-left mx-auto lg:mx-0"/, 'mb-10 sm:mb-12 leading-[1.6] text-center lg:text-left mx-auto lg:mx-0"');
content = content.replace(/mb-4 sm:mb-5 text-center lg:text-left"/, 'mb-6 sm:mb-8 text-center lg:text-left"');
content = content.replace(/mb-6 sm:mb-7">/g, 'mb-8 sm:mb-10 mt-6">'); // CTA spacing
content = content.replace(/gap-4 sm:gap-6 pt-4 border-t/g, 'gap-6 sm:gap-8 pt-6 border-t'); // Features spacing

fs.writeFileSync('app/page.tsx', content);
console.log('Update complete.');
