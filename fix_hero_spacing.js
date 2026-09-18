const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

content = content.replace(
  'className="relative h-auto min-h-[calc(100svh-88px)] lg:h-[calc(100svh-88px)] lg:max-h-[920px] w-full flex flex-col justify-center py-10 lg:py-0 overflow-hidden bg-[#080B0F]"',
  'className="relative h-auto min-h-[calc(100svh-88px)] lg:h-[calc(100svh-88px)] lg:max-h-[920px] w-full flex flex-col justify-center pt-24 pb-16 lg:py-0 overflow-hidden bg-[#080B0F]"'
);

fs.writeFileSync('app/page.tsx', content);
console.log('Fixed hero spacing');
