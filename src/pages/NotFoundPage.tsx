import { Link } from "react-router-dom";
import { SectionLabel } from "../components/ui/SectionLabel";
import { motion } from "framer-motion";

export function NotFoundPage() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="not-found"
        >
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
        </motion.section>
    );
}
