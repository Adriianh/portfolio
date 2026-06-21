import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "../ui/LanguageToggle";
import "../../styles/navbar.css";

export function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    const { t } = useTranslation();

    function closeMenu() {
        setMenuOpen(false);
    }

    return (
        <nav>
            <Link to="/" className="logo">
                {t("nav.logo")}
            </Link>
            <div className={`nav-links ${menuOpen ? "open" : ""}`}>
                <Link to="/" onClick={closeMenu}>
                    {t("nav.home")}
                </Link>
                <Link to="/works" onClick={closeMenu}>
                    {t("nav.works")}
                </Link>
                <Link to="/about" onClick={closeMenu}>
                    {t("nav.about")}
                </Link>
                <Link to="/skills" onClick={closeMenu}>
                    {t("nav.skills")}
                </Link>
                <Link to="/contact" onClick={closeMenu}>
                    {t("nav.contact")}
                </Link>
            </div>
            <div className="nav-actions">
                <LanguageToggle />
                <button
                    onClick={toggleTheme}
                    aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                    className={`theme-switch ${theme}`}
                >
                    <span className="theme-switch-thumb" />
                </button>
                <button
                    className={`hamburger ${menuOpen ? "open" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>
        </nav>
    );
}
