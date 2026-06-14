import { Project } from "../../domain/entities/Project";

export class ProjectModal {
    constructor(private readonly project: Project) {}

    render(): string {
        return `
            <div class="modal-overlay">
                <div class="modal-container">
                    <button class="modal-close-btn" id="close-modal-btn">&times;</button>
                    <div class="modal-header">
                        <h2>${this.project.title}</h2>
                        <span class="modal-platform-badge">${this.project.interfaceType}</span>
                    </div>
                    <div class="modal-body">
                        <p>${this.project.description}</p>
                    </div>
                    <div class="modal-tech-section">
                        <h4>Stack Principal</h4>
                        <div class="modal-tags" style="margin-bottom: 1rem;">
                            ${this.project.programmingLanguages.map((lang) => `<span class="modal-tag" style="color: #cba6f7;">${lang}</span>`).join("")}
                        </div>
                        
                        ${
                            (this.project as any).technologies
                                ? `
                            <h4>Tecnologías y Frameworks</h4>
                            <div class="modal-tags">
                                ${(this.project as any).technologies.map((tech: string) => `<span class="modal-tag">${tech}</span>`).join("")}
                            </div>
                        `
                                : ""
                        }
                    </div>
                </div>
            </div>
        `;
    }
}
