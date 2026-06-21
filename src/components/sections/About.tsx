import { SectionLabel } from "../ui/SectionLabel";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import photo from "/assets/photo.webp";
import "../../styles/about.css";

function DotGrid({
    x,
    y,
    cols,
    rows,
    gapX,
    gapY,
}: {
    x: number;
    y: number;
    cols: number;
    rows: number;
    gapX: number;
    gapY: number;
}) {
    return (
        <>
            {Array.from({ length: rows * cols }, (_, i) => (
                <circle
                    key={i}
                    cx={x + (i % cols) * gapX}
                    cy={y + Math.floor(i / cols) * gapY}
                    r="2"
                    fill="#ABB2BF"
                />
            ))}
        </>
    );
}

function AboutDeco() {
    return (
        <svg
            width="327"
            height="276"
            viewBox="0 0 327 276"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <DotGrid x={2} y={2} cols={5} rows={5} gapX={20} gapY={20} />
            <DotGrid x={225} y={222} cols={5} rows={4} gapX={25} gapY={17.33} />
        </svg>
    );
}

export function About() {
    const { t } = useTranslation();

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            id="about"
        >
            <SectionLabel id="about" label={t("about.section_label")} />

            <div className="about-layout">
                <div className="about-text">
                    <p className="about-greeting">{t("about.greeting")}</p>
                    <p className="about-desc">{t("about.bio_1")}</p>
                    <p className="about-desc">{t("about.bio_2")}</p>
                    <a href="#contact" className="btn btn-outline">
                        {t("about.get_in_touch")}
                    </a>
                </div>

                <div className="about-visual">
                    <div className="about-photo-frame">
                        <AboutDeco />
                        <img src={photo} alt="Adrián" className="about-photo" />
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
