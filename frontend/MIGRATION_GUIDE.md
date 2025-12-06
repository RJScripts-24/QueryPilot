# Migration Guide: Vite React to Next.js App Router

## Overview
This project has been converted from a Vite + React application to a Next.js 14 application using the App Router architecture.

## File Structure Changes

### New Structure
```
/app
  layout.tsx          # Root layout with metadata and font loading
  page.tsx            # Main page component (converted from App.tsx)
  globals.css         # Global styles and animations

/components
  Header.tsx          # Navigation header component
  ChatContainer.tsx   # Chat message display component
  InputArea.tsx       # Message input component
  BackgroundEffects.tsx  # Animated background effects
  AnimatedRobot.tsx   # Interactive robot character
  ThinkingLightBulb.tsx  # Thinking indicator
  LoadingIndicator.tsx   # Loading state component
  VulnerabilityChips.tsx # Vulnerability status chips

/next.config.js       # Next.js configuration
/tailwind.config.ts   # Tailwind CSS configuration
/tsconfig.json        # TypeScript configuration
/postcss.config.js    # PostCSS configuration
/package.json         # Updated dependencies
```

### Removed Files
- `vite.config.ts` - Replaced by `next.config.js`
- `index.html` - Not needed in Next.js
- `src/main.tsx` - Replaced by App Router structure
- `src/index.css` - Merged into `app/globals.css`

## Key Changes

### 1. Component Conversion
- All components now use `"use client"` directive where needed (for hooks and interactivity)
- Inline styles converted to Tailwind utility classes
- All animations extracted to `app/globals.css`
- Responsive breakpoints added (mobile-first approach)

### 2. Styling
- Removed all inline `style` attributes (except for dynamic values like gradients)
- Converted to Tailwind utility classes
- Custom animations defined in `globals.css` using `@keyframes`
- Responsive design using `sm:`, `md:` breakpoints

### 3. Accessibility Improvements
- Added `aria-label` attributes to interactive elements
- Added `aria-hidden="true"` to decorative elements
- Proper semantic HTML (`header`, `main`, `section`)
- Keyboard navigation support with focus states
- Screen reader text with `sr-only` class

### 4. TypeScript
- All components use TypeScript with proper prop interfaces
- Type-safe props throughout

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Run Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at `http://localhost:3000`

### 3. Build for Production
```bash
npm run build
npm start
```

## Manual Steps Required

### 1. Wire Up Real Data
Replace mock data in components with actual API calls:

**ChatContainer.tsx** (line ~10):
```typescript
// TODO: Replace with actual API data fetching
const mockMessages: Message[] = [...]
```

Replace with:
```typescript
const { data: messages } = await fetch('/api/messages').then(r => r.json());
```

**VulnerabilityChips.tsx** (line ~10):
```typescript
// TODO: Replace with actual vulnerability data from API
const vulnerabilities: Vulnerability[] = [...]
```

### 2. Add API Routes (Optional)
Create API routes in `/app/api/` directory:
- `/app/api/messages/route.ts` - For chat messages
- `/app/api/vulnerabilities/route.ts` - For vulnerability data

### 3. Environment Variables
Create `.env.local` for API endpoints:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 4. Font Loading
The Inter font is loaded via Next.js font optimization in `app/layout.tsx`. If you need additional fonts, add them there.

## Responsive Breakpoints

The application uses three main breakpoints:

1. **Mobile (default)**: `< 640px`
   - Compact spacing (`px-4`, `py-3`)
   - Smaller text sizes (`text-sm`)
   - Robot hidden on mobile (`hidden sm:block`)

2. **Tablet (`sm:`)**: `≥ 640px`
   - Medium spacing (`sm:px-6`, `sm:py-4`)
   - Standard text sizes (`sm:text-base`)
   - Robot visible

3. **Desktop (`md:`)**: `≥ 768px`
   - Full spacing (`md:px-8`, `md:py-6`)
   - Larger text where appropriate
   - Full layout with all features

## Component Documentation

### Header
- **Purpose**: Top navigation bar with logo and system status
- **Props**: None
- **Accessibility**: Semantic `<header>`, status indicator with `aria-label`

### ChatContainer
- **Purpose**: Displays chat messages (AI and user)
- **Props**: None (currently uses mock data)
- **Accessibility**: Proper message structure, user avatar with label

### InputArea
- **Purpose**: Message input with attachment and voice buttons
- **Props**: `onSendMessage: () => void`
- **Accessibility**: Keyboard navigation, focus states, ARIA labels on buttons

### BackgroundEffects
- **Purpose**: Decorative animated background
- **Props**: None
- **Accessibility**: All decorative elements marked with `aria-hidden="true"`

### AnimatedRobot
- **Purpose**: Interactive robot character that follows mouse/responds to thinking state
- **Props**: `isThinking: boolean`
- **Accessibility**: Hidden on mobile, labeled with `aria-label`

### LoadingIndicator
- **Purpose**: Animated loading state
- **Props**: None
- **Accessibility**: Screen reader text with `sr-only`

### VulnerabilityChips
- **Purpose**: Display vulnerability counts by severity
- **Props**: None (currently uses mock data)
- **Accessibility**: `role="status"`, descriptive `aria-label`

## Testing Responsive Design

1. **Mobile (< 640px)**:
   - Header stacks vertically if needed
   - Chat messages use 85% max width
   - Robot hidden
   - Compact input area

2. **Tablet (640px - 767px)**:
   - Header in single row
   - Chat messages use 80% max width
   - Robot visible
   - Standard input area

3. **Desktop (≥ 768px)**:
   - Full layout
   - Maximum 800px content width
   - All features visible

## Next Steps

1. ✅ Components converted
2. ✅ Responsive design implemented
3. ✅ Accessibility improvements added
4. ⏳ Connect to real API endpoints
5. ⏳ Add error handling
6. ⏳ Add loading states for API calls
7. ⏳ Implement authentication (if needed)
8. ⏳ Add unit tests
9. ⏳ Add E2E tests

## Troubleshooting

### Tailwind classes not working
- Ensure `tailwind.config.ts` includes all component paths
- Check that `postcss.config.js` is present
- Restart the dev server

### Animations not working
- Check `app/globals.css` for animation definitions
- Verify Tailwind config includes animation utilities
- Check browser console for CSS errors

### TypeScript errors
- Run `npm run build` to check for type errors
- Ensure all imports use `@/` alias (configured in `tsconfig.json`)

