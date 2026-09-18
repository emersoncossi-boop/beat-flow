const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

const mobilePlayerRegex = /\{\/\* Mobile-Only Floating Player Preview \*\/\}.*?<\/div>/s;
content = content.replace(mobilePlayerRegex, '');

fs.writeFileSync('app/page.tsx', content);
console.log('Removed mobile player');
