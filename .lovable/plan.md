# ViralReel AI — Ultra Features Pack (Frontend Only)

Presentation-only build. No backend, no data persistence. All metrics are simulated client-side with Framer Motion + Recharts + SVG. Reuses existing `glass`, `glow-*`, gradient tokens; adds holographic accents.

## Information architecture

Group the 20 features into 8 new routes + upgrades to existing routes, all reachable from an expanded sidebar organized into sections: **Create**, **Intelligence**, **Growth**, **Business**.

```text
Sidebar
├── Create
│   ├── Dashboard (Creator OS upgrade)
│   ├── Upload
│   ├── Editor (Brainrot + MrBeastify added)
│   ├── Multi-Reel Factory      [new /factory]
│   └── Faceless Empire         [new /faceless]
├── Intelligence
│   ├── Clone Studio            [new /clone]            — AI Creator Clone
│   ├── Brain Scanner           [new /brain]            — TikTok Brain Scanner + Dopamine Graph + Emotion Sim
│   ├── Scroll Physics          [new /scroll-physics]   — Scroll sim + Replay Predictor + Attention Hacker
│   └── Thumbnail Lab           [new /thumbnails]       — Face Analyzer + "Feels Like" comparison
├── Growth
│   ├── Attention Economy       (replaces /analytics)   — Attention dashboard + Replay timeline
│   ├── Trends (Future Radar upgrade)
│   ├── Evolution               [new /evolution]        — Reel V1→V2→V3
│   ├── Shadowban Radar         [new /shadowban]
│   └── Leaderboards            [new /leaderboards]
└── Business
    ├── Brand Deals             [new /deals]            — Brand Deal Optimizer
    └── Pricing
```

## New routes

1. **/clone — AI Creator Clone.** Style fingerprint card (editing style, voice, hook pattern, subtitle rhythm, pacing) shown as animated radial bars. Big "Generate in my style" CTA, training-progress orb, sample reel grid labeled "Cloned".
2. **/brain — TikTok Brain Scanner.** Animated brain SVG with pulsing neural nodes. Panels: Viewer Psychology report, Dopamine Graph (area chart with hype/boredom/spikes layers), Viewer Emotion Simulation (multi-line chart across timeline: excitement/boredom/laughter/shock/hype with emoji markers).
3. **/scroll-physics — Scroll Physics AI.** Phone mockup with animated thumb cursor simulating scroll; per-second probability bars for thumb-stop vs swipe-away. Side: Replay Probability timeline (heat-bar across 0–60s), Attention Traps list, Attention Hacker report card.
4. **/thumbnails — Thumbnail Lab.** Grid of generated thumbnail variants with overlay metrics (eye-contact %, emotion, curiosity, CTR prediction). "Feels Like" panel: horizontal bars comparing to MrBeast / Hormozi / Documentary / Meme / Gaming.
5. **/factory — AI Multi-Reel Factory.** Upload-one-long-video hero. Production dashboard: 20-card grid, each card = hook + thumbnail + caption + hashtag chips + viral score. Bulk actions: regenerate, schedule all.
6. **/faceless — Auto Faceless Empire.** Pipeline stepper (Script → Voice → B-roll → Captions → Thumbnail → Schedule) with toggles, voice waveform preview, niche selector, output queue.
7. **/evolution — Reel Evolution System.** Three stacked cards V1/V2/V3 with rising retention curves and diff annotations ("+12% hook strength", "captions enlarged"). Auto-evolve toggle.
8. **/shadowban — Shadowban Risk Detector.** Risk gauge (0–100), four sub-meters (reach, spam, copyright, suppression), flagged-elements list with fix suggestions.
9. **/leaderboards — Creator Leaderboards.** Podium top-3, ranked table with viral/retention/hook/attention scores, your-rank highlight, weekly tier badges.
10. **/deals — Brand Deal Optimizer.** Sponsor-slot timeline on a reel, CTA effectiveness donut, ad retention impact line, monetization score.

## Upgrades to existing routes

- **/dashboard → Creator OS.** Add tiles: Content Pipeline (kanban-mini), Trend Radar (mini), Monetization Tracker, Sponsor Slots, Posting Schedule strip, Growth AI suggestions, Viral Prediction Center.
- **/analytics → Attention Economy.** Reframe stat cards to Attention Captured / Attention Lost / Efficiency / Dopamine Score / Curiosity Retention. Keep existing heatmap; add Replay Probability ribbon.
- **/trends → add Future Trend Radar.** Animated SVG radar sweep with rising meme/format blips, "predicted to peak" labels.
- **/editor → add two toggles in the inspector.** "Brainrot Mode" neon switch and a glowing "MrBeastify This Reel" button that triggers an overlay showing applied optimizations.

## Shared components to add

Under `src/components/`:

- `holo-card.tsx` — glass card with animated holographic gradient border.
- `dopamine-graph.tsx` — stacked area chart (Recharts) with neon gradients.
- `radar-sweep.tsx` — SVG radar with rotating sweep + blips.
- `neural-brain.tsx` — animated SVG brain with pulsing nodes (Framer Motion).
- `phone-scroll-sim.tsx` — phone frame with animated thumb cursor.
- `risk-gauge.tsx` — semicircular gauge.
- `score-bar.tsx` — labeled animated bar (used by Clone, Thumbnails, Deals).
- `replay-timeline.tsx` — horizontal heat-ribbon timeline.
- `version-diff-card.tsx` — V1/V2/V3 comparison card.
- `leaderboard-row.tsx` — ranked row with badges.

## Design system additions

In `src/styles.css`:

- Holographic gradient token (`--gradient-holo`: cyan→magenta→violet→cyan loop) and `.holo-border` utility (animated conic-gradient border).
- `--glow-holo` shadow, `.text-holo` animated gradient text, scanline overlay utility `.scanlines`.
- Extra accents kept on existing oklch palette — no raw hex in components.

## Sidebar + routing

Update `src/components/app-shell.tsx` to a sectioned sidebar (Create / Intelligence / Growth / Business) with collapsible groups, badge chips ("NEW", "BETA"). Add the 10 new route files under `src/routes/` following flat dot convention. Each route gets its own `head()` meta.

## Technical notes

- Presentation only — all numbers are local `useState` / `useMemo` with simulated tweens.
- Reuse Recharts + Framer Motion; no new deps expected.
- Continue using semantic tokens — no raw colors in components.
- Keep route files lean; push visuals into the new shared components above.

## Out of scope

Backend, persistence, real AI calls, auth, payments wiring. Editor's actual video manipulation. All buttons are visual + toast-level feedback only.