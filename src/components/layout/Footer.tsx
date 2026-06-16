import { FaGithub, FaDiscord } from "react-icons/fa";
import { SiFigma } from "react-icons/si";
import "../../styles/footer.css";

export function Footer() {
    return (
        <footer className="footer">
            <div className="footer-row">
                <div className="footer-text">
                    <div className="footer-name">
                        Adrián Fúnez
                        <a
                            href="mailto:adriianh@proton.me"
                            className="footer-email"
                        >
                            adriianh@proton.me
                        </a>
                    </div>
                    <p>
                        Made with <span className="heart">♥</span> by Adrián
                        Fúnez
                    </p>
                </div>
                <div className="footer-socials">
                    <a
                        href="https://github.com/adriianh"
                        target="_blank"
                        aria-label="GitHub"
                    >
                        <FaGithub />
                    </a>
                    <a
                        href="https://figma.com/@adriianh"
                        target="_blank"
                        aria-label="Figma"
                    >
                        <SiFigma />
                    </a>
                    <a
                        href="https://discord.com/users/adriiianhh"
                        target="_blank"
                        aria-label="Discord"
                    >
                        <FaDiscord />
                    </a>
                </div>
            </div>
            <p className="footer-copy">© 2026 Adrián Fúnez</p>
        </footer>
    );
}
