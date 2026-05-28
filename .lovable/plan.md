
# ViralReel AI — Polish Pass

Five focused improvements across the existing pages. No new routes, no backend.

## 1. Landing page hero
- Add animated aurora/grid background with parallax blobs (Framer Motion).
- Stronger H1 with gradient text + kinetic word reveal.
- Add trust strip (logos), live "viral score" chip animating, and dual CTAs.
- Floating product mockup card with subtle tilt on scroll.

## 2. Dashboard widgets
- Add: "Top performing reel" hero card with thumbnail + viral score.
- Add: AI Recommendations panel (actionable cards w/ Apply buttons).
- Add: Recent renders queue (live status pills).
- Polish existing stat cards with sparklines.

## 3. Upload pipeline
- Multi-stage stepper visual (Upload → Analyze → Caption → Score → Ready) synced to progress.
- Per-file thumbnail preview + estimated viral score on completion.
- Bulk actions bar (pause all, clear completed).
- Success state with "Open in editor" CTA.

## 4. Reel editor timeline
- Zoomable timeline (zoom slider) with time ruler (00:00 ticks).
- Draggable playhead with snap; keyboard hint chips.
- Per-clip handles + waveform on audio track.
- Selected-clip inspector strip above timeline.

## 5. Analytics views
- Add platform breakdown (TikTok/Reels/Shorts) tabs filtering charts.
- Add top reels leaderboard table with viral score badges.
- Add hook/retention heatmap (first 10s).
- Comparison toggle: this period vs previous (dashed line overlay).

## Technical notes
- All work is presentation-only in existing route files + components.
- Reuse `glass`, `glow-*`, gradient tokens from `src/styles.css`.
- New shared components: `Sparkline`, `Stepper`, `Leaderboard`, `Heatmap` under `src/components/`.
- Continue using Recharts + Framer Motion; no new deps expected.
