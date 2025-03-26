# Project Setup Guide

## Initial Setup

1. **Create Vite Project**

```bash
npm create vite@latest campus-event-finder -- --template react
cd campus-event-finder
```

2. **Install Core Dependencies**

```bash
npm install react-router-dom framer-motion gsap @lottiefiles/react-lottie-player aos
```

## Package Dependencies

### Core

```json
"dependencies": {
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.18.0",
  "framer-motion": "^10.16.4",
  "gsap": "^3.12.2",
  "@lottiefiles/react-lottie-player": "^3.5.3",
  "aos": "^2.3.4"
}
```

### Styling

```bash
npm install sass
```

### Development Dependencies

```bash
npm install -D vite-plugin-svgr vite-plugin-pwa @vitejs/plugin-react-swc
```

```json
"devDependencies": {
  "@types/react": "^18.2.15",
  "@types/react-dom": "^18.2.7",
  "@vitejs/plugin-react-swc": "^3.4.0",
  "vite": "^4.4.5",
  "sass": "^1.69.5",
  "vite-plugin-svgr": "^4.1.0",
  "vite-plugin-pwa": "^0.16.7"
}
```

## Vite Configuration

Create a custom Vite configuration to support SVG imports, PWA features, and other optimizations:

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Campus Event Finder',
        short_name: 'EventFinder',
        description: 'Discover and RSVP to campus events',
        theme_color: '#4F46E5',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'animations': ['framer-motion', 'gsap', 'aos'],
        }
      }
    }
  }
});
```

## Setting Up SCSS

Create the main SCSS files:

```scss
// src/styles/variables.scss
// Color variables
$primary: #4F46E5;
$secondary: #EC4899;
$accent: #10B981;
$background: #F9FAFB;
$text-dark: #111827;
$text-light: #6B7280;
$white: #FFFFFF;

// Typography
$font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
$font-heading: 'Montserrat', sans-serif;

// Breakpoints
$breakpoint-sm: 640px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1280px;

// Spacing
$spacing-xs: 0.25rem;
$spacing-sm: 0.5rem;
$spacing-md: 1rem;
$spacing-lg: 1.5rem;
$spacing-xl: 2rem;
$spacing-2xl: 3rem;
$spacing-3xl: 4rem;

// Shadows
$shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
$shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
$shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
$shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

// Z-index
$z-index-dropdown: 1000;
$z-index-sticky: 1020;
$z-index-fixed: 1030;
$z-index-modal-backdrop: 1040;
$z-index-modal: 1050;
$z-index-popover: 1060;
$z-index-tooltip: 1070;

// Transitions
$transition-slow: 0.5s ease;
$transition-medium: 0.3s ease;
$transition-fast: 0.15s ease;

// Border radius
$border-radius-sm: 0.25rem;
$border-radius-md: 0.375rem;
$border-radius-lg: 0.5rem;
$border-radius-xl: 1rem;
$border-radius-full: 9999px;
```

```scss
// src/styles/animations.scss
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes shimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}

.fade-in {
  animation: fadeIn 0.5s ease forwards;
}

.slide-up {
  animation: slideUp 0.6s ease forwards;
}

.scale-in {
  animation: scaleIn 0.5s ease forwards;
}

.pulse {
  animation: pulse 2s infinite;
}
```

```scss
// src/styles/global.scss
@import 'variables';
@import 'animations';

// Import fonts
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@500;600;700;800&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  font-family: $font-primary;
  background-color: $background;
  color: $text-dark;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-family: $font-heading;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: $spacing-md;
}

h1 {
  font-size: 2.5rem;
  
  @media (min-width: $breakpoint-md) {
    font-size: 3rem;
  }
  
  @media (min-width: $breakpoint-lg) {
    font-size: 3.5rem;
  }
}

h2 {
  font-size: 2rem;
  
  @media (min-width: $breakpoint-md) {
    font-size: 2.5rem;
  }
}

h3 {
  font-size: 1.5rem;
  
  @media (min-width: $breakpoint-md) {
    font-size: 1.75rem;
  }
}

p {
  margin-bottom: $spacing-md;
}

a {
  color: $primary;
  text-decoration: none;
  transition: color $transition-fast;
  
  &:hover {
    color: darken($primary, 10%);
  }
}

img {
  max-width: 100%;
  height: auto;
}

button, .button {
  display: inline-block;
  background-color: $primary;
  color: $white;
  border: none;
  border-radius: $border-radius-md;
  padding: $spacing-md $spacing-lg;
  font-weight: 600;
  cursor: pointer;
  transition: all $transition-medium;
  
  &:hover {
    background-color: darken($primary, 5%);
    transform: translateY(-2px);
    box-shadow: $shadow-md;
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &.secondary {
    background-color: $secondary;
    
    &:hover {
      background-color: darken($secondary, 5%);
    }
  }
  
  &.outline {
    background-color: transparent;
    border: 2px solid $primary;
    color: $primary;
    
    &:hover {
      background-color: rgba($primary, 0.1);
    }
  }
}

// Container
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 $spacing-md;
  
  @media (min-width: $breakpoint-md) {
    padding: 0 $spacing-lg;
  }
}

// Grid system
.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -$spacing-md;
}

.col {
  flex: 1 0 0%;
  padding: 0 $spacing-md;
}

// Utilities
.text-center {
  text-align: center;
}

.my-1 {
  margin-top: $spacing-md;
  margin-bottom: $spacing-md;
}

.my-2 {
  margin-top: $spacing-lg;
  margin-bottom: $spacing-lg;
}

.my-3 {
  margin-top: $spacing-xl;
  margin-bottom: $spacing-xl;
}

.my-4 {
  margin-top: $spacing-2xl;
  margin-bottom: $spacing-2xl;
}

.py-1 {
  padding-top: $spacing-md;
  padding-bottom: $spacing-md;
}

.py-2 {
  padding-top: $spacing-lg;
  padding-bottom: $spacing-lg;
}

.py-3 {
  padding-top: $spacing-xl;
  padding-bottom: $spacing-xl;
}

.py-4 {
  padding-top: $spacing-2xl;
  padding-bottom: $spacing-2xl;
}

// Animation utilities
.will-animate {
  opacity: 0;
}

// Accessible focus styles
:focus-visible {
  outline: 2px solid $primary;
  outline-offset: 2px;
}

// Accessible motion reduction
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Project Initialization

After setting up the project, initialize the main entry point:

```jsx
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

```jsx
// src/App.jsx
import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AppRoutes from './routes';

function App() {
  useEffect(() => {
    // Initialize AOS animation library
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out',
      disable: window.innerWidth < 768 ? 'phone' : false
    });
  }, []);

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
```

```jsx
// src/routes.jsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Import pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DiscoverEventsPage from './pages/DiscoverEventsPage';
import MyEventsPage from './pages/MyEventsPage';
import HostEventPage from './pages/HostEventPage';
import AdminLoginPage from './pages/AdminLoginPage';

function AppRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/discover" element={<DiscoverEventsPage />} />
        <Route path="/my-events" element={<MyEventsPage />} />
        <Route path="/host-event" element={<HostEventPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AppRoutes;
```

## Asset Organization

Create the following structure for assets:

```
public/
└── assets/
    ├── images/
    │   ├── campus/
    │   │   ├── campus-hero.jpg
    │   │   └── campus-background.jpg
    │   ├── events/
    │   │   ├── event1.jpg
    │   │   ├── event2.jpg
    │   │   └── event3.jpg
    │   └── logos/
    │       ├── logo.svg
    │       └── logo-white.svg
    └── fonts/ (if using custom fonts not from Google)
```

## Browser Support

Add the following to `package.json` to specify browser support:

```json
"browserslist": {
  "production": [
    ">0.2%",
    "not dead",
    "not op_mini all"
  ],
  "development": [
    "last 1 chrome version",
    "last 1 firefox version",
    "last 1 safari version"
  ]
}
```

## Setting Up Mock Data

For development before integrating with backend:

```javascript
// src/utils/mockData.js
export const events = [
  {
    id: 1,
    title: "Annual Tech Hackathon",
    date: "2023-11-15",
    time: "10:00 AM",
    location: "Engineering Building, Room 302",
    description: "Join us for a 24-hour coding challenge to build innovative solutions.",
    imageUrl: "/assets/images/events/event1.jpg",
    attendees: 75,
    maxAttendees: 100,
    isTeamEvent: true,
    teamSize: 4,
    organizer: "Computer Science Club"
  },
  {
    id: 2,
    title: "Career Fair 2023",
    date: "2023-11-20",
    time: "1:00 PM",
    location: "Student Union Hall",
    description: "Connect with top employers and explore career opportunities.",
    imageUrl: "/assets/images/events/event2.jpg",
    attendees: 120,
    maxAttendees: 300,
    isTeamEvent: false,
    organizer: "Career Services"
  },
  {
    id: 3,
    title: "End of Semester Concert",
    date: "2023-12-05",
    time: "7:00 PM",
    location: "Outdoor Amphitheater",
    description: "Celebrate the end of the semester with live music and performances.",
    imageUrl: "/assets/images/events/event3.jpg",
    attendees: 210,
    maxAttendees: 500,
    isTeamEvent: false,
    organizer: "Student Activities Board"
  }
];

export const pastEvents = [
  {
    id: 101,
    title: "Fall Festival",
    imageUrl: "/assets/images/events/past1.jpg",
    date: "2023-10-05"
  },
  {
    id: 102,
    title: "Guest Lecture Series",
    imageUrl: "/assets/images/events/past2.jpg",
    date: "2023-09-20"
  },
  {
    id: 103,
    title: "Sports Tournament",
    imageUrl: "/assets/images/events/past3.jpg",
    date: "2023-09-15"
  },
  {
    id: 104,
    title: "Art Exhibition",
    imageUrl: "/assets/images/events/past4.jpg",
    date: "2023-08-25"
  },
  {
    id: 105,
    title: "Welcome Week",
    imageUrl: "/assets/images/events/past5.jpg",
    date: "2023-08-10"
  }
];

export const user = {
  name: "Alex Johnson",
  email: "alex.johnson@university.edu",
  phone: "555-123-4567",
  registeredEvents: [1, 3],
  hostedEvents: [2]
};
```

## Performance Tips

1. **Code Splitting**
   - Use dynamic imports for route-based code splitting
   - Example: `const HomePage = React.lazy(() => import('./pages/HomePage'))`

2. **Image Optimization**
   - Use responsive images with `srcset` and `sizes`
   - Consider using WebP format with fallbacks
   - Implement lazy loading for images

3. **Animation Performance**
   - Use CSS transforms and opacity for animations
   - Implement throttling and debouncing for scroll-based animations
   - Test animations on low-end devices

4. **Font Loading**
   - Add `font-display: swap` in font declarations
   - Preload critical fonts 