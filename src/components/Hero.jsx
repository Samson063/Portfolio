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

  return (
    <section id="home" className="relative mx-auto max-w-6xl px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-center"
      >
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs border-slate-200 bg-white/70 dark:bg-white/5 dark:border-white/10">
            <span className="h-5 w-5 flex items-center justify-center rounded-full bg-indigo-600 text-white dark:bg-indigo-500">
              <Sparkles size={14} />
            </span>
            Building for the web, edge, and community
          </div>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight md:text-6xl">
            Hi, I’m{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-500 bg-clip-text text-transparent">
              Anthony Samson
            </span>{" "}
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
          <ProfileCard />
        </motion.div>
      </motion.div>
    </section>
  );
}
