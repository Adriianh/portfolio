import { GetProjects } from "../../domain/use-cases/GetProjects";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectModal } from "../components/ProjectModal";
import { Project } from "../../domain/entities/Project";
import {
    AllProjectsSpec,
    ProgrammingLanguageSpec,
    InterfaceTypeSpec,
    SearchTextSpec,
} from "../../domain/specs/ProjectSpecs";
import { AndSpec } from "../../domain/specs/AndSpec";
import type { Specification } from "../../domain/specs/Specification";

export class HomeView {
    private container: HTMLElement | null = null;

    private currentPlatformSpec: Specification<Project> = new AllProjectsSpec();
    private currentLanguageSpec: Specification<Project> = new AllProjectsSpec();
    private currentSearchSpec: Specification<Project> = new AllProjectsSpec();

    private allProjects: Project[] = [];
    private cardEntries: { project: Project; element: HTMLElement }[] = [];

    constructor(private readonly getProjectsUseCase: GetProjects) {}

    async init(): Promise<void> {
        this.container = document.getElementById("projects-container");
        if (!this.container) return;

        try {
            this.allProjects = await this.getProjectsUseCase.execute(
                new AllProjectsSpec(),
            );

            const uniquePlatforms = Array.from(
                new Set(this.allProjects.map((p) => p.interfaceType)),
            );

            const uniqueLanguages = Array.from(
                new Set(
                    this.allProjects.flatMap((p) => p.programmingLanguages),
                ),
            );

            this.container.innerHTML = `
                <div class="filters-bar">
                    <div class="filter-group search-group">
                        <input 
                            type="text" 
                            id="search-input" 
                            placeholder="Buscar proyecto por título o descripción..." 
                            class="form-input"
                        />
                    </div>

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

            const grid = document.getElementById("projects-grid");
            this.cardEntries = this.allProjects.map((project) => {
                const card = new ProjectCard(project);
                const cardString = card.render();

                const tempTemplate = document.createElement("div");
                tempTemplate.innerHTML = cardString.trim();

                const cardElement =
                    tempTemplate.firstElementChild as HTMLElement;
                cardElement.addEventListener("click", () =>
                    this.openProjectModal(project),
                );

                grid?.appendChild(cardElement);
                return { project, element: cardElement };
            });

            this.setupFilterEvents();
        } catch (error) {
            this.renderErrorState();
        }
    }

    private setupFilterEvents(): void {
        const searchInput = document.getElementById(
            "search-input",
        ) as HTMLInputElement;
        const platformSelect = document.getElementById(
            "platform-select",
        ) as HTMLSelectElement;
        const languageSelect = document.getElementById(
            "language-select",
        ) as HTMLSelectElement;

        searchInput?.addEventListener("input", async (e) => {
            const query = (e.target as HTMLInputElement).value;
            this.currentSearchSpec = new SearchTextSpec(query);
            await this.applyCombinedFilters();
        });

        platformSelect?.addEventListener("change", async (e) => {
            const value = (e.target as HTMLSelectElement).value;
            this.currentPlatformSpec =
                value === "All"
                    ? new AllProjectsSpec()
                    : new InterfaceTypeSpec(value as any);
            await this.applyCombinedFilters();
        });

        languageSelect?.addEventListener("change", async (e) => {
            const value = (e.target as HTMLSelectElement).value;
            this.currentLanguageSpec =
                value === "All"
                    ? new AllProjectsSpec()
                    : new ProgrammingLanguageSpec(value);
            await this.applyCombinedFilters();
        });
    }

    private async applyCombinedFilters(): Promise<void> {
        const gridContainer = document.getElementById("projects-grid");
        if (!gridContainer) return;

        let visibleCardsCount = 0;

        try {
            const combinedSpec = new AndSpec(
                this.currentSearchSpec,
                new AndSpec(this.currentPlatformSpec, this.currentLanguageSpec),
            );

            this.cardEntries.forEach(({ project, element }) => {
                if (combinedSpec.isSatisfiedBy(project)) {
                    element.classList.remove("hidden");
                    visibleCardsCount++;
                } else {
                    element.classList.add("hidden");
                }
            });

            this.manageEmptyState(visibleCardsCount, gridContainer);
        } catch (error) {
            this.renderErrorState();
        }
    }

    private manageEmptyState(
        visibleCardsCount: number,
        container: HTMLElement,
    ): void {
        const existingEmptyState = document.getElementById("empty-state");

        if (visibleCardsCount === 0) {
            if (!existingEmptyState) {
                const emptyStateDiv = document.createElement("div");

                emptyStateDiv.id = "empty-state";
                emptyStateDiv.className = "empty-state-container";
                emptyStateDiv.innerHTML = `
                <span class="empty-state-icon">#</span>
                <h3>No se encontraron proyectos</h3>
                <p>Prueba cambiando el término de búsqueda o relajando los selectores de plataforma y lenguaje.</p>
                `;

                container.appendChild(emptyStateDiv);
            }
        } else {
            existingEmptyState?.remove();
        }
    }

    private renderErrorState(): void {
        const gridContainer = document.getElementById("projects-grid");
        if (gridContainer) {
            gridContainer.innerHTML = `<p class="error-text">Architectural evaluation failed.</p>`;
        }
    }

    private openProjectModal(project: Project): void {
        const modalComponent = new ProjectModal(project);
        const modalHtml = modalComponent.render();

        const tempTemplate = document.createElement("div");
        tempTemplate.innerHTML = modalHtml.trim();
        const overlay = tempTemplate.firstElementChild as HTMLElement;

        document.body.appendChild(overlay);
        document.body.style.overflow = "hidden";

        const closeModal = () => {
            overlay.remove();
            document.body.style.overflow = "";
        };

        overlay
            .querySelector("#close-modal-btn")
            ?.addEventListener("click", closeModal);

        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                closeModal();
            }
        });
    }
}
