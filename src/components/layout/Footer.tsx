import { FaGithub, FaDiscord } from "react-icons/fa";
import { SiFigma } from "react-icons/si";
import { useTranslation } from "react-i18next";
import "../../styles/footer.css";

export function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="footer">
            <div className="footer-row">
                <div className="footer-text">
                    <div className="footer-name">
                        {t("footer.name")}
                        <a
                            href="mailto:adriianh@proton.me"
                            className="footer-email"
                        >
                            {t("footer.email")}
                        </a>
                    </div>
                    <p>
                        {t("footer.made_with")}{" "}
                        <span className="heart">{t("footer.heart")}</span>{" "}
                        {t("footer.by")}
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
            <p className="footer-copy">{t("footer.copyright")}</p>
        </footer>
    );
}
