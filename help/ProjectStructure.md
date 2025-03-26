# Project Structure

```
campus-event-finder/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── assets/
│       ├── images/
│       │   ├── campus/
│       │   ├── events/
│       │   └── logos/
│       └── fonts/
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── ImageSlider.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── MainLayout.jsx
│   │   │   └── AuthLayout.jsx
│   │   │
│   │   ├── home/
│   │   │   ├── Hero.jsx
│   │   │   ├── UpcomingEvents.jsx
│   │   │   ├── EventCard.jsx
│   │   │   └── PastEventsGallery.jsx
│   │   │
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   ├── SignupForm.jsx
│   │   │   └── ForgotPasswordForm.jsx
│   │   │
│   │   ├── events/
│   │   │   ├── EventGrid.jsx
│   │   │   ├── EventFilter.jsx
│   │   │   ├── EventDetailsModal.jsx
│   │   │   └── TeamRegistrationModal.jsx
│   │   │
│   │   ├── myEvents/
│   │   │   ├── RegisteredEvents.jsx
│   │   │   ├── HostingEvents.jsx
│   │   │   └── TabNavigation.jsx
│   │   │
│   │   └── hostEvent/
│   │       ├── EventForm.jsx
│   │       ├── StepTracker.jsx
│   │       ├── EventBasics.jsx
│   │       ├── LocationDetails.jsx
│   │       ├── AttendeesInfo.jsx
│   │       └── FileUploader.jsx
│   │
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── SignupPage.jsx
│   │   ├── DiscoverEventsPage.jsx
│   │   ├── MyEventsPage.jsx
│   │   ├── HostEventPage.jsx
│   │   └── AdminLoginPage.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── EventContext.jsx
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useEvents.js
│   │   └── useAnimation.js
│   │
│   ├── animations/
│   │   ├── fadeIn.js
│   │   ├── slideIn.js
│   │   ├── buttonAnimation.js
│   │   └── pageTransition.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   └── event.service.js
│   │
│   ├── utils/
│   │   ├── validators.js
│   │   ├── formatters.js
│   │   └── mockData.js
│   │
│   ├── styles/
│   │   ├── variables.scss
│   │   ├── animations.scss
│   │   ├── global.scss
│   │   ├── components/
│   │   └── pages/
│   │
│   ├── constants/
│   │   ├── routes.js
│   │   └── messages.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── routes.jsx
│
├── .gitignore
├── package.json
├── vite.config.js
├── index.html
└── README.md
```

## Key Files Description

### Main Application Files

- **main.jsx**: Entry point of the application
- **App.jsx**: Root component handling routing and global state
- **routes.jsx**: Application routes configuration

### Component Structure

Components are organized by feature and common functionality:

- **common/**: Reusable UI components used across the application
- **layout/**: Page layout components that provide structure
- **home/**: Components specific to the landing page
- **auth/**: Authentication related components
- **events/**: Components for event discovery and interaction
- **myEvents/**: Components for user's event management
- **hostEvent/**: Components for event creation process

### Context and State Management

- **AuthContext.jsx**: Manages user authentication state
- **EventContext.jsx**: Manages events data and operations

### Animations

Dedicated folder for animation definitions to maintain a consistent and reusable animation system:

- **fadeIn.js**: Fade-in animations for elements
- **slideIn.js**: Slide-in animations for elements
- **buttonAnimation.js**: Button interaction animations
- **pageTransition.js**: Page transition animations

### Styles

SCSS organization for maintainable styling:

- **variables.scss**: Color palette, typography, and spacing variables
- **animations.scss**: Global animation keyframes and transitions
- **global.scss**: Global styles and resets
- **components/**: Component-specific styles
- **pages/**: Page-specific styles

### Utility Functions

- **validators.js**: Form validation utilities
- **formatters.js**: Data formatting helpers
- **mockData.js**: Mock data for development before backend integration

## Development Guidelines

1. **Component Development**:
   - Create reusable components with props for customization
   - Document props with JSDoc comments
   - Implement responsive design in every component

2. **Animation Implementation**:
   - Use animation libraries consistently
   - Create abstracted animation hooks for reusability
   - Ensure animations are performant and don't cause layout shifts

3. **State Management**:
   - Use React Context for global state
   - Implement custom hooks for state logic
   - Keep component state localized when possible

4. **Styling Approach**:
   - Follow BEM naming convention
   - Use SCSS modules for component styling
   - Maintain the design system variables for consistency

5. **Performance Optimization**:
   - Implement code splitting for each page
   - Lazy load images and components
   - Optimize animations for performance 