const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

const oldButton = `<button
              type="button"
              className="w-full sm:w-auto h-12 px-5 rounded-xl border border-dashed border-white/15 hover:border-purple-400/50 text-white/60 hover:text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer bg-black/20"
            >`;

const newButton = `<button
              type="button"
              onClick={() => handleScrollToBooking(0)}
              className="w-full sm:w-auto h-12 px-5 rounded-xl border border-dashed border-white/15 hover:border-purple-400/50 text-white/60 hover:text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer bg-black/20"
            >`;

content = content.replace(oldButton, newButton);
fs.writeFileSync('app/page.tsx', content);
