import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { GetProjects } from "../domain/use-cases/GetProjects";
import { ProjectRepositoryImpl } from "../data/repositories/ProjectRepositoryImpl";
import { AllProjectsSpec } from "../domain/specs/ProjectSpecs";
import type { Project } from "../domain/entities/Project";
import { motion } from "framer-motion";
import "../styles/project-detail.css";

const baseUrl = import.meta.env.BASE_URL;

export function ProjectDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [project, setProject] = useState<Project | null>(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const repo = new ProjectRepositoryImpl(baseUrl);
        const getProjects = new GetProjects(repo);
        getProjects.execute(new AllProjectsSpec()).then((data) => {
            const found = data.find((p) => p.id === slug);
            if (found) {
                setProject(found);
            } else {
                setNotFound(true);
            }
        });
    }, [slug]);

    if (notFound) {
        return (
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <p>Project not found</p>
                <Link to="/works">← back to works</Link>
            </motion.section>
        );
    }

    if (!project) {
        return <div className="page-loading">Loading...</div>;
    }

    const allTechs = [...project.programmingLanguages, ...project.technologies];

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <button className="btn btn-outline" onClick={() => navigate(-1)}>
                ← back
            </button>

            <h1>{project.title}</h1>
            <span className="detail-badge">{project.interfaceType}</span>

            {project.previewUrl && (
                <img src={project.previewUrl} alt={project.title} />
            )}

            <p>{project.description}</p>

            <h3>Technical Challenge</h3>
            <p>{project.technicalChallenge}</p>

            <h3>Features</h3>
            <ul>
                {project.features.map((f, i) => (
                    <li key={i}>{f}</li>
                ))}
            </ul>

            <h3>Technologies</h3>
            <div className="detail-techs">
                {allTechs.map((t, i) => (
                    <span key={i} className="detail-tag">
                        {t}
                    </span>
                ))}
            </div>

            <div className="detail-actions">
                <a
                    href={project.repositoryUrl}
                    target="_blank"
                    className="btn btn-primary"
                >
                    view source
                </a>
                {project.previewUrl && (
                    <a
                        href={project.previewUrl}
                        target="_blank"
                        className="btn btn-outline"
                    >
                        live preview
                    </a>
                )}
            </div>
        </motion.section>
    );
}
