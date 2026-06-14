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
                        <h4>Tecnologías utilizadas</h4>
                        <div class="modal-tags">
                            ${this.project.programmingLanguages.map((lang) => `<span class="modal-tag">${lang}</span>`).join("")}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
