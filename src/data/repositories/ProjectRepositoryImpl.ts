import { Project } from "../../domain/entities/Project";
import type { ProjectRepository } from "../../domain/repositories/ProjectRepository";
import { projectsData } from "../projects";

export class ProjectRepositoryImpl implements ProjectRepository {
    constructor(private readonly baseUrl: string) {}

    async getProjects(): Promise<Project[]> {
        return projectsData.map(
            (item) =>
                new Project(
                    item.id,
                    item.title,
                    item.description,
                    item.programmingLanguages || [],
                    item.technologies || [],
                    item.repositoryUrl,
                    item.previewUrl
                        ? `${this.baseUrl}${item.previewUrl.replace(/^\//, "")}`
                        : null,
                    item.interfaceType,
                    item.status,
                    item.features || [],
                    item.technicalChallenge || "",
                    item.featured,
                    item.category,
                    item.longDescription,
                    item.screenshots,
                    item.demoUrl || null,
                    item.learnings || [],
                ),
        );
    }
}
