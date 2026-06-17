import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "./components/layout/Navbar";
import { SocialSidebar } from "./components/layout/SocialSidebar";
import { Home } from "./components/sections/Home";
import { Works } from "./components/sections/Works";
import { AboutPage } from "./pages/AboutPage";
import { SkillsPage } from "./pages/SkillsPage";
import { ContactPage } from "./pages/ContactPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { BubbleBackground } from "./components/ui/BubbleBackground";
import { BackToTop } from "./components/ui/BackToTop";

function AppRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/works" element={<Works />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/skills" element={<SkillsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </AnimatePresence>
    );
}

export default function App() {
    return (
        <HashRouter>
            <BackToTop />
            <main className="main-content">
                <BubbleBackground />
                <SocialSidebar />
                <Navbar />
                <AppRoutes />
            </main>
        </HashRouter>
    );
}
