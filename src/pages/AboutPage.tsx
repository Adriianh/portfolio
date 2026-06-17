import { Link } from "react-router-dom";
import { SectionLabel } from "../components/ui/SectionLabel";
import photo from "/assets/photo.png";
import "../styles/about.css";

const timeline = [
    {
        year: "2025",
        title: "Software Developer",
        subtitle: "Active freelance & open source",
        desc: "Building full-stack applications. Focused on clean architecture and maintainable systems.",
    },
    {
        year: "2024",
        title: "Deep Dive into Software Development",
        subtitle: "Backend, frontend & systems design",
        desc: "Started taking development seriously — explored backend architecture, frontend frameworks, and system design principles.",
    },
    {
        year: "2023",
        title: "Programming as a Hobby",
        subtitle: "First real projects",
        desc: "Began building personal projects and exploring different areas of software development.",
    },
    {
        year: "2022",
        title: "Started Programming",
        subtitle: "The beginning",
        desc: "Wrote my first lines of code out of curiosity. Started with a simple Minecraft plugin and immediately fell in love with the problem-solving aspect.",
    },
];

const funFacts = [
    "I can debug code faster after a good cup of coffee",
    "I'm convinced that tabs > spaces (just kidding... or am I?)",
    "I've spent more time configuring my editor than actually coding",
    "My browser usually has 30+ tabs open — all of which are 'important'",
    "I once fixed a bug by adding a semicolon. True story.",
    "I believe the best code is the code you don't have to write",
];

const hobbies = [
    { emoji: "⚡", label: "Electronics & circuit design" },
    { emoji: "🚲️", label: "Riding around the city" },
    { emoji: "📚", label: "Reading sci-fi & tech blogs" },
    { emoji: "🎮", label: "Gaming (when not coding)" },
    { emoji: "🎵", label: "Listening to any music" },
    { emoji: "🍳", label: "Cooking (and eating) new recipes" },
    { emoji: "🪴", label: "Taking care of my plants" },
];

function DotGrid({
    x,
    y,
    cols,
    rows,
    gapX,
    gapY,
}: {
    x: number;
    y: number;
    cols: number;
    rows: number;
    gapX: number;
    gapY: number;
}) {
    return (
        <>
            {Array.from({ length: rows * cols }, (_, i) => (
                <circle
                    key={i}
                    cx={x + (i % cols) * gapX}
                    cy={y + Math.floor(i / cols) * gapY}
                    r="2"
                    fill="#ABB2BF"
                />
            ))}
        </>
    );
}

function AboutDeco() {
    return (
        <svg
            width="327"
            height="276"
            viewBox="0 0 327 276"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <DotGrid x={2} y={2} cols={5} rows={5} gapX={20} gapY={20} />
            <DotGrid x={225} y={222} cols={5} rows={4} gapX={25} gapY={17.33} />
        </svg>
    );
}

export function AboutPage() {
    return (
        <section id="about">
            <SectionLabel id="about" label="about" />

            <div className="about-layout">
                <div className="about-text">
                    <p className="about-greeting">Hello, I'm Adrián</p>
                    <p className="about-desc">
                        I'm a software developer and electronic engineering
                        student based in Guatemala. I started programming
                        casually 3 years ago, and it became my main hobby about
                        a year ago.
                    </p>
                    <p className="about-desc">
                        I'm passionate about open source, clean architecture,
                        and building maintainable systems. Outside of code, I
                        enjoy electronics and circuit design — which pairs
                        nicely with my software engineering mindset.
                    </p>
                    <Link to="/contact" className="btn btn-outline">
                        get in touch →
                    </Link>
                </div>

                <div className="about-visual">
                    <div className="about-photo-frame">
                        <AboutDeco />
                        <img src={photo} alt="Adrián" className="about-photo" />
                    </div>
                </div>
            </div>

            <div className="about-timeline">
                <h3 className="about-subtitle">/ timeline</h3>
                <div className="timeline-list">
                    {timeline.map((item) => (
                        <div key={item.year} className="timeline-item">
                            <span className="timeline-year">{item.year}</span>
                            <div className="timeline-content">
                                <h4 className="timeline-title">{item.title}</h4>
                                <p className="timeline-subtitle">
                                    {item.subtitle}
                                </p>
                                <p className="timeline-desc">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="about-facts">
                <h3 className="about-subtitle">/ fun facts</h3>
                <div className="facts-grid">
                    {funFacts.map((fact, i) => (
                        <div key={i} className="fact-card">
                            <span className="fact-icon">*</span>
                            <p className="fact-text">{fact}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="about-hobbies">
                <h3 className="about-subtitle">/ when I'm not coding</h3>
                <div className="hobbies-grid">
                    {hobbies.map((hobby) => (
                        <div key={hobby.label} className="hobby-card">
                            <span className="hobby-emoji">{hobby.emoji}</span>
                            <span className="hobby-label">{hobby.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
