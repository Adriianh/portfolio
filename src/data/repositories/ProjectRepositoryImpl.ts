import { Project } from "../../domain/entities/Project";
import { type ProjectRepository } from "../../domain/repositories/ProjectRepository";

export class ProjectRepositoryImpl implements ProjectRepository {
    async getProjects(): Promise<Project[]> {
        const response = await fetch("/data/projects.json");

        if (!response.ok) {
            throw new Error(`Failed to fetch projects: ${response.statusText}`);
        }

        const data = (await response.json()) as any[];

        return data.map(
            (item) =>
                new Project(
                    item.id,
                    item.title,
                    item.description,
                    item.technologies,
                    item.repositoryUrl,
                    item.interfaceType,
                ),
        );
    }
}
