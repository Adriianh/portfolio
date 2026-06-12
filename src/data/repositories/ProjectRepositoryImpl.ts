import { Project } from "../../domain/entities/Project";
import { type ProjectRepository } from "../../domain/repositories/ProjectRepository";

export class ProjectRepositoryImpl implements ProjectRepository {
    async getProjects(): Promise<Project[]> {
        return [
            new Project(
                "1",
                "Melo",
                "A music streaming app built with Kotlin",
                ["Kotlin", "Android", "Desktop", "Jetpack Compose", "TamboUI"],
                "https://github.com/adriianh/Melo",
                "Multiplatform",
            ),
            new Project(
                "2",
                "Farmacontrol",
                "A pharmacy management system built with C#",
                ["C#", "Avalonia UI", "Entity Framework Core", "SQLite"],
                "htpts://github.com/adriianh/Farmacontrol",
                "Desktop",
            ),
        ];
    }
}
