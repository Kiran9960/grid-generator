---
version: alpha
name: DesignAnalyzer
framework: Tailwind CSS
colors:
  primary: "#3B82F6"
  primaryFg: "#FAFAFA"
  secondary: "#3F3F46"
  accent: null
  background: "#09090B"
  surface: "#18181B"
  surfaceElevated: "#212124"
  border: "#27272A"
  text: "#FAFAFA"
  textMuted: "#A1A1AA"
  textInverse: "#09090B"
typography:
  display:
    fontFamily: "system-ui"
    fontSize: "36px"
    fontWeight: "700"
    lineHeight: "1.1"
    letterSpacing: "-0.025em"
  h2:
    fontFamily: "system-ui"
    fontSize: "28px"
    fontWeight: "700"
    lineHeight: "1.2"
    letterSpacing: "0em"
  h3:
    fontFamily: "system-ui"
    fontSize: "20px"
    fontWeight: "600"
    lineHeight: "1.3"
    letterSpacing: "0em"
  bodyLg:
    fontFamily: "system-ui"
    fontSize: "18px"
    fontWeight: "400"
    lineHeight: "1.6"
    letterSpacing: "0em"
  body:
    fontFamily: "system-ui"
    fontSize: "16px"
    fontWeight: "400"
    lineHeight: "1.6"
    letterSpacing: "0em"
  caption:
    fontFamily: "system-ui"
    fontSize: "12px"
    fontWeight: "400"
    lineHeight: "1.5"
    letterSpacing: "0em"
  label:
    fontFamily: "system-ui"
    fontSize: "14px"
    fontWeight: "500"
    lineHeight: "1.4"
    letterSpacing: "0.01em"
  mono:
    fontFamily: "ui-monospace"
    fontSize: "14px"
    fontWeight: "400"
    letterSpacing: "0em"
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
  3xl: 96px
rounded:
  none: 0px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  2xl: 24px
  full: 9999px
shadows:
  sm: "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)"
  md: "0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.05)"
  lg: "0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)"
  xl: "0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)"
breakpoints:
  sm: 640px
  md: 768px
  lg: 1024px
  xl: 1280px
  2xl: 1536px
transitions:
  durationFast: "150ms"
  durationBase: "200ms"
  durationSlow: "300ms"
  easing: "ease-in-out"
  easingBounce: "cubic-bezier(0.34,1.56,0.64,1)"
components:
  button:
    background: "{colors.primary}"
    color: "{colors.primaryFg}"
    paddingX: "20px"
    paddingY: "8px"
    borderRadius: "{rounded.sm}"
    fontWeight: "500"
    fontSize: "{typography.label.fontSize}"
    transition: "background {transitions.durationFast} {transitions.easing}"
  buttonOutline:
    background: "transparent"
    color: "{colors.primary}"
    border: "1.5px solid {colors.primary}"
    paddingX: "20px"
    paddingY: "8px"
    borderRadius: "{rounded.sm}"
  input:
    background: "transparent"
    border: "1px solid {colors.border}"
    borderRadius: "{rounded.sm}"
    paddingX: "12px"
    paddingY: "4px"
    fontSize: "{typography.mono.fontSize}"
    focusRing: "1px solid {colors.primary}"
  card:
    background: "{colors.surface}"
    borderRadius: "{rounded.lg}"
    shadow: "{shadows.sm}"
    padding: "{spacing.lg}"
    border: "1px solid {colors.border}"
  badge:
    background: "{colors.secondary}"
    color: "{colors.text}"
    borderRadius: "{rounded.full}"
    paddingX: "10px"
    paddingY: "2px"
    fontSize: "{typography.caption.fontSize}"
    fontWeight: "600"
---

# Design System Audit: DesignAnalyzer

This document reverse-engineers the core design system principles and tokens from the DesignAnalyzer website's HTML source. It aims to provide a clear, actionable guide for product designers and frontend engineers.

## Overview

DesignAnalyzer presents a modern, dark-themed interface characterized by clarity, a subtle sense of depth, and highly readable content. The visual system employs a primary accent blue to guide user focus and denote interactive elements, contrasting effectively against a deep, muted background palette. Layouts prioritize scannability with generous spacing and distinct content blocks. The interaction tone is direct and responsive, with smooth transitions and clear visual feedback for user actions. The overall aesthetic is professional and functional, emphasizing a seamless user experience for an analytical tool.

## Colors

The color palette is predominantly dark, utilizing a hierarchy of muted grays and blacks with a single vibrant blue for primary actions and brand emphasis. These values are inferred from common Tailwind CSS and Shadcn UI dark theme configurations, as direct hex values were not present in the HTML but derived from utility classes (e.g., `bg-primary`, `text-foreground`).

| Name          | Value       | CSS Var (Inferred)    | Role                                          |
| :------------ | :---------- | :-------------------- | :-------------------------------------------- |
| `primary`     | `#3B82F6`   | `--primary`           | Main brand color, CTA, active states          |
| `primaryFg`   | `#FAFAFA`   | `--primary-foreground`| Text color on primary background              |
| `secondary`   | `#3F3F46`   | `--secondary`         | Muted accent, used for badges/secondary indicators |
| `accent`      | `null`      | `N/A`                 | No distinct accent used                               |
| `background`  | `#09090B`   | `--background`        | Page background                               |
| `surface`     | `#18181B`   | `--card`              | Card, panel, and primary content background   |
| `surfaceElevated`| `#212124` | `--popover`           | Slightly elevated surface, e.g., sticky header effect (or `rgba(24, 24, 27, 0.6)` on background) |
| `border`      | `#27272A`   | `--border` / `--input`| Component borders, dividers                   |
| `text`        | `#FAFAFA`   | `--foreground`        | Primary body text, headings                   |
| `textMuted`   | `#A1A1AA`   | `--muted-foreground`  | Secondary text, placeholders, captions        |
| `textInverse` | `#09090B`   | `N/A`                 | Text on `primaryFg` background, for contrast  |

## Typography

The type system is based on system fonts, ensuring high performance and native feel. A clear hierarchy is established using size, weight, and subtle letter spacing adjustments, making content easily digestible.

| Style     | Size    | Weight | Family         | Line Height | Letter Spacing |
| :-------- | :------ | :----- | :------------- | :---------- | :------------- |
| `display` | 36px    | 700    | `system-ui`    | 1.1         | -0.025em       |
| `h2`      | 28px    | 700    | `system-ui`    | 1.2         | 0em            |
| `h3`      | 20px    | 600    | `system-ui`    | 1.3         | 0em            |
| `bodyLg`  | 18px    | 400    | `system-ui`    | 1.6         | 0em            |
| `body`    | 16px    | 400    | `system-ui`    | 1.6         | 0em            |
| `caption` | 12px    | 400    | `system-ui`    | 1.5         | 0em            |
| `label`   | 14px    | 500    | `system-ui`    | 1.4         | 0.01em         |
| `mono`    | 14px    | 400    | `ui-monospace` | 1.5         | 0em            |

**Hierarchy Notes:**
*   `display` is reserved for the main page title (`h1`), providing significant visual weight and impact.
*   Headings (`h2`, `h3`) are clearly distinguishable, guiding users through content sections.
*   `body` and `bodyLg` offer comfortable readability for main content, with `bodyLg` used for introductory paragraphs.
*   `label` and `caption` are utilized for UI elements and auxiliary text, ensuring legibility at smaller sizes while maintaining appropriate contrast.
*   `mono` is specifically for code snippets and input values, providing a distinct textual style.

## Layout

The layout system is built on a responsive, column-based grid with generous horizontal and vertical spacing. A key characteristic is the constrained content width, enhancing readability and visual stability.

*   **Max Content Width:** Content is generally confined within `max-w-5xl` (1024px) or `max-w-6xl` (1152px), creating a focused reading experience.
*   **Spacing Rhythm:** A consistent 8-point spacing scale (multiples of 4px) is utilized, creating a harmonious vertical and horizontal rhythm. Common gaps observed are `gap-2` (8px), `space-y-3` (12px), and `gap-8` (32px).
*   **Padding:** Significant padding within containers, such as `p-6` (24px) for cards, prevents content from feeling cramped and provides ample breathing room.
*   **Responsive Behavior:** The layout adapts fluidly across breakpoints. For example, `lg:grid-cols-[250px_minmax(0,1fr)]` demonstrates a shift from a single column to a sidebar-content layout on larger screens (`lg: 1024px` and above), optimizing for screen real estate.
*   **Density:** The layout maintains a comfortable density, avoiding both overly sparse and overly cluttered interfaces, balancing information presentation with visual comfort.

## Elevation & Depth

Depth is achieved subtly through a combination of shadows, border treatments, and transparency:

*   **Shadows:** `shadows.sm` provides a soft, minimal lift, primarily seen on interactive elements like inputs and suggested for cards to distinguish them from the background.
*   **Transparent Surfaces:** The header uses `bg-card/60 backdrop-blur-sm`, creating a semi-transparent, frosted glass effect over the content, conveying a sense of layered elevation without harsh shadows. `surfaceElevated` helps define components appearing "above" the main `surface`.
*   **Border Differentiation:** Subtle `border` usage separates content blocks and defines interactive component boundaries without adding visual noise.

## Shapes

The design system employs a consistent application of rounded corners, contributing to a modern and approachable aesthetic:

*   **Corner Radii:** `rounded` tokens range from `sm` (6px) to `full` (9999px), providing versatility for various components.
*   **Component Rounding:**
    *   Buttons and inputs generally use `rounded.sm` (6px).
    *   Cards and larger containers frequently utilize `rounded.lg` (12px) or `rounded.xl` (16px), adding a softer, more substantial feel.
    *   Badges and small interactive indicators use `rounded.full` for a distinct pill-shaped appearance.
*   **Consistency:** The systematic application of these radii contributes to a cohesive visual language across the interface.

## Transitions

Transitions are primarily used to provide smooth feedback for interactive states, enhancing the perceived responsiveness and polish of the interface.

*   **Duration:** `transitions.durationFast` (150ms) is commonly used for `transition-colors`, ensuring quick but noticeable changes.
*   **Easing:** `transitions.easing` (`ease-in-out`) provides a natural acceleration and deceleration, making movements feel fluid rather than abrupt.
*   **Interaction Cues:** Hover states on buttons and navigation items typically employ `transition-colors`, signaling interactivity and confirming user input.

## Components

### Button

Buttons are functional and clearly indicate interactivity.
*   **Primary Button:** Utilizes `background: {colors.primary}` with `color: {colors.primaryFg}`. Features `paddingX: 20px`, `paddingY: 8px`, `borderRadius: {rounded.sm}` (6px), and `fontWeight: {typography.label.fontWeight}` (500). Hover states show a slight `background` darkening (`hover:bg-primary/90`) with `transition: background {transitions.durationFast} {transitions.easing}` for smooth feedback. Disabled states are clearly indicated by reduced opacity.
*   **Outline/Secondary Buttons:** (Inferred from non-primary buttons and AI provider selection) `background: transparent`, `color: {colors.primary}` with `border: 1.5px solid {colors.primary}`. Otherwise, similar padding and border-radius. Non-selected list items appear as simple text with `text-muted-foreground hover:bg-muted hover:text-foreground`, offering subtle interaction.

### Input

Input fields are designed for clarity and ease of use.
*   **Style:** `background: transparent` with `border: 1px solid {colors.border}`. They have `borderRadius: {rounded.sm}` (6px), `paddingX: 12px`, `paddingY: 4px`, and a fixed `height: 40px`.
*   **Typography:** Employs `fontSize: {typography.mono.fontSize}` (14px) and `font-mono` for input values, distinguishing them from surrounding text.
*   **Focus State:** A `focusRing: 1px solid {colors.primary}` clearly outlines the active input, guiding user attention. An optional icon placeholder `pl-9` suggests leading icons in inputs.

### Card

Cards are used to group related content, providing clear visual separation and structure.
*   **Appearance:** `background: {colors.surface}` with `borderRadius: {rounded.lg}` (12px) and a subtle `shadow: {shadows.sm}`.
*   **Structure:** They include `border: 1px solid {colors.border}` for definition and `padding: {spacing.lg}` (24px) for internal content spacing, ensuring a balanced visual density.

### Badge

Badges highlight specific information with a compact, distinct visual style.
*   **Style:** `background: {colors.secondary}` with `color: {colors.text}`. Features `borderRadius: {rounded.full}` for a pill-like shape, `paddingX: 10px`, `paddingY: 2px`, `fontSize: {typography.caption.fontSize}` (12px), and `fontWeight: {typography.label.fontWeight}` (600).
*   **Usage:** Used for status indicators ("Open Source") or numerical counts ("0").

## Do's and Don'ts

### Do's
*   **Do** utilize the established color tokens (e.g., `{colors.primary}`, `{colors.surface}`) for all color applications to ensure theme consistency, especially for dark mode.
*   **Do** maintain the vertical rhythm with `{spacing.*}` tokens. Apply `space-y-*` or `gap-*` consistently to define content flow.
*   **Do** use `rounded.sm` for interactive elements like buttons and inputs, and `rounded.lg` or `rounded.xl` for cards and larger containers to preserve the established aesthetic.
*   **Do** apply `transition-colors` on interactive elements, particularly for hover states, ensuring a smooth and predictable user experience.
*   **Do** ensure text hierarchy is clear by using appropriate typography styles (`display`, `h2`, `body`, `caption`) to guide the user's eye and convey information importance.

### Don'ts
*   **Don't** introduce new hex color values. If a required color is not in the palette, consult with the design lead to add a new token.
*   **Don't** deviate from the defined `fontFamily` for `system-ui` and `ui-monospace`. Avoid importing custom fonts unless absolutely necessary and approved.
*   **Don't** use arbitrary padding or margin values. Stick to `{spacing.*}` tokens to maintain the layout's rhythm and consistency. For custom spacing needs (e.g., `20px`), define a specific class or extend the spacing scale if it's a recurring value.
*   **Don't** use hard `box-shadow` values; rely on `shadows.sm` for subtle elevation. For layered UI, consider `bg-card/60` or other transparent `surface` variants rather than new shadow values.
*   **Don't** use `text-align: center` for large blocks of text (`body` or `bodyLg`), as it impairs readability. Reserve it for `display` or short, impactful statements only.
