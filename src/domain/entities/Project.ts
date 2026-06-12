export class Project {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly technologies: string[];
    readonly repositoryUrl: string;
    readonly interfaceType: "CLI" | "Mobile" | "Web" | "Desktop";

    constructor(
        id: string,
        title: string,
        description: string,
        technologies: string[],
        repositoryUrl: string,
        interfaceType: "CLI" | "Mobile" | "Web" | "Desktop",
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.technologies = technologies;
        this.repositoryUrl = repositoryUrl;
        this.interfaceType = interfaceType;
    }
}
