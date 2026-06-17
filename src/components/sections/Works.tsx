import { useEffect, useState } from "react";
import { GetProjects } from "../../domain/use-cases/GetProjects";
import { ProjectRepositoryImpl } from "../../data/repositories/ProjectRepositoryImpl";
import { ProjectCard } from "../ui/ProjectCard";
import { ProjectModal } from "../ui/ProjectModal";
import { SectionLabel } from "../ui/SectionLabel";
import type { Project } from "../../domain/entities/Project";
import {
    AllProjectsSpec,
    InterfaceTypeSpec,
    ProgrammingLanguageSpec,
    SearchTextSpec,
} from "../../domain/specs/ProjectSpecs";
import { AndSpec } from "../../domain/specs/AndSpec";
import { motion } from "framer-motion";
import "../../styles/projects.css";

const baseUrl = import.meta.env.BASE_URL;

export function Works() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selected, setSelected] = useState<Project | null>(null);
    const [platform, setPlatform] = useState("All");
    const [language, setLanguage] = useState("All");
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const repo = new ProjectRepositoryImpl(baseUrl);
        const getProjects = new GetProjects(repo);
        getProjects
            .execute(new AllProjectsSpec())
            .then((data) => {
                setProjects(data);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err.message || "Failed to load projects");
                setIsLoading(false);
            });
    }, []);

    const filtered = projects.filter((p) => {
        const platformSpec =
            platform === "All"
                ? new AllProjectsSpec()
                : new InterfaceTypeSpec(platform as Project["interfaceType"]);
        const langSpec =
            language === "All"
                ? new AllProjectsSpec()
                : new ProgrammingLanguageSpec(language);
        const searchSpec = search
            ? new SearchTextSpec(search)
            : new AllProjectsSpec();
        return new AndSpec(
            new AndSpec(platformSpec, langSpec),
            searchSpec,
        ).isSatisfiedBy(p);
    });

    const uniquePlatforms = [...new Set(projects.map((p) => p.interfaceType))];
    const uniqueLanguages = [
        ...new Set(projects.flatMap((p) => p.programmingLanguages)),
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            id="works"
        >
            <SectionLabel id="works" label="works" />

            <div className="works-filters">
                <input
                    type="text"
                    placeholder="search projects..."
                    className="form-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="filter-dropdown"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                >
                    <option value="All">all platforms</option>
                    {uniquePlatforms.map((p) => (
                        <option key={p} value={p}>
                            {p}
                        </option>
                    ))}
                </select>
                <select
                    className="filter-dropdown"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="All">all languages</option>
                    {uniqueLanguages.map((l) => (
                        <option key={l} value={l}>
                            {l}
                        </option>
                    ))}
                </select>
            </div>

            {!isLoading && filtered.length === 0 && (
                <p className="projects-loading">loading projects...</p>
            )}
            {error && <p className="projects-error">{error}</p>}

            <div className="projects-grid">
                {filtered.map((p) => (
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
        </motion.section>
    );
}
