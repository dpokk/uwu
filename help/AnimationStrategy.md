# Animation Strategy

## Overview

The Campus Event Finder application will prioritize a visually stunning and highly interactive user experience through strategic use of animations. This document outlines the animation approach to create a modern, engaging interface while maintaining performance.

## Animation Libraries

### Primary Libraries

1. **Framer Motion**
   - For component animations, page transitions, and gesture-based interactions
   - Benefits: React-specific, declarative API, easy to implement

2. **GSAP (GreenSock Animation Platform)**
   - For complex animations and timeline-based sequences
   - Benefits: Precise control, performance optimization, cross-browser compatibility

### Supporting Libraries

3. **Lottie**
   - For complex illustrative animations
   - Use cases: Loading states, empty states, success/error feedback

4. **AOS (Animate On Scroll)**
   - For scroll-triggered animations
   - Use cases: Content reveal, parallax effects, section transitions

## Animation Categories

### 1. Micro-interactions

**Button Animations**
- Hover effect: Scale (1.05), color transition (200ms)
- Click effect: Scale down (0.95), ripple effect
- Focus state: Glowing outline

**Input Field Animations**
- Focus: Label slide up with color change
- Validation: Success/error icons with subtle bounce
- Typing indicator: Cursor pulse

**Toggle/Switch Animations**
- Smooth transition between states (200-300ms)
- Icon rotation or morph when applicable

### 2. Page Transitions

**Route Changes**
- Exit animation: Fade out (200ms)
- Enter animation: Fade in with slide up (400ms)
- Staggered content reveal

**Modal Transitions**
- Background: Fade with blur effect
- Modal: Scale up from 0.9 to 1.0 with fade
- Exit: Reverse of entry with shorter duration

### 3. Content Animations

**Card Animations**
- Hover: Subtle lift (translateY(-5px)) with shadow increase
- Click: Scale down slightly before navigation
- Grid entry: Staggered fade-in sequence

**List Animations**
- Item entry: Slide in with fade
- Item removal: Fade out with height collapse
- Reordering: Position transition with path animation

**Image Animations**
- Loading: Blur-up technique
- Gallery: Smooth crossfade between images
- Hover: Subtle zoom (scale 1.05-1.1)

### 4. Scroll-Based Animations

**Parallax Effects**
- Hero section with multi-layer parallax
- Content sections with subtle depth effect
- Background elements with different scroll speeds

**Reveal Animations**
- Text fade in and slide up on scroll
- Section backgrounds transition on enter
- Progress indicators that fill as user scrolls

**Sticky Elements**
- Smooth transitions to fixed positioning
- Content transformation during scroll (e.g., header condensing)

## Performance Optimization

### Animation Throttling

- Reduce animation complexity on mobile devices
- Disable complex animations during scrolling
- Use `requestAnimationFrame` for smooth rendering

### Element Targeting

- Prefer animating CSS properties that only affect compositing
  - Good: transform, opacity
  - Avoid: width, height, top, left (cause layout recalculation)
- Use `will-change` property sparingly and strategically

### Rendering Optimization

- Offload animations to GPU when possible
- Implement virtualization for long animated lists
- Avoid simultaneous heavy animations

## Accessibility Considerations

- Provide `prefers-reduced-motion` media query support
- Ensure all animated content is accessible with keyboard navigation
- Avoid animations that could trigger motion sickness or seizures
- Include option to disable non-essential animations

## Animation Examples by Page

### Landing Page

**Hero Section**
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  <HeroContent />
</motion.div>
```

**Upcoming Events**
```jsx
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {events.map((event, index) => (
    <motion.div
      key={event.id}
      variants={itemVariants}
      custom={index}
    >
      <EventCard event={event} />
    </motion.div>
  ))}
</motion.div>
```

**Image Gallery**
```jsx
<motion.div
  animate={{ x: -slidePosition }}
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
  className="gallery-track"
>
  {images.map(image => (
    <GalleryItem key={image.id} image={image} />
  ))}
</motion.div>
```

### Authentication Pages

**Form Field Animation**
```jsx
<motion.div
  whileFocus={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  <Input placeholder="Email" />
</motion.div>
```

**Success Animation**
```jsx
<AnimatePresence>
  {isSuccess && (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring" }}
    >
      <SuccessMessage />
    </motion.div>
  )}
</AnimatePresence>
```

### Discover Events Page

**Filter Animation**
```jsx
<motion.div
  initial={false}
  animate={{ height: isOpen ? "auto" : 0 }}
  transition={{ duration: 0.3, ease: "easeInOut" }}
>
  <FilterOptions />
</motion.div>
```

**Card Grid Layout**
```jsx
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5
    }
  })
};
```

## GSAP Timeline Example

```javascript
// Hero sequence animation
const tl = gsap.timeline();

tl.from(".hero-title", {
  opacity: 0,
  y: 50,
  duration: 0.8,
  ease: "power3.out"
})
.from(".hero-subtitle", {
  opacity: 0,
  y: 30,
  duration: 0.6,
  ease: "power3.out"
}, "-=0.4")
.from(".hero-cta", {
  opacity: 0,
  scale: 0.9,
  duration: 0.5,
  ease: "back.out(1.7)"
}, "-=0.2")
.from(".hero-image", {
  opacity: 0,
  x: 30,
  duration: 1,
  ease: "power2.out"
}, "-=0.5");
```

## Custom Animation Hooks

```javascript
// src/hooks/useAnimation.js
export const useFadeIn = (delay = 0) => {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      duration: 0.6, 
      delay, 
      ease: [0.6, 0.05, -0.01, 0.9] 
    }
  };
};

export const usePageTransition = () => {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.4 }
  };
};
```

## Implementation Roadmap

1. **Foundation (Week 1)**
   - Set up animation libraries
   - Create base animation components
   - Implement global transition settings

2. **Core Interactions (Week 2)**
   - Implement micro-interactions
   - Add form animations
   - Develop button and input animations

3. **Page Animations (Week 3)**
   - Landing page animations
   - Authentication page animations
   - Develop page transitions

4. **Complex Features (Week 4)**
   - Event card animations
   - Sliding gallery implementation
   - Modal and popup animations

5. **Optimization & Refinement (Week 5)**
   - Performance testing
   - Mobile optimization
   - Accessibility improvements 