import { WaveBackground } from "../ui/WaveBackground";
import { Link } from "react-router-dom";
import { useTypingEffect } from "../../hooks/useTypingEffect";
import { motion } from "framer-motion";
import photo from "/assets/photo.png";
import "../../styles/hero.css";

export function Hero() {
    const role = useTypingEffect(
        ["software developer", "open source enthusiast", "backend developer"],
        80,
        150,
    );

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            id="home"
        >
            <WaveBackground />
            <div className="hero-content">
                <p className="hero-greeting">Hello, I'm</p>
                <h1>
                    Adrián <span>Fúnez</span>
                </h1>
                <p className="hero-role">{role}</p>
                <div className="hero-actions">
                    <Link to="/works" className="btn btn-primary">
                        see my work
                    </Link>
                    <a href="#contact" className="btn btn-outline">
                        get in touch
                    </a>
                </div>
            </div>
            <div className="hero-visual">
                <div className="dot-grid">
                    <img
                        className="hero-photo"
                        src={photo}
                        alt="Adrián Fúnez"
                    />
                </div>
            </div>
        </motion.section>
    );
}
