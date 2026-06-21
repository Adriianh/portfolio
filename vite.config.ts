import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import Sitemap from "vite-plugin-sitemap";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    base: "/portfolio/",
    plugins: [
        react(),
        Sitemap({
            hostname: "https://adriianh.github.io",
            basePath: "/portfolio",
            dynamicRoutes: [
                "/works",
                "/about",
                "/skills",
                "/contact",
                "/works/farmacontrol",
                "/works/melo",
                "/works/portfolio",
                "/works/todo-cli",
                "/works/currency-exchange-cli",
            ],
        }),
        VitePWA({
            registerType: "autoUpdate",
            includeAssets: ["favicon.svg", "assets/**/*"],
            manifest: {
                name: "Adrián Fúnez — Portfolio",
                short_name: "Portfolio",
                description:
                    "Software developer and open source enthusiast. Building clean, maintainable systems.",
                theme_color: "#0f0e17",
                background_color: "#0f0e17",
                display: "standalone",
                scope: "/portfolio/",
                start_url: "/portfolio/",
                icons: [
                    {
                        src: "favicon.svg",
                        sizes: "192x192",
                        type: "image/svg+xml",
                    },
                    {
                        src: "favicon.svg",
                        sizes: "512x512",
                        type: "image/svg+xml",
                    },
                ],
            },
            workbox: {
                globPatterns: ["**/*.{js,css,html,svg,png,ico,webp}"],
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/api\.github\.com\/.*/,
                        handler: "NetworkFirst",
                        options: {
                            cacheName: "github-api",
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60,
                            },
                        },
                    },
                ],
            },
        }),
    ],
    test: {
        environment: "node",
        globals: true,
    },
});
