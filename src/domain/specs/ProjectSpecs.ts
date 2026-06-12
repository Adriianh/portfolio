import { Project } from "../entities/Project";
import type { Specification } from "./Specification";

export class AllProjectsSpec implements Specification<Project> {
    isSatisfiedBy(_candidate: Project): boolean {
        return true;
    }
}

export class ProgrammingLanguageSpec implements Specification<Project> {
    constructor(private readonly language: string) {}

    isSatisfiedBy(candidate: Project): boolean {
        return candidate.programmingLanguages.some(
            (lang) => lang.toLowerCase() === this.language.toLowerCase(),
        );
    }
}

export class TechnologySpec implements Specification<Project> {
    constructor(private technology: string) {}

    isSatisfiedBy(candidate: Project): boolean {
        return candidate.technologies.some(
            (tech) => tech.toLowerCase() === this.technology.toLowerCase(),
        );
    }
}

export class InterfaceTypeSpec implements Specification<Project> {
    constructor(private readonly interfaceType: Project["interfaceType"]) {}

    isSatisfiedBy(candidate: Project): boolean {
        return candidate.interfaceType === this.interfaceType;
    }
}
