# Campus Event Finder & RSVP System

## Project Overview

A centralized platform designed to simplify event discovery and RSVP management for college students. The application will feature a visually stunning UI with modern animations and transitions to create an engaging user experience.

## Technology Stack

- **Frontend Framework**: Vite + React
- **Styling**: CSS/SCSS with animations
- **Authentication**: Custom authentication system
- **State Management**: React Context API or Redux
- **Routing**: React Router
- **UI Components**: Custom components with animation libraries

## Design Philosophy

- **Modern & Visually Appealing**: Implement a harmonious color palette that resonates with college students
- **Animation-Heavy**: Incorporate fluid animations and transitions throughout the application
- **Responsive Design**: Ensure seamless experience across all devices (mobile, tablet, desktop)
- **Interactive Elements**: Dynamic sliders, animated buttons, and engaging micro-interactions

## Color Palette Suggestion

- Primary: #4F46E5 (Indigo)
- Secondary: #EC4899 (Pink)
- Accent: #10B981 (Emerald)
- Background: #F9FAFB (Light Gray)
- Text: #111827 (Dark Gray)
- White: #FFFFFF

## Page Structure

### 1. Landing Page

**Hero Section**
- Full-width campus image with subtle parallax effect
- Animated text overlay with tagline that fades in
- Two prominent buttons with hover animations:
  - 'Get Started' (leads to signup)
  - 'Log In' (leads to login page)
- Scroll-down indicator with subtle bounce animation

**Upcoming Events Section**
- Heading with animated underline on page scroll
- Display 3 featured event cards with:
  - Event image with zoom effect on hover
  - Event title with dynamic typography
  - Date and time with icon animations
  - Location with map pin animation
  - "Register for Event" button with pulse effect
- Background with subtle gradient animation

**Past Events Gallery**
- Sliding image gallery with smooth transitions
- Auto-play with pause on hover functionality
- Interactive navigation dots/arrows
- Image caption overlay that appears on hover

**Footer**
- Organized sections for contact, quick links, and social media
- Newsletter subscription with animated submit button
- Admin login button with subtle highlight effect
- Copyright information

### 2. Authentication Pages

**Sign Up Page**
- Clean, minimalist form design
- Field validation with animated feedback
- Progress indicator showing completion status
- Form fields with focus animations:
  - Name
  - Phone number
  - College email (with domain validation)
  - Password (with strength indicator)
- Animated success message upon completion

**Log In Page**
- Email and password fields with focus animations
- "Forgot Password" option with modal popup
- Error handling with animated notifications
- Remember me toggle switch with smooth animation
- Social login options with hover effects (optional)

### 3. Discover Events Page

**Navigation**
- Sticky header with smooth scroll transitions
- User profile dropdown with animated menu
- Navigation links with hover underline effect

**Event Cards Layout**
- Grid/list toggle view with transition animation
- Cards with:
  - Event poster with hover zoom effect
  - Brief information with animated reveal
  - Dynamic RSVP button that changes based on event type
  - Share button with social media popup animation
- Filtering system with animated dropdown menus
- Sorting options with transition effects
- Skeleton loading animation while content loads

**Team Registration Modal**
- Smooth entry/exit animations
- Dynamic form for adding team members
- Email input with validation animation
- Team size indicator with real-time updates
- Confirmation animation when successfully submitted

### 4. My Events Page

**Tab Navigation**
- Animated tab switching between "Registered" and "Hosting"
- Indicator line that slides between tabs
- Counter badges with number animations

**Registered Events Section**
- Event cards with status indicators (upcoming, ongoing, past)
- Countdown timer for upcoming events with pulse animation
- QR code reveal animation for event check-in
- Cancel registration option with confirmation animation

**Hosting Section**
- Create event button with attention-grabbing animation
- Hosting event cards with:
  - Attendee count with number animation
  - Status indicator (draft, pending, approved)
  - Quick edit options with animated dropdown
  - Analytics preview with chart animations

### 5. Host an Event Page

**Multi-step Form**
- Progress tracker with animation between steps
- Form sections with smooth reveal animations:
  - Event basics (name, time, date)
  - Location details with map integration
  - Attendee capacity with visual indicator
  - Faculty approval information
  - Event flyer upload with preview animation
- Form validation with real-time feedback animations
- Success submission animation

## Animation Libraries to Consider

- Framer Motion
- GSAP (GreenSock Animation Platform)
- React Spring
- Lottie for complex illustrations
- AOS (Animate On Scroll)

## Implementation Priorities

1. Set up project structure with Vite + React
2. Create responsive layouts for all pages
3. Implement core functionality (authentication, event browsing, RSVP)
4. Add basic styling with the color palette
5. Implement animations and transitions
6. Test across devices and optimize performance
7. Refine UI details and micro-interactions

## Performance Considerations

- Lazy loading of images and components
- Code splitting for faster initial load
- Optimized animations that don't impact performance
- Responsive image sizing for different devices
- Preloading of critical resources

## Accessibility Features

- Proper contrast ratios for text readability
- Keyboard navigation support
- Animation toggle for users with motion sensitivity
- ARIA labels for interactive elements
- Focus indicators for keyboard users

This project will focus heavily on creating a visually stunning and highly interactive user interface while maintaining performance and accessibility standards. 