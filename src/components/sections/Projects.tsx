import { useEffect, useState } from "react";
import { GetProjects } from "../../domain/use-cases/GetProjects";
import { ProjectRepositoryImpl } from "../../data/repositories/ProjectRepositoryImpl";
import { ProjectCard } from "../ui/ProjectCard";
import { ProjectModal } from "../ui/ProjectModal";
import { SectionLabel } from "../ui/SectionLabel";
import type { Project } from "../../domain/entities/Project";
import { AllProjectsSpec } from "../../domain/specs/ProjectSpecs";
import "../../styles/projects.css";
import { motion } from "framer-motion";

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

    const featured = projects.filter((p) => p.featured);

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            id="works"
        >
            <SectionLabel id="works" label="works" showViewAll />

            <div className="projects-grid">
                {featured.map((p, i) => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.4,
                            ease: "easeOut",
                            delay: i * 0.1,
                        }}
                        viewport={{ once: true }}
                    >
                        <ProjectCard project={p} onSelect={setSelected} />
                    </motion.div>
                ))}
            </div>

            {selected && (
                <ProjectModal
                    project={selected}
                    onClose={() => setSelected(null)}
                />
            )}
        </motion.section>
    );
}
