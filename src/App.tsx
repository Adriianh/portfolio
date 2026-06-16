import { HashRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { SocialSidebar } from "./components/layout/SocialSidebar";
import { Home } from "./components/sections/Home";
import { Works } from "./components/sections/Works";

export default function App() {
    return (
        <HashRouter>
            <main className="main-content">
                <SocialSidebar />
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/works" element={<Works />} />
                </Routes>
            </main>
        </HashRouter>
    );
}
