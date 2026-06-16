import { useTypingEffect } from "../../hooks/useTypingEffect";
import photo from "/assets/photo.png";
import "../../styles/hero.css";

export function Hero() {
    const role = useTypingEffect(
        ["software developer", "open source enthusiast", "backend developer"],
        80,
        150,
    );

    return (
        <section id="home">
            <div className="hero-content">
                <p className="hero-greeting">hello i'm</p>
                <h1>
                    Adrián <span>Fúnez</span>
                </h1>
                <p className="hero-role">{role}</p>
                <div className="hero-actions">
                    <a href="#works" className="btn btn-primary">
                        see my work
                    </a>
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
        </section>
    );
}
