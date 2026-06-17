import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import "../../styles/navbar.css";

export function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);

    function closeMenu() {
        setMenuOpen(false);
    }

    return (
        <nav>
            <Link to="/" className="logo">
                AF
            </Link>
            <div className={`nav-links ${menuOpen ? "open" : ""}`}>
                <Link to="/" onClick={closeMenu}>home</Link>
                <Link to="/works" onClick={closeMenu}>works</Link>
                <Link to="/about" onClick={closeMenu}>about</Link>
                <Link to="/skills" onClick={closeMenu}>skills</Link>
                <Link to="/contact" onClick={closeMenu}>contact</Link>
            </div>
            <div className="nav-actions">
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
