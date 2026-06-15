import "../../styles/section-label.css";

interface Props {
    id: string;
    label: string;
    showViewAll?: boolean;
}

export function SectionLabel({ id, label, showViewAll = false }: Props) {
    return (
        <div id={id} className="section-label">
            <div className="section-label__left">
                <span className="section-label__title">
                    <span className="section-label__hash">#</span>
                    {label}
                </span>
                <hr className="section-label__line" />
            </div>
            {showViewAll && (
                <a href="#" className="section-label__viewall">
                    View all ~~&gt;
                </a>
            )}
        </div>
    );
}
