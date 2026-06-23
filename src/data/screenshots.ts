const farmacontrol = import.meta.glob<string>(
    "../assets/screenshots/farmacontrol/*.png",
    { eager: true, query: "?url", import: "default" },
);

const melo = import.meta.glob<string>("../assets/screenshots/melo/**/*.png", {
    eager: true,
    query: "?url",
    import: "default",
});

const portfolio = import.meta.glob<string>(
    "../assets/screenshots/portfolio/*.png",
    { eager: true, query: "?url", import: "default" },
);

export const screenshotsMap: Record<string, Record<string, string[]>> = {
    farmacontrol: {
        default: Object.values(farmacontrol),
    },
    melo: {
        tui: Object.entries(melo)
            .filter(([key]) => key.includes("/tui/"))
            .map(([, url]) => url),
        mobile: [],
        desktop: [],
    },
    portfolio: {
        default: Object.values(portfolio),
    },
};
