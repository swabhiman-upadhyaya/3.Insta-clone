# Insta-Clone — Frontend

A React + Vite frontend for the Instagram clone project, styled to closely match the **Instagram web and mobile UI**.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:5173)
npm run dev
```

---

## 📁 Folder Structure

```
Frontend/
├── src/
│   ├── App.jsx                        # Root component — wraps providers and router
│   ├── AppRoutes.jsx                  # Route definitions (Login, Register, Feed, CreatePost)
│   ├── main.jsx                       # React entry point
│   │
│   ├── features/
│   │   ├── auth/                      # Authentication feature
│   │   │   ├── auth.context.jsx       # Auth context provider
│   │   │   ├── hooks/useAuth.js       # Auth hook (login, register, loading state)
│   │   │   ├── services/              # API call helpers
│   │   │   ├── pages/
│   │   │   │   ├── Login.jsx          # Login page (Instagram-style card)
│   │   │   │   └── Register.jsx       # Sign-up page (Instagram-style card)
│   │   │   └── style/
│   │   │       └── form.scss          # Auth card styles — white, bordered, gradient wordmark
│   │   │
│   │   ├── post/                      # Post feature
│   │   │   ├── post.context.jsx       # Post context provider
│   │   │   ├── hooks/usePost.js       # Post hook (createPost, getFeed, loading)
│   │   │   ├── services/              # API call helpers
│   │   │   ├── components/
│   │   │   │   └── Post.jsx           # Individual post card component
│   │   │   ├── pages/
│   │   │   │   ├── Feed.jsx           # Feed page — lists all posts
│   │   │   │   └── CreatePost.jsx     # Create Post page — image + caption form
│   │   │   └── style/
│   │   │       ├── feed.scss          # Feed + post card styles
│   │   │       └── createpost.scss    # Create post form styles
│   │   │
│   │   └── shared/                    # Shared / reusable components & styles
│   │       ├── Nav.jsx                # Bottom navigation bar (5 icons)
│   │       ├── global.scss            # Global reset, design tokens, font, colors
│   │       ├── nav.scss               # Bottom tab bar styles
│   │       └── button.scss            # Button component styles (.button.primary-button)
│
├── public/                            # Static assets
├── index.html                         # HTML shell
├── vite.config.js                     # Vite config
├── package.json
└── README.md                          # ← You are here
```

---

## 🎨 Instagram-Style UI Overhaul

All UI changes were applied to match **Instagram's design language** as closely as possible.  
Every changed line has an inline comment explaining **what changed and why**.

### Design Tokens (`global.scss`)

A set of CSS custom properties (variables) was added to `global.scss` as the single source of truth for colours:

| Variable | Value | Usage |
|---|---|---|
| `--ig-white` | `#ffffff` | Backgrounds |
| `--ig-bg` | `#fafafa` | Page background (Instagram's off-white) |
| `--ig-dark` | `#262626` | Primary text |
| `--ig-medium` | `#737373` | Muted / secondary text |
| `--ig-border` | `#dbdbdb` | Card and input borders |
| `--ig-red` | `#ed4956` | Like button active color |
| `--ig-gradient` | orange → red → purple | Logo wordmark gradient |
| `--ig-gradient-stories` | orange → pink → purple | Story ring gradient |

---

## 📝 Files Changed & What Changed

### `src/features/shared/global.scss`
- **Background**: changed from dark `#424242` → Instagram's `#fafafa`
- **Text color**: changed from light `#ededed` → dark `#262626`
- **Font**: updated to Instagram's `-apple-system, BlinkMacSystemFont, 'Segoe UI'` stack
- **Links**: changed from bright blue `#1d4ef0` → dark `#262626`
- **Added**: CSS custom properties (design tokens) for the entire app

### `src/features/shared/button.scss`
- **Background**: changed from pink gradient → Instagram's solid blue `#0095f2`
- **Font**: changed from `monospace` → system font, `600` weight
- **Border radius**: changed from `0.3rem` → `8px`
- **Added**: `hover`, `disabled`, and `active` states matching Instagram

### `src/features/shared/nav.scss`
- **Position**: changed from centred floating pill → full-width bottom bar (`left: 0; right: 0`)
- **Background**: changed from blurred dark RGBA → solid white with a top border
- **Width**: changed from fixed `332px` → full-width with `max-width: 480px`
- **Button style**: changed from white square boxes → transparent circular hit targets
- **Icon colour**: changed from inherited white → `--ig-dark` (dark on white background)

### `src/features/shared/Nav.jsx`
- Added JSDoc comment header documenting the component and icon order
- Added `aria-label` attributes to every button for accessibility
- Added inline comments identifying each icon (Home, Search, Create, Messages, Profile)

### `src/features/auth/style/form.scss`
- **Page background**: changed from transparent (dark page) → `--ig-bg` (off-white)
- **Card background**: changed from pink gradient → white with 1px grey border
- **Card shadow**: removed (Instagram's card is flat)
- **Card border-radius**: changed from `0.6rem` → `1px` (Instagram's near-square edges)
- **Hover scale**: removed (Instagram doesn't scale the card on hover)
- **`h1` (brand title)**: changed from plain text → Instagram gradient wordmark text
- **Inputs**: changed from dark border `#383838` → light `--ig-border`, with focus state
- **Added**: `::placeholder` styles, focus ring, and `OR` divider markup
- **Links**: coloured `#0095f2` (Instagram blue) instead of default

### `src/features/post/style/feed.scss`
- **Post layout**: changed from `flex-wrap` grid → single-column stack (Instagram style)
- **Post background**: changed from grey gradient → white with border
- **Post image**: changed from fixed `300px × 400px` → `100% × 470px` (fluid, portrait)
- **Post image border-radius**: changed from `0.8rem` → `0` (Instagram images are edge-to-edge)
- **Icons**: changed hardcoded `color: black` → `--ig-dark` token; `color: red` → `--ig-red`
- **Caption font**: changed from Trebuchet MS → system font, `14px`, normal weight
- **Profile ring**: improved from conic-gradient hack → proper `padding + background` approach
- **Added**: `padding-bottom` on feed to prevent last post being hidden by the nav bar

### `src/features/post/style/createpost.scss`
- **Background**: added `--ig-bg` white background (was inheriting dark page)
- **Label** (file picker): changed from white border → light grey border, blue text
- **Input**: changed from dark `#383838` border → light `--ig-border`, added focus state

### `src/features/auth/pages/Login.jsx`
- **Title**: changed `"Login"` → `"Instagram"` (uses gradient wordmark via CSS)
- **Button text**: changed `"Login"` → `"Log in"` (Instagram wording)
- **Sign-up link text**: changed `"Register"` → `"Sign up"` (Instagram wording)
- **Password field**: changed `type="text"` → `type="password"` (masks characters)
- **Placeholder**: updated to `"Phone number, username, or email"` / `"Password"` (Instagram copy)
- **Added**: JSDoc header, inline comments on every change

### `src/features/auth/pages/Register.jsx`
- **Title**: changed `"Register"` → `"Instagram"` (gradient wordmark)
- **Button text**: changed `"Register"` → `"Sign up"`
- **Login link text**: changed `"Login"` → `"Log in"`
- **Email field**: changed `type="text"` → `type="email"` (enables browser email validation)
- **Password field**: changed `type="text"` → `type="password"` (masks characters)
- **Placeholders**: updated to Instagram copy (`"Username"`, `"Mobile number or email"`, `"Password"`)
- **Added**: missing `form.scss` import, JSDoc header, inline comments on every change

---

## 🔗 Routes

| Path | Component | Description |
|---|---|---|
| `/` | `Login` | Default — redirects to login |
| `/login` | `Login` | Login page |
| `/register` | `Register` | Sign-up page |
| `/feed` | `Feed` | Main photo feed (auth required) |
| `/create-post` | `CreatePost` | New post form (auth required) |

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI library |
| Vite | Dev server + bundler |
| React Router v6 | Client-side routing |
| SCSS (Sass) | Component-level styles |
| Context API | Auth and Post global state |
