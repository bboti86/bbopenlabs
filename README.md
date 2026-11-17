# BB Open Labs

Editorial showcase for **BB Open Labs** — open-source, AI-generated Android applications and offline-capable Progressive Web Apps (PWAs), synced with `@bboti86` on GitHub and driven by a single structured TypeScript catalog.

---

## Moving This Project to Google Antigravity IDE

This project uses standard **React + TypeScript + Vite + Tailwind CSS v4** with zero proprietary runtime dependencies, so you can move it directly into Google Antigravity without rewriting anything.

### 1. Export & Extract the Project
1. In Google AI Studio Build, click **Download** (Export ZIP) to download the project archive.
2. Extract the ZIP into a local folder on your machine (for example, `~/projects/bb-open-labs`).

### 2. Open the Folder in Google Antigravity
1. Launch **Google Antigravity IDE**.
2. Choose **File > Open Folder...** (or open it from the **Agent Manager** or CLI with `antigravity .`) and select your extracted `bb-open-labs` folder.
3. When prompted with the workspace security dialog, choose **Trust Workspace** so Antigravity agents and the integrated terminal can run builds and tests.

### 3. Run & Verify Locally
Open the integrated terminal inside Antigravity and run:

```bash
npm install
npm run dev
```

Vite starts on `http://localhost:3000`. Useful scripts included in the project:
- `npm run dev` — Local development server on port 3000
- `npm run lint` — TypeScript typecheck (`tsc --noEmit`)
- `npm run build` — Production static bundle output to `dist/`

### 4. Customize Content in One Place
All showcase content lives in `src/data/catalog.ts`:
- `labProfile` — Site title, logo URL, bio copy, AI-generated disclosure, and `githubUsername` (`bboti86`).
- `technologiesUsed` — Stack cards (`Kotlin`, `Java`, `React Native`, `Flutter`, `JavaScript`, `HTML`, `CSS`).
- `curatedApps` — Fallback/curated app entries, functionality summaries, preview images, version releases, and commit histories.

On load, `src/lib/github.ts` queries public repositories, releases, tags, and recent commit messages from `https://api.github.com/users/bboti86/repos`. Matching repositories merge with `curatedApps`; if GitHub is offline or rate-limited, the site falls back cleanly to `curatedApps`.

---

## Publishing to GitHub Pages (`bboti86`)

### Option A: Root User Site (`https://bboti86.github.io/`)
1. Create a public repository named `bboti86.github.io` on GitHub.
2. Push your extracted Antigravity folder to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "feat: initial BB Open Labs showcase"
   git branch -M main
   git remote add origin https://github.com/bboti86/bboti86.github.io.git
   git push -u origin main
   ```
3. In GitHub **Settings > Pages**, set **Source** to **GitHub Actions** and add `.github/workflows/deploy.yml` (see below, with `VITE_BASE_PATH: /`).

### Option B: Project Repository Subpath (`https://bboti86.github.io/<repo-name>/`)
If you push to a named repo (for example `https://github.com/bboti86/bb-open-labs`), set `VITE_BASE_PATH` to `/<repo-name>/` during the build so all static assets and favicons resolve under the subpath automatically.

#### Example `.github/workflows/deploy.yml`

```yaml
name: Deploy BB Open Labs to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
        env:
          # Use '/' for bboti86.github.io, or '/<repo-name>/' for a project repo
          VITE_BASE_PATH: /${{ github.event.repository.name == format('{0}.github.io', github.repository_owner) && '' || format('{0}/', github.event.repository.name) }}
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```
