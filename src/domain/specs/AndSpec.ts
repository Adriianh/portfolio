import type { Specification } from "./Specification";

export class AndSpec<T> implements Specification<T> {
    constructor(
        private readonly left: Specification<T>,
        private readonly right: Specification<T>,
    ) {}

    isSatisfiedBy(item: T): boolean {
        return this.left.isSatisfiedBy(item) && this.right.isSatisfiedBy(item);
    }
}
