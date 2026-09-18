const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

const oldInput = `<input
                  id="hero-handle-input"
                  type="text"
                  placeholder="seunomeartistico"
                  className="bg-transparent text-white font-mono text-base sm:text-lg focus:outline-none w-full placeholder:text-white/20 ml-1 py-1"
                />`;

const newInput = `<input
                  id="hero-handle-input"
                  type="text"
                  placeholder="seunomeartistico"
                  value={djHandleInput}
                  onChange={(e) => setDjHandleInput(e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ''))}
                  className="bg-transparent text-white font-mono text-base sm:text-lg focus:outline-none w-full placeholder:text-white/20 ml-1 py-1"
                />`;

content = content.replace(oldInput, newInput);

const oldFeedback = `<div className="mt-4 text-center min-h-[24px]">
               <span className="text-[12px] sm:text-[13px] font-mono text-[#00D1FF]/60 flex items-center justify-center gap-1.5">
                 <Sparkles className="w-3.5 h-3.5" />
                 <span>Garante seu endereço oficial antes que outro artista registre</span>
               </span>
            </div>`;

const newFeedback = `<div className="mt-4 text-center min-h-[24px]">
              {djHandleInput.trim().length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: -3 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] font-mono text-emerald-400"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>
                      beatflow.me/@<strong>{djHandleInput}</strong> disponível para reserva!
                    </span>
                  </motion.div>
                ) : (
               <span className="text-[12px] sm:text-[13px] font-mono text-[#00D1FF]/60 flex items-center justify-center gap-1.5">
                 <Sparkles className="w-3.5 h-3.5" />
                 <span>Garante seu endereço oficial antes que outro artista registre</span>
               </span>
               )}
            </div>`;

content = content.replace(oldFeedback, newFeedback);

const oldFormStart = `<form 
              id="hero-slug-reservation-form"
              className="p-1.5 rounded-2xl bg-[#0A0C14]/90`;

const newFormStart = `<form 
              id="hero-slug-reservation-form"
              onSubmit={handleClaimSlug}
              className="p-1.5 rounded-2xl bg-[#0A0C14]/90`;

content = content.replace(oldFormStart, newFormStart);

fs.writeFileSync('app/page.tsx', content);
