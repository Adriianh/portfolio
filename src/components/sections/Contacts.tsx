import { useState } from "react";
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
            <SectionLabel id="contact" label="contacts" />

            <div className="contact-layout">
                <div className="contact-text">
                    <p className="contact-desc">
                        I'm interested in freelance work, open source
                        contributions, and full-time roles. If you have an
                        opportunity that you think would be a good fit, please
                        don't hesitate to reach out!
                    </p>
                    <p className="contact-desc">
                        I'm always open to new opportunities and collaborations.
                        Whether you have a project in mind, want to chat about
                        tech, or just feel free to drop me a message.
                    </p>
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
                                    ? `Open ${item.label}`
                                    : "Copy Discord username"
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
                <div className="contact-toast">discord username copied!</div>
            )}
        </motion.section>
    );
}
