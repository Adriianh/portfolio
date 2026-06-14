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
                        <div style="display: flex; gap: 0.5rem; margin-bottom: 1.2rem;">
                            <span class="modal-platform-badge">${this.project.interfaceType}</span>
                            ${this.project.status ? `<span class="modal-platform-badge" style="background: rgba(203, 166, 247, 0.15); color: #cba6f7;">${this.project.status}</span>` : ""}
                        </div>
                    </div>

                    <div class="modal-body" style="max-height: 65vh; overflow-y: auto; padding-right: 0.5rem;">
                        <p style="line-height: 1.6; color: #cdd6f4;">${this.project.description}</p>
                        
                        ${
                            this.project.features &&
                            this.project.features.length > 0
                                ? `
                            <div class="modal-section" style="margin-top: 1.5rem;">
                                <h4 style="color: #cba6f7; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em; margin-bottom: 0.5rem;">Key Features</h4>
                                <ul style="color: #a6adc8; padding-left: 1.2rem; margin: 0 0 1.5rem 0; line-height: 1.6;">
                                    ${this.project.features.map((f) => `<li>${f}</li>`).join("")}
                                </ul>
                            </div>
                        `
                                : ""
                        }

                        ${
                            this.project.technicalChallenge
                                ? `
                            <div class="modal-section" style="margin-top: 1.5rem; background: #1e1e2e; padding: 1rem; border-radius: 8px; border-left: 4px solid #f38ba8; margin-bottom: 1.5rem;">
                                <h4 style="color: #f38ba8; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em; margin: 0 0 0.5rem 0;">Technical Challenge</h4>
                                <p style="color: #a6adc8; margin: 0; font-size: 0.95rem; line-height: 1.5;">${this.project.technicalChallenge}</p>
                            </div>
                        `
                                : ""
                        }

                        <div class="modal-tech-section" style="margin-top: 1.5rem;">
                            <h4 style="color: #cdd6f4; font-size: 0.9rem; margin-bottom: 0.5rem;">Technologies & Tools</h4>
                            <div class="modal-tags">
                                ${this.project.programmingLanguages.map((lang) => `<span class="modal-tag" style="color: #89b4fa; border: 1px solid rgba(137, 180, 250, 0.3);">${lang}</span>`).join("")}
                                ${this.project.technologies ? this.project.technologies.map((tech) => `<span class="modal-tag">${tech}</span>`).join("") : ""}
                            </div>
                        </div>

                        ${
                            this.project.repositoryUrl &&
                            this.project.repositoryUrl !== "#"
                                ? `
                            <div style="margin-top: 2rem; text-align: right;">
                                <a href="${this.project.repositoryUrl}" target="_blank" rel="noopener noreferrer" class="btn-repo" style="display: inline-block; padding: 0.6rem 1.5rem; background: #cba6f7; color: #11111b; font-weight: 600; text-decoration: none; border-radius: 6px;">
                                    View Source Code 🖥️
                                </a>
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
