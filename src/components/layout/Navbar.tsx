import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import "../../styles/navbar.css";

export function Navbar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav>
            <Link to="/" className="logo">
                AF
            </Link>
            <div className="nav-links">
                <Link to="/">home</Link>
                <Link to="/works">works</Link>
                <a href="#about">about</a>
                <a href="#skills">skills</a>
                <a href="#contact">contact</a>
            </div>
            <button
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                className={`theme-switch ${theme}`}
            >
                <span className="theme-switch-thumb" />
            </button>
        </nav>
    );
}
