import { Link } from "react-router-dom";
import { SectionLabel } from "../components/ui/SectionLabel";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import photo from "/assets/photo.webp";
import "../styles/about.css";

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

export function AboutPage() {
    const { t } = useTranslation();

    interface TimelineItem {
        year: string;
        title: string;
        subtitle: string;
        desc: string;
    }

    const timeline = t("about.timeline_items", {
        returnObjects: true,
    }) as TimelineItem[];

    const funFacts = t("about.fun_facts_list", {
        returnObjects: true,
    }) as string[];

    const hobbies = t("about.hobbies_list", {
        returnObjects: true,
    }) as string[];

    const hobbyEmojis = ["⚡", "🚲️", "📚", "🎮", "🎵", "🍳", "🪴"];

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
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
                    <Link to="/contact" className="btn btn-outline">
                        {t("about.get_in_touch")}
                    </Link>
                </div>

                <div className="about-visual">
                    <div className="about-photo-frame">
                        <AboutDeco />
                        <img src={photo} alt="Adrián" className="about-photo" />
                    </div>
                </div>
            </div>

            <div className="about-timeline">
                <h3 className="about-subtitle">{t("about.timeline")}</h3>
                <div className="timeline-list">
                    {timeline.map((item) => (
                        <div key={item.year} className="timeline-item">
                            <span className="timeline-year">{item.year}</span>
                            <div className="timeline-content">
                                <h4 className="timeline-title">{item.title}</h4>
                                <p className="timeline-subtitle">
                                    {item.subtitle}
                                </p>
                                <p className="timeline-desc">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="about-facts">
                <h3 className="about-subtitle">{t("about.fun_facts")}</h3>
                <div className="facts-grid">
                    {funFacts.map((fact, i) => (
                        <div key={i} className="fact-card">
                            <span className="fact-icon">*</span>
                            <p className="fact-text">{fact}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="about-hobbies">
                <h3 className="about-subtitle">{t("about.hobbies")}</h3>
                <div className="hobbies-grid">
                    {hobbies.map((hobby, i) => (
                        <div key={i} className="hobby-card">
                            <span className="hobby-emoji">
                                {hobbyEmojis[i]}
                            </span>
                            <span className="hobby-label">{hobby}</span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
