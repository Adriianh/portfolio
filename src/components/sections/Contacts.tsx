import { useState } from "react";
import { SectionLabel } from "../ui/SectionLabel";
import { MdEmail } from "react-icons/md";
import { FaLinkedin, FaGithub, FaTwitter, FaDiscord } from "react-icons/fa";
import "../../styles/contacts.css";

type ContactItem = {
    label: string;
    value: string;
    icon: React.ComponentType;
    href: string | null; // null = copy to clipboard
};

const items: ContactItem[] = [
    { label: "Email", value: "adriianh@proton.me", icon: MdEmail, href: "mailto:adriianh@proton.me" },
    { label: "LinkedIn", value: "linkedin.com/in/adriianh", icon: FaLinkedin, href: "https://linkedin.com/in/adriianh" },
    { label: "GitHub", value: "github.com/adriianh", icon: FaGithub, href: "https://github.com/adriianh" },
    { label: "Twitter", value: "twitter.com/adriiianhh", icon: FaTwitter, href: "https://twitter.com/adriiianhh" },
    { label: "Discord", value: "adriiianhh", icon: FaDiscord, href: null },
];

export function Contacts() {
    const [copied, setCopied] = useState(false);

    function handleClick(item: ContactItem) {
        if (item.href) {
            window.open(item.href, "_blank", "noopener,noreferrer");
        } else {
            navigator.clipboard.writeText(item.value).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        }
    }

    return (
        <section id="contact">
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
                            onClick={() => handleClick(item)}
                            title={
                                item.href
                                    ? `Open ${item.label}`
                                    : "Copy Discord username"
                            }
                        >
                            <item.icon />
                            <div>
                                <p className="contact-label">{item.label}</p>
                                <p className="contact-value">{item.value}</p>
                            </div>
                        </button>
                    ))}
                </div>

                {copied && (
                    <div className="contact-toast">discord username copied!</div>
                )}
            </div>
        </section>
    );
}
