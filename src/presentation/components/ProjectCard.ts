import { Project } from "../../domain/entities/Project";

export class ProjectCard {
    constructor(private readonly project: Project) {}

    render(): string {
        const techBadges = this.project.technologies
            .map((tech) => `<span class="badge">${tech}</span>`)
            .join("");

        return `
            <div class="card">
                <div class="card-header">
                    <h3>${this.project.title}</h3>
                    <span class="interface-tag ${this.project.interfaceType.toLowerCase()}">
                        ${this.project.interfaceType}
                    </span>
                </div>
                <p class="card-description">${this.project.description}</p>
                <div class="card-techs">
                    ${techBadges}
                </div>
                <div class="card-footer">
                    <a href="${this.project.repositoryUrl}" target="_blank" class="btn-repo">
                        Ver Código Fuente 📂
                    </a>
                </div>
            </div>
        `;
    }
}
