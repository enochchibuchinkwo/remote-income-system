# Auto-Apply Agent — Framework Spec (Subscription-tier hero feature)

> Validated by the Vaibhav Sisinty / Raj Shamani episode: using Claude + Codex to
> auto-apply to jobs is the single most compelling "AI employee" demo for job seekers.
> This is the planned hero feature of the RIS paid membership tier.

## What it does
Given a buyer's resume + target role, the agent:
1. Scrapes vetted platforms (from the 50-platform list) for matching remote roles.
2. Generates a tailored cover letter + application answers using the RIS prompt engine.
3. Fills and submits applications where the platform allows API/automation.
4. Logs every application + status to the buyer's dashboard.

## Architecture (build-ready)
- `netlify/functions/apply.js` — orchestrator. Receives {email, resume_text, target_role}.
- Uses the RIS prompt engine (resume/cover-letter) to draft materials.
- Platform connectors: start with 2-3 that permit automated apply (e.g. authenticated
  API or documented form post). Each connector isolated so one failure can't break others.
- Rate-limited + human-review option: buyer can set "apply after I approve" mode.

## THE AUTH WALL (honest flag)
Auto-submitting applications requires the BUYER's logged-in session on LinkedIn / Indeed /
the platform. Same boundary as Wondercraft/Paystack: we can build the brain, but the
"press submit" step needs the user's credential or an OAuth the platform grants.
Options:
  A) Buyer pastes a session cookie/token (fragile, ToS risk) — NOT recommended.
  B) Buyer runs a local companion app that holds their session and calls our API — cleanest.
  C) Manual mode: agent drafts everything, buyer clicks submit (no auth needed) — ship first.

## Build order
1. Draft-only mode (C) — ships with subscription launch, zero auth.
2. Local companion (B) — next phase, after 50 paid members.
3. Direct connectors (A) — only for platforms with official API + buyer OAuth.

This file is the spec. Code lands in Phase 3 of SUBSCRIPTION-PLAN.md, not before the
one-time product is proven (10 real sales).
