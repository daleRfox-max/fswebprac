# AGENTS.md - Frontend Website Rules

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Use real content/assets where available and placeholders only where needed.
- If no reference image: design from scratch with high craft and use the brand/project assets in the repo.
- Screenshot output from localhost, compare, fix mismatches, and re-screenshot. Do at least 2 rounds when visual changes are made.

## Local Server
- **Always serve on localhost** - never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`).
- If the server is already running, do not start a second instance.

## Screenshot Workflow
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png`.
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` -> saves as `screenshot-N-label.png`.
- After screenshotting, inspect the PNG from `temporary screenshots/`.
- Check spacing, padding, font size, weight, line height, colors, alignment, border radius, shadows, image sizing, and mobile layout.

## Output Defaults
- This project is no longer landing-page-only. Use a multi-page static site when it improves search traffic, service clarity, internal linking, and local SEO.
- Keep shared styling in `site.css` and shared behavior in `main.js` unless the user requests a single-file prototype.
- Use real local brand/project images before placeholders.
- Keep pages mobile-first, fast, crawlable, and useful as standalone search results.
- Use unique page titles, unique meta descriptions, canonical URLs, sitemap entries, descriptive image alt text, and structured data where it matches visible page content.

## Brand Assets
- Always check project assets before designing. Use the logo and real project photos when available.
- If a color palette is defined, use those exact values. Do not invent unrelated brand colors.

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind blue/indigo as the primary brand color.
- **Shadows:** Use layered, color-tinted shadows with low opacity.
- **Typography:** Pair a display/serif heading voice with a clean sans body voice.
- **Gradients:** Use layered gradients and subtle texture where appropriate.
- **Animations:** Only animate `transform` and `opacity`. Never use `transition-all`.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states.
- **Images:** Use real project images with readable overlays when text sits on top.
- **Spacing:** Use intentional, consistent spacing tokens.
- **Depth:** Surfaces should have a clear layering system: base -> elevated -> floating.

## Hard Rules
- Do not push any changes to GitHub unless the user specifically asks.
- Do not use `transition-all`.
- Do not add fake credentials, claims, reviews, awards, licenses, hours, or service guarantees that are not provided.
- Keep NAP details consistent across the site: F&S Construction and Septic LLC, 50 W. Sentry Drive, Shelton, WA 98584, 360-229-1220, info@fsconstructionseptic.com.
