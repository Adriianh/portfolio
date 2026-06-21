import { Link } from "react-router-dom";
import { SectionLabel } from "../components/ui/SectionLabel";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function NotFoundPage() {
    const { t } = useTranslation();

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="not-found"
        >
            <SectionLabel id="404" label={t("not_found.title")} />

            <div className="not-found-content">
                <span className="not-found-code">404</span>
                <p className="not-found-desc">{t("not_found.message")}</p>
                <Link to="/" className="btn btn-outline">
                    {t("not_found.go_home")}
                </Link>
            </div>
        </motion.section>
    );
}
