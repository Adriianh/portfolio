export class Project {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly description: string,
        public readonly programmingLanguages: string[],
        public readonly technologies: string[],
        public readonly repositoryUrl: string,
        public readonly previewUrl: string | null,
        public readonly interfaceType:
            | "CLI"
            | "Mobile"
            | "Web"
            | "Desktop"
            | "Multiplatform",
        public readonly status: string,
        public readonly features: string[],
        public readonly technicalChallenge: string,
    ) {}
}
