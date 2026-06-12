import { describe, it, expect } from "vitest";
import { Project } from "../entities/Project";
import { AllProjectsSpec, InterfaceTypeSpec, ProgrammingLanguageSpec } from "./ProjectSpecs";
import { AndSpec } from "./AndSpec";

describe("Domain Architecture: Specification Pattern Unit Tests", () => {
    const mockWebProject = new Project(
        "1",
        "Frontend App",
        "A web application",
        ["TypeScript", "HTML"],
        ["Vite"],
        "https://github.com",
        "Web"
    );

    const mockDesktopProject = new Project(
        "2",
        "Desktop App",
        "A desktop software",
        ["C#"],
        ["Avalonia UI"],
        "https://github.com",
        "Desktop"
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

            expect(faultyCombinedSpec.isSatisfiedBy(mockWebProject)).toBe(false);
        });
    });
});
