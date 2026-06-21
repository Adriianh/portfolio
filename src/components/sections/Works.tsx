import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GetProjects } from "../../domain/use-cases/GetProjects";
import { ProjectRepositoryImpl } from "../../data/repositories/ProjectRepositoryImpl";
import { ProjectCard } from "../ui/ProjectCard";
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
    const [platform, setPlatform] = useState("All");
    const [language, setLanguage] = useState("All");
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const { t } = useTranslation();

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
                setError(err.message || t("works.load_error"));
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
    const grouped = filtered.reduce<Record<string, Project[]>>((acc, p) => {
        if (!acc[p.category]) acc[p.category] = [];
        acc[p.category].push(p);

        return acc;
    }, {});

    const categoryLabels: Record<string, string> = {
        large: t("works.category_large"),
        medium: t("works.category_medium"),
        small: t("works.category_small"),
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            id="works"
        >
            <SectionLabel id="works" label={t("works.section_label")} />
            <div className="works-filters">
                <input
                    type="text"
                    placeholder={t("works.search_placeholder")}
                    className="form-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="filter-dropdown"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                >
                    <option value="All">{t("works.all_platforms")}</option>
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
                    <option value="All">{t("works.all_languages")}</option>
                    {uniqueLanguages.map((l) => (
                        <option key={l} value={l}>
                            {l}
                        </option>
                    ))}
                </select>
            </div>
            {!isLoading && filtered.length === 0 && (
                <p className="projects-loading">{t("works.no_projects")}</p>
            )}
            {error && <p className="projects-error">{error}</p>}
            {Object.entries(grouped).map(([category, projects]) => (
                <div key={category} className="works-category">
                    <SectionLabel
                        id={`works-${category}`}
                        label={categoryLabels[category]}
                        variant="subsection"
                    />
                    <div className="projects-grid">
                        {projects.map((p, i) => (
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
                                <ProjectCard
                                    project={p}
                                    onSelect={(project) =>
                                        navigate(`/works/${project.id}`)
                                    }
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            ))}{" "}
        </motion.section>
    );
}
