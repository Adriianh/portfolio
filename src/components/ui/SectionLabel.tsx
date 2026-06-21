import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
    const { t } = useTranslation();

    return (
        <div id={id} className={`section-label section-label--${variant}`}>
            <div className="section-label__left">
                <span className="section-label__title">
                    <span className="section-label__hash">
                        {t("section_label.hash")}
                    </span>
                    {label}
                </span>
                <hr className="section-label__line" />
            </div>
            {showViewAll && variant === "section" && (
                <Link to="/works" className="section-label__viewall">
                    {t("section_label.view_all")}
                </Link>
            )}
        </div>
    );
}
