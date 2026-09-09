# Agorazo Automotive Marketplace — Cloudflare & GitHub Deployment Plan

This document outlines the step-by-step strategy to push the **Agorazo** codebase to GitHub and deploy it on **Cloudflare Pages** with global CDN edge image caching, free SSL, and continuous integration.

---

## 1. Architecture & Performance Overview

```
+--------------------------------------------------------------------------------+
|                               GitHub Repository                                |
|  - Complete React + Vite + Tailwind frontend codebase                          |
|  - 105 local high-res multi-angle vehicle photos (/public/cars)                |
|  - Single-Page App routing rules (/public/_redirects)                          |
+---------------------------------------+----------------------------------------+
                                        |
                            Git Push to `main` branch
                                        v
+---------------------------------------+----------------------------------------+
|                            Cloudflare Pages CI/CD                              |
|  - Automatic build trigger: `npm run build` in `Frontend/`                     |
|  - Static compilation output to `dist/` directory                              |
+---------------------------------------+----------------------------------------+
                                        |
                             Edge Asset Distribution
                                        v
+---------------------------------------+----------------------------------------+
|                  Cloudflare Global Anycast Edge Network                        |
|  - 300+ edge points of presence (including Accra, Ghana)                       |
|  - Automatic HTTP/3, Brotli compression, and Cache-Control headers             |
|  - Sub-100ms photo delivery for partners in Ghana and worldwide                |
|  - Live URL: `https://agorazo.pages.dev` (or custom domain)                    |
+--------------------------------------------------------------------------------+
```

### Key Performance Benefits
1. **Edge Image Caching**: All 105 car photos (5 angles per car across 21 models) are delivered via Cloudflare's Edge CDN cache rather than hitting a central origin server, guaranteeing instant gallery loading.
2. **Accra PoP Acceleration**: Traffic originating in Ghana routes through Cloudflare's local Accra data center for minimal latency over local mobile networks (MTN, Telecel, AT).
3. **Single Page Application (SPA) Routing**: The preconfigured `public/_redirects` file (`/* /index.html 200`) ensures direct URL navigation (e.g., `/cars`, `/checkout`, `/compare`) resolves seamlessly without 404 errors.
4. **Zero-Maintenance SSL**: Cloudflare manages and auto-renews SSL certificates for all `*.pages.dev` and connected custom domains.

---

## 2. Step-by-Step Execution Roadmap

### Step 1: Create GitHub Repository (User Action)
1. Go to [https://github.com/new](https://github.com/new).
2. Repository settings:
   - **Repository name**: `agorazo` or `agorazo-frontend`
   - **Visibility**: **Private** (recommended for commercial projects) or **Public**
   - **Initialize with**: Leave **unchecked** (no README, no .gitignore, no license).
3. Copy your repository clone URL (e.g. `https://github.com/<your-username>/agorazo.git`).

---

### Step 2: Initialize & Push Codebase (Antigravity Agent)
Once the repository URL is provided, the following operations will be executed automatically:

```bash
# 1. Initialize git inside Agorazo workspace
cd c:\Users\Grandeville\Desktop\Agorazo
git init -b main

# 2. Add remote origin
git remote add origin <YOUR_GITHUB_REPO_URL>

# 3. Stage all files (Frontend, public/cars, notes, .gitignore)
git add .

# 4. Commit initial release
git commit -m "feat: complete Agorazo Ghana automotive portal with 105 real car photos and Cloudflare Pages SPA configuration"

# 5. Push to GitHub main branch
git push -u origin main
```

---

### Step 3: Deploy to Cloudflare Pages

#### Option A: Dashboard Git Integration (Recommended — Free & No API Keys Required)
1. Log in to [dash.cloudflare.com](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** in the left sidebar.
3. Click **Create application** ➔ select the **Pages** tab ➔ **Connect to Git**.
4. Authenticate your GitHub account and select your `agorazo` repository.
5. In the **Set up builds and deployments** screen, enter:
   - **Project name**: `agorazo`
   - **Production branch**: `main`
   - **Framework preset**: `Vite`
   - **Root directory**: `Frontend`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
6. Click **Save and Deploy**.
7. In ~60 seconds, Cloudflare will display your live deployment URL:
   `https://agorazo.pages.dev`

#### Option B: Direct CLI Deployment via Wrangler (Terminal Alternative)
If you prefer direct terminal deployment using a Cloudflare API Token:
```bash
cd c:\Users\Grandeville\Desktop\Agorazo\Frontend

# Authenticate or pass CLOUDFLARE_API_TOKEN
npx wrangler pages project create agorazo --production-branch main
npx wrangler pages deploy dist --project-name=agorazo
```

---

## 3. Project Configuration Reference

| Setting | Value |
| :--- | :--- |
| **Framework** | React 19 + TypeScript + Tailwind CSS |
| **Bundler** | Vite 6 |
| **Root Directory** | `Frontend` |
| **Build Command** | `npm run build` |
| **Build Output Directory** | `dist` |
| **SPA Fallback Configuration** | `public/_redirects` (`/* /index.html 200`) |
| **Image Assets Path** | `/public/cars/` (accessible as `/cars/<slug>.jpg`) |
| **Total Car Assets** | 105 verified high-res photos across 21 vehicle models |

---

## 4. Verification & Testing Checklist

- [x] Production build passes with zero errors (`tsc && vite build`).
- [x] All 105 car photos verified via HTTP 200 checks.
- [x] Graceful `onError` fallbacks implemented on vehicle cards and gallery viewports.
- [x] `public/_redirects` verified to be copied into `dist/` on build.
- [ ] Remote repository linked and pushed to GitHub `main`.
- [ ] Cloudflare Pages production deployment verified on `*.pages.dev`.
- [ ] Shareable link delivered to stakeholders/partners.
