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
    const [imgIndex, setImgIndex] = useState(0);
    const [platform, setPlatform] = useState("");

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

    const availablePlatforms = Object.entries(project.screenshots).filter(
        ([, imgs]) => imgs.length > 0,
    );
    const currentPlatform = availablePlatforms.some(([k]) => k === platform)
        ? platform
        : (availablePlatforms[0]?.[0] ?? "");
    const currentScreenshots = project.screenshots[currentPlatform] ?? [];

    function prevImg() {
        setImgIndex((i) => (i === 0 ? currentScreenshots.length - 1 : i - 1));
    }

    function nextImg() {
        setImgIndex((i) => (i === currentScreenshots.length - 1 ? 0 : i + 1));
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

            {project.previewUrl && (
                <img src={project.previewUrl} alt={project.title} />
            )}

            <h1>{project.title}</h1>
            <span className="detail-badge">{project.interfaceType}</span>

            <p>{project.description}</p>

            {project.longDescription && (
                <>
                    <h3>About</h3>
                    <p>{project.longDescription}</p>
                </>
            )}

            {currentScreenshots.length > 0 && (
                <>
                    <h3>Screenshots</h3>

                    {availablePlatforms.length > 1 && (
                        <div className="platform-tabs">
                            {availablePlatforms.map(([key]) => (
                                <button
                                    key={key}
                                    className={`platform-tab ${key === platform ? "active" : ""}`}
                                    onClick={() => {
                                        setPlatform(key);
                                        setImgIndex(0);
                                    }}
                                >
                                    {key}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="detail-carousel">
                        <div className="carousel-viewport">
                            <img
                                src={currentScreenshots[imgIndex]}
                                alt={`${project.title} screenshot ${imgIndex + 1}`}
                            />
                            {currentScreenshots.length > 1 && (
                                <>
                                    <button
                                        className="carousel-btn carousel-prev"
                                        onClick={prevImg}
                                    >
                                        ‹
                                    </button>
                                    <button
                                        className="carousel-btn carousel-next"
                                        onClick={nextImg}
                                    >
                                        ›
                                    </button>
                                </>
                            )}
                        </div>
                        {currentScreenshots.length > 1 && (
                            <div className="carousel-dots">
                                {currentScreenshots.map((_, i) => (
                                    <button
                                        key={i}
                                        className={`carousel-dot ${i === imgIndex ? "active" : ""}`}
                                        onClick={() => setImgIndex(i)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
            <h3>Technical Challenge</h3>
            <p>{project.technicalChallenge}</p>

            <h3>Features</h3>
            <ul>
                {project.features.map((f, i) => (
                    <li key={i}>{f}</li>
                ))}
            </ul>

            {project.learnings.length > 0 && (
                <>
                    <h3>Learnings</h3>
                    <ul>
                        {project.learnings.map((l, i) => (
                            <li key={i}>{l}</li>
                        ))}
                    </ul>
                </>
            )}

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
                {project.demoUrl && (
                    <a
                        href={project.demoUrl}
                        target="_blank"
                        className="btn btn-outline"
                    >
                        live demo
                    </a>
                )}
            </div>
        </motion.section>
    );
}
