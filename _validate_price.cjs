const fs = require('fs');
const html = fs.readFileSync('index.html','utf8');
const js = fs.readFileSync('paystack.js','utf8');
const checks = {
  price_30000_page: /₦30,000/.test(html),
  no_25000_left: !/₦25,000/.test(html),
  amount_3000000: /3000000/.test(js),
};
let ok=true; for (const [k,v] of Object.entries(checks)){ console.log((v?'PASS':'FAIL')+' '+k); if(!v) ok=false; }
console.log(ok?'ALL PRICE UPDATES OK':'PRICE UPDATE INCOMPLETE');
