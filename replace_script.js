const fs = require('fs');
const content = fs.readFileSync('app/page.tsx', 'utf8');
const lines = content.split('\n');

const startIndex = lines.findIndex(l => l.includes('{/* 2-Column Professional Architecture */}'));
const endIndex = lines.findIndex((l, i) => i > startIndex && l.includes('{/* Expandable Modal: Bio Completa & Rider Técnico */}'));

if (startIndex !== -1 && endIndex !== -1) {
  const before = lines.slice(0, startIndex);
  const after = lines.slice(endIndex);
  
  const replacement = `            {/* Clean Comparison Architecture */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 max-w-5xl mx-auto">
              
              {/* The Chaos */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 sm:p-10 rounded-3xl bg-[#0A0C13] border border-rose-500/10 flex flex-col items-start relative overflow-hidden group shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-[150%] h-[150%] -translate-y-1/2 translate-x-1/4 bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.08)_0%,transparent_50%)] pointer-events-none" />
                
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-6 relative z-10">
                  <MessageSquare className="w-5 h-5 text-rose-400" />
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-white mb-3 tracking-tight relative z-10">O Caos do WhatsApp</h4>
                <p className="text-sm text-zinc-400 leading-relaxed mb-8 relative z-10">
                  Conversas informais se arrastam por horas. PDFs se perdem no histórico. Cada minuto de demora é um convite para o contratante fechar com outro artista.
                </p>
                
                <div className="w-full mt-auto space-y-4 relative z-10">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-zinc-300 font-medium">
                    "Opa, e aí! Depende... Qual sábado? Que tipo de festa e que horas seria o som?"
                  </div>
                  <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs sm:text-sm text-rose-200/90 font-medium ml-6 sm:ml-12 relative">
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-[1px] bg-rose-500/30" />
                    "Era pro dia 14... Mas como demorou pra responder, já fechei com outro DJ que atendeu na hora."
                  </div>
                </div>
              </motion.div>

              {/* The Solution */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 sm:p-10 rounded-3xl bg-[#0A0C13] border border-emerald-500/20 flex flex-col items-start relative overflow-hidden group hover:border-emerald-500/40 transition-colors shadow-2xl"
              >
                <div className="absolute top-0 left-0 w-[150%] h-[150%] -translate-y-1/2 -translate-x-1/4 bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.12)_0%,transparent_50%)] opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6 relative z-10 shadow-[0_0_15px_rgba(52,211,153,0.2)]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-white mb-3 tracking-tight relative z-10">O Padrão Beat Flow</h4>
                <p className="text-sm text-emerald-100/60 leading-relaxed mb-8 relative z-10">
                  O contratante clica no seu link oficial, escolhe a data pré-validada e fecha negócio instantaneamente. Formalização expressa e zero calotes.
                </p>

                <div className="w-full mt-auto space-y-3 relative z-10">
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between group-hover:bg-emerald-500/15 transition-colors">
                    <span className="text-xs sm:text-sm font-bold text-emerald-300">1. Data Validada no Calendário</span>
                    <Check className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between group-hover:bg-emerald-500/15 transition-colors">
                    <span className="text-xs sm:text-sm font-bold text-emerald-300">2. Rider Técnico Aprovado</span>
                    <Check className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between group-hover:bg-emerald-500/15 transition-colors">
                    <span className="text-xs sm:text-sm font-bold text-emerald-300">3. Sinal Pago no PIX (Escrow)</span>
                    <Check className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
          `;
  
  const newContent = [...before, replacement, ...after].join('\n');
  fs.writeFileSync('app/page.tsx', newContent);
  console.log('Successfully replaced huge simulator block!');
} else {
  console.log('Could not find start or end index:', { startIndex, endIndex });
}
