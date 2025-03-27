# Campus Event Finder - Project Architecture

## File Structure

```
uwu/demow/
├── assets/
│   └── images/            # Image resources
├── index.html             # Landing page
├── login.html             # User login page
├── signup.html            # User registration page
├── discover.html          # Discover events page
├── myevents.html          # My events and hosting page
├── host.html              # Event hosting form page
├── admin-login.html       # Admin login page (to be created)
├── admin-dashboard.html   # Admin dashboard (to be created)
├── supabase-config.js     # Supabase configuration
├── auth.js                # Authentication logic
├── home.js                # Landing page functionality
├── discover.js            # Discover page functionality
├── myevents.js            # My events page functionality
├── host.js                # Event hosting functionality
├── team-registration.js   # Team registration logic (to be created)
├── admin.js               # Admin functionality (to be created)
├── home.css               # Landing page styles
├── auth.css               # Authentication page styles
├── discover.css           # Discover page styles
├── myevents.css           # My events page styles
├── host.css               # Host page styles
├── admin.css              # Admin page styles (to be created)
└── README.md              # Project documentation
```

## Component Architecture

```
+-------------------+       +-------------------+
|   Landing Page    |------>|  Authentication   |
| (index.html)      |       | (login/signup)    |
+-------------------+       +-------------------+
        |                           |
        |                           v
        |                   +-------------------+
        +------------------>|  Discover Events  |
        |                   | (discover.html)   |
        |                   +-------------------+
        |                           |
        v                           v
+-------------------+       +-------------------+
|    Admin Panel    |       |    My Events      |
| (admin-*.html)    |       | (myevents.html)   |
+-------------------+       +-------------------+
                                    |
                                    v
                            +-------------------+
                            |  Host an Event    |
                            | (host.html)       |
                            +-------------------+
```

## Data Flow

```
+----------------+    +-----------------+    +----------------+
| User Interface |<-->| Authentication  |<-->| Supabase      |
| (HTML/CSS)     |    | (auth.js)       |    | Database      |
+----------------+    +-----------------+    +----------------+
        ^                     ^                      ^
        |                     |                      |
        v                     v                      v
+----------------+    +-----------------+    +----------------+
| UI Components  |<-->| Business Logic  |<-->| Data Models   |
| (*.js files)   |    | (*.js files)    |    | (Objects)     |
+----------------+    +-----------------+    +----------------+
```

## Authentication Flow

```
+---------------+    +---------------+    +---------------+
| User          |--->| Login/Signup  |--->| Validation    |
+---------------+    +---------------+    +---------------+
                                                |
                                                v
+---------------+    +---------------+    +---------------+
| User Profile  |<---| Session       |<---| Supabase Auth |
+---------------+    +---------------+    +---------------+
```

## Event Registration Flow

```
+---------------+    +---------------+    +---------------+
| Discover      |--->| RSVP/Team     |--->| Validation    |
| Events Page   |    | Registration  |    |               |
+---------------+    +---------------+    +---------------+
                                                |
                                                v
+---------------+    +---------------+    +---------------+
| My Events     |<---| Update User   |<---| Database      |
| Page          |    | Records       |    | Update        |
+---------------+    +---------------+    +---------------+
```

## Admin Management Flow

```
+---------------+    +---------------+    +---------------+
| Admin         |--->| Event         |--->| Approve/      |
| Dashboard     |    | Review        |    | Reject        |
+---------------+    +---------------+    +---------------+
                                                |
                                                v
+---------------+    +---------------+    +---------------+
| Event Status  |<---| Update Event  |<---| Database      |
| Update        |    | Status        |    | Update        |
+---------------+    +---------------+    +---------------+
```

## Responsive Design Breakpoints

- Mobile: < 480px
- Tablet: 480px - 768px
- Desktop: > 768px

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Supabase (Backend as a Service)
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Storage**: Supabase Storage (for event flyers)
- **Animations**: GSAP, AOS
- **3D Effects**: Three.js
- **Charts**: Chart.js 