# Dharamvir Singh — Portfolio

> A modern, responsive **React** portfolio website with Tailwind CSS, Framer Motion, and premium animations — no backend needed.

## ✨ Features

- 🎨 **Dark theme** with glassmorphism UI
- 🖱️ **Custom animated cursor** with hover states
- ✨ **Interactive particle network** with mouse repulsion
- 📐 **3D tilt cards** + **spotlight cursor glow** on project cards
- 🧲 **Magnetic buttons** (CTAs follow cursor slightly)
- 🎭 **Cinema mask reveal** on section headings
- ⌨️ **Typewriter animation** cycling through 6 roles
- 📊 **Animated CountUp stats** (LeetCode 1925, CF 1600, 2000+)
- 📈 **Live GitHub stats & streak** embeds
- 🏆 **LeetCode card** with activity heatmap
- ⏳ **Vertical timeline** for experience with metrics
- 📬 **Contact form** via [Web3Forms](https://web3forms.com) — no backend needed!
- 📱 **Fully responsive** with mobile menu
- ♿ **Accessible** — prefers-reduced-motion, skip-to-content, ARIA labels
- ⬆️ **Back-to-top** floating button
- 📊 **Scroll progress bar** at top of page
- 🚀 **Loading screen** with logo animation
- ⚡ **Code-split** — all sections lazy-loaded

## 🏗️ Project Structure

```
my-portfolio/
├── client/                  ← React + Vite
│   ├── public/
│   │   ├── Dharamvir_Resume.pdf
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   └── src/
│       ├── components/      ← All React components
│       ├── data/
│       │   └── resumeData.js ← All resume data (centralized)
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
├── .gitignore
└── README.md
```

## 🚀 Getting Started

```bash
cd client
npm install
npm run dev
# Opens at http://localhost:5173
```

That's it! No backend, no database, no environment variables needed.

## 📬 Contact Form Setup (Optional)

The contact form uses [Web3Forms](https://web3forms.com) — a free service that emails form submissions directly to you.

1. Go to [web3forms.com](https://web3forms.com)
2. Enter your email → you'll receive an **Access Key** via email
3. Open `client/src/components/Contact.jsx`
4. Replace `YOUR_ACCESS_KEY_HERE` with your key:
   ```js
   const WEB3FORMS_KEY = 'your-actual-key-here'
   ```
5. Done! Form submissions will now be emailed to you directly.

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 (Vite) |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion |
| Typewriter | react-type-animation |
| Counters | react-countup |
| Icons | react-icons |
| Toasts | react-hot-toast |
| Scroll | react-scroll |
| Contact Form | Web3Forms (no backend) |

## 🌐 Deploy

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from client folder
cd client
vercel
```

### Netlify
- Drag and drop the `client/dist` folder after running `npm run build`

## 👤 About

Built by **Dharamvir Singh** — SDE Intern @DealShare | MNNIT Allahabad | LeetCode Knight (1925) | Codeforces Expert (1600)

- 📧 dharamvir78914@gmail.com
- 💼 [LinkedIn](https://linkedin.com/in/dharamvir-singh-aa908b2a1)
- 🐙 [GitHub](https://github.com/Dharamvirr)
