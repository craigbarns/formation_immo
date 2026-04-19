---
name: cinematic-visuals
description: Create professional cinematic visuals for the CinematicPlayer LMS component. Use when designing slides, overlays, animations, or visual effects for the audio lesson player. Covers glassmorphism, gold accents, module themes, kinetic typography, and immersive transitions.
---

# Cinematic Visuals

Design language for the CinematicPlayer — immersive, professional, real-estate training LMS.

## Core Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--brand-gold` | `#d4af37` | Primary accent, active words, highlights |
| `--brand-navy` | `#1a3a5c` | Backgrounds, deep surfaces |
| `--surface-dark` | `#0a1628` | Main background |
| Glass bg | `rgba(0,0,0,0.55)` | Overlays, panels |
| Glass blur | `blur(16px) saturate(1.4)` | Backdrop filter |
| Gold glow | `0 0 20px rgba(212,175,55,0.4)` | Active elements |

## Module Themes

See `references/module-themes.md` for full theme definitions (colors, gradients, watermarks, voice signatures).

Quick reference:
- `juridique` → navy/blue, ⚖️, posée
- `transaction` → violet, 🤝, dynamique
- `financement` → emerald, 📈, curieuse
- `marketing` → purple/gold, 📱, chaleureuse
- `terrain` → red, 🏠, confiante

## Animation Patterns

### Slide Entrance
```css
@keyframes slideEnter {
  from { opacity: 0; transform: translateY(12px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
/* Duration: 0.5s, easing: cubic-bezier(0.16,1,0.3,1) */
```

### Karaoke Word Active
```css
/* Current word: gold, scale(1.05), text-shadow glow */
color: #d4af37;
text-shadow: 0 0 20px rgba(212,175,55,0.4), 0 0 40px rgba(212,175,55,0.15);
transform: scale(1.05);
```

### Kinetic Flash
```css
/* Key term appears: scale(0.8) → scale(1.05), translateX(20px) → 0 */
@keyframes flashIn {
  from { opacity: 0; transform: scale(0.8) translateX(20px); }
  to   { opacity: 1; transform: scale(1.05) translateX(0); }
}
```

### Chapter Flash
```css
/* Full-screen gradient overlay, 0.35s, scales from 1.04 to 1 */
animation: chapterFlashIn 0.35s cubic-bezier(0.16,1,0.3,1) both;
```

## Component Patterns

### Glassmorphism Panel
```tsx
<div style={{
  background: "rgba(0,0,0,0.55)",
  backdropFilter: "blur(16px) saturate(1.4)",
  WebkitBackdropFilter: "blur(16px) saturate(1.4)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "1rem",
}} />
```

### Gold Gradient Bar
```tsx
<div className="h-1 w-16 rounded-full bg-gradient-to-r from-brand-gold to-[var(--brand-gold-light)]" />
```

### Decorative Lines
```tsx
{/* Top/bottom gold lines with dot center */}
<div className="flex items-center gap-3">
  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-brand-gold/50" />
  <div className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-brand-gold/50" />
</div>
```

## Slide Design Rules

1. **Center everything** — all slides are centered both axes
2. **Max-width constraint** — `max-w-lg` for content cards
3. **Consistent padding** — `p-6 sm:p-10` on container, `p-7` on cards
4. **Type hierarchy** — `text-2xs` labels, `text-xl sm:text-2xl` titles, `text-sm` body
5. **Icon size** — `h-10 w-10` for concept icons, `h-3.5 w-3.5` for UI icons
6. **Border radius** — `rounded-2xl` for cards, `rounded-full` for badges/avatars
7. **Shadow** — `shadow-xl` or `shadow-2xl` for floating elements
8. **Reduced motion** — respect `prefers-reduced-motion: reduce`

## Responsive Rules

- Touch targets min **44px**
- On mobile `< 640px`: hide chapter thumbnails, show only chapter progress bar
- `aspect-video` becomes `flex-1` in fullscreen
- Font sizes scale down: `sm:text-4xl` → `text-2xl` on mobile
