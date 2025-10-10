import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export default function App() {
  return (
    <div className="bg-black dark:bg-slate-900 text-slate-900 dark:text-white min-h-screen">
      <Navbar />
      <main className="pt-20">
        <Hero />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
