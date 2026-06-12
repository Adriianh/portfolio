import { Project } from "../entities/Project";
import { AllProjectsSpec } from "../specs/ProjectSpecs";
import type { ProjectRepository } from "../repositories/ProjectRepository";
import type { Specification } from "../specs/Specification";

export class GetProjects {
    constructor(private readonly projectRepository: ProjectRepository) {}

    async execute(
        spec: Specification<Project> = new AllProjectsSpec(),
    ): Promise<Project[]> {
        const projects = await this.projectRepository.getProjects();

        return projects.filter((project) => spec.isSatisfiedBy(project));
    }
}
