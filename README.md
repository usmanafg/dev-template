# Dev Template

A zero-build, single-page developer portfolio template tailored for Roblox programmers, systems engineers, and technical creators.

All visuals, benchmarks, frame-budget meters, and Luau system blueprints are rendered directly with semantic HTML, CSS, and interactive JavaScript from a single configuration file, with **zero external image or video assets required**.

## Features

- **Single-Config Editing**: Customize your identity, bio, benchmarks, shipped experiences, interactive packet telemetry, Luau code blueprints, tech stack, and availability inside [`portfolio.config.js`](portfolio.config.js).
- **Zero Image / Video Dependencies**: Built around pure code instrumentation: clickable byte-layout telemetry, frame-time gauges, bar comparisons, architecture pipelines, and Luau syntax cards.
- **Scroll-Driven Acts (`ScrollCraft`)**: Powered by [`scrollcraft.css`](scrollcraft.css) and [`scrollcraft.js`](scrollcraft.js) with entrance cues, pinned benchmark storytelling, horizontal blueprint panning, animated counters, and full `prefers-reduced-motion` support.
- **Accessible & Zero-Build**: Static HTML/CSS/JS that opens anywhere, includes keyboard-friendly accordion/project/telemetry controls, and deploys straight to GitHub Pages with no bundler.

## Project Structure

```text
.
├── index.html            # Semantic sections and ScrollCraft act layout
├── styles.css            # Design tokens, typography, layout, and component styling
├── scrollcraft.css       # ScrollCraft layout & cue animation engine (do not edit)
├── scrollcraft.js        # ScrollCraft intersection, pin, pan & counter runtime (do not edit)
├── app.js                # Hydrates portfolio.config.js into the DOM & mounts ScrollCraft
├── portfolio.config.js   # Your personal data, projects, telemetry & Luau blueprints
├── LICENSE               # MIT License
└── README.md             # Template guide
```

## Quick Start

1. **Use or clone this repository**:
   ```bash
   git clone https://github.com/usmanafg/dev-template.git my-portfolio
   cd my-portfolio
   ```
2. **Preview locally** using any static server:
   ```bash
   python3 -m http.server 8080
   ```
   Then open `http://localhost:8080` in your browser.

> **Tip:** Opening `index.html` over `http://localhost` (rather than `file://`) ensures consistent browser behavior and matches production hosting.

## How to Customize

Open [`portfolio.config.js`](portfolio.config.js) and edit the `window.PORTFOLIO_CONFIG` object. Every section updates automatically on reload.

### 1. Site Metadata (`meta`)
Update `<title>`, meta description, and the footer copyright line:
- `meta.title`: Browser tab title (e.g., `"YourName · Roblox Systems Developer"`).
- `meta.description`: SEO summary shown in search results and link previews.
- `meta.copyright`: Footer notice.

### 2. Hero Profile & Interactive Telemetry (`profile`)
- `profile.eyebrow`, `profile.name`, `profile.headline`, `profile.roleSummary`: Top banner copy.
- `profile.primaryCta` / `profile.secondaryCta`: Hero buttons linking to `#work`, `#contact`, or external URLs.
- `profile.tracks`: Three highlight pills shown beneath the hero headline.
- `profile.telemetry`: Powers the live interactive replication inspector in the hero:
  - `label`, `note`, `packetSizeBytes`
  - `serverFrameMs`, `budgetMs`: Frame budget indicator bar
  - `fields`: Interactive packet layout blocks (`name`, `bits`, `type`, `detail`). Clicking any field updates the byte-field inspector below the meter.

### 3. About & Engineering Guarantees (`about`)
- `about.eyebrow`, `about.heading`, `about.paragraphs`: Bio narrative paragraphs.
- `about.standardsLabel`, `about.standards`: Key architectural guarantees rendered in the right-hand card (`label`, `value`, `detail`).

### 4. Metrics & Frame-Time Benchmarks (`stats`)
- `stats.eyebrow`, `stats.heading`, `stats.lead`: Section intro.
- `stats.highlights`: Three animated headline counters (`value`, `label`, `note`).
- `stats.benchmarksLabel`, `stats.benchmarks`: Horizontal comparative bars showing measured frame-time or size improvements (`label`, `beforeMs`, `afterMs`, `unit`, `note`).

### 5. Featured Experiences (`work`)
- `work.preview`: Controls the interactive architecture inspector panel beside the project ledger, including the CCU benchmark slider (`minCcu`, `maxCcu`, `defaultCcu`).
- `work.items`: Array of project entries. Each project supports:
  - `title`, `badge`, `url` (Roblox experience or repository URL), `year`, `role`, `visits`, `summary`
  - `metrics`: Three compact stat callouts per project
  - `frameBudgetMs`: Measured server tick duration displayed in the inspector
  - `pipeline`: Multi-stage system data-flow list (`step`, `detail`)
  - `tags`: Short technical labels

### 6. System Blueprints Horizontal Showcase (`showcase`)
- `showcase.eyebrow`, `showcase.heading`, `showcase.lead`: Intro for the horizontal scroll pan act.
- `showcase.frames`: Array of code-driven Luau module cards (`title`, `module`, `category`, `summary`, `metrics`, `codeSample`). When scrolling on desktop, the horizontal rail pans smoothly across these blueprints; on reduced-motion mode or narrow viewports, it falls back cleanly to a readable horizontal/stacked container.

### 7. Core Stack (`stack`)
- `stack.eyebrow`, `stack.heading`: Section intro.
- `stack.pillars`: Expandable accordion groups covering your architecture principles, tooling, networking, and security practices (`title`, `summary`, `tags`).

### 8. Contact & Availability (`contact`)
- `contact.eyebrow`, `contact.heading`, `contact.lead`: Closing pitch.
- `contact.email`: Used in the direct email CTA and copy-to-clipboard action.
- `contact.availability`: Structured availability summary card (`status`, `timezone`, `engagement`, `stackNote`).
- `contact.socials`: Footer & contact links (`label`, `handle`, `url`). Note: Replace placeholder handles/URLs (such as `#contact`) with your real Roblox Profile, GitHub, X, or DevForum URLs before publishing.

## Customizing Colors & Typography

Design tokens live at the top of [`styles.css`](styles.css) under `:root`:

- `--bg`, `--bg-card`, `--bg-inset`: Tinted stone paper backgrounds (`#ebe5e3`, `#f3efed`, `#e1dad7`)
- `--ink`, `--ink-muted`, `--ink-dim`: Charcoal ink hierarchy
- `--accent`: Deep emerald accent (`#0a6436`) used sparingly for interactive highlights and positive deltas
- `--font-sans`, `--font-mono`: Typography stacks (monospace is scoped to telemetry/code elements)

Keep [`scrollcraft.css`](scrollcraft.css) and [`scrollcraft.js`](scrollcraft.js) unmodified so scroll triggers, pin spacing, pan transforms, and accessibility fallbacks continue working reliably.

## Deploying to GitHub Pages

1. Push your customized files to GitHub.
2. Open your repository **Settings -> Pages**.
3. Under **Build and deployment**, select **Deploy from a branch** -> `main` -> `/ (root)`.
4. Click **Save** and wait ~1 minute for your live URL (`https://<username>.github.io/<repo>/`).

## License

Released under the [MIT License](LICENSE).
