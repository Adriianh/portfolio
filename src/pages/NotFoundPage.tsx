import { Link } from "react-router-dom";
import { SectionLabel } from "../components/ui/SectionLabel";

export function NotFoundPage() {
    return (
        <section className="not-found">
            <SectionLabel id="404" label="404" />

            <div className="not-found-content">
                <span className="not-found-code">404</span>
                <p className="not-found-desc">
                    page not found — the link you followed doesn't exist
                </p>
                <Link to="/" className="btn btn-outline">
                    go home →
                </Link>
            </div>
        </section>
    );
}
