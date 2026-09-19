# Nối Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an original bilingual Nối product landing page that works as a static site and deploys correctly beneath a GitHub Pages repository subpath.

**Architecture:** A Vite React application composes focused page-section components from typed content modules. A small preferences context owns locale and theme persistence, while model filtering and code-sample tabs remain local component state. CSS custom properties and section-level styles provide the responsive visual system without a UI framework or copied assets.

**Tech Stack:** React, TypeScript, Vite, CSS, Vitest, Testing Library, GitHub Actions Pages

**Spec:** `docs/superpowers/specs/2026-09-19-noi-landing-page-design.md`

## Global Constraints

- The public brand is **Nối**, including the Vietnamese diacritic.
- English tagline: **One connection. Every model.**
- Vietnamese tagline: **Một kết nối. Mọi mô hình.**
- The site must be fully static with no backend or runtime third-party API calls.
- All visible copy must be intentionally written in both English and Vietnamese.
- Do not copy logos, illustrations, screenshots, proprietary copy, or branded assets from the reference sites.
- Model prices must be labeled as illustrative rather than live.
- Motion must respect `prefers-reduced-motion`.
- Production assets must resolve from a non-root GitHub Pages repository subpath.
- Automated tests are limited to locale switching and model filtering; presentation is verified through browser smoke checks.

## Review Focus

- Invalid persisted locale values must fall back to English instead of rendering missing copy; covered in Task 1 preference tests.
- A user with no model-filter matches must see a reset action that restores all cards; covered in Task 3 model explorer tests.
- Repository subpaths must not break JavaScript, CSS, or in-page navigation; covered in Task 4 production preview checks.
- Narrow screens must not overflow horizontally and the mobile menu must remain keyboard usable; covered in Task 4 mobile smoke checks.
- Clipboard denial must leave the example readable and show non-blocking feedback; covered by the Task 3 manual interaction check.

---

### Task 1: Project Foundation and Preference Layer

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/vite-env.d.ts`
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Create: `src/i18n/types.ts`
- Create: `src/i18n/content.ts`
- Create: `src/context/PreferencesContext.tsx`
- Create: `src/test/setup.ts`
- Test: `src/context/PreferencesContext.test.tsx`

**Interfaces:**
- Produces: `Locale = 'en' | 'vi'`, `Theme = 'light' | 'dark'`, `usePreferences(): PreferencesValue`, and `messages: Record<Locale, SiteMessages>`.
- Consumes: Browser `localStorage`, `matchMedia`, and `document.documentElement` only.

- [ ] **Step 1: Initialize source control and write the minimal project manifest**

Run `git init -b main` because the workspace is not currently a Git repository. Create `package.json` with scripts and dependencies:

```json
{
  "name": "noi-landing-page",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@vitejs/plugin-react": "latest",
    "vite": "latest",
    "typescript": "latest",
    "react": "latest",
    "react-dom": "latest"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "latest",
    "@testing-library/react": "latest",
    "@testing-library/user-event": "latest",
    "@types/node": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "jsdom": "latest",
    "vitest": "latest"
  }
}
```

Run: `npm install`

Expected: `package-lock.json` is created and installation exits successfully.

- [ ] **Step 2: Configure TypeScript, Vite, and the HTML shell**

Configure `vite.config.ts` so local development uses `/` and production accepts a repository subpath:

```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/',
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
})
```

Set strict TypeScript options, DOM libraries, React JSX, and no emitted TypeScript files. Add an `index.html` with `lang="en"`, a responsive viewport, cream theme color, Nối description, and `/src/main.tsx` module entry.

- [ ] **Step 3: Write the failing preference tests**

Test a small consumer inside `PreferencesProvider`:

```tsx
function PreferenceProbe() {
  const { locale, setLocale } = usePreferences()
  return (
    <>
      <span>{locale}</span>
      <button onClick={() => setLocale('vi')}>Vietnamese</button>
    </>
  )
}

it('switches locale, persists it, and updates the document language', async () => {
  render(<PreferencesProvider><PreferenceProbe /></PreferencesProvider>)
  await userEvent.click(screen.getByRole('button', { name: 'Vietnamese' }))
  expect(screen.getByText('vi')).toBeInTheDocument()
  expect(localStorage.getItem('noi-locale')).toBe('vi')
  expect(document.documentElement.lang).toBe('vi')
})

it('falls back to English for an invalid stored locale', () => {
  localStorage.setItem('noi-locale', 'invalid')
  render(<PreferencesProvider><PreferenceProbe /></PreferencesProvider>)
  expect(screen.getByText('en')).toBeInTheDocument()
})
```

- [ ] **Step 4: Run the tests to verify they fail**

Run: `npm test -- src/context/PreferencesContext.test.tsx`

Expected: FAIL because the context modules do not exist.

- [ ] **Step 5: Implement typed bilingual content and preferences**

Define the public types:

```ts
export type Locale = 'en' | 'vi'
export type Theme = 'light' | 'dark'

export interface SiteMessages {
  nav: { models: string; features: string; process: string; docs: string; console: string }
  hero: { eyebrow: string; title: string; description: string; primary: string; secondary: string }
  capabilities: Array<{ title: string; detail: string }>
  models: { eyebrow: string; title: string; description: string; all: string; empty: string; reset: string; samplePrice: string }
  features: { eyebrow: string; title: string; items: Array<{ title: string; description: string }> }
  process: { eyebrow: string; title: string; steps: Array<{ title: string; description: string }> }
  api: { eyebrow: string; title: string; description: string; copy: string; copied: string; copyFailed: string }
  cta: { title: string; description: string; action: string }
  footer: { note: string; attribution: string }
  controls: { language: string; theme: string; menu: string; closeMenu: string }
}
```

Implement complete `en` and `vi` message objects. Use natural translations such as “Kết nối các nhà cung cấp bạn đã được cấp quyền sử dụng” instead of mirroring English word order.

Implement `PreferencesProvider` with:

```ts
export interface PreferencesValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  theme: Theme
  toggleTheme: () => void
  copy: SiteMessages
}
```

Validate stored locale/theme values, fall back to English and system color preference, persist changes, and synchronize `html.lang` plus `html[data-theme]`.

- [ ] **Step 6: Add global design tokens and application entry**

Define color, type, spacing, radius, shadow, container, and motion variables in `tokens.css`. Define reset, body, link, button, focus, selection, smooth scrolling, reduced-motion, and reusable container/section classes in `global.css`. Use a system-first font stack that supports Vietnamese:

```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Mount `<App />` within `<PreferencesProvider>` in `src/main.tsx`.

- [ ] **Step 7: Run focused tests and commit**

Run: `npm test -- src/context/PreferencesContext.test.tsx`

Expected: 2 tests pass.

Run: `git add package.json package-lock.json tsconfig*.json vite.config.ts index.html src && git commit -m "chore: scaffold Nối landing page"`

---

### Task 2: Brand Shell and Narrative Sections

**Files:**
- Create: `src/App.tsx`
- Create: `src/data/site.ts`
- Create: `src/components/BrandMark.tsx`
- Create: `src/components/Header.tsx`
- Create: `src/components/Hero.tsx`
- Create: `src/components/RoutingVisual.tsx`
- Create: `src/components/CapabilityStrip.tsx`
- Create: `src/components/FeatureGrid.tsx`
- Create: `src/components/Process.tsx`
- Create: `src/components/CallToAction.tsx`
- Create: `src/components/Footer.tsx`
- Create: `src/styles/sections.css`

**Interfaces:**
- Consumes: `usePreferences()` and `SiteMessages` from Task 1.
- Produces: Semantic sections with IDs `models`, `features`, `process`, and `docs`; `BrandMarkProps { size?: number; className?: string }`.

- [ ] **Step 1: Define static navigation and capability metadata**

Create typed icon identifiers and URLs rather than embedding content in components:

```ts
export const navItems = [
  { id: 'models', labelKey: 'models' },
  { id: 'features', labelKey: 'features' },
  { id: 'process', labelKey: 'process' },
  { id: 'docs', labelKey: 'docs' },
] as const

export const providerNames = ['OpenAI', 'Anthropic', 'Gemini', 'DeepSeek', 'Qwen'] as const
```

Use simple inline SVG paths or lettermarks created for this site; do not import provider logos.

- [ ] **Step 2: Build the brand mark and header**

Create a rounded original connection mark made from three circles and two curved paths. The header must:

- Render semantic navigation and section links.
- Toggle locale between `EN` and `VI` with the full accessible label from copy.
- Toggle theme with a text-independent accessible label.
- Open and close the mobile menu, close it on Escape, and close after link selection.
- Link the console action to `#get-started` until a real console URL exists.

- [ ] **Step 3: Build the hero and routing illustration**

Compose the hero from an eyebrow, localized heading, localized supporting text, two actions, provider text badges, and a custom routing diagram. The diagram consists of provider nodes, animated CSS paths, a central Nối node, and one application endpoint. Mark decorative pieces `aria-hidden="true"`; expose one localized text alternative on the containing figure.

Use CSS-only gradients and SVG. No remote images are required because the requested visual can be communicated more clearly as a product diagram.

- [ ] **Step 4: Build capability, feature, and workflow sections**

Map the typed bilingual arrays from `messages` into reusable cards. Each feature card receives an icon identifier, localized title, and localized description. Number workflow steps with visible `01`, `02`, and `03` markers and include the authorized-provider reminder in the final step or supporting note.

- [ ] **Step 5: Build final CTA, footer, and page composition**


Compose all current sections in `App.tsx`, leaving the Task 3 model explorer and API panel import locations in their final order only after those components exist. Until then, the app can render the narrative sections without empty placeholders.

- [ ] **Step 6: Add responsive section styling**

Implement the warm cream background, navy typography, blue/teal gradients, coral micro-accents, soft cards, sticky translucent header, hero two-column layout, and mobile stacking. Add `@media (prefers-reduced-motion: reduce)` rules that stop path animation and remove nonessential transitions.

Check at CSS widths `360px`, `768px`, `1280px`, and `1536px`. Avoid fixed content widths that cause horizontal overflow.

- [ ] **Step 7: Run type/build checks and commit**

Run: `npm run build`

Expected: TypeScript and Vite complete successfully and create `dist`.

Run: `git add src && git commit -m "feat: build Nối brand narrative"`

---

### Task 3: Model Explorer and API Interaction

**Files:**
- Create: `src/data/models.ts`
- Create: `src/components/ModelExplorer.tsx`
- Create: `src/components/ApiExample.tsx`
- Test: `src/components/ModelExplorer.test.tsx`
- Modify: `src/App.tsx`
- Modify: `src/i18n/types.ts`
- Modify: `src/i18n/content.ts`
- Modify: `src/styles/sections.css`

**Interfaces:**
- Produces: `ModelCategory = 'all' | 'coding' | 'reasoning' | 'fast' | 'vietnamese'` and `ModelSummary` records.
- Consumes: `usePreferences()` from Task 1 and semantic section order from Task 2.

- [ ] **Step 1: Write the model catalog and filter contract**

Use the reference model names as static sample catalog data:

```ts
export type ModelCategory = 'all' | 'coding' | 'reasoning' | 'fast' | 'vietnamese'

export interface ModelSummary {
  id: string
  name: string
  provider: string
  categories: Exclude<ModelCategory, 'all'>[]
  inputPrice: string
  outputPrice: string
  accent: 'blue' | 'teal' | 'coral' | 'violet'
}

export const models: ModelSummary[] = [
  { id: 'deepseek-v4-pro', name: 'deepseek-v4-pro', provider: 'DeepSeek', categories: ['coding', 'reasoning'], inputPrice: '¥1.30', outputPrice: '¥3.92', accent: 'blue' },
  { id: 'qwen-35-plus', name: 'QY-qwen3.5-plus', provider: 'Qwen', categories: ['coding', 'vietnamese'], inputPrice: '¥0.400', outputPrice: '¥2.40', accent: 'violet' },
  { id: 'qwen-35-flash', name: 'QY-qwen3.5-flash', provider: 'Qwen', categories: ['fast', 'vietnamese'], inputPrice: '¥0.172', outputPrice: '¥1.72', accent: 'teal' },
  { id: 'deepseek-v4-flash', name: 'deepseek-v4-flash', provider: 'DeepSeek', categories: ['fast', 'reasoning'], inputPrice: '¥0.420', outputPrice: '¥1.26', accent: 'coral' }
]
```

Every visible price block must include the localized `samplePrice` label.

- [ ] **Step 2: Write the failing model explorer test**

Cover category filtering, no-results behavior using an injected empty catalog, and reset:

```tsx
it('filters cards and resets from the empty state', async () => {
  const { rerender } = render(<TestProviders><ModelExplorer models={models} /></TestProviders>)
  await userEvent.click(screen.getByRole('button', { name: /fast/i }))
  expect(screen.getAllByRole('article')).toHaveLength(2)

  rerender(<TestProviders><ModelExplorer models={[]} /></TestProviders>)
  expect(screen.getByText(/no models match/i)).toBeInTheDocument()
  await userEvent.click(screen.getByRole('button', { name: /show all/i }))
  expect(screen.getByRole('button', { name: /all models/i })).toHaveAttribute('aria-pressed', 'true')
})
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npm test -- src/components/ModelExplorer.test.tsx`

Expected: FAIL because `ModelExplorer` does not exist.

- [ ] **Step 4: Implement the accessible model explorer**

Accept `models` as a prop for deterministic testing. Render filters as buttons with `aria-pressed`; filter by category in memory; render each model as an article; label input/output values and sample pricing in the active language. The reset action selects `all` even when the supplied catalog remains empty.

- [ ] **Step 5: Implement the API example panel**

Add command-line and JavaScript tabs using a tablist with keyboard-friendly buttons. Use a fictional URL such as `https://api.noi.example/v1/chat/completions` and key `noi_your_key_here`.

Clipboard behavior:

```ts
async function copyExample() {
  try {
    await navigator.clipboard.writeText(activeExample)
    setCopyStatus('success')
  } catch {
    setCopyStatus('error')
  }
}
```

Report localized success/failure text through an `aria-live="polite"` region. Never hide or replace the code when copying fails.

- [ ] **Step 6: Integrate and style both sections**

Place the explorer after the capability strip and the API example after the workflow. Add card hover/focus states, horizontal filter wrapping instead of forced scrolling, clear sample-price styling, code overflow limited to the code panel, and dark-theme syntax colors.

- [ ] **Step 7: Run the focused suite and manual interaction check**

Run: `npm test`

Expected: locale tests and model explorer tests pass.

Run: `npm run dev -- --host 127.0.0.1`

In a browser, switch language, switch theme, filter models, switch code tabs, copy an example, deny clipboard access if supported, and confirm the code remains readable with a failure message.

- [ ] **Step 8: Commit the interactions**

Run: `git add src && git commit -m "feat: add model and API interactions"`

---

### Task 4: GitHub Pages Delivery and Focused Verification

**Files:**
- Create: `.github/workflows/deploy-pages.yml`
- Create: `.gitignore`
- Create: `README.md`
- Modify: `vite.config.ts`
- Modify: `index.html`

**Interfaces:**
- Consumes: `VITE_BASE_PATH` from the build environment.
- Produces: Static `dist/` artifact and GitHub Pages deployment workflow.

- [ ] **Step 1: Add repository hygiene and deployment workflow**

Ignore `node_modules`, `dist`, local environment files, coverage output, editor files, and macOS metadata.

Create a Pages workflow triggered on pushes to `main` and manual dispatch. It must grant `contents: read`, `pages: write`, and `id-token: write`; configure Pages; install with `npm ci`; build with `VITE_BASE_PATH: /${{ github.event.repository.name }}/`; upload `dist`; and deploy with the official Pages actions.

- [ ] **Step 2: Document development and deployment**

Write a README with:

- Nối positioning and screenshot-ready feature summary
- Requirements: current Node.js LTS and npm
- `npm install`, `npm run dev`, `npm test`, `npm run build`, and `npm run preview`
- Local repository-subpath verification using `VITE_BASE_PATH=/noi-preview/ npm run build`
- GitHub repository creation and remote setup
- GitHub Pages source set to GitHub Actions
- Explanation that the workflow derives the subpath from the repository name
- Project/reference attribution and clarification that Nối is an original demonstration brand

- [ ] **Step 3: Run the complete automated checks**

Run: `npm test && VITE_BASE_PATH=/noi-preview/ npm run build`

Expected: all focused tests pass and `dist/index.html` references `/noi-preview/` assets.

Confirm asset references:

Run: `rg -n 'src="/noi-preview/|href="/noi-preview/' dist/index.html`

Expected: JavaScript and stylesheet URLs begin with `/noi-preview/`.

- [ ] **Step 4: Start the production preview at the repository subpath**

Run: `npm run preview -- --host 127.0.0.1`

Open the preview URL with `/noi-preview/`. If Vite preview does not serve the configured subpath directly, run `npx serve dist` and open the route shown by that static server while preserving the generated asset paths.

- [ ] **Step 5: Perform desktop browser smoke checks**

At approximately `1440x1000`:

- Confirm the hero, model cards, feature grid, workflow, API panel, CTA, and footer render.
- Confirm every section navigation link lands correctly.
- Switch EN/VI and verify headings, controls, model labels, feedback, and footer text change.
- Switch themes and reload to verify persistence.
- Confirm the browser console has no errors and the network panel has no failed local assets.

- [ ] **Step 6: Perform narrow-mobile and reduced-motion smoke checks**

At approximately `390x844`:

- Confirm there is no horizontal page overflow.
- Open the mobile menu by keyboard, close it with Escape, reopen it, and select a section link.
- Confirm model filters wrap and cards remain readable.
- Emulate reduced motion and confirm routing paths no longer animate.
- Confirm both language versions retain complete copy without clipped controls.

- [ ] **Step 7: Commit delivery configuration**

Run: `git add .github .gitignore README.md vite.config.ts index.html && git commit -m "ci: deploy Nối to GitHub Pages"`

- [ ] **Step 8: Final verification summary**

Run: `git status --short`

Expected: clean working tree.

Record the exact passing commands, preview URL, checked viewport sizes, and any remaining external prerequisites such as creating the GitHub repository or enabling Pages.
