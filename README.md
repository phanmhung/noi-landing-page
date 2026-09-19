# Nối

**One connection. Every model. · Một kết nối. Mọi mô hình.**

Nối is an original bilingual landing page for a friendly, self-hosted AI gateway. It explains how a team can connect authorized model providers behind one consistent API, manage access, route requests, and understand usage without changing every client application.

## What is included

- Complete English and Vietnamese content with saved language preference
- Original Nối identity, connection mark, and responsive routing illustration
- Filterable model catalog with clearly labeled illustrative pricing
- Practical gateway feature and setup sections
- OpenAI-compatible cURL and JavaScript examples with copy feedback
- Light and dark themes with reduced-motion support
- Static GitHub Pages deployment with repository-subpath support

The site is a front-end demonstration. It does not include authentication, a working console, live models, live pricing, or a gateway backend.

## Requirements

- A current Node.js LTS release (Node.js 24 is used in CI)
- npm

## Local development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run the focused behavior tests:

```bash
npm test
```

Create a production build:

```bash
npm run build
```

Preview the most recent build:

```bash
npm run preview
```

## Verify a repository subpath locally

GitHub Pages project sites are served from `/<repository>/`, so asset URLs must include that prefix. Build with a representative base path:

```bash
VITE_BASE_PATH=/noi-preview/ npm run build
```

Then start the preview with the same base path and open the URL ending in `/noi-preview/`:

```bash
VITE_BASE_PATH=/noi-preview/ npm run preview -- --host 127.0.0.1
```

## Deploy to GitHub Pages

1. Create an empty GitHub repository and add it as this project's remote:

   ```bash
   git remote add origin https://github.com/YOUR_ACCOUNT/YOUR_REPOSITORY.git
   git push -u origin main
   ```

2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. Push to `main`, or run **Deploy Nối to GitHub Pages** manually from the Actions tab.

The workflow builds with `VITE_BASE_PATH` set from `github.event.repository.name`, uploads `dist`, and deploys it through GitHub's supported Pages actions. A repository named `noi` will therefore use `/noi/` as its asset base.

If this project is published from a user or organization Pages repository named exactly `<account>.github.io`, change `VITE_BASE_PATH` in the workflow to `/` because that special repository is served from the domain root.

## Project structure

```text
src/
  components/   Focused page sections and controls
  context/      Locale and theme preferences
  data/         Typed navigation and model content
  i18n/         English and Vietnamese copy
  styles/       Design tokens and responsive section styles
```

## Attribution

Product terminology was informed by the open-source [New API project](https://github.com/QuantumNous/new-api). Model names shown in the static catalog were observed on [Tokens1688](https://tokens1688.cn/) and are used only as illustrative sample content.

Nối is an original demonstration brand and landing-page design. It is not affiliated with New API, Tokens1688, or their operators, and it does not reuse their logos or proprietary assets.
