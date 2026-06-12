# Clean Architecture Portfolio 🚀

A completely modular and decoupled web portfolio, natively developed with **TypeScript** and **Vite**, applying **SOLID** principles, advanced **OOP**, and **Clean Architecture**.

Unlike conventional portfolios with static data tightly coupled to the user interface, this system operates in a _data-driven_ manner via dependency injection, simulating an enterprise production environment ready to scale to microservices or real backend APIs.

---

## 🏗️ System Architecture

The project is strictly structured into independent layers, ensuring that business rules do not depend on frameworks, the bundler (Vite), or data transfer mechanisms (`fetch`).

    src/
    ├── domain/               # Core Business Layer (100% pure)
    │   ├── entities/        # Pure domain entities structured with OOP
    │   ├── repositories/    # Contracts/Interfaces (Dependency Inversion)
    │   └── use-cases/       # Application use case logic
    ├── data/                 # Infrastructure & Data Layer
    │   └── repositories/    # Concrete repository implementations (Fetch/JSON)
    ├── presentation/         # User Interface (UI) Layer
    │   ├── components/      # Atomic web components (Card renderers)
    │   └── views/           # View orchestrators and exception handling
    └── main.ts               # Composition Root (Single entry point)

### 🧠 Design Principles Applied

- **Dependency Inversion Principle (D from SOLID):** The presentation layer and use cases depend exclusively on abstractions (repository interfaces). The actual data implementation is injected from the outside.
- **Composition Root Pattern:** `main.ts` serves as the sole place in the software that is aware of the runtime environment (Vite / Global variables). It initializes the object graph, keeping all other layers pure and isolated for testing.
- **Defensive Error Handling:** The UI implements secure exception-catching blocks at the infrastructure level, guaranteeing an elegant degradation of the site during network failures instead of triggering a blank screen.

---

## 🛠️ Tech Stack & Tools

- **Language:** TypeScript 5.x
- **Bundler & Server:** Vite
- **Deployment:** GitHub Pages (Automated production build pipeline via `gh-pages`)
- **Styling:** Native CSS3 utilizing Responsive Grid and Visual Environment Variables (Modern Dark Theme)

---

## 🚀 Available Scripts

In the project root, you can run the following commands:

```bash
# Install development dependencies
npm install

# Launch local development server (localhost:5173)
npm run dev

# Validate types (TSC) and build for production
npm run build

# Automatically deploy the optimized version to GitHub Pages
npm run deploy
```
