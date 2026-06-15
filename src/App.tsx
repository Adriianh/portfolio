import { Navbar } from "./components/layout/Navbar";
import { Hero } from "./components/sections/Hero";
import { Ticker } from "./components/layout/Ticker";
import { Projects } from "./components/sections/Projects";
import { SocialSidebar } from "./components/layout/SocialSidebar";

export default function App() {
    return (
        <main className="main-content">
            <SocialSidebar />
            <Navbar />
            <Hero />
            <Ticker />
            <Projects />
        </main>
    );
}
