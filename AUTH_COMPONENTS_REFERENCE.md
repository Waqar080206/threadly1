# Threadly Auth Components Reference

## Quick Setup

### 1. Environment Setup
Create a `.env.local` file with Firebase credentials:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDw6JsbPxAU3Okj-v5EG9j-Bx4sqDE-lQA
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=threadly-bf1d5.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=threadly-bf1d5
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=threadly-bf1d5.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=613950158259
NEXT_PUBLIC_FIREBASE_APP_ID=1:613950158259:web:7fe66808895a0eccd607c6
```

### 2. Root Layout Setup
Wrap your app with `AuthProvider`:
```tsx
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <AuthProvider>
          <Nav />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

---

## Context API

### `AuthContext`
Global authentication state management.

**Location:** `src/context/AuthContext.tsx`

**Types:**
```tsx
interface AuthContextType {
  user: User | null;
  loading: boolean;
}
```

### `useAuth()` Hook
Access current user and loading state anywhere in your app.

```tsx
import { useAuth } from "@/context/AuthContext";

function MyComponent() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {user ? (
        <p>Welcome, {user.email}</p>
      ) : (
        <p>Please sign in</p>
      )}
    </div>
  );
}
```

---

## Auth Functions

### `signInWithGoogle()`
Sign user in with Google OAuth.

**Location:** `src/lib/auth.ts`

**Returns:** `Promise<UserCredential>`

**Usage:**
```tsx
import { signInWithGoogle } from "@/lib/auth";

async function handleSignIn() {
  try {
    const result = await signInWithGoogle();
    console.log("User:", result.user);
  } catch (error) {
    console.error("Sign-in failed:", error);
  }
}
```

### `logout()`
Sign user out.

**Location:** `src/lib/auth.ts`

**Returns:** `Promise<void>`

**Usage:**
```tsx
import { logout } from "@/lib/auth";

async function handleLogout() {
  await logout();
  router.push("/");
}
```

---

## Auth Page Components

### Main Auth Page (`/auth`)

**Location:** `src/app/auth/page.tsx`

**Features:**
- 5-step authentication flow
- Progress indicator
- Step navigation
- Auto-redirect on completion

**State:**
- `step` (1-5): Current step
- `workspaceData`: Accumulated form data
- `user` & `loading`: From `useAuth()` hook

**Props:** None (uses Context)

**Flow:**
```
Step 1 → Step 2 → Step 3 → Step 4 → Step 5 → Dashboard
  ↑ onNext
  ↓ onPrevious (1-4 only)
```

---

### AuthStep1 - Google Sign In

**Location:** `src/components/auth/AuthStep1.tsx`

**Props:**
```tsx
interface AuthStep1Props {
  onNext: (data?: any) => void;
}
```

**Features:**
- Google OAuth button
- Error handling
- Loading state
- Privacy badge
- Step preview cards

**Triggers `onNext()` with:**
```tsx
{ email: user.email }
```

---

### AuthStep2 - Create Workspace

**Location:** `src/components/auth/AuthStep2.tsx`

**Props:**
```tsx
interface AuthStep2Props {
  onNext: (data?: any) => void;
  onPrevious: () => void;
  email: string | null;
}
```

**Form Fields:**
- `workspaceName` (required): Text input
- `email` (display-only): From OAuth

**Validation:**
- Workspace name must be non-empty
- Minimum 3 characters recommended

**Triggers `onNext()` with:**
```tsx
{ name: workspaceName }
```

---

### AuthStep3 - Import Contacts

**Location:** `src/components/auth/AuthStep3.tsx`

**Props:**
```tsx
interface AuthStep3Props {
  onNext: (data?: any) => void;
  onPrevious: () => void;
}
```

**Multi-select Options:**
- Gmail: "✉️ Your email + attachments"
- LinkedIn: "🔗 Connections + messaging"
- Telegram: "📱 Chats + group members"
- WhatsApp: "💬 Contacts + chats (optional)"

**Validation:**
- At least one source required

**Triggers `onNext()` with:**
```tsx
{ sources: ["gmail", "linkedin", ...] }
```

---

### AuthStep4 - Connect Email

**Location:** `src/components/auth/AuthStep4.tsx`

**Props:**
```tsx
interface AuthStep4Props {
  onNext: (data?: any) => void;
  onPrevious: () => void;
}
```

**Features:**
- Email connection button
- Feature cards (3)
- Loading state
- Success state with checkmark

**Triggers `onNext()` with:**
```tsx
{ emailConnected: true }
```

---

### AuthStep5 - Success

**Location:** `src/components/auth/AuthStep5.tsx`

**Props:**
```tsx
interface AuthStep5Props {
  onSuccess: () => void;
}
```

**Features:**
- Success animation
- Confetti effect
- Progress bar
- Next steps list
- Auto-redirect (2.5s)

**Triggers `onSuccess()` after 2.5s**

---

### AuthConfetti - Success Animation

**Location:** `src/components/auth/AuthConfetti.tsx`

**Props:** None

**Features:**
- 30 colored confetti pieces
- Coral + Plum + other brand colors
- Falling animation (2-3s)
- Staggered delays (0-0.5s)
- Auto-cleanup

**Colors used:**
- Coral (#E85A3C)
- Plum (#6E4A5F)
- Teal (#2D7D7A)
- Copper (#C07A2C)
- Indigo (#3D4E7E)
- Sage (#7B9A8D)

---

## Firebase Setup

### `firebase.ts`
Firebase configuration and initialization.

**Location:** `src/lib/firebase.ts`

**Exports:**
- `auth` (Auth instance)

**Features:**
- Environment-based config (uses `NEXT_PUBLIC_*` variables)
- SSR-safe analytics initialization
- Lazy analytics loading (client-only)

**Usage:**
```tsx
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(auth, (user) => {
  // user is authenticated
});
```

---

## Styling Guide

### CSS Variables (in `globals.css`)
```css
--background: #faf8f3;      /* Page bg */
--paper: #f2efe8;            /* Secondary bg */
--surface: #ffffff;          /* Card bg */
--ink: #1a1816;              /* Primary text */
--muted: #6b6660;            /* Secondary text */
--muted-strong: #48443e;     /* Tertiary text */
--border: #e4dfd4;           /* Dividers */
--hairline: #ece7db;         /* Subtle borders */

--coral: #e85a3c;            /* Snap accent */
--plum: #6e4a5f;             /* Brand accent */
--teal: #2d7d7a;             /* Nudge accent */
--copper: #c07a2c;           /* Gatekeeper accent */
--indigo: #3d4e7e;           /* Pulse accent */
--sage: #7b9a8d;             /* Recall accent */
```

### Tailwind Classes
```tsx
// Background
bg-background        // #FAF8F3
bg-paper             // #F2EFE8
bg-surface           // #FFFFFF

// Text
text-ink             // #1A1816 (primary)
text-muted           // #6B6660 (secondary)
text-muted-strong    // #48443E (tertiary)

// Borders
border-border        // #E4DFD4
border-hairline      // #ECE7DB

// Accents
bg-coral, text-coral
bg-plum, text-plum
bg-teal, text-teal
bg-copper, text-copper
bg-indigo, text-indigo
bg-sage, text-sage

// Utilities
rounded-2xl          // 16px border radius (auth)
font-editorial       // Bricolage Grotesque (display)
font-mono            // JetBrains Mono (labels)
transition-colors    // 200ms default
```

---

## Responsive Design

### Breakpoints
```tsx
// Mobile (default)
<input className="..." />

// Tablet & up (md:)
<div className="p-8 md:p-12" />

// Large screens (lg:)
<div className="max-w-2xl" />
```

### Mobile-First Approach
```tsx
// Mobile: 24px padding
// Desktop: 32px padding
<div className="px-6 md:px-8" />
```

---

## Error Handling

### Firebase Auth Errors
```tsx
try {
  await signInWithGoogle();
} catch (error) {
  if (error.code === "auth/popup-blocked") {
    console.error("Pop-up was blocked");
  } else if (error.code === "auth/cancelled-popup-request") {
    console.error("Sign-in was cancelled");
  } else {
    console.error("Unknown error:", error.message);
  }
}
```

### Form Validation
```tsx
// In AuthStep2:
if (!workspaceName.trim()) {
  // Show error
  return;
}

// In AuthStep3:
if (selectedSources.length === 0) {
  // Disable submit button
  disabled={selectedSources.length === 0}
}
```

---

## Testing

### Unit Tests
```tsx
// Example: AuthStep1
import { render, screen } from "@testing-library/react";
import { AuthStep1 } from "@/components/auth/AuthStep1";

test("renders Google sign-in button", () => {
  const mockOnNext = jest.fn();
  render(<AuthStep1 onNext={mockOnNext} />);
  
  expect(screen.getByText("Continue with Google")).toBeInTheDocument();
});
```

### Integration Tests
```tsx
// Test full auth flow
test("completes auth flow successfully", async () => {
  render(<AuthPage />);
  
  // Step 1: Google sign-in
  fireEvent.click(screen.getByText("Continue with Google"));
  await waitFor(() => expect(screen.getByText("Create your workspace")).toBeInTheDocument());
  
  // Step 2: Create workspace
  fireEvent.change(screen.getByPlaceholderText("e.g., Acme Capital"), {
    target: { value: "Test Workspace" },
  });
  fireEvent.click(screen.getByText("Create Workspace"));
  
  // ... continue through remaining steps
});
```

---

## Deployment

### Vercel
```bash
# Environment variables in Vercel dashboard:
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
```

### Build
```bash
npm run build
# Output: .next/
```

### Local Development
```bash
npm run dev
# Open http://localhost:3000/auth
```

---

## Browser Support

- **Modern browsers only:**
  - Chrome 90+
  - Firefox 88+
  - Safari 14+
  - Edge 90+

- **Not supported:**
  - IE 11
  - Older mobile browsers

---

## Performance

### Lighthouse Metrics
- **First Contentful Paint:** < 1s
- **Largest Contentful Paint:** < 2s
- **Cumulative Layout Shift:** < 0.1
- **Time to Interactive:** < 2.5s

### Bundle Size
- Auth page: ~45KB (gzipped)
- Firebase SDK: ~35KB (gzipped)
- React/Next.js: Shared with app bundle

---

## Related Documentation

- [Threadly Auth Design System](./AUTH_DESIGN_SYSTEM.md)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [React Context API](https://react.dev/reference/react/useContext)

---

**Last Updated:** June 17, 2026
