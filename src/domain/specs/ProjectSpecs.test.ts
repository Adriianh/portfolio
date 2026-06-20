import { describe, it, expect } from "vitest";
import { Project } from "../entities/Project";
import {
    AllProjectsSpec,
    InterfaceTypeSpec,
    ProgrammingLanguageSpec,
    SearchTextSpec,
} from "./ProjectSpecs";
import { AndSpec } from "./AndSpec";
import { OrSpec } from "./OrSpec";

describe("Domain Architecture: Specification Pattern Unit Tests", () => {
    const mockWebProject = new Project(
        "1",
        "Frontend App",
        "A web application",
        ["TypeScript", "HTML"],
        ["Vite"],
        "https://github.com",
        null,
        "Web",
        "Ready",
        ["User authentication", "Responsive design"],
        "Integrating third-party APIs",
        false,
        "large",
        "This is a long description of the frontend project.",
        {},
        "https://demo-url.com",
        ["Learned about state management", "Improved CSS skills"],
    );

    const mockDesktopProject = new Project(
        "2",
        "Desktop App",
        "A desktop software",
        ["C#"],
        ["Avalonia UI"],
        "https://github.com",
        null,
        "Desktop",
        "In Progress",
        ["Cross-platform support", "Offline functionality"],
        "Ensuring consistent UI across platforms",
        true,
        "medium",
        "This is a long description of the desktop project.",
        {},
        "https://demo-url-desktop.com",
        ["Learned about desktop development", "Improved C# skills"],
    );

    describe("AllProjectsSpec", () => {
        it("should always return true regardless of project properties", () => {
            const spec = new AllProjectsSpec();
            expect(spec.isSatisfiedBy(mockWebProject)).toBe(true);
            expect(spec.isSatisfiedBy(mockDesktopProject)).toBe(true);
        });
    });

    describe("InterfaceTypeSpec", () => {
        it("should satisfy when interface types match exactly", () => {
            const spec = new InterfaceTypeSpec("Web");
            expect(spec.isSatisfiedBy(mockWebProject)).toBe(true);
            expect(spec.isSatisfiedBy(mockDesktopProject)).toBe(false);
        });
    });

    describe("ProgrammingLanguageSpec", () => {
        it("should satisfy when the requested language is present inside the array", () => {
            const spec = new ProgrammingLanguageSpec("TypeScript");
            expect(spec.isSatisfiedBy(mockWebProject)).toBe(true);
            expect(spec.isSatisfiedBy(mockDesktopProject)).toBe(false);
        });

        it("should evaluate case-insensitively for safety", () => {
            const spec = new ProgrammingLanguageSpec("typescript");
            expect(spec.isSatisfiedBy(mockWebProject)).toBe(true);
        });
    });

    describe("SearchTextSpec", () => {
        it("should return true if query is empty or whitespace", () => {
            const spec = new SearchTextSpec("   ");
            expect(spec.isSatisfiedBy(mockWebProject)).toBe(true);
        });
        /* Obliga al contenedor a ocupar todo el ancho del grid */
        it("should satisfy if query matches project title case-insensitively", () => {
            const spec = new SearchTextSpec("FRONTEND");
            expect(spec.isSatisfiedBy(mockWebProject)).toBe(true);
        });

        it("should satisfy if query matches project description", () => {
            const spec = new SearchTextSpec("web application");
            expect(spec.isSatisfiedBy(mockWebProject)).toBe(true);
        });

        it("should fail if query does not match title nor description", () => {
            const spec = new SearchTextSpec("Farmacia");
            expect(spec.isSatisfiedBy(mockWebProject)).toBe(false);
        });
    });

    describe("Composite AndSpec", () => {
        it("should only satisfy when BOTH specifications are met", () => {
            const isWebSpec = new InterfaceTypeSpec("Web");
            const isTypeScriptSpec = new ProgrammingLanguageSpec("TypeScript");

            const combinedSpec = new AndSpec(isWebSpec, isTypeScriptSpec);

            expect(combinedSpec.isSatisfiedBy(mockWebProject)).toBe(true);

            expect(combinedSpec.isSatisfiedBy(mockDesktopProject)).toBe(false);
        });

        it("should fail if one of the specifications evaluates to false", () => {
            const isWebSpec = new InterfaceTypeSpec("Web");
            const isCSharpeSpec = new ProgrammingLanguageSpec("C#");

            const faultyCombinedSpec = new AndSpec(isWebSpec, isCSharpeSpec);

            expect(faultyCombinedSpec.isSatisfiedBy(mockWebProject)).toBe(
                false,
            );
        });
    });

    describe("Composite OrSpec", () => {
        it("should satisfy when AT LEAST ONE specification is met", () => {
            const isWebSpec = new InterfaceTypeSpec("Web");
            const isCSharpSpec = new ProgrammingLanguageSpec("C#");

            const combinedOrSpec = new OrSpec(isWebSpec, isCSharpSpec);

            expect(combinedOrSpec.isSatisfiedBy(mockWebProject)).toBe(true);

            expect(combinedOrSpec.isSatisfiedBy(mockDesktopProject)).toBe(true);
        });

        it("should fail if both specifications evaluate to false", () => {
            const isDesktopSpec = new InterfaceTypeSpec("Desktop");
            const isKotlinSpec = new ProgrammingLanguageSpec("Kotlin");

            const combinedOrSpec = new OrSpec(isDesktopSpec, isKotlinSpec);

            expect(combinedOrSpec.isSatisfiedBy(mockWebProject)).toBe(false);
        });
    });
});
