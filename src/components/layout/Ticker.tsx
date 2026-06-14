import "../../styles/ticker.css";

const items = [
    "TypeScript",
    "✦",
    "React",
    "✦",
    "Kotlin",
    "✦",
    "C#",
    "✦",
    "SQL",
    "✦",
    "Clean Architecture",
    "✦",
    "Python",
    "✦",
    "PostgreSQL",
    "✦",
    "Docker",
    "✦",
    "Git",
    "✦",
    "REST APIs",
    "✦",
    "DDD",
    "✦",
    "SOLID",
    "✦",
    "Design Patterns",
];

export function Ticker() {
    const content = items.join(" ") + " ✦ ";
    return (
        <div className="ticker">
            <div className="ticker-track">
                <span>{content}</span>
                <span>{content}</span>
            </div>
        </div>
    );
}
