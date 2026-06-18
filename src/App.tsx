import { lazy, Suspense } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "./components/layout/Navbar";
import { SocialSidebar } from "./components/layout/SocialSidebar";
import { BubbleBackground } from "./components/ui/BubbleBackground";
import { BackToTop } from "./components/ui/BackToTop";

const Home = lazy(() =>
    import("./components/sections/Home").then((m) => ({ default: m.Home })),
);
const Works = lazy(() =>
    import("./components/sections/Works").then((m) => ({ default: m.Works })),
);
const AboutPage = lazy(() =>
    import("./pages/AboutPage").then((m) => ({ default: m.AboutPage })),
);
const SkillsPage = lazy(() =>
    import("./pages/SkillsPage").then((m) => ({ default: m.SkillsPage })),
);
const ContactPage = lazy(() =>
    import("./pages/ContactPage").then((m) => ({ default: m.ContactPage })),
);
const NotFoundPage = lazy(() =>
    import("./pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })),
);
const ProjectDetailPage = lazy(() =>
    import("./pages/ProjectDetailPage").then((m) => ({
        default: m.ProjectDetailPage,
    })),
);

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
                <Route path="/works/:slug" element={<ProjectDetailPage />} />
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
                <Suspense
                    fallback={<div className="page-loading">Loading...</div>}
                >
                    <AppRoutes />
                </Suspense>
            </main>
        </HashRouter>
    );
}
