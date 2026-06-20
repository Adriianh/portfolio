# Portfolio

Personal portfolio website built with React, TypeScript, and Clean Architecture. The project is organized into independent layers following SOLID principles, with domain logic completely decoupled from the UI framework.

## Architecture

```
src/
├── domain/ # Business logic (framework-agnostic)
│ ├── entities/ # Domain entities
│ ├── repositories/ # Repository contracts
│ ├── specs/ # Specification pattern implementations
│ └── use-cases/ # Application use cases
├── data/ # Data layer
│ ├── repositories/ # Repository implementations
│ └── projects.ts # Static project data (type-safe)
├── components/ # UI components
│ ├── layout/ # App shell (Navbar, Footer, Sidebar)
│ ├── sections/ # Page sections (Hero, About, Skills, etc.)
│ └── ui/ # Reusable components (ProjectCard, BackToTop)
├── pages/ # Route pages (lazy-loaded)
├── hooks/ # Custom React hooks
├── styles/ # CSS stylesheets
└── App.tsx # Application root with HashRouter
```

## Design Patterns

- **Clean Architecture:** Domain layer has no external dependencies; framework concerns are isolated to the outer layers.
- **Specification Pattern:** Composable filters (AndSpec, OrSpec) enable dynamic project queries without coupling to the data source.
- **Repository Pattern:** Data access is abstracted behind interfaces, allowing the data source to be swapped without affecting business logic.
- **Code Splitting:** Each page is lazy-loaded using `React.lazy()` and `Suspense`, reducing the initial bundle size.

## Stack

| Technology                | Purpose                         |
| ------------------------- | ------------------------------- |
| React 18 + TypeScript 5.x | UI framework                    |
| Vite 8                    | Build tool and dev server       |
| React Router (HashRouter) | Client-side routing             |
| Framer Motion             | Page transitions and animations |
| Vitest                    | Unit testing (13 tests)         |
| GitHub Pages              | Deployment                      |

## Commands

```bash
npm install       # Install dependencies
npm run dev       # Start development server
npm run build     # TypeScript check and production build
npm run test      # Run unit tests
npm run deploy    # Deploy to GitHub Pages
```
