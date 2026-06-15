import "../../styles/social-sidebar.css";
import { FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";

export function SocialSidebar() {
    return (
        <aside className="social-sidebar">
            <div className="social-sidebar__icons">
                <a href="..." target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                </a>
                <a href="..." target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                </a>
                <a href="..." target="_blank" rel="noopener noreferrer">
                    <FaDiscord />
                </a>
            </div>
        </aside>
    );
}
