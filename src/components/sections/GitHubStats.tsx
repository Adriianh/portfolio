import { useGitHubStats } from "../../hooks/useGitHubStats";
import { SectionLabel } from "../ui/SectionLabel";
import {
    FaStar,
    FaCodeBranch,
    FaUsers,
    FaExternalLinkAlt,
} from "react-icons/fa";
import { VscGithub } from "react-icons/vsc";
import "../../styles/github-stats.css";

interface Props {
    username: string;
}

export function GitHubStats({ username }: Props) {
    const { stats, isLoading, error } = useGitHubStats(username);

    if (isLoading) {
        return (
            <div className="github-stats">
                <h3 className="github-stats__title">
                    <VscGithub className="github-stats__icon" />/ github stats
                </h3>
                <p className="github-stats__loading">loading github stats...</p>
            </div>
        );
    }

    if (error || !stats) {
        return (
            <div className="github-stats">
                <h3 className="github-stats__title">
                    <VscGithub className="github-stats__icon" />/ github stats
                </h3>
                <p className="github-stats__error">
                    {error || "could not load stats"}
                </p>
            </div>
        );
    }

    return (
        <div className="github-stats">
            <h3 className="skills-subtitle">/ github stats</h3>

            <div className="github-stats__counters">
                <div className="github-stat-card">
                    <FaStar className="github-stat-card__icon" />
                    <span className="github-stat-card__value">
                        {stats.totalStars}
                    </span>
                    <span className="github-stat-card__label">stars</span>
                </div>
                <div className="github-stat-card">
                    <FaCodeBranch className="github-stat-card__icon" />
                    <span className="github-stat-card__value">
                        {stats.publicRepos}
                    </span>
                    <span className="github-stat-card__label">repos</span>
                </div>
                <div className="github-stat-card">
                    <FaUsers className="github-stat-card__icon" />
                    <span className="github-stat-card__value">
                        {stats.followers}
                    </span>
                    <span className="github-stat-card__label">followers</span>
                </div>
            </div>

            <div className="github-stats__languages">
                <SectionLabel
                    id="github-languages"
                    label="top languages"
                    variant="subsection"
                />{" "}
                <div className="github-stats__lang-bars">
                    {stats.topLanguages.map(({ language, percentage }) => (
                        <div key={language} className="lang-bar">
                            <div className="lang-bar__info">
                                <span className="lang-bar__name">
                                    {language}
                                </span>
                                <span className="lang-bar__pct">
                                    {percentage}%
                                </span>
                            </div>
                            <div className="lang-bar__track">
                                <div
                                    className="lang-bar__fill"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="github-stats__latest">
                <SectionLabel
                    id="github-repos"
                    label="latest repos"
                    variant="subsection"
                />{" "}
                <div className="github-stats__repo-list">
                    {stats.latestRepos.map((repo) => (
                        <a
                            key={repo.name}
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="github-repo-row"
                        >
                            <div className="github-repo-row__info">
                                <span className="github-repo-row__name">
                                    {repo.name}
                                </span>
                                <span className="github-repo-row__desc">
                                    {repo.description}
                                </span>
                            </div>
                            <div className="github-repo-row__meta">
                                <span className="github-repo-row__stars">
                                    <FaStar /> {repo.stars}
                                </span>
                                <span className="github-repo-row__lang">
                                    {repo.language}
                                </span>
                                <FaExternalLinkAlt className="github-repo-row__external" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
