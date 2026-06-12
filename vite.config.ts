import { defineConfig } from "vitest/config";

export default defineConfig({
    base: "/portfolio/",
    test: {
        environment: "node",
        globals: true,
    },
});
