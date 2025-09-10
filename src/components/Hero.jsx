import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import ProfileCard from "./ProfileCard";


export default function Hero() {

  const skills = [
  "React", "JavaScript", "Node.js", "Go", "PostgreSQL",
  "Tailwind", "Framer Motion", "UI/UX Design", "Video Editing"
  ];

  const myName = "Anthony Samson";
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);

  useEffect (() => {
    if (index < myName.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + myName[index]);
        setIndex(index + 1);
      }, 150);
      return () => clearTimeout(timeout);
    }
 }, [index, myName]);

  return (
    <section id="home" className="relative mx-auto px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-center"
      >
        <div>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight md:text-6xl">
            Hi, I’m{" "}
           <h1 className="text-4xl md:text-6xl font-extrabold text-indigo-600 font-mono">
            {displayed}
            <span className="animate-pulse">|</span>
          </h1>
            — Frontend Engineer & UI Builder
          </h1>
          <p className="mt-4 max-w-2xl text-base md:text-lg text-slate-600 dark:text-slate-300">
            I design and build fast, accessible interfaces, mentor creatives at
            BeCreative, and explore backend development with Go & Node.js.
            Recently, I worked on{" "}
            <a href="https://becreativeux.com" className="underline decoration-dotted hover:text-indigo-500">
              Becreativeux.com
            </a>{" "}
            and{" "}
            <a href="https://jbrandyentertainment.com" className="underline decoration-dotted hover:text-indigo-500">
              Jbrandyentertainment.com
            </a>.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#projects" className="rounded-2xl bg-indigo-600 px-5 py-3 text-white flex items-center">
              View Projects <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a href="#contact" className="rounded-2xl border px-5 py-3 flex items-center">
              Contact <Mail className="ml-2 h-4 w-4" />
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded-xl text-sm">
                {s}
              </span>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
        </motion.div>
      </motion.div>
      <ProfileCard />
    </section>
  );
}
