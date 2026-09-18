const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

const regexToReplace = /<div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white\/\[0\.08\] w-full max-w-\[520px\]">/s;

const ctaContent = `{/* Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-14 w-full">
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
                onClick={() => handleScrollToBooking(0)}
                className="w-full sm:w-auto h-12 px-5 rounded-xl border border-dashed border-white/15 hover:border-purple-400/50 text-white/60 hover:text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer bg-black/20"
              >
                <Calendar className="w-4 h-4 text-purple-400/70" />
                <span>Sou contratante: buscar datas</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/[0.08] w-full max-w-[520px]">`;

if (regexToReplace.test(content)) {
  content = content.replace(regexToReplace, ctaContent);
  fs.writeFileSync('app/page.tsx', content);
  console.log('Restored CTAs');
} else {
  console.log('Regex missed');
}
