# Deploy Remote Income System — Netlify Drop (no CLI, no install)

## What you need
- The folder: `C:\Users\HP\remote-income-system\`
- A Netlify account (you already started onboarding — finish the survey, click Continue).

## Steps (on YOUR laptop, 2 minutes)

1. **Finish the Netlify onboarding survey** (answers below), click "Continue to deploy".
   - Name: Enoch Nkwo
   - Use: Personal
   - Experience: Basic
   - Company: Remote Income System
   - Project: Marketing site
   - Role: Marketer
   - Heard from: AI or code tool

2. **Go to the Drop page:**
   Open your browser and go to: https://app.netlify.com/drop

3. **Zip the product folder:**
   - Open File Explorer, go to `C:\Users\HP\remote-income-system\`
   - Select EVERYTHING inside it (index.html, paystack.js, product.html, netlify.toml, netlify\ folder, content\ folder, README.md)
   - Right-click → Send to → Compressed (zipped) folder
   - Name it `ris-deploy.zip`

4. **Drag the zip onto the Netlify Drop page.**
   (Or click to browse and select `ris-deploy.zip`.)
   Netlify unpacks it and deploys. Within ~30 seconds it shows:
   **"Site is live"** with a URL like `https://amazing-name-123456.netlify.app`

5. **Copy that URL.** That is your live product link — works 24/7, laptop off or on.

## After deploy
- Send me the URL.
- Update Paystack's business "Website" field to that URL (Settings → Business profile).
- When Paystack gives you `pk_live_...`, paste it here and I drop it into paystack.js + set the secret in Netlify env vars, then it's fully live and collecting to your Access Bank account.

## Files that MUST be in the zip
- index.html  (landing + checkout button)
- paystack.js  (Paystack inline checkout — needs pk_live_ to charge)
- product.html  (member area)
- netlify.toml  (deploy config)
- netlify/functions/verify.js  (server-side payment verify)
- content/  (video packages)
- README.md

Note: `netlify.toml` redirects /api/verify to the function. The function only works once the site is deployed on Netlify (not locally).
