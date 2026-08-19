const fs = require('fs');
const html = fs.readFileSync('index.html','utf8');
const checks = {
  hasDoctype: /<!DOCTYPE html>/i.test(html),
  title: /Remote Income System/.test(html),
  hasPaystackScript: /js\.paystack\.co\/v1\/inline\.js/.test(html),
  hasPaystackJs: /paystack\.js/.test(html),
  hasCTA: /Get the System/.test(html),
  hasPrice: /₦25,000/.test(html),
  hasGuarantee: /Money-Back Guarantee/.test(html),
  hasEmailInput: /id="email"/.test(html),
  hasForm: /id="paystack-form"/.test(html),
  noBrokenTags: (html.match(/<section/g)||[]).length === (html.match(/<\/section>/g)||[]).length,
};
let ok = true;
for (const [k,v] of Object.entries(checks)) { console.log((v?'PASS':'FAIL')+' '+k); if(!v) ok=false; }
console.log(ok ? '\nALL HTML CHECKS PASS' : '\nSOME CHECKS FAILED');

// confirm paystack.js references the form + key placeholder
const js = fs.readFileSync('paystack.js','utf8');
console.log('\npaystack.js: reads email ->', /getElementById\("email"\)/.test(js));
console.log('paystack.js: has key placeholder ->', /pk_live_xxxx/.test(js));
console.log('paystack.js: amount 2,500,000 kobo (NGN25k) ->', /2500000/.test(js));
