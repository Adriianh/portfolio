import { SectionLabel } from "../components/ui/SectionLabel";
import "../styles/skills.css";

const skills = {
    Languages: ["TypeScript", "Kotlin", "C#", "Java", "Python"],
    Databases: ["PostgreSQL", "SQLite", "MySQL"],
    Tools: ["Git", "Docker", "Gradle", "Firebase"],
    Frameworks: ["React", "Avalonia UI", "Jetpack Compose"],
};

const proficiency = [
    { name: "TypeScript", level: 60 },
    { name: "Kotlin", level: 90 },
    { name: "Python", level: 50 },
    { name: "C#", level: 85 },
    { name: "Java", level: 85 },
    { name: "PostgreSQL", level: 80 },
    { name: "React", level: 60 },
    { name: "Docker", level: 70 },
];

const currentlyLearning = [
    "TypeScript — mastering the language and ecosystem",
    "Next.js — full-stack React framework",
    "Rust — systems programming with safety and performance",
    "Flutter — building cross-platform mobile apps with a single codebase",
];

const roadmap = [
    "Master Rust & Go for backend services",
    "Deepen cloud infrastructure knowledge (AWS/GCP)",
    "Contribute to major open source projects",
    "Build and ship a SaaS product from scratch",
];

function DotGrid({ x, y }: { x: number; y: number }) {
    const cols = 5;
    const rows = 5;
    const gap = 14.75;

    return (
        <>
            {Array.from({ length: rows * cols }, (_, i) => (
                <circle
                    key={i}
                    cx={x + (i % cols) * gap}
                    cy={y + Math.floor(i / cols) * gap}
                    r="2"
                    fill="var(--muted)"
                />
            ))}
        </>
    );
}

function SkillsDeco() {
    return (
        <svg
            width="349"
            height="283"
            viewBox="0 0 349 283"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <DotGrid x={2} y={40} />
            <DotGrid x={179} y={145} />

            <rect
                x="297.5"
                y="193.5"
                width="51"
                height="51"
                stroke="var(--muted)"
            />
            <rect
                x="227.5"
                y="0.5"
                width="85"
                height="85"
                stroke="var(--muted)"
            />

            <mask id="path-53-inside-1_29_371" fill="white">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M71.5 169H99.75H128V197.25V225.5V253.75H99.75H71.5V225.5H99.75V197.25H71.5V169Z"
                />
            </mask>
            <path
                d="M71.5 169V168H70.5V169H71.5ZM128 169H129V168H128V169ZM128 253.75V254.75H129V253.75H128ZM71.5 253.75H70.5V254.75H71.5V253.75ZM71.5 225.5V224.5H70.5V225.5H71.5ZM99.75 225.5V226.5H100.75V225.5H99.75ZM99.75 197.25H100.75V196.25H99.75V197.25ZM71.5 197.25H70.5V198.25H71.5V197.25ZM99.75 168H71.5V170H99.75V168ZM128 168H99.75V170H128V168ZM129 197.25V169H127V197.25H129ZM129 225.5V197.25H127V225.5H129ZM129 253.75V225.5H127V253.75H129ZM99.75 254.75H128V252.75H99.75V254.75ZM99.75 252.75H71.5V254.75H99.75V252.75ZM72.5 253.75V225.5H70.5V253.75H72.5ZM71.5 226.5H99.75V224.5H71.5V226.5ZM98.75 197.25V225.5H100.75V197.25H98.75ZM71.5 198.25H99.75V196.25H71.5V198.25ZM70.5 169V197.25H72.5V169H70.5Z"
                fill="var(--accent)"
                mask="url(#path-53-inside-1_29_371)"
            />

            <mask
                id="path-55-outside-2_29_371"
                maskUnits="userSpaceOnUse"
                x="14"
                y="196.25"
                width="59"
                height="87"
                fill="black"
            >
                <rect fill="white" x="14" y="196.25" width="59" height="87" />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15 197.25H43.25H71.5V225.5H43.25V253.75H71.5V282H43.25H15V253.75V225.5V197.25Z"
                />
            </mask>
            <path
                d="M15 197.25V196.25H14V197.25H15ZM71.5 197.25H72.5V196.25H71.5V197.25ZM71.5 225.5V226.5H72.5V225.5H71.5ZM43.25 225.5V224.5H42.25V225.5H43.25ZM43.25 253.75H42.25V254.75H43.25V253.75ZM71.5 253.75H72.5V252.75H71.5V253.75ZM71.5 282V283H72.5V282H71.5ZM15 282H14V283H15V282ZM43.25 196.25H15V198.25H43.25V196.25ZM71.5 196.25H43.25V198.25H71.5V196.25ZM72.5 225.5V197.25H70.5V225.5H72.5ZM43.25 226.5H71.5V224.5H43.25V226.5ZM44.25 253.75V225.5H42.25V253.75H44.25ZM43.25 254.75H71.5V252.75H43.25V254.75ZM70.5 253.75V282H72.5V253.75H70.5ZM71.5 281H43.25V283H71.5V281ZM15 283H43.25V281H15V283ZM14 253.75V282H16V253.75H14ZM14 225.5V253.75H16V225.5H14ZM14 197.25V225.5H16V197.25H14Z"
                fill="var(--accent)"
                mask="url(#path-55-outside-2_29_371)"
            />
        </svg>
    );
}

export function SkillsPage() {
    return (
        <section id="skills">
            <SectionLabel id="skills" label="skills" />

            <div className="skills-layout">
                <div className="skills-deco">
                    <SkillsDeco />
                </div>

                <div className="skills-grid">
                    {Object.entries(skills).map(([category, items]) => (
                        <div key={category} className="skills-col">
                            <h3 className="skills-col__title">{category}</h3>
                            <div className="skills-col__items">
                                {items.map((item) => (
                                    <span
                                        key={item}
                                        className="skills-col__item"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="skills-proficiency">
                <h3 className="skills-subtitle">/ proficiency</h3>
                <div className="proficiency-list">
                    {proficiency.map((skill) => (
                        <div key={skill.name} className="proficiency-row">
                            <span className="proficiency-name">
                                {skill.name}
                            </span>
                            <div className="proficiency-bar">
                                <div
                                    className="proficiency-fill"
                                    style={{ width: `${skill.level}%` }}
                                />
                            </div>
                            <span className="proficiency-level">
                                {skill.level}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="skills-learning">
                <h3 className="skills-subtitle">/ currently learning</h3>
                <div className="learning-grid">
                    {currentlyLearning.map((item) => (
                        <div key={item} className="learning-card">
                            <span className="learning-arrow">→</span>
                            <span className="learning-text">{item}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="skills-roadmap">
                <h3 className="skills-subtitle">/ next goals</h3>
                <div className="roadmap-list">
                    {roadmap.map((goal, i) => (
                        <div key={i} className="roadmap-item">
                            <span className="roadmap-num">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="roadmap-text">{goal}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
