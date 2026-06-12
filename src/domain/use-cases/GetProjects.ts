import { Project } from "../entities/Project";
import { type ProjectRepository } from "../repositories/ProjectRepository";

export class GetProjects {
    constructor(private readonly projectRepository: ProjectRepository) {}

    async execute(): Promise<Project[]> {
        const projects = await this.projectRepository.getProjects();

        return projects.sort((a, b) => a.title.localeCompare(b.title));
    }
}
