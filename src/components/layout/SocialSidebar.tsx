import "../../styles/social-sidebar.css";
import { FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function SocialSidebar() {
    const [copied, setCopied] = useState(false);
    const { t } = useTranslation();

    function copyDiscord() {
        if (navigator.clipboard) {
            navigator.clipboard
                .writeText("adriianh")
                .catch(() => fallbackCopy());
        } else {
            fallbackCopy();
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }

    function fallbackCopy() {
        const input = document.createElement("input");
        input.value = "adriianh";
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
    }

    return (
        <aside className="social-sidebar">
            {copied && (
                <span className="social-sidebar__toast">
                    {t("social.copied")}
                </span>
            )}
            <div className="social-sidebar__icons">
                <a
                    href="https://github.com/adriianh"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaGithub />
                </a>
                <a
                    href="https://www.linkedin.com/in/adriianh/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaLinkedin />
                </a>
                <button
                    className="social-sidebar__icon-btn"
                    onClick={copyDiscord}
                    title={t("social.copy_discord")}
                >
                    <FaDiscord />
                </button>
            </div>
        </aside>
    );
}
