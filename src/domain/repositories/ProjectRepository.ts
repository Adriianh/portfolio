import { Project } from "../entities/Project";

export interface ProjectRepository {
    getProjects(): Promise<Project[]>;
}
