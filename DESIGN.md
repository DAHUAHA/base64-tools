---
version: alpha
name: base64-tools-design-system
description: Design system for base64.tools — a developer-focused encoding utility site running dark mode on GitHub Primer colors. The brand voice is quiet, technical, and trustworthy: dark canvas, crisp typography, minimal chrome. Everything communicates that this is a tool built by engineers for engineers.
---

## Overview

base64.tools is a single-page utility site for encoding/decoding Base64 and URL strings. The audience is developers, and the design reflects that: dark canvas, monospace code surfaces, no decorative gradients, no marketing fluff. The brand earns trust through precision, not polish.

**Key characteristics:**
- Dark-first: `#0d1117` canvas with near-white `#f0f6fc` text
- GitHub Primer palette as the chromatic base — grays, blue accent, green success, red danger
- Monospace for all code/IO surfaces; system sans for navigation and body
- Tight 6px radii for UI elements (inputs, buttons), 8px for cards
- Stacked subtle shadows (never heavy drop shadows)
- One primary action color: `#238636` (Primer green) for CTAs
- No atmospheric gradients, no photography — the tool IS the interface

---

## Colors

### Brand & Accent
| Token | Hex | Use |
|---|---|---|
| `accent` | `#4493f8` | Links, active tab underline, focus ring |
| `accent-soft` | `#388bfd1a` | Accent hover bg, badge fills |
| `primary-green` | `#238636` | Primary CTA buttons |
| `primary-green-hover` | `#29903b` | CTA pressed/hover state |
| `success` | `#3fb950` | Success toast, decode badge |
| `success-soft` | `#2ea04326` | Success toast bg |
| `danger` | `#f85149` | Error toast, invalid state |
| `danger-soft` | `#f851491a` | Error toast bg |

### Surface
| Token | Hex | Use |
|---|---|---|
| `canvas` | `#0d1117` | Page background |
| `canvas-muted` | `#151b23` | Card surfaces, header/footer bg |
| `canvas-inset` | `#010409` | Deepest inset (output textarea bg) |
| `btn-bg` | `#212830` | Secondary button background |

### Text
| Token | Hex | Use |
|---|---|---|
| `ink` | `#f0f6fc` | Primary text (on dark bg) |
| `body` | `#f0f6fc` | Same as ink — body text on dark |
| `body-secondary` | `#9198a1` | Labels, secondary copy, nav links |
| `body-tertiary` | `#656c76` | Muted text, placeholders, char counts |

### Borders & Dividers
| Token | Hex | Use |
|---|---|---|
| `hairline` | `#3d444d` | Default borders, dividers |
| `hairline-emphasis` | `#656c76` | Hover/emphasis border |
| `focus-ring` | `#4493f8` | Focus outline (accent) |

---

## Typography

### Font Families
- **Sans**: `'Mona Sans VF', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif` — navigation, labels, body
- **Mono**: `'SFMono-Regular', 'ui-monospace', 'SF Mono', Menlo, Consolas, monospace` — all code surfaces (inputs, outputs, API demos)

### Scale
| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `display` | 32px | 600 | 1.5 | 0 | Page hero headline |
| `heading-md` | 20px | 600 | 1.4 | 0 | Section headings |
| `body-lg` | 16px | 400 | 1.625 | 0 | Hero subtext, feature descriptions |
| `body` | 14px | 400 | 1.5 | 0 | Default body text |
| `label` | 12px | 600 | 1.0 | 0 | Input labels, nav item labels |
| `label-sm` | 12px | 400 | 1.0 | 0 | Secondary labels, badges |
| `caption` | 12px | 400 | 1.0 | 0 | Footer, char counts, meta |
| `mono` | 13px | 400 | 1.5 | 0 | Code in inputs/outputs |
| `mono-sm` | 12px | 400 | 1.4 | 0 | Inline code, API output |

---

## Spacing

**Base unit**: 4px

| Token | Value | Use |
|---|---|---|
| `xxs` | 4px | Icon gaps |
| `xs` | 8px | Tight component gaps |
| `sm` | 12px | Between related elements |
| `md` | 16px | Standard padding |
| `lg` | 24px | Card padding, section gaps |
| `xl` | 32px | Container vertical padding |
| `xxl` | 48px | Hero top/bottom padding |

---

## Border Radius

| Token | Value | Use |
|---|---|---|
| `xs` | 4px | Small chips, badges |
| `sm` | 6px | Buttons, inputs, tool tabs — the brand default |
| `md` | 8px | Cards, tool-card surfaces |
| `lg` | 12px | Large panels, ad placeholder |
| `full` | 9999px | Pills, avatar round |

---

## Elevation (Shadows)

| Level | Treatment | Use |
|---|---|---|
| 0 | No shadow | Flat surfaces, page bg |
| 1 | `box-shadow: 0 0 0 1px var(--hairline)` | Default card chrome (hairline ring only) |
| 2 | `box-shadow: 0 1px 1px #00000010, 0 0 0 1px var(--hairline)` | Elevated card — stacked shadow + hairline |
| 3 | `box-shadow: 0 4px 8px #00000014, 0 0 0 1px var(--hairline)` | Modal, floating panels |

---

## Components

### Button

**`btn`** — base button shell
- Padding: 5px 16px (vertical 5px for 26px height)
- Font: 14px / 500 / 20px line-height
- Border-radius: `{rounded.sm}` 6px
- Transition: background 0.15s, border-color 0.15s

**Variants:**

| Class | Background | Text | Border | Hover |
|---|---|---|---|---|
| `.btn-primary` | `primary-green` | white | transparent | `primary-green-hover` |
| `.btn-default` | `btn-bg` | `ink` | `hairline` | `#313945` + `hairline-emphasis` border |
| `.btn-outline` | transparent | `accent` | `hairline` | `accent-soft` bg + `accent` border |

**Sizes:**

| Class | Padding | Font Size | Line Height |
|---|---|---|---|
| `.btn` (default) | 5px 16px | 14px | 20px |
| `.btn-sm` | 3px 8px | 12px | 16px |

**States:**
- Disabled: `opacity: 0.5; cursor: not-allowed`

---

### Text Input / Textarea

**`input-field`** — text input or textarea
- Background: `canvas` (`#0d1117`)
- Border: 1px solid `hairline`
- Border-radius: `{rounded.sm}` 6px
- Font: `mono` (13px monospace)
- Padding: 12px
- Color: `ink`
- Focus: `border-color: accent` + `box-shadow: 0 0 0 1px accent`

**Variants:**
- `.input-field` — regular input or textarea
- `.input-field.output` — read-only output textarea; background `canvas-inset` (`#010409`)
- `.input-field-sm` — compact form input (height 32px)

---

### Toast Notification

**`toast`** — inline notification banner
- Padding: 8px 16px
- Border-radius: `{rounded.sm}` 6px
- Font: 13px

**Variants:**

| Class | Background | Text/Border Color |
|---|---|---|
| `.toast-success` | `success-soft` | `success` / `#2ea04366` border |
| `.toast-error` | `danger-soft` | `danger` / `#f8514966` border |

**Behavior:**
- Hidden by default (`display: none`)
- `.show` class adds `display: flex; align-items: center; gap: 8px`
- Auto-hides after 3000ms

---

### Tool Card

**`tool-card`** — the primary content container for each encoding tool
- Background: `canvas-muted`
- Border: 1px solid `hairline`
- Border-radius: `{rounded.md}` 8px
- Padding: 24px
- Margin-bottom: 24px (between cards)

---

### Tool Tab Bar

**`tool-tabs`** — the encode/decode tab switcher
- Flex row, gap 0
- Border-bottom: 1px solid `hairline`
- Margin-bottom: 20px

**`tool-tab`** — individual tab
- Padding: 8px 16px
- Font: 14px / 500
- Color: `body-secondary`
- Border-bottom: 2px solid transparent (margin-bottom: -1px to align with divider)
- Transition: color 0.15s, border-color 0.15s
- Hover: `ink` color, `hairline` border-bottom
- Active: `ink` color, `accent` border-bottom

---

### Badge / Pill Tag

**`badge`** — small inline label
- Font: 11px / 500
- Padding: 2px 8px
- Border-radius: 12px (pill shape)
- Background and text color per context

| Context | Background | Text |
|---|---|---|
| "阶段 2" / "新" on API/logs | `primary-green` | white |
| Mode label — encode | `accent-soft` | `accent` |
| Mode label — decode | `success-soft` | `success` |

---

### Header (Nav Bar)

**`header`** — top navigation bar
- Background: `canvas-muted`
- Border-bottom: 1px solid `hairline`
- Padding: 16px 24px
- Height: auto (flexible, wraps on mobile)
- Layout: flex, `justify-content: space-between`, `flex-wrap: wrap`
- Logo left, navigation links right

**`logo`** — site wordmark
- Font: 16px / 600
- Icon color: `accent`
- Tagline (`.logo-tag`): 12px / 400 / `body-tertiary`

---

### Footer

**`footer`** — bottom bar
- Border-top: 1px solid `hairline`
- Padding: 16px 24px
- Font: 12px / `body-tertiary`
- Layout: flex, `justify-content: space-between`
- Links: `body-secondary`, underline on hover with `accent` color

---

### Ad Placeholder

**`ad-placeholder`** — Google AdSense slot container
- Background: `canvas-muted`
- Border: 1px dashed `hairline`
- Border-radius: `{rounded.md}` 8px
- Padding: 24px
- Text: 12px / `body-tertiary` / center-aligned
- Margin-bottom: 24px

---

### Stats Row

**`stats`** — feature callout row below the tool card
- Flex row, gap 24px, `flex-wrap: wrap`
- Font: 12px / `body-tertiary`
- `.stat strong` uses `body-secondary`

---

### Input Group

**`input-group`** — label + input wrapper
- Margin-bottom: 16px
- Label: 12px / 600 / `body-secondary`, `margin-bottom: 6px`, `display: block`
- Input below label

---

## Layout

### Container
- Max-width: 960px
- Horizontal padding: 24px (desktop), 16px (mobile ≤640px)
- Centered: `margin: 0 auto`
- Flex column: `flex: 1` so footer pushes to bottom

### Page Structure
```
[Header] — sticky-ish, full-width
  [Container]
    [Hero] — h1 + subtext
    [Ad placeholder] — above tool card
    [Tool Card] — main interaction surface
    [Stats row] — below tool card
    [API Demo] — dev feature showcase (index only)
    [Logs section] — recent conversions (index only)
  [/Container]
[Footer] — full-width, border-top
```

### Responsive Strategy
- Breakpoint: 640px (mobile)
- At mobile: container padding 20px 16px, hero h1 24px
- Header navigation collapses to buttons row (no hamburger needed — nav is already minimal)

---

## Do's and Don'ts

### Do
- Use `primary-green` for primary CTAs only (Encode/Decode action buttons)
- Keep code surfaces in monospace font always
- Use `accent` blue only for interactive states (focus, active tab, links)
- Apply `rounded.sm` 6px to all buttons and inputs — the brand default
- Use `rounded.md` 8px for card surfaces only
- Keep the page dark — never switch to light mode
- Show toast notifications for all user actions (success/error)

### Don't
- Don't use heavy drop shadows — use hairline rings with optional stacked subtle shadows
- Don't use the brand green for anything except primary CTA buttons
- Don't introduce additional accent colors — the palette is gray + blue + green + red
- Don't use display fonts above 32px for headlines
- Don't set input/output text in sans font — always monospace
- Don't add decorative elements (gradients, illustrations, photos) — the tool is the interface