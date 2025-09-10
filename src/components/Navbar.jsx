import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-200 dark:border-white/10 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        <a href="#home" className="font-bold text-xl text-indigo-600">
          Anthony Samson
        </a>
        <div className="flex gap-6 text-sm font-medium">
          <a href="#experience" className="hover:text-indigo-500">Experience</a>
          <a href="#projects" className="hover:text-indigo-500">Projects</a>
          <a href="#writing" className="hover:text-indigo-500">Writing</a>
          <a href="#contact" className="hover:text-indigo-500">Contact</a>
          <button
            onClick={() => setDark(!dark)}
            className="ml-4 p-2 rounded-full bg-slate-200 dark:bg-slate-700"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
