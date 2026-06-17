import { HashRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { SocialSidebar } from "./components/layout/SocialSidebar";
import { Home } from "./components/sections/Home";
import { Works } from "./components/sections/Works";
import { AboutPage } from "./pages/AboutPage";
import { SkillsPage } from "./pages/SkillsPage";
import { ContactPage } from "./pages/ContactPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { BubbleBackground } from "./components/ui/BubbleBackground";

export default function App() {
    return (
        <HashRouter>
            <main className="main-content">
                <BubbleBackground />
                <SocialSidebar />
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/works" element={<Works />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/skills" element={<SkillsPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
        </HashRouter>
    );
}
