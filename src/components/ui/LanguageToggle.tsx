import { useTranslation } from "react-i18next";

export function LanguageToggle() {
    const { i18n } = useTranslation();

    function toggleLanguage() {
        const next = i18n.language.startsWith("es") ? "en" : "es";
        i18n.changeLanguage(next);
    }

    return (
        <button
            className="lang-toggle"
            onClick={toggleLanguage}
            aria-label={`Switch to ${i18n.language.startsWith("es") ? "English" : "Spanish"}`}
        >
            {i18n.language.startsWith("es") ? "EN" : "ES"}
        </button>
    );
}
