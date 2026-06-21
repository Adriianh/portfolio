import { Link } from "react-router-dom";
import "../../styles/section-label.css";

interface Props {
    id: string;
    label: string;
    showViewAll?: boolean;
    variant?: "section" | "subsection";
}

export function SectionLabel({
    id,
    label,
    showViewAll = false,
    variant = "section",
}: Props) {
    return (
        <div id={id} className={`section-label section-label--${variant}`}>
            <div className="section-label__left">
                <span className="section-label__title">
                    <span className="section-label__hash">#</span>
                    {label}
                </span>
                <hr className="section-label__line" />
            </div>
            {showViewAll && variant === "section" && (
                <Link to="/works" className="section-label__viewall">
                    View all ~~&gt;
                </Link>
            )}
        </div>
    );
}
