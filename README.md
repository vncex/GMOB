# Forge Training website

A responsive, single-page personal training website designed for GitHub Pages. It uses only HTML, CSS, and JavaScript—no build tools, paid server, database, or account is required.

## Before you publish

The demo intentionally **does not save or send booking requests**. The booking form shows a clear in-browser summary so it never implies that a time has actually been reserved. The contact form opens the visitor's email app.

Update these placeholders first:

1. Open `script.js` and edit `SITE_CONFIG.business` (name, brand, phone, email, and city).
2. In the same file, edit session types, available times, unavailable weekend times, highlight videos, and testimonials.
3. Open `index.html` and replace the hero, services, and About copy.
4. Replace the Unsplash image URLs in `styles.css` and `script.js` with your own photos when available.
5. Replace all example testimonials with real quotes you have permission to publish.

All frequently edited content is marked with `EDITABLE` or collected inside `SITE_CONFIG`.

## Preview on your computer

You can double-click `index.html` for a quick preview. For the closest match to GitHub Pages, run any simple local web server in this folder (for example, VS Code's Live Server extension).

## Publish with GitHub Pages

1. Create a new repository on GitHub.
2. Upload `index.html`, `styles.css`, `script.js`, `README.md`, `.nojekyll`, and the `assets` folder to the repository root.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose your default branch (normally `main`), select the `/ (root)` folder, and save.
6. GitHub will show your public URL after the deployment finishes. It usually follows `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

The project uses relative file paths, so it works from a repository subfolder as well as a custom domain.

## Add a custom domain

1. In **Settings → Pages**, enter your custom domain.
2. Follow GitHub's displayed DNS instructions at your domain provider.
3. Enable **Enforce HTTPS** after GitHub verifies the DNS records.
4. GitHub normally creates the required `CNAME` file for you. If you create it manually, place a file named `CNAME` in the repository root containing only your domain, such as `www.example.com`.

Do not add a placeholder `CNAME` file before you own and configure the domain; an incorrect one can break the Pages address.

## Connect a real booking form

GitHub Pages cannot process or store submissions by itself. When you are ready, connect the booking form to one of these options:

- A scheduling link such as Calendly, Acuity, or Square Appointments.
- A static-form service such as Formspree or Basin.
- Your own secure server/API.

Whichever option you choose, update the booking notice so visitors understand whether their request is pending or instantly confirmed. Never place private API keys in `script.js` or any GitHub Pages file.

## Project structure

```text
.
├── index.html                # Page structure and editable section copy
├── styles.css                # Design, layout, and responsive styles
├── script.js                 # Editable config and interactions
├── assets/
│   └── forge-social-card.png # Social sharing preview image
├── IMAGE_PROMPT.md           # Exact prompt used for the sharing image
├── .nojekyll                 # Tells GitHub Pages to serve files as-is
└── README.md                 # Setup and publishing guide
```

## Image and video notes

The starter uses remotely hosted Unsplash images and example YouTube fitness videos. Replace them with your own approved media before launch. The generated `assets/forge-social-card.png` is project-owned and can be replaced with your own 1200 × 630 sharing image.
