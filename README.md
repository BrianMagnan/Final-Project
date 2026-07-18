# Vary Suite - Music Website

A modern music website built with React and Vite, with a static discography/video catalog, album player modal, and responsive design.

## Live Demo

**Visit:** [https://varysuite.com](https://varysuite.com)

## Features

### Music & video

- Browse album artwork and open a detailed player modal
- Track listings with durations
- Outbound Spotify and Apple Music links
- Featured YouTube videos on the homepage and Videos page

### User experience

- Responsive layout for desktop, tablet, and mobile
- Route loading fallback and error boundary for lazy pages
- Particle background animations
- React Router navigation with keyboard-friendly controls

### Performance

- Lazy-loaded Music and Videos routes
- Bundle compression (gzip / Brotli)
- Lazy-loaded images
- Production minification via Vite

## Technology Stack

- **Frontend:** React 18
- **Build Tool:** Vite
- **Routing:** React Router DOM
- **Styling:** CSS (custom properties, Grid, Flexbox)
- **Deployment:** Vercel
- **Content:** Static catalogs in `src/config/` (no live music API)

## Project Structure

```
src/
├── Components/
│   ├── App/                 # App shell, routes, error boundary
│   ├── Header/              # Navigation header
│   ├── Pages/
│   │   ├── Main/            # Homepage
│   │   ├── Music/           # Discography grid
│   │   ├── Videos/          # Video gallery
│   │   ├── Maintenance/     # Optional under-construction page
│   │   └── NotFound/        # 404 page
│   ├── MusicPlayer/         # Album modal
│   ├── VideoGrid/           # Video gallery + modal
│   ├── LoadingState/        # Route loading fallback
│   ├── Skeleton/            # Simple skeleton bars
│   ├── ErrorDisplay/        # Error boundary UI
│   └── Particles/           # Background animations
├── config/
│   ├── albums.js            # Static discography + stream URLs
│   ├── videos.js            # Featured video catalog
│   ├── constants.js         # MAINTENANCE_MODE flag
│   └── css-variables.css    # Shared design tokens
├── hooks/
│   └── useModalClose.js
├── routes/
│   └── routes.jsx           # Nav path/label config
└── assets/
```

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/BrianMagnan/Final-Project.git
cd Final-Project
npm install
npm run dev
```

### Available Scripts

```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run preview       # Preview production build
npm run lint          # Run ESLint
npm run build:analyze # Analyze bundle size
```

## Deployment

Deployed on Vercel with:

- Custom domain: varysuite.com
- Auto-deploy on push to main

## Configuration

### Music & video content

Edit the static catalogs:

- `src/config/albums.js` — releases, tracklists, Spotify/Apple links
- `src/config/videos.js` — featured YouTube videos

### Maintenance mode

Set `MAINTENANCE_MODE` to `true` in `src/config/constants.js` to show the under-construction page instead of the site.

## License

This project is licensed under the MIT License.
