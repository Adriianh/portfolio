import { useState } from "react";
import { SectionLabel } from "../components/ui/SectionLabel";
import { MdWavingHand, MdEmail } from "react-icons/md";
import { FaLinkedin, FaGithub, FaTwitter, FaDiscord } from "react-icons/fa";
import "../styles/contacts.css";

const items = [
    { label: "Email", value: "adriianh@proton.me", icon: MdEmail },
    { label: "LinkedIn", value: "linkedin.com/in/adriianh", icon: FaLinkedin },
    { label: "GitHub", value: "github.com/adriianh", icon: FaGithub },
    { label: "Twitter", value: "twitter.com/adriiianhh", icon: FaTwitter },
    { label: "Discord", value: "adriiianhh", icon: FaDiscord },
];

const faqs = [
    {
        q: "Are you available for freelance work?",
        a: "Yes! I'm currently open to freelance projects and collaborations. Send me an email and let's talk.",
    },
    {
        q: "What's your preferred tech stack?",
        a: "I'm most productive with TypeScript, React, and Node.js, but I'm always exploring new technologies.",
    },
    {
        q: "Do you contribute to open source?",
        a: "Absolutely. I believe in giving back to the community and regularly contribute to projects I use.",
    },
    {
        q: "What's the best way to reach you?",
        a: "Email and discord are usually the best ways to get in touch. I'm pretty responsive on both platforms.",
    },
];

export function ContactPage() {
    const [sent, setSent] = useState(false);

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setSent(true);
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
                        tech, or just want to say hi <MdWavingHand />, feel free
                        to drop me a message.
                    </p>

                    <div className="contact-availability">
                        <span className="availability-dot" />
                        <span className="availability-text">
                            available for freelance & full-time
                        </span>
                    </div>
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

            <div className="contact-form-section">
                <h3 className="contact-subtitle">/ send a message</h3>
                {sent ? (
                    <div className="contact-form-sent">
                        <p>
                            thanks for reaching out! i'll get back to you soon.
                        </p>
                    </div>
                ) : (
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <input
                                type="text"
                                placeholder="name"
                                className="form-input"
                                required
                            />
                            <input
                                type="email"
                                placeholder="email"
                                className="form-input"
                                required
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="subject"
                            className="form-input"
                            required
                        />
                        <textarea
                            placeholder="message"
                            className="form-textarea"
                            rows={5}
                            required
                        />
                        <button type="submit" className="btn btn-primary">
                            send message →
                        </button>
                    </form>
                )}
            </div>

            <div className="contact-faq">
                <h3 className="contact-subtitle">/ faq</h3>
                <div className="faq-list">
                    {faqs.map((faq) => (
                        <div key={faq.q} className="faq-item">
                            <p className="faq-question">{faq.q}</p>
                            <p className="faq-answer">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
