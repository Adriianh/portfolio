import { useTheme } from "../../hooks/useTheme";
import "../styles/Navbar.css";

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
                className="toggle-btn"
            >
                {theme === "light" ? (
                    <svg
                        viewBox="0 0 36 36"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="img"
                        fill="#000000"
                    >
                        <g>
                            <path
                                fill="#FFAC33"
                                d="M16 2s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2V2zm18 14s2 0 2 2s-2 2-2 2h-2s-2 0-2-2s2-2 2-2h2zM4 16s2 0 2 2s-2 2-2 2H2s-2 0-2-2s2-2 2-2h2zm5.121-8.707s1.414 1.414 0 2.828s-2.828 0-2.828 0L4.878 8.708s-1.414-1.414 0-2.829c1.415-1.414 2.829 0 2.829 0l1.414 1.414zm21 21s1.414 1.414 0 2.828s-2.828 0-2.828 0l-1.414-1.414s-1.414-1.414 0-2.828s2.828 0 2.828 0l1.414 1.414zm-.413-18.172s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828l-1.414 1.414zm-21 21s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828l-1.414 1.414zM16 32s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2v-2z"
                            />
                            <circle fill="#FFAC33" cx="18" cy="18" r="10" />
                        </g>
                    </svg>
                ) : (
                    <svg
                        viewBox="0 0 36 36"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="img"
                        fill="#000000"
                    >
                        <g>
                            <circle fill="#66757F" cx="18" cy="18" r="18" />
                            <g fill="#5B6876">
                                <circle cx="10.5" cy="8.5" r="3.5" />
                                <circle cx="20" cy="16" r="3" />
                                <circle cx="21.5" cy="27.5" r="3.5" />
                                <circle cx="21" cy="6" r="2" />
                                <circle cx="3" cy="18" r="1" />
                                <circle cx="30" cy="9" r="1" />
                                <circle cx="15" cy="31" r="1" />
                                <circle cx="32" cy="19" r="2" />
                                <circle cx="10" cy="23" r="2" />
                            </g>
                        </g>
                    </svg>
                )}
            </button>
        </nav>
    );
}
