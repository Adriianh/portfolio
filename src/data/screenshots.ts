const farmacontrol = import.meta.glob<string>(
    "../assets/screenshots/farmacontrol/*.png",
    { eager: true, query: "?url", import: "default" },
);

const melo = import.meta.glob<string>("../assets/screenshots/melo/*.png", {
    eager: true,
    query: "?url",
    import: "default",
});

const portfolio = import.meta.glob<string>(
    "../assets/screenshots/portfolio/*.png",
    { eager: true, query: "?url", import: "default" },
);

export const screenshotsMap: Record<string, string[]> = {
    farmacontrol: Object.values(farmacontrol),
    melo: Object.values(melo),
    portfolio: Object.values(portfolio),
};
