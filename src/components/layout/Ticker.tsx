import { useTranslation } from "react-i18next";
import "../../styles/ticker.css";

function TickerContent() {
    const { t } = useTranslation();
    const items = t("ticker.items", { returnObjects: true }) as string[];

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
            <div className="ticker-wrapper">
                <div className="ticker-track">
                    {Array.from({ length: 4 }, (_, i) => (
                        <span key={i} className="ticker-group">
                            <TickerContent />
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
