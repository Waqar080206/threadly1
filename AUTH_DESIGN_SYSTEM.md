# Threadly Auth Design System

## Overview

The Threadly authentication system is designed to feel like **entering a private intelligence system for relationships**, not signing up for another productivity app. Every visual and interaction choice reinforces trust, sophistication, and editorial precision.

**Brand Personality:**
- Trusted relationship operator (not a startup dashboard)
- Private member club aesthetic
- Wealth management portal sophistication  
- Linear / Notion / Stripe Press visual language
- Monocle-inspired attention to detail

---

## Color System

### Background Surfaces
```css
Primary surface (page bg):  #FAF8F3
Secondary surface (cards):  #ECE7DB
Elevated cards (surface):   #FFFFFF
```

### Text
```css
Primary text:     #1A1816  (Ink)
Secondary text:   #48443E  (Muted Strong)
Muted text:       #6B6660  (Muted)
```

### Accent Colors
```css
Coral:   #E85A3C  (Snap - heat, speed, energy)
Plum:    #6E4A5F  (Threadly brand secondary)
Indigo:  #3D4E7E  (Pulse - platforms, knowledge)
Teal:    #2D7D7A  (Nudge - watchful, quiet)
Copper:  #C07A2C  (Gatekeeper - gatekeeping, control)
Sage:    #7B9A8D  (Recall - wisdom, notes)
Gold:    #B89656  (Supporting accent)
```

### Implementation
All colors are CSS custom properties in `globals.css`:
```css
:root {
  --background: #faf8f3;
  --coral: #e85a3c;
  --plum: #6e4a5f;
  --teal: #2d7d7a;
  --copper: #c07a2c;
  --indigo: #3d4e7e;
  --sage: #7b9a8d;
}
```

---

## Typography

### Display Headlines
- **Font:** Bricolage Grotesque
- **Variable:** `--font-display`
- **Usage:** Page titles, CTAs, hero copy
- **CSS Class:** `.font-editorial`
- **Weight:** 600-800
- **Letter spacing:** -0.025em

### Body Text
- **Font:** Inter
- **Variable:** `--font-inter`
- **Usage:** Descriptions, labels, instructions
- **Weight:** 400-500
- **Line height:** 1.5

### System Labels & Code
- **Font:** JetBrains Mono
- **Variable:** `--font-mono`
- **Usage:** Status labels, step counters, metadata
- **CSS Class:** `.font-mono`
- **Uppercase:** Always for labels ("STEP 1 OF 5")

---

## Background Treatment

### ✅ DO
- Subtle paper texture (subtle CSS filters)
- Extremely soft radial washes (4-8% opacity only)
- Editorial whitespace (breathing room)
- Coral and plum gradients as accent only
- Soft blur and transparency

### ❌ DON'T
- Large floating blobs
- Neon gradients
- Bright SVG lighting effects
- Cyberpunk aesthetics
- Gaming vibes

### Implementation
```css
/* Soft background washes for auth page */
.bg-gradient-radial {
  background-image: radial-gradient(var(--tw-gradient-stops));
}

/* In auth page: */
<div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-radial from-coral to-transparent opacity-5 rounded-full blur-3xl" />
<div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-radial from-plum to-transparent opacity-5 rounded-full blur-3xl" />
```

---

## Button System

### Primary Button
```css
Background: #1A1816 (Ink)
Text:       #FAF8F3 (Background)
Padding:    16px 24px (py-4 px-6)
Border radius: 16px (rounded-2xl)
Font weight: 500 (medium)
Hover:      #2A2724 (darker)
Focus:      2px solid outline
```

**HTML:**
```tsx
<button className="px-6 py-4 bg-ink text-background rounded-2xl font-medium transition-all duration-200 flex items-center justify-center gap-3 hover:bg-gray-900">
  Primary Action
  <ArrowRight className="w-4 h-4" />
</button>
```

### Secondary Button
```css
Background: transparent
Border:     1px solid #ECE7DB (hairline)
Text:       #1A1816 (Ink)
Padding:    12px 24px (py-3 px-6)
Border radius: 16px (rounded-2xl)
Hover:      #ECE7DB background
```

**HTML:**
```tsx
<button className="px-6 py-3 border border-hairline text-ink rounded-2xl font-medium transition-colors hover:bg-paper">
  Secondary Action
</button>
```

---

## Input Fields

### Text Input
```css
Background:    rgba(255, 255, 255, 0.8)
Border:        1px solid #ECE7DB
Border radius: 16px (rounded-2xl)
Padding:       12px 16px (py-3 px-4)
Font:          Inter, regular weight
Placeholder:   #6B6660 (Muted)
Focus border:  1px solid #6E4A5F (Plum)
Transition:    200ms ease
```

**NO glassmorphism**

**HTML:**
```tsx
<input 
  type="text"
  placeholder="e.g., Acme Capital"
  className="w-full px-4 py-3 bg-white border border-hairline rounded-2xl text-ink placeholder:text-muted focus:border-plum focus:outline-none transition-colors"
/>
```

### States
- **Idle:** Border #ECE7DB
- **Focus:** Border #6E4A5F (Plum)
- **Disabled:** Opacity 50%, cursor not-allowed
- **Error:** Border #E85A3C (Coral)

---

## Authentication Flow

### Step 1: Sign In
**Headline:** "Never lose someone important again."

**Subtext:** "Your relationship network is already your most valuable asset. Threadly helps you keep it alive."

**Primary CTA:** "Continue with Google"

**Components:**
- Google OAuth button with subtle icon
- Privacy badge: "Classification is local. The graph is the user's."
- Progress indicator (1 of 5)

### Step 2: Create Workspace
**Headline:** "Create your workspace"

**Subtext:** "Give your team or portfolio a name. You can have multiple workspaces."

**Inputs:**
- Workspace name (text input)
- Email (display-only, from OAuth)

**Note:** "Each workspace has its own graph, team members, and compliance settings."

### Step 3: Import Contacts
**Headline:** "Import your contacts"

**Subtext:** "Choose where Snap should pull in your relationship data. You can add more sources later."

**Options (with icons):**
- ✉️ Gmail - Your email + attachments
- 🔗 LinkedIn - Connections + messaging
- 📱 Telegram - Chats + group members
- 💬 WhatsApp - Contacts + chats (optional)

**Privacy note:** "Snap runs locally on your device. Your raw data never leaves your workspace."

### Step 4: Connect Email
**Headline:** "Connect your email"

**Subtext:** "Nudge watches for relationship cues in your inbox and drafts follow-ups before you forget."

**Feature cards:**
- 🔔 Real-time cues
- ✍️ Draft mode
- 🚫 You control it

**Permissions note:** "You'll see Google's permission screen. We request read access to your inbox only—no sending on your behalf."

### Step 5: Success State
**Headline:** "Your Crew is ready."

**Subtext:** "Chief is mapping your network. This usually takes less than a minute."

**Visual elements:**
- Animated checkmark icon
- Success animation (pulsing gradient bar)
- Confetti effect (Coral + Plum only, NOT bright green)
- Auto-redirect to dashboard after 2-3 seconds

**Next steps:**
- ✓ Chief indexes your network
- ✓ You get your first Morning Connect draft
- ✓ Team members receive invitations

---

## Success State Design

### ✅ DO
- Use Coral + Plum confetti
- Subtle celebration animation
- Clear "What happens next" messaging
- Auto-redirect (not forced wait)
- Warm, earned feeling

### ❌ DON'T
- Bright green success screens
- Confusing animations
- Unclear next steps
- Forced celebration delays
- Generic checkmark

### Implementation
```tsx
function AuthConfetti() {
  const colors = [
    "bg-coral",
    "bg-plum",
    "bg-teal",
    "bg-copper",
    "bg-indigo",
    "bg-sage",
  ];

  // Confetti pieces fall from top, rotating, with staggered delays
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {confetti.map((item) => (
        <div
          key={item.id}
          className={`absolute w-2 h-2 rounded-full ${item.color}`}
          style={{
            animation: `fall ${item.duration}s linear ${item.delay}s forwards`,
          }}
        />
      ))}
    </div>
  );
}
```

---

## Progress Indicator

### Design
- **Style:** Horizontal pill indicators
- **Inactive:** 8px width, #ECE7DB background
- **Active:** 32px width, #1A1816 background
- **Spacing:** 8px gap between pills
- **Animation:** Smooth transitions (200ms)

**HTML:**
```tsx
<div className="flex gap-2 justify-center">
  {[1, 2, 3, 4, 5].map((num) => (
    <div
      className={`h-2 rounded-full transition-all ${
        num === activeStep
          ? "w-8 bg-ink"
          : "w-2 bg-hairline"
      }`}
    />
  ))}
</div>
```

---

## Layout Specs

### Auth Page Container
```css
Max width:     768px (max-w-2xl)
Horizontal padding: 24px (px-6)
Vertical padding:   48px (py-12)
Gap (sections):     32px (gap-8)
```

### Card Container
```css
Background:    #FFFFFF
Border:        1px solid #ECE7DB
Border radius: 16px (rounded-2xl)
Padding:       32px-48px (p-8 md:p-12)
Shadow:        Subtle drop shadow
```

### Logo/Brand Section
```css
Logo size:     48px (w-12 h-12)
Gap to title:  16px (gap-4)
Title size:    32px (text-3xl)
Title style:   Editorial font
```

---

## Component Files

```
src/
├── app/
│   └── auth/
│       └── page.tsx          # Main auth container + step management
├── components/
│   └── auth/
│       ├── AuthStep1.tsx      # Google sign-in
│       ├── AuthStep2.tsx      # Create workspace
│       ├── AuthStep3.tsx      # Import contacts
│       ├── AuthStep4.tsx      # Connect email
│       ├── AuthStep5.tsx      # Success state
│       └── AuthConfetti.tsx   # Confetti animation
├── context/
│   └── AuthContext.tsx        # User auth state + provider
└── lib/
    ├── auth.ts               # Firebase auth functions
    └── firebase.ts           # Firebase config
```

---

## Usage Example

### For Developers
```tsx
import { AuthProvider } from "@/context/AuthContext";
import { useAuth } from "@/context/AuthContext";

// In your root layout:
<AuthProvider>
  {children}
</AuthProvider>

// In any component:
function MyComponent() {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please sign in</div>;
  
  return <div>Welcome, {user.email}</div>;
}
```

---

## Accessibility

- **Focus states:** 2px solid outline, visible and never dropped
- **Color contrast:** All text meets WCAG AA standards (4.5:1+)
- **Keyboard navigation:** Tab through all interactive elements
- **Skip links:** None needed (simple linear flow)
- **Labels:** All inputs have associated labels
- **ARIA:** Semantic HTML preferred over ARIA roles

---

## Mobile Optimization

- **Responsive:** Works on all screen sizes
- **Touch targets:** Minimum 44px height for buttons
- **Typography:** Scales appropriately on mobile
- **Spacing:** Maintains visual hierarchy on small screens
- **Inputs:** Native keyboard on mobile (no custom keyboards)

---

## Dark Mode

**Not supported.** Threadly auth is light-only by design. The warm paper aesthetic doesn't translate to dark mode, and the brand personality emphasizes editorial clarity.

---

## Environment Variables

Required for Firebase:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=<key>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=threadly-bf1d5.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=threadly-bf1d5
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=threadly-bf1d5.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<id>
NEXT_PUBLIC_FIREBASE_APP_ID=<id>
```

---

## Animation Timings

```css
Transition default: 200ms ease
Button hover:       Instant (0ms)
Step transitions:   300ms ease-out
Confetti:          2-3s fall with 0-0.5s stagger
Success redirect:   2-2.5s delay
Focus ring:        Instant (200ms on hover effects)
```

---

## Overall Feeling

**Should feel like:**
"I am entering a private intelligence system for relationships."

**Should NOT feel like:**
"I am signing up for another productivity app."

Every pixel, every animation, every word choice reinforces that Threadly is a **rare, sophisticated tool** for serious relationship intelligence—not a trendy SaaS signup.

---

**Design System v1.0** — Created June 17, 2026
