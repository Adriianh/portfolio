import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SectionLabel } from "../ui/SectionLabel";
import { MdEmail } from "react-icons/md";
import { FaLinkedin, FaGithub, FaTwitter, FaDiscord } from "react-icons/fa";
import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import "../../styles/contacts.css";

type ContactItem = {
    label: string;
    value: string;
    icon: IconType;
    href: string | null;
};

const items: ContactItem[] = [
    {
        label: "Email",
        value: "adriianh@proton.me",
        icon: MdEmail,
        href: "mailto:adriianh@proton.me",
    },
    {
        label: "LinkedIn",
        value: "linkedin.com/in/adriianh",
        icon: FaLinkedin,
        href: "https://linkedin.com/in/adriianh",
    },
    {
        label: "GitHub",
        value: "github.com/adriianh",
        icon: FaGithub,
        href: "https://github.com/adriianh",
    },
    {
        label: "Twitter",
        value: "twitter.com/adriiianhh",
        icon: FaTwitter,
        href: "https://twitter.com/adriiianhh",
    },
    { label: "Discord", value: "adriiianhh", icon: FaDiscord, href: null },
];

export function Contacts() {
    const [copied, setCopied] = useState(false);
    const { t } = useTranslation();

    function copyToClipboard(text: string) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
        } else {
            fallbackCopy(text);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    function fallbackCopy(text: string) {
        const input = document.createElement("input");
        input.value = text;
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
    }

    function handleClick(item: ContactItem) {
        if (item.href) {
            window.open(item.href, "_blank", "noopener,noreferrer");
        } else {
            copyToClipboard(item.value);
        }
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            id="contact"
        >
            <SectionLabel id="contact" label={t("contacts.section_label")} />

            <div className="contact-layout">
                <div className="contact-text">
                    <p className="contact-desc">{t("contacts.desc_1")}</p>
                    <p className="contact-desc">{t("contacts.desc_2")}</p>
                </div>

                <div className="contact-card">
                    {items.map((item) => (
                        <button
                            key={item.label}
                            className="contact-row contact-btn"
                            data-label={item.label}
                            onClick={() => handleClick(item)}
                            title={
                                item.href
                                    ? t("contacts.open_label", {
                                          label: item.label,
                                      })
                                    : t("contacts.copy_discord")
                            }
                        >
                            <span className="contact-icon">
                                <item.icon />
                            </span>
                            <div>
                                <p className="contact-label">{item.label}</p>
                                <p className="contact-value">{item.value}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {copied && (
                <div className="contact-toast">
                    {t("contacts.discord_copied")}
                </div>
            )}
        </motion.section>
    );
}
