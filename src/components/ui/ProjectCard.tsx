import type { Project } from "../../domain/entities/Project";
import { useTranslation } from "react-i18next";
import "../../styles/project-card.css";

interface Props {
    project: Project;
    onSelect: (project: Project) => void;
}

export function ProjectCard({ project, onSelect }: Props) {
    const allTechs = [...project.programmingLanguages, ...project.technologies];
    const { t } = useTranslation();

    return (
        <article className="project-card" onClick={() => onSelect(project)}>
            {project.previewUrl && (
                <div className="project-card__preview">
                    <img src={project.previewUrl} alt={project.title} />
                </div>
            )}

            <div className="project-card__techs">
                {allTechs.map((tech, index) => (
                    <span key={index} className="project-card__tech-tag">
                        {tech}
                    </span>
                ))}
            </div>

            <div className="project-card__body">
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{t(`projects_data.${project.id}.description`)}</p>

                <div className="project-card__actions">
                    <a
                        href={project.repositoryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-card__btn"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {t("projects.card.repository")}
                    </a>
                </div>
            </div>
        </article>
    );
}
