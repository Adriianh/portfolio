import type { Specification } from "./Specification";

export class OrSpec<T> implements Specification<T> {
    constructor(
        private readonly left: Specification<T>,
        private readonly right: Specification<T>,
    ) {}

    isSatisfiedBy(candidate: T): boolean {
        return (
            this.left.isSatisfiedBy(candidate) ||
            this.right.isSatisfiedBy(candidate)
        );
    }
}
