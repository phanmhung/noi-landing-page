# Nối Landing Page Design

## Objective

Build a polished bilingual landing page for **Nối**, an original, friendly AI gateway brand. The page should explain a self-hosted multi-provider gateway in clear language, borrow broad layout ideas from New API and Tokens1688, and remain visually and textually original. It must run entirely as a static site and deploy correctly to GitHub Pages under a repository subpath.

## Audience and Message

The primary audience is Vietnamese and international developers, small teams, and technical operators who want one manageable connection to multiple model providers. The page should feel welcoming to someone who understands APIs without requiring infrastructure expertise.

The central promise is:

- English: **One connection. Every model.**
- Vietnamese: **Một kết nối. Mọi mô hình.**

Copy must be direct, natural, and practical. It must avoid inflated phrases such as “revolutionary,” “supercharge,” and “unlock the future.” English and Vietnamese content should communicate the same meaning without reading like literal machine translation.

## Brand and Visual Direction

The brand name is **Nối**, including the Vietnamese diacritic. The visual identity uses a rounded connection mark and a calm, human palette:

- Deep navy for primary text and dark surfaces
- Clear blue and teal for the connection motif and primary actions
- Warm cream for page backgrounds
- Coral used sparingly for emphasis

The interface uses generous spacing, softly rounded cards, restrained gradients, crisp borders, and light glass effects. Typography must support Vietnamese diacritics and remain highly legible. Decorative motion should be subtle and must disable itself when the user prefers reduced motion.

The page may take inspiration from the openness of Tokens1688's hero and model cards and from New API's product storytelling. It must not reuse their logos, illustrations, screenshots, proprietary copy, or distinctive branded assets.

## Page Structure

### Navigation

A sticky header contains the Nối logo, links to Models, Features, How It Works, and Documentation, plus:

- English/Vietnamese language toggle
- Light/dark theme toggle
- “Open Console” call to action
- Accessible mobile menu

Section links scroll to content on the same page. Documentation and console actions may use clearly marked placeholder destinations until real product URLs exist.

### Hero

The hero introduces the core promise with concise bilingual copy and two actions: deploy or get started, and view documentation. A lightweight CSS/SVG routing visualization shows several provider nodes flowing through Nối into one application endpoint. It should communicate the product idea without resembling an existing site's artwork.

Provider badges and restrained proof points reinforce broad compatibility without making unverifiable operational claims.

### Trust and Capability Strip

A compact strip highlights factual product concepts supported by the New API reference:

- Multi-provider access
- OpenAI-, Anthropic-, and Gemini-compatible protocols
- Self-hosted deployment
- Usage and cost visibility

Claims should avoid fixed provider counts, uptime promises, customer logos, or invented adoption metrics.

### Model Explorer

The model section uses model names observed on Tokens1688 as sample catalog content, including DeepSeek and Qwen variants. Users can filter cards by practical categories such as coding, reasoning, fast response, and Vietnamese-friendly use.

Any displayed price is explicitly labeled as sample or illustrative data and must not imply live pricing. Filters work locally with no API requests. The empty state provides a friendly reset action.

### Feature Grid

Six focused cards explain:

1. One consistent API endpoint
2. Provider routing and fallback
3. Keys, groups, and access control
4. Usage and cost visibility
5. Protocol conversion
6. Private, self-hosted deployment

Each card uses short, outcome-oriented copy rather than dense technical descriptions.

### Three-Step Workflow

The workflow describes:

1. Connect authorized provider accounts
2. Create one Nối access key for an application or team
3. Monitor requests, reliability, and spend

The content must remind users to use lawfully obtained upstream access without turning the landing page into a legal document.

### API Example

A code panel shows a small OpenAI-compatible request using a fictional Nối base URL and placeholder key. Tabs switch between a command-line example and a short JavaScript example. A copy button offers clear success feedback and degrades gracefully if clipboard access is unavailable.

### Final CTA and Footer

The final section repeats the central promise with a single primary action. The footer includes product links, language access, repository/reference attribution, and a statement that the landing page design and brand are original.

The New API project is referenced as a source for product terminology. The page must not claim to be the official New API website or a modified distribution of its software.

## Architecture

Use Vite, React, and TypeScript. The site has no backend and no runtime dependency on a third-party API.

Components are organized by page responsibility:

- Application shell and section composition
- Navigation and mobile menu
- Language and theme controls
- Hero and routing visualization
- Capability strip
- Model filters and model cards
- Feature cards
- Workflow steps
- API example and copy interaction
- Final CTA and footer

Static product, model, navigation, and translation content lives in typed data modules instead of being repeated inside JSX. A small localization context exposes the active locale and translation data. The selected locale and theme are stored in `localStorage`; unavailable or invalid stored values fall back to English and the system color preference.

CSS custom properties define colors, spacing, typography, radii, shadows, and motion. Responsive layouts cover narrow mobile screens, tablets, laptops, and wide desktops. The mobile layout must not rely on horizontal scrolling.

## Interaction and Accessibility

- All controls are keyboard accessible and display visible focus states.
- Semantic landmarks and heading order describe the page correctly.
- Icon-only controls include accessible names.
- Color contrast should meet WCAG AA for normal text.
- Language changes update the document language attribute.
- Theme and language changes do not reload the page.
- Mobile navigation closes after a section is selected and supports Escape.
- Reduced-motion users receive static transitions and routing artwork.
- Clipboard failures leave the code visible and show a non-blocking message.

## GitHub Pages Deployment

The production build emits static files to `dist`. Vite's base URL is configurable through an environment value and defaults safely for local development. The GitHub Actions workflow determines or supplies the repository subpath so scripts, styles, and other assets resolve when hosted at `https://<owner>.github.io/<repository>/`.

The deployment workflow builds the site and publishes the `dist` artifact using GitHub's supported Pages actions. The README explains local installation, development, production build, preview, Pages configuration, and the base-path mechanism.

## Verification Scope

Verification is deliberately limited to roughly 30% of the effort and concentrates on the most failure-prone behavior:

- One focused automated test for English/Vietnamese switching
- One focused automated test for model filtering and its empty/reset state
- Production build with a non-root repository base path
- Desktop and narrow-mobile browser smoke checks
- Browser console and broken-asset inspection against the production preview

Purely presentational components do not require individual unit tests. Verification must still confirm that both languages render, navigation remains usable, motion preferences are respected, and the production output loads from a subpath.

## Out of Scope

- Authentication, account creation, or a working management console
- Live provider or model APIs
- Live pricing or exchange-rate data
- Payments, subscriptions, or billing workflows
- Backend deployment of New API
- A pixel-for-pixel recreation of either reference site
- Claims of official affiliation with New API, Tokens1688, or their operators

## Success Criteria

The work is complete when:

1. The landing page presents a coherent, original Nối identity in English and Vietnamese.
2. Desktop and mobile layouts are polished and usable.
3. Core interactions—navigation, language, theme, filters, tabs, and copy feedback—work without a backend.
4. The production build loads without missing assets at a repository subpath.
5. The repository contains clear local and GitHub Pages deployment instructions.
6. The agreed focused tests and browser smoke checks pass.
