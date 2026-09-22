# 329 Grooming Lounge — website

Static HTML/CSS/JS. No build step: open `index.html` or drop the folder on any
static host.

**The site is now fully rebranded — real photos, real video, real Instagram
stats, no placeholder text left anywhere.** See "What's left" below for the
handful of things that still need a decision from 329.

## Structure

```
index.html        the page
css/base.css      design tokens, reset, primitives
css/sections.css  per-section layout + mobile nav
css/fonts.css     82 @font-face rules -> assets/fonts
js/main.js        scroll reveals, FAQ accordion, marquee, mobile menu
assets/           images, video, fonts, icons
```

Sections: hero → about → services → reviews → FAQ → footer.

## What's real now

- **Logo**: pulled from 329's own Instagram profile picture
  (`assets/images/329-logo.png`), wired into the nav, mobile menu, footer
  crest, and favicon — real transparency, no artifacts.
- **Hero background video**: two clips sourced and trimmed from 329's own
  Instagram reels (an interior tour — pool table, hookah lounge, bar — and a
  real haircut in progress), joined into one 32s loop with no on-screen text.
  `assets/video/329-hero-bg.mp4`.
- **Hero strip + About + Services photos**: real 329 photos and video stills —
  pool table, lounge ambiance, a barbering session, the storefront sign, and
  a real photo of the retail shelf (Vaseline, body lotions, etc.) for the
  Products card.
- **Reviews section**: rebuilt as real Instagram numbers (327 followers, 23
  posts, open since 2025) instead of a fabricated customer quote — there was
  no verified review to use, so nothing was invented.
- **Footer**: the oversized wordmark block is gone; Stay Connected /
  Navigation / Social Media are now laid out in a balanced 3-column grid
  instead of the old scattered fixed-width columns.
- Services list, hours, full address (64 Oba Molaja Ogunlewe Road, Igbogbo,
  Ikorodu, Lagos), phone/WhatsApp (**0916 890 0095**, live `tel:` link),
  TikTok + Instagram socials, starting price (₦5,000).
- FAQ answers products (yes, they retail — see the shelf photo) and careers
  (DM on Instagram) for real; the franchise and home-visit questions were
  removed rather than answered, since there's no confirmed policy for either.

There's no formal booking system, so every CTA reads **Message Us** and links
to the Instagram profile.

## What's left

Nothing marked `TODO` or `PLACEHOLDER` remains in the file — everything
visible is either a verified fact or was removed rather than invented. A few
things would still make the site stronger if 329 can supply them:

- Per-service durations and individual prices (only the ₦5,000 starting-from
  figure is confirmed)
- A real customer review/testimonial, if 329 wants one back in the Reviews
  section
- Dedicated photos for Facials, Pedicure, and the Lounge service card — these
  three still use photos from the original reference-site shoot (no
  matching real 329 photo was available on Instagram at the time)
- `og:url` once a domain exists
- Whether 329 wants a franchise or home-visit policy published — those FAQ
  questions were dropped rather than guessed at

### Sections removed (from the original reference template)

**Awards** and **Franchising** are gone — both were built entirely from the
reference business's specifics and don't transfer. The **mobile app**
section is gone too, along with its nav/footer links and store-download
buttons.

## Notes

- Nav is fixed with a translucent blurred background, so it stays legible
  over any hero content while scrolling
- Nav swaps to a Menu pill + full-screen panel below 1440px
- `prefers-reduced-motion` honoured
- Social links: Instagram + TikTok, both @329groominglounge
- No booking system — every CTA reads "Message Us" and opens the Instagram
  profile; phone/WhatsApp is also live wherever contact info appears
