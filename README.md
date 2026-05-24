# Grid Generator

An interactive visual builder for creating grid-based layouts and exporting production-friendly code.

Built with Next.js, React, TypeScript, Zustand, and `dnd-kit`, this project lets you compose layouts visually, tweak spacing and spans, preview responsive behavior, and export the result as code.

## Features

- Drag-and-drop grid item reordering
- Resize items by column span and row span
- Layout presets for faster starting points
- Responsive preview modes for desktop, tablet, and mobile
- Property editing for selected grid items
- Undo and redo history
- Light and dark theme support
- Export to Tailwind, CSS/HTML, and JSX

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Zustand
- `@dnd-kit`
- Tailwind CSS 4
- Framer Motion

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

```text
app/                        App router entry and global styles
components/dashboard/       Toolbar, sidebars, export modal
components/editor/          Canvas and interactive grid components
store/                      Zustand grid state management
lib/                        Presets and shared utilities
```

## How It Works

1. Choose a preset or start from the default layout.
2. Add, remove, drag, and resize items in the canvas.
3. Adjust columns, gaps, row height, and item styling from the UI.
4. Preview the layout across device sizes.
5. Export the generated structure as code.

## Export Formats

The app currently supports:

- Tailwind component output
- HTML + CSS Grid output
- JSX + CSS output

## Notes

- Generated folders like `.next` and dependencies in `node_modules` are ignored by Git.
- This repository is set up as a standalone Git project and connected to GitHub.

## Roadmap Ideas

- Save and load custom layouts
- Import existing grid definitions
- Copy-to-clipboard feedback per export format
- More preset categories and item style controls
- Image and rich content blocks

## License

Add a license if you plan to open-source or distribute the project publicly.
