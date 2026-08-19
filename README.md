# The Remote Income System — build & launch pack

A standalone digital product (no Base44, no Google account required to build or sell).
Customers pay via **Paystack**; funds settle to a **Nigerian Naira account**.

## What's in this folder
- `index.html` — the sales/landing page (mobile-first, converts).
- `paystack.js` — Paystack inline checkout. Put YOUR public key in `PAYSTACK_PUBLIC_KEY`.
- `product.html` — the member area buyers unlock after payment.
- `netlify/functions/verify.js` — server-side payment verification (stops fake unlocks).

## Steps to go live (only the parts marked YOU need you)
1. **YOU:** Create a Paystack account (paystack.com) with your business/ID KYC.
   This is the ONLY unavoidable step that needs your identity — money must land in YOUR account.
2. **YOU:** Copy your public key into `paystack.js`, secret key into Netlify env vars.
3. **ME (or you):** Deploy to Netlify: `netlify deploy --prod` (drag the folder in the Netlify UI works too — no code needed).
4. **ME:** Add the weekly opportunities feed content and refresh it.
5. **YOU:** Share the live URL. Customers pay in NGN/USD/card/bank; you get paid to your Naira account (T+1/T+2 settlement).

## Why this doesn't need Google
We are NOT using Base44 for this product. It's plain HTML + Paystack, hostable on Netlify
(own account) or any static host. Your locked Google/Base44 account is irrelevant here.

## Currency note
Default is NGN (₦25,000). To accept USD, enable USD in your Paystack dashboard and set
`currency: "USD"` + amount in cents inside `paystack.js`. Settlement is still to your Naira account.

## Price
₦30,000 one-time. High urgency, low friction — the market (Africans wanting dollar income) pays fast.
