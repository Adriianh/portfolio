import { Navbar } from "./components/layout/Navbar";
import { Hero } from "./components/sections/Hero";
import { Ticker } from "./components/layout/Ticker";
import { Projects } from "./components/sections/Projects";
import { SocialSidebar } from "./components/layout/SocialSidebar";
import { Skills } from "./components/sections/Skills";
import { About } from "./components/sections/About";
import { Contacts } from "./components/sections/Contacts";
import { Footer } from "./components/layout/Footer";

export default function App() {
    return (
        <main className="main-content">
            <SocialSidebar />
            <Navbar />
            <Hero />
            <Ticker />
            <Projects />
            <Skills />
            <About />
            <Contacts />
            <Footer />
        </main>
    );
}
