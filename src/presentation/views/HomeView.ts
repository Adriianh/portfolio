import { GetProjects } from "../../domain/use-cases/GetProjects";
import { ProjectCard } from "../components/ProjectCard";
import { Project } from "../../domain/entities/Project";
import {
    AllProjectsSpec,
    ProgrammingLanguageSpec,
    InterfaceTypeSpec,
} from "../../domain/specs/ProjectSpecs";
import { AndSpec } from "../../domain/specs/AndSpec";
import type { Specification } from "../../domain/specs/Specification";

export class HomeView {
    private container: HTMLElement | null = null;

    private currentPlatformSpec: Specification<Project> = new AllProjectsSpec();
    private currentLanguageSpec: Specification<Project> = new AllProjectsSpec();

    constructor(private readonly getProjectsUseCase: GetProjects) {}

    async init(): Promise<void> {
        this.container = document.getElementById("projects-container");
        if (!this.container) return;

        try {
            const allProjects = await this.getProjectsUseCase.execute(
                new AllProjectsSpec(),
            );

            const uniquePlatforms = Array.from(
                new Set(allProjects.map((p) => p.interfaceType)),
            );

            const uniqueLanguages = Array.from(
                new Set(allProjects.flatMap((p) => p.programmingLanguages)),
            );

            this.container.innerHTML = `
                <div class="filters-bar">
                    <div class="filter-group">
                        <label for="platform-select">Platform</label>
                        <select id="platform-select" class="filter-dropdown">
                            <option value="All">All Platforms</option>
                            ${uniquePlatforms.map((p) => `<option value="${p}">${p}</option>`).join("")}
                        </select>
                    </div>

                    <div class="filter-group">
                        <label for="language-select">Language</label>
                        <select id="language-select" class="filter-dropdown">
                            <option value="All">All Languages</option>
                            ${uniqueLanguages.map((lang) => `<option value="${lang}">${lang}</option>`).join("")}
                        </select>
                    </div>
                </div>
                <div class="projects-grid" id="projects-grid"></div>
            `;

            this.setupFilterEvents();
            this.renderProjects(allProjects);
        } catch (error) {
            this.renderErrorState();
        }
    }

    private setupFilterEvents(): void {
        const platformSelect = document.getElementById(
            "platform-select",
        ) as HTMLSelectElement;
        const languageSelect = document.getElementById(
            "language-select",
        ) as HTMLSelectElement;

        if (!platformSelect || !languageSelect) return;

        platformSelect.addEventListener("change", () => {
            const value = platformSelect.value;
            this.currentPlatformSpec =
                value === "All"
                    ? new AllProjectsSpec()
                    : new InterfaceTypeSpec(value as Project["interfaceType"]);

            this.applyCombinedFilters();
        });

        languageSelect.addEventListener("change", () => {
            const value = languageSelect.value;
            this.currentLanguageSpec =
                value === "All"
                    ? new AllProjectsSpec()
                    : new ProgrammingLanguageSpec(value);

            this.applyCombinedFilters();
        });
    }

    private async applyCombinedFilters(): Promise<void> {
        const gridContainer = document.getElementById("projects-grid");
        if (!gridContainer) return;

        gridContainer.innerHTML = `<p class="loading-text">Applying structural criteria...</p>`;

        try {
            const combinedSpec = new AndSpec(
                this.currentPlatformSpec,
                this.currentLanguageSpec,
            );
            const filteredProjects =
                await this.getProjectsUseCase.execute(combinedSpec);
            this.renderProjects(filteredProjects);
        } catch (error) {
            this.renderErrorState();
        }
    }

    private renderProjects(projects: Project[]): void {
        const gridContainer = document.getElementById("projects-grid");
        if (!gridContainer) return;

        if (projects.length === 0) {
            gridContainer.innerHTML = `<p class="empty-text">No projects match the selected criteria.</p>`;
            return;
        }

        gridContainer.innerHTML = projects
            .map((project) => new ProjectCard(project).render())
            .join("");
    }

    private renderErrorState(): void {
        const gridContainer = document.getElementById("projects-grid");
        if (gridContainer) {
            gridContainer.innerHTML = `<p class="error-text">⚠️ Architectural evaluation failed.</p>`;
        }
    }
}
