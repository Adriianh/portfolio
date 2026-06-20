import { screenshotsMap } from "./screenshots";

export const projectsData = [
    {
        id: "farmacontrol",
        title: "Farmacontrol",
        description: "A domain-driven pharmacy management...",
        programmingLanguages: ["C#"],
        technologies: [
            "Avalonia UI",
            "Entity Framework Core",
            "SQLite",
            "BCrypt.Net-Next",
        ],
        repositoryUrl: "https://github.com/adriianh/Farmacontrol",
        previewUrl: "/assets/preview-farmacontrol.svg",
        interfaceType: "Desktop" as const,
        status: "Production Ready",
        features: [
            "Polymorphic product architecture handling specific domain logic for Medicines (prescriptions/controlled traits), Supplements, Cosmetics, and Supplies.",
            "Batch-based inventory tracking that automatically drains stock from lots closest to their expiration date.",
            "Automated alert evaluation engine driven by polymorphic interfaces (IAlertable/IExpirable) for low-stock and near-expiration status checks.",
            "Comprehensive POS module with custom discount/tax calculations, prescription cross-referencing, and transaction voiding with stock replenishment.",
            "Role-based access control (RBAC) managing dynamic menu configurations and allowed administrative actions via object-oriented encapsulation.",
        ],
        technicalChallenge:
            "Designing an atomic inventory reduction algorithm that correctly sequences lot deductions by expiration date while handling data consistency, precision rounding for multi-item sales, and state rollback upon transaction voiding.",
        featured: true,
        category: "large" as const,
        longDescription:
            "A domain-driven pharmacy management and Point of Sale (POS) system designed to handle complex pharmaceutical operations, batch-tracked inventories, and rule-based user workflows.",
        screenshots: screenshotsMap.farmacontrol,
        demoUrl: null,
        learnings: [],
    },
    {
        id: "melo",
        title: "Melo",
        description: "A cross-platform music player...",
        programmingLanguages: ["Kotlin"],
        technologies: [
            "Jetpack Compose Multiplatform",
            "Ktor",
            "SQLDelight",
            "TamboUI",
        ],
        repositoryUrl: "https://github.com/adriiianh/Melo",
        previewUrl: "/assets/preview-melo.svg",
        interfaceType: "Multiplatform" as const,
        status: "In Development",
        features: [
            "Dual-operational interface providing a rich, keyboard-driven Terminal User Interface (TUI) alongside a lightning-fast CLI for instant playback control.",
            "Persistent background processing managed via a lightweight daemon optimized for ultra-low CPU and memory utilization.",
            "Asynchronous media streaming pipeline integration utilizing optimized dependencies via yt-dlp and ffmpeg for audio streaming.",
            "GraalVM Native Image compilation producing standalone executable binaries with instantaneous startup times.",
        ],
        technicalChallenge:
            "Decoupling the interactive keyboard-driven UI state from the asynchronous streaming pipelines of the background daemon, ensuring zero-latency terminal rendering updates and synchronized audio playback states.",
        featured: true,
        category: "large" as const,
        longDescription:
            "A high-performance, lightweight audio player featuring a dual-experience workflow with an interactive TUI, an immediate CLI, and a background processing daemon.",
        screenshots: screenshotsMap.melo,
        demoUrl: null,
        learnings: [],
    },
    {
        id: "portfolio",
        title: "Portfolio",
        description: "A personal portfolio website...",
        programmingLanguages: ["TypeScript"],
        technologies: ["React", "Vite", "Vitest"],
        repositoryUrl: "https://github.com/adriianh/portfolio",
        previewUrl: "/assets/preview-portfolio.svg",
        interfaceType: "Web" as const,
        status: "Production Ready",
        features: [
            "Fully responsive design with mobile-first approach and adaptive layouts.",
            "Dynamic content loading with lazy loading and code splitting for performance optimization.",
            "SEO-friendly architecture with server-side rendering and meta tag management.",
            "Integrated contact form with validation and email notifications.",
        ],
        technicalChallenge:
            "Achieving dynamic state reactivity and DOM synchronization manually using pure TypeScript, eliminating rendering flicker by strategically toggling visibility classes instead of reconstructing components.",
        featured: true,
        category: "medium" as const,
        longDescription:
            "A zero-framework, highly optimized frontend portfolio built to showcase pure software architecture principles, design patterns, and complete separation of concerns.",
        screenshots: screenshotsMap.portfolio,
        demoUrl: "https://adriianh.github.io/portfolio/",
        learnings: [
            "Mastered advanced TypeScript features and patterns for state management.",
            "Gained deep understanding of DOM manipulation and rendering optimization.",
            "Learned to implement responsive design principles and accessibility standards.",
        ],
    },
];
