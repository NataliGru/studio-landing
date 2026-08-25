# MNTN

MNTN is a responsive hiking-themed landing page built as a portfolio project.
It combines a layered parallax hero, scroll-driven content animations and a
multilingual interface in a modern editorial layout.

## Features

- Layered, scroll-driven hero parallax
- Animated article sections
- Smooth scrolling and a scroll-to-top control
- Responsive desktop and mobile navigation
- Dark and light themes
- English and Ukrainian localization
- Optimized responsive images with Next.js Image
- Accessible interactive controls and reduced visual interference from
  decorative layers

## Tech Stack

- [Next.js](https://nextjs.org/) 16 with the App Router
- [React](https://react.dev/) 19 and TypeScript
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Motion](https://motion.dev/) for scroll and entrance animations
- [Lenis](https://lenis.darkroom.engineering/) for smooth scrolling
- [next-intl](https://next-intl.dev/) for localized routes and translations
- [next-themes](https://github.com/pacocoursey/next-themes) for theme switching
- [Lucide](https://lucide.dev/) and React Icons

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The application redirects
to a localized route based on the configured locale routing.

## Available Scripts

```bash
npm run dev          # Start the development server
npm run build        # Create a production build
npm run start        # Start the production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix supported ESLint issues
npm run format       # Format the project with Prettier
npm run format:check # Check formatting
npm run fix          # Run ESLint fixes and Prettier
```

## Project Structure

```text
src/
  app/           Routes, layouts, metadata and global styles
  features/      User interactions such as locale, theme and scroll controls
  localization/  English and Ukrainian translation messages
  providers/     Application-level client providers
  settings/      Route and navigation configuration
  shared/        Reusable UI, hooks, utilities and i18n configuration
  views/         Page-level composition
  widgets/       Header, hero, article list and footer sections
```

The project follows a feature-oriented architecture. Page composition stays in
`app` and `views`, larger sections live in `widgets`, user actions live in
`features`, and reusable foundations live in `shared`.

## Localization

Localized routes are defined under `src/app/[locale]`. The currently supported
locales are:

- `en` — English
- `uk` — Ukrainian

Translations live in `src/localization`, while routing and request-level i18n
configuration live in `src/shared/lib/i18n`.

## Quality Checks

Before committing changes, run:

```bash
npm run lint
npm run format:check
npm run build
```

Husky and lint-staged also check staged files before a commit.
