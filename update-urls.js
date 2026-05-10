const fs = require('fs');
const path = require('path');

const dir = './src';

const walk = (d) => {
  const files = fs.readdirSync(d);
  for (const f of files) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (p.endsWith('.jsx')) {
      let c = fs.readFileSync(p, 'utf8');
      if (c.includes('https://shift-x.onrender.com')) {
        c = c.replaceAll('https://shift-x.onrender.com', 'http://localhost:5000');
        fs.writeFileSync(p, c);
        console.log('Updated: ' + p);
      }
    }
  }
};

walk(dir);
