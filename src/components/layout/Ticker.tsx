import "../../styles/ticker.css";

const items = [
    "TypeScript",
    "✦",
    "Kotlin",
    "✦",
    "C#",
    "✦",
    "React",
    "✦",
    "Jetpack Compose",
    "✦",
    "Design Patterns",
    "✦",
    "Clean Architecture",
    "✦",
];

function TickerContent() {
    return (
        <>
            {items.map((item, i) =>
                item === "✦" ? (
                    <span key={i} className="ticker-divider">
                        ✦
                    </span>
                ) : (
                    <span key={i} className="ticker-item">
                        {item}
                    </span>
                ),
            )}
        </>
    );
}

export function Ticker() {
    return (
        <div className="ticker">
            <div className="ticker-track">
                {Array.from({ length: 4 }, (_, i) => (
                    <span key={i} className="ticker-group">
                        <TickerContent />
                    </span>
                ))}
            </div>
        </div>
    );
}
