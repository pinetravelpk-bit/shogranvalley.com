# Elegant theme & video hero (October 2026)

## What changed
- **Logo**: `public/brand/shogran-valley-logo.png` (header) and `public/brand/shogran-valley-logo-light.png` (cream/gold version for the dark footer).
- **Typography**: Cormorant Garamond (headings) + Jost (body), self-hosted through `@fontsource` — no Google Fonts request at runtime.
- **Palette**: deep forest green and wine taken from the logo, with ivory backgrounds and antique-gold accents. All overrides live in `app/theme.css`, loaded last in `app/layout.jsx`; delete that import to return to the previous look.
- **Hero slider**: one continuous aerial film plays behind the three rotating text slides (`components/TravelExperience.jsx`).

## Hero video
- Source clip trimmed to **0:00–0:57**, denoised, deblocked and upscaled from 400×224 to **1920×1080**, with mild colour and sharpening.
  - `public/travel/shogran-hd-1080.mp4`: desktop (~23 MB)
  - `public/travel/shogran-hd-720.mp4`: phones and data-saver connections (~11 MB)
  - `public/travel/shogran-hero-poster.jpg`: first frame, shown until the video starts and for reduced-motion visitors
- The video loops at 57 seconds. The file itself is 57 s long, and `LOOP_END = 57` in `TravelExperience.jsx` also forces a jump back to 0:00, so a longer replacement file still loops at 0:57.
- To replace the film, overwrite the two MP4 files (H.264, muted) and the poster, keeping their names.

The original clip was 400×224. Upscaling makes it sharp at full-screen size, but it cannot recover detail the camera never recorded. Use original 1080p/4K drone footage for full HD detail.
