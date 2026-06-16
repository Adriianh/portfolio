import { Hero } from "./Hero";
import { Ticker } from "../layout/Ticker";
import { Projects } from "./Projects";
import { About } from "./About";
import { Skills } from "./Skills";
import { Contacts } from "./Contacts";
import { Footer } from "../layout/Footer";

export function Home() {
    return (
        <>
            <Hero />
            <Ticker />
            <Projects />
            <About />
            <Skills />
            <Contacts />
            <Footer />
        </>
    );
}
