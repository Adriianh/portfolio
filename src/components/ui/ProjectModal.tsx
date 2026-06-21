import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Project } from "../../domain/entities/Project";
import "../../styles/project-modal.css";

interface Props {
    project: Project;
    onClose: () => void;
}

export function ProjectModal({ project, onClose }: Props) {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-container"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="modal-close" onClick={onClose}>
                    ×
                </button>
                <h2>{project.title}</h2>
                <span className="modal-badge">{project.interfaceType}</span>
                <p>{project.description}</p>

                <h4>{t("projects.modal.features")}</h4>
                <ul>
                    {project.features.map((f, i) => (
                        <li key={i}>{f}</li>
                    ))}
                </ul>

                <div className="modal-techs">
                    {project.technologies.map((t, i) => (
                        <span key={i} className="modal-tag">
                            {t}
                        </span>
                    ))}
                </div>

                <div className="modal-actions">
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            onClose();
                            navigate(`/works/${project.id}`);
                        }}
                    >
                        {t("projects.modal.view_details")}
                    </button>

                    <a
                        href={project.repositoryUrl}
                        target="_blank"
                        className="btn btn-outline"
                    >
                        {t("projects.modal.view_source")}
                    </a>
                </div>
            </div>
        </div>
    );
}
