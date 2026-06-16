import { SectionLabel } from "../ui/SectionLabel";
import { MdWavingHand, MdEmail } from "react-icons/md";
import { FaLinkedin, FaGithub, FaTwitter, FaDiscord } from "react-icons/fa";
import "../../styles/contacts.css";

const items = [
    { label: "Email", value: "adriianh@proton.me", icon: MdEmail },
    { label: "LinkedIn", value: "linkedin.com/in/adriianh", icon: FaLinkedin },
    { label: "GitHub", value: "github.com/adriianh", icon: FaGithub },
    { label: "Twitter", value: "twitter.com/adriiianhh", icon: FaTwitter },
    { label: "Discord", value: "adriiianhh", icon: FaDiscord },
];

export function Contacts() {
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
                        tech, or just want to say hi <MdWavingHand />, feel free
                        to drop me a message.
                    </p>
                </div>

                <div className="contact-card">
                    {items.map(({ label, value, icon: Icon }) => (
                        <div key={label} className="contact-row">
                            <Icon className="contact-icon" />
                            <div>
                                <p className="contact-label">{label}</p>
                                <p className="contact-value">{value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
