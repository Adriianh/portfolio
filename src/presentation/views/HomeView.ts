import { GetProjects } from "../../domain/use-cases/GetProjects";
import { ProjectCard } from "../components/ProjectCard";

export class HomeView {
    constructor(private readonly getProjectsUseCase: GetProjects) {}

    async init(): Promise<void> {
        const container = document.getElementById("projects-container");
        if (!container) return;

        try {
            const projects = await this.getProjectsUseCase.execute();

            container.innerHTML = projects
                .map((project) => new ProjectCard(project).render())
                .join("");
        } catch (error) {
            container.innerHTML = `
                <div class="error-container">
                    <p class="error-title">❌ Error de Arquitectura al cargar los proyectos:</p>
                    <p class="error-message">${(error as Error).message}</p>
                </div>
            `;
        }
    }
}
