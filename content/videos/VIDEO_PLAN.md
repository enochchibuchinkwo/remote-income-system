# Week 34 Video Production Plan — Remote Income System + FitCopy

**Generated:** 2026-08-17 (Monday, Week 34)
**Status:** PLAN COMPLETE · ASSET GENERATION BLOCKED (billing/infra down)

---

## ⚠️ Generation Blocker (honest status)
All media backends are currently unavailable — this is the "when billing resets" condition flagged in the task context:

| Backend | Tool | Error | Meaning |
|---|---|---|---|
| FAL image | `image_generate` | HTTP 402 | Billing suspended, no `FAL_KEY` |
| FAL video | `video_generate` (Pixverse v6) | HTTP 403 | Model not enabled on Nous Portal proxy |
| BFL video | `bfl_flux3_*` (FLUX 3) | DNS resolution failed | Gateway unreachable |

**Impact:** Video files and thumbnail images are NOT generated. URLs below are `PENDING`. No fabricated assets are included. Once billing resets (run `hermes model` to refresh / set `FAL_KEY`), re-run this agent to fill the `PENDING` slots. Keyframe concepts are pre-written and ready.

---

## Frameworks Applied
- **Richard Yu outlier-hunt** — for each video I isolated the *contrarian, non-consensus* hook that separates it from generic "make money online" content. The outlier is the rejected belief, not the tactic.
- **OpenMontage (Sharbel)** — "negotiate concepts before spending." Because budget is blocked anyway, the keyframe storyboards below are presented for your approval BEFORE any generation credits are burned. Confirm or tweak, then generate.

---

## Asset Status Summary
| # | Product | Video URL | Thumbnail URL | Caption | Schedule |
|---|---|---|---|---|---|
| 1 | RIS | PENDING | PENDING | ✅ in plan | Mon 8/17 19:00 WAT |
| 2 | RIS | PENDING | PENDING | ✅ in plan | Tue 8/18 19:00 WAT |
| 3 | FitCopy | PENDING* | PENDING* | ✅ in plan | Wed 8/19 19:00 WAT |
| 4 | FitCopy | PENDING* | PENDING* | ✅ in plan | Thu 8/20 19:00 WAT |

\*FitCopy videos 1 & 2 share **identical scenes** in the plans — I generate ONE shared asset set (1 video + 1 thumbnail) and post it twice with the schedule above. Flag if you want two distinct cuts instead.

---

## VIDEO 1 — RIS — "The Visa/Degree Lie"
**Outlier-hunt hook:** Attack the consensus belief "Africans need a visa, a degree, or 5 yrs experience." The outlier: it's a *system* (portfolio + platforms + follow-up), not credentials.

**Caption (from plan):**
> 🇳🇬 Africans landing $3k–$10k/mo remote jobs isn't luck — it's a system.
>
> Stop guessing. Start building.
>
> Full system in bio → Remote Income System
>
> #RemoteWorkAfrica #DigitalNomadAfrica #WorkFromNigeria #RemoteJobs #FreelanceAfrica #USDIncome

**Keyframe storyboard (OpenMontage — approve before generating):**
1. *Open:* young African professional, doubtful look, laptop, "everyone says you need a visa…" overlay-style mood, cool blue-grey light.
2. *Turn:* same person, confident, finger up, warm light shift — "that's wrong."
3. *Proof:* spreadsheet/calendar glimpse, 12 interviews, golden hour.
4. *CTA:* calm satisfied lean-back, link-in-bio gesture, clean bright.
- **Video gen:** `bfl_flux3_keyframes_to_video` (9:16, ~15s, 4 pins) or `video_generate` image-to-video per keyframe; **Thumbnail:** bold red/black, no text, hopeful eye contact (concept already drafted).

**Video URL:** `PENDING (billing blocked)` · **Thumbnail URL:** `PENDING (billing blocked)`

---

## VIDEO 2 — RIS — "The $30–$80/hr Platform + 3-Step Method"
**Outlier-hunt hook:** A specific platform *already* hires Africans at USD rates — the outlier is that nobody talks about the *paid-trial close* and *value-add follow-up*, the two steps that actually convert.

**Caption (from plan):** same RIS caption as Video 1.

**Keyframe storyboard (OpenMontage — approve before generating):**
1. *Reveal:* shocked-delight face at laptop showing rate "$30–$80/hr", red/gold split light.
2. *Step 1:* setting up profile, USD-rate positioning text-feel, focused.
3. *Step 2:* applying to 10 roles, quick cuts of application tabs.
4. *Step 3:* follow-up message sent, reply notification glow, triumphant.
- **Thumbnail:** bold red/black, surprised joyful expression, no text.

**Video URL:** `PENDING (billing blocked)` · **Thumbnail URL:** `PENDING (billing blocked)`

---

## VIDEO 3 & 4 — FitCopy — "$3,200 in 72 Hours from One Email"
**Outlier-hunt hook:** The coach didn't win because she trains better — the outlier is that her *copy* sells. Reframes the product from "coaching tool" to "the thing that prints the revenue."

**Caption (from plan):**
> 🏋️ Your copy is losing you clients.
>
> FitCopy Engine = AI sales page + emails + DM scripts + retention system.
>
> $47 replaces your $2,000 copywriter.
>
> Link in bio → FitCopy Engine
>
> #FitnessCoach #OnlineCoaching #PersonalTrainer #FitnessBusiness #CopyThatSells #AIforCoaches

**Keyframe storyboard (shared, OpenMontage — approve before generating):**
1. *Open:* fit coach, mid-laugh triumph, phone showing rising income graph, yellow/black.
2. *Pivot:* "not a better trainer — better copy," confident smirk, pointing at camera.
3. *Tool:* AI sales page generator on screen, glow.
4. *CTA:* link-in-bio gesture, energetic.
- **Thumbnail:** yellow/black triumphant OR red/black smirk — pick one.

**Video URL (shared):** `PENDING (billing blocked)` · **Thumbnail URL (shared):** `PENDING (billing blocked)`

---

## Posting Schedule — Week 34 (WAT = West Africa Time)
Cross-post each asset to **YouTube Shorts, TikTok, Instagram Reels** simultaneously.

| Day | Date | Time | Video | Platforms |
|---|---|---|---|---|
| Mon | Aug 17 | 19:00 WAT | RIS #1 (Visa Lie) | Shorts + TikTok + Reels |
| Tue | Aug 18 | 19:00 WAT | RIS #2 (Platform/3-Step) | Shorts + TikTok + Reels |
| Wed | Aug 19 | 19:00 WAT | FitCopy (shared) | Shorts + TikTok + Reels |
| Thu | Aug 20 | 19:00 WAT | FitCopy (shared, 2nd cut) | Shorts + TikTok + Reels |

*Rationale: 19:00 WAT catches after-work scroll for the Africa/remote-work audience; weekday consistency trains the algorithm. Adjust to your audience's timezone once analytics come in.*

**Pre-post checklist (per skill quality gates):**
- [ ] Verify thumbnail spelling with `vision_analyze` before delivery (no on-thumbnail text used here, so N/A — but confirm no stray artifacts)
- [ ] Mark any metric UNVERIFIED if not from real data (12 interviews / $3,200 are from plan source — confirm they are real before posting)
- [ ] Add micro-influencer outreach (50k–500k, high-trust) alongside each post — distribution > tech

---

## Next Actions
1. **Billing:** run `hermes model` to refresh Nous Portal login/billing; once green, re-run generation to fill `PENDING` URLs.
2. **Approval:** confirm the 3 keyframe storyboards above (OpenMontage negotiate-before-spend).
3. **Handles (needed before posting):** provide your YouTube / TikTok / Instagram handles (see separate prompt).
