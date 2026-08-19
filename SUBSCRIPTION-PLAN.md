# Remote Income System — Subscription Evolution Plan
## From one-time ₦30k to recurring revenue (the Micro-SaaS lesson)

> Source insight: "10 Digital Assets" ranked recurring software (Micro-SaaS) #1 because
> it serves 100 customers for ~nothing more than 10, bills automatically, and compounds.
> Our one-time ₦30k product is a real asset (#8: digital guide) but it does NOT compound.
> This plan converts it into a compounding engine.

---

## The core problem with one-time ₦30k
- You sell once, earn once. To grow revenue you must keep finding NEW buyers.
- Effort scales with revenue. 100 sales = 100 acquisition pushes.
- Churn-proof? No — there's no recurring relationship, so no compounding LTV.

## The fix: a membership, not a product
Keep the ₦30k as the **entry** (one-time founding offer, includes the core kit).
Then offer a **monthly membership** for the part that's actually "living":

### Tier structure (recommended)
| Tier | Price | What it includes |
|------|-------|------------------|
| **Founding Kit** (one-time) | ₦30,000 | Resume/cover-letter engine, vetted platform list, interview scripts, pitch templates — the static kit |
| **Live Member** (monthly) | ₦4,500/mo | Weekly updated remote-job opportunities feed (real roles hiring from Africa, with pay + apply link), monthly new micro-product drops, private Q&A, the "Mirror Test" job-readiness check |
| **Pro Member** (monthly) | ₦9,000/mo | Everything in Live + 1 done-for-you application review per month + priority in the opportunities feed + group coaching call |

Why these numbers: ₦4,500/mo ≈ $3 — low enough for a Nigerian buyer to say yes on impulse, high enough that 100 members = ₦450k/mo recurring (~$290/mo, compounding as the base grows). 1,000 members = ₦4.5M/mo. That's the billion-scale path, built on the same asset.

---

## What must exist BEFORE we flip the switch
1. **One-time product live & proven** — Paystack `pk_live_` active, Netlify URL up, ≥10 real sales, refund rate <10%. (We are NOT there yet — gated on Paystack review + deploy.)
2. **The "living" content must be REAL, not fake.** The weekly opportunities feed must contain genuine, verified roles (our Global Knowledge Scout + Opportunities agent already produce this daily). If we charge ₦4,500/mo and the feed is stale, that's fraud-adjacent and destroys trust.
3. **Cancellation must be 1-click.** Recurring revenue dies on bad cancellation UX (chargebacks, Paystack flags).
4. **Payment infra:** Paystack subscriptions API (not just one-time). Needs `pk_live_` + `sk_live_` in Netlify env vars + a `/api/subscribe` Netlify Function that creates a Paystack subscription plan and handles webhooks for renewal/failure.

---

## Build sequence (ordered, no shortcuts)
**Phase 0 — Ship the one-time product first.** (Current blocker: Paystack review + your Netlify drop.)
  - Deploy site, wire `pk_live_`, get first 10 sales. Do NOT add subscriptions until this is real.

**Phase 1 — Stand up the membership infrastructure.**
  - Add `netlify/functions/subscribe.js` (creates Paystack plan, returns authorization URL).
  - Add `netlify/functions/webhook.js` (receives Paystack `charge.success` / `subscription.disable` events, updates a members list).
  - Add a `members.html` gated by a simple token issued after successful subscription.
  - Store members in a lightweight store (Netlify Blobs or a Google Sheet via the secret — TBD).

**Phase 2 — Prove the feed is worth paying for.**
  - Run the Global Knowledge Scout + Opportunities agent output for 2 weeks. Manually curate the best 10 roles/week into `content/feed-YYYY-Www.md`.
  - Show this curated feed (free) to your first buyers as a bonus. Measure: do they open it? do they ask for more?

**Phase 3 — Launch the membership.**
  - Only after Phase 2 shows engagement. Offer existing ₦30k buyers a discounted first month (₦2,500) to seed the base.
  - Set the Money Tracker agent to report recurring revenue separately from one-time.

**Phase 4 — Compound.**
  - As base grows, raise Live to ₦6,000, add Pro tier, add a referral commission (members get 1 month free for each signup). Referrals = the cheapest acquisition, and they compound.

---

## Honest risks (straight)
- **Subscription fatigue in NG market:** many buyers resist recurring. Mitigate with low entry (₦4,500) + easy cancel + visible value (real jobs).
- **Feed quality is the whole game.** If the curated roles aren't real/high-quality, the membership collapses. The agents help but a human (you, or me on a schedule) must verify before publish.
- **Paystack subscription limits on Starter:** new Starter accounts may cap monthly volume. Upgrade to Registered (CAC) before scaling past ₦8M/yr.
- **We are not ready today.** The one-time product isn't even live yet. This plan is the TARGET, not the now.

---

## My recommendation
Execute Phase 0 NOW (finish deploy + get `pk_live_`). Build Phase 1 infra in parallel but DON'T launch membership until 10 real one-time sales exist. The subscription is the billion-scale lever — but pulling it early with no proven base is how people burn trust and get Paystack-flagged.

Next concrete step from me: once you send the Netlify URL + `pk_live_`, I'll (a) wire live payments, and (b) scaffold `subscribe.js` + `webhook.js` so Phase 1 is ready the moment Phase 0 clears.
