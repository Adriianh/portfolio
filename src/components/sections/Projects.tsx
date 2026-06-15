import { useEffect, useState } from "react";
import { GetProjects } from "../../domain/use-cases/GetProjects";
import { ProjectRepositoryImpl } from "../../data/repositories/ProjectRepositoryImpl";
import { ProjectCard } from "../ui/ProjectCard";
import { ProjectModal } from "../ui/ProjectModal";
import { SectionLabel } from "../ui/SectionLabel";
import type { Project } from "../../domain/entities/Project";
import { AllProjectsSpec } from "../../domain/specs/ProjectSpecs";
import "../../styles/projects.css";

const baseUrl = import.meta.env.BASE_URL;

export function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selected, setSelected] = useState<Project | null>(null);

    useEffect(() => {
        const repo = new ProjectRepositoryImpl(baseUrl);
        const getProjects = new GetProjects(repo);
        getProjects.execute(new AllProjectsSpec()).then((data) => {
            setProjects(data);
        });
    }, []);

    const featured = projects.filter((p) => p.status === "Completed");

    return (
        <section id="works">
            <SectionLabel id="works" label="works" showViewAll />

            <div className="projects-grid">
                {featured.map((p) => (
                    <ProjectCard
                        key={p.id}
                        project={p}
                        onSelect={setSelected}
                    />
                ))}
            </div>

            {selected && (
                <ProjectModal
                    project={selected}
                    onClose={() => setSelected(null)}
                />
            )}
        </section>
    );
}
