import { useTheme } from "../../hooks/useTheme";
import "../../styles/navbar.css";

export function Navbar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav>
            <span className="logo">AF</span> {/* logo */}
            <div className="nav-links">
                <a href="#home">home</a>
                <a href="#works">works</a>
                <a href="#about">about</a>
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
