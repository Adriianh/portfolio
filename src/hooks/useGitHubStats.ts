import { useEffect, useState } from "react";

interface GitHubRepo {
    name: string;
    description: string | null;
    stargazers_count: number;
    language: string | null;
    pushed_at: string;
    html_url: string;
}

interface GitHubUser {
    public_repos: number;
    followers: number;
}

export interface GitHubStats {
    totalStars: number;
    publicRepos: number;
    followers: number;
    topLanguages: { language: string; percentage: number }[];
    latestRepos: {
        name: string;
        description: string;
        stars: number;
        language: string;
        url: string;
    }[];
}

export function useGitHubStats(username: string) {
    const [stats, setStats] = useState<GitHubStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchStats() {
            try {
                const [userRes, reposRes] = await Promise.all([
                    fetch(`https://api.github.com/users/${username}`),
                    fetch(
                        `https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`,
                    ),
                ]);

                if (!userRes.ok || !reposRes.ok) {
                    throw new Error("GitHub API request failed");
                }

                const user: GitHubUser = await userRes.json();
                const repos: GitHubRepo[] = await reposRes.json();

                if (cancelled) return;

                const totalStars = repos.reduce(
                    (sum, r) => sum + r.stargazers_count,
                    0,
                );

                const langCount: Record<string, number> = {};
                repos.forEach((r) => {
                    if (r.language) {
                        langCount[r.language] =
                            (langCount[r.language] || 0) + 1;
                    }
                });

                const totalLangRepos = Object.values(langCount).reduce(
                    (a, b) => a + b,
                    0,
                );
                const topLanguages = Object.entries(langCount)
                    .map(([language, count]) => ({
                        language,
                        percentage: Math.round((count / totalLangRepos) * 100),
                    }))
                    .sort((a, b) => b.percentage - a.percentage)
                    .slice(0, 5);

                const latestRepos = repos
                    .sort(
                        (a, b) =>
                            new Date(b.pushed_at).getTime() -
                            new Date(a.pushed_at).getTime(),
                    )
                    .slice(0, 3)
                    .map((r) => ({
                        name: r.name,
                        description: r.description ?? "No description",
                        stars: r.stargazers_count,
                        language: r.language ?? "Unknown",
                        url: r.html_url,
                    }));

                setStats({
                    totalStars,
                    publicRepos: user.public_repos,
                    followers: user.followers,
                    topLanguages,
                    latestRepos,
                });
            } catch (err) {
                if (!cancelled) {
                    setError(
                        err instanceof Error ? err.message : "Failed to load",
                    );
                }
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        }

        fetchStats();
        return () => {
            cancelled = true;
        };
    }, [username]);

    return { stats, isLoading, error };
}
