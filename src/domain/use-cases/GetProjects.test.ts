import { describe, it, expect, vi } from "vitest";
import { GetProjects } from "./GetProjects";
import { Project } from "../entities/Project";
import type { ProjectRepository } from "../repositories/ProjectRepository";
import { InterfaceTypeSpec } from "../specs/ProjectSpecs";

describe("Application Layer: GetProjects Use Case", () => {
    const mockProjects: Project[] = [
        new Project(
            "1",
            "P1",
            "Desc",
            ["TypeScript"],
            ["Vite"],
            "url",
            null,
            "Web",
            "In Development",
            ["Feature1"],
            "Challenge1",
            true,
            "small",
            "Long Desc",
            {},
            null,
            [],
        ),
        new Project(
            "2",
            "P2",
            "Desc",
            ["C#"],
            ["Avalonia"],
            "url",
            null,
            "Desktop",
            "Ready",
            ["Feature2"],
            "Challenge2",
            true,
            "medium",
            "Long desc 2",
            {},
            null,
            [],
        ),
        new Project(
            "3",
            "P3",
            "Desc",
            ["Kotlin"],
            ["Compose"],
            "url",
            null,
            "Web",
            "In Development",
            ["Feature3"],
            "Challenge3",
            true,
            "large",
            "Long desc 3",
            {},
            null,
            [],
        ),
    ];

    it("should fetch all projects from repository and filter them using the provided specification", async () => {
        const mockRepository: ProjectRepository = {
            getProjects: vi.fn().mockResolvedValue(mockProjects),
        };

        const useCase = new GetProjects(mockRepository);
        const webSpec = new InterfaceTypeSpec("Web");
        const result = await useCase.execute(webSpec);

        expect(mockRepository.getProjects).toHaveBeenCalledTimes(1);

        expect(result).toHaveLength(2);
        expect(result[0].title).toBe("P1");
        expect(result[1].title).toBe("P3");

        const hasDesktop = result.some((p) => p.interfaceType === "Desktop");
        expect(hasDesktop).toBe(false);
    });
});
