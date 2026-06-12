import { GetProjects } from "../../domain/use-cases/GetProjects";
import { ProjectCard } from "../components/ProjectCard";
import { Project } from "../../domain/entities/Project";
import {
    AllProjectsSpec,
    TechnologySpec,
    InterfaceTypeSpec,
} from "../../domain/specs/ProjectSpecs";
import type { Specification } from "../../domain/specs/Specification";

interface FilterOptions {
    label: string;
    spec: Specification<Project>;
}

export class HomeView {
    private container: HTMLElement | null = null;
    private filterOptions: FilterOptions[] = [];

    constructor(private readonly getProjectsUseCase: GetProjects) {}

    async init(): Promise<void> {
        this.container = document.getElementById("projects-container");
        if (!this.container) return;

        try {
            const allProjects = await this.getProjectsUseCase.execute(
                new AllProjectsSpec(),
            );

            const uniqueInterfaces = Array.from(
                new Set(allProjects.map((p) => p.interfaceType)),
            );
            const uniqueTechs = Array.from(
                new Set(allProjects.flatMap((p) => p.technologies)),
            );

            this.filterOptions = [
                { label: "All", spec: new AllProjectsSpec() },
                ...uniqueInterfaces.map((type) => ({
                    label: type,
                    spec: new InterfaceTypeSpec(type),
                })),
                ...uniqueTechs.map((tech) => ({
                    label: tech,
                    spec: new TechnologySpec(tech),
                })),
            ];

            this.container.innerHTML = `
                <div class="filters-container" id="filters-container"></div>
                <div class="projects-grid" id="projects-grid"></div>
            `;

            this.renderFilterButtons();
            this.renderProjects(allProjects);
        } catch (error) {
            this.renderErrorState();
        }
    }

    private renderFilterButtons(): void {
        const filtersContainer = document.getElementById("filters-container");
        if (!filtersContainer) return;

        this.filterOptions.forEach((option, index) => {
            const button = document.createElement("button");
            button.className = `filter-btn ${index === 0 ? "active" : ""}`;
            button.textContent = option.label;

            button.addEventListener("click", async () => {
                document
                    .querySelectorAll(".filter-btn")
                    .forEach((btn) => btn.classList.remove("active"));
                button.classList.add("active");

                await this.loadFilteredProjects(option.spec);
            });

            filtersContainer.appendChild(button);
        });
    }

    private async loadFilteredProjects(
        spec: Specification<Project>,
    ): Promise<void> {
        const gridContainer = document.getElementById("projects-grid");
        if (!gridContainer) return;

        gridContainer.innerHTML = `<p class="loading-text">Filtering projects...</p>`;
        try {
            const filtered = await this.getProjectsUseCase.execute(spec);
            this.renderProjects(filtered);
        } catch (error) {
            this.renderErrorState();
        }
    }

    private renderProjects(projects: Project[]): void {
        const gridContainer = document.getElementById("projects-grid");
        if (!gridContainer) return;

        if (projects.length === 0) {
            gridContainer.innerHTML = `<p class="empty-text">No matching projects found.</p>`;
            return;
        }

        gridContainer.innerHTML = projects
            .map((project) => new ProjectCard(project).render())
            .join("");
    }

    private renderErrorState(): void {
        if (!this.container) return;
        this.container.innerHTML = `<p class="error-text">⚠️ Error loading architectural specifications.</p>`;
    }
}
