export class Project {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly description: string,
        public readonly programmingLanguages: string[],
        public readonly technologies: string[],
        public readonly repositoryUrl: string,
        public readonly interfaceType:
            | "CLI"
            | "Mobile"
            | "Web"
            | "Desktop"
            | "Multiplatform",
        public readonly status: string,
        public readonly features: string[],
        public readonly technicalChallenge: string,
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.programmingLanguages = programmingLanguages;
        this.technologies = technologies;
        this.repositoryUrl = repositoryUrl;
        this.interfaceType = interfaceType;
        this.status = status;
        this.features = features;
        this.technicalChallenge = technicalChallenge;
    }
}
