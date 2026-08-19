# Email Retention & Recovery Flows (the money leak we were ignoring)

> From Patrick Dang's side-hustle video: email monetization/retention scored 21/25 —
> most brands sit on dead lists. We have a buyer + lead list forming and ZERO automation.
> This spec fixes that. Flow logic lives server-side; the provider is pluggable.

## Flows to build (in order)
1. **Abandoned-cart recovery** — if a lead captures email but no successful payment in 30 min:
   Email 1 (1h): "Your access is one tap away" + pay link.
   Email 2 (24h): objection-buster (FAQ: "is this real?", "will it work for my field?").
   Email 3 (72h): soft deadline + guarantee reminder.
2. **Welcome + delivery** — on successful payment: instant access email + how-to + feed link.
3. **Weekly digest** — every Monday: the Opportunities agent's verified feed, emailed to buyers.
   (This is the "living product" promise delivered to the inbox — drives retention + referrals.)
4. **Win story / referral** — ask buyers who landed a role to share; offer ₦2k referral per sale.

## Provider (plug-in, your choice)
We need a transactional + broadcast email provider. Options:
- **Brevo (free tier 300/day)** — simplest, no card. RECOMMENDED to start.
- **MailerLite, Mailchimp** — alternatives.
- Netlify Blobs already stores leads (see netlify/functions/subscribe.js) — that's our list source.

## Integration
- subscribe.js already stores leads → feed them into the provider via API on first sync.
- On payment webhook (Paystack), flip lead → customer, trigger welcome flow.
- Weekly: Opportunities agent output → provider broadcast to customer segment.

## Honest note
This needs a provider API key (one more credential, same wall). Until then, the
subscribe.js capture + Blob store is LIVE and collecting leads — no leak at capture.
The recovery emails start the moment you paste a Brevo (or similar) API key.
