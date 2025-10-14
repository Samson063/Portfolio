import { useState, useEffect, useRef } from "react";
import { ArrowRight, Mail } from "lucide-react";
import gsap from "gsap";

export default function Hero() {
  const skills = [
    "React", "JavaScript", "Go", "Tailwind", "Git & Github", "Graphics Design", "Video Editing"
  ];

  const myName = "Anthony Samson";
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);

  const sectionRef = useRef(null);
  const textContentRef = useRef(null);
  const skillsRef = useRef([]);

  // Typing effect
  useEffect(() => {
    if (index < myName.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + myName[index]);
        setIndex(index + 1);
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [index, myName]);

  // GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 0.5 }
      );

      gsap.fromTo(textContentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0, delay: 0.2 }
      );

     

      gsap.fromTo(skillsRef.current,
        { opacity: 0, y: 10 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.4, 
          stagger: 0.1,
          delay: 0.8
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const addToSkillsRef = (el) => {
    if (el && !skillsRef.current.includes(el)) {
      skillsRef.current.push(el);
    }
  };

  return (
    <section 
      id="home" 
      className="px-4 pt-20 flex items-center justify-center"
      ref={sectionRef}
    >
      <div className="flex items-center justify-center flex-col">
        <div 
          ref={textContentRef}
          className="flex justify-center items-start flex-col"
        >
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight md:text-6xl text-gray-400 font-mono">
            Hi, I'm{" "}
            <span className="text-4xl md:text-6xl font-extrabold text-gray-300 font-mono">
              {displayed}
              <span className="animate-pulse">|</span>
            </span>
          </h1>
          <h2 className="text-gray-400 text-lg font-semibold">Frontend Engineer</h2>
           <p className="text-gray-300 dark:text-slate-300 font-mono">
            Software Developer • Frontend Engineer • Computer Science Student
          </p>
          <p className="mt-4 max-w-5xl text-base md:text-lg text-gray-400 dark:text-slate-300 font-mono">
            A Poised, professional, and product-oriented frontEnd Engineer  with experience working in a variety of fast-paced, dynamic, and ever-changing settings. 
            Experience includes building and designing beautiful User Interfaces, and developing high-quality in-house tools to ease the development, management, 
            and scaling of products.
{" "}
            <a href="https://becreativeux.com" className="underline decoration-dotted hover:text-blue-500">
              Becreativeux.com
            </a>{" "}
            and{" "}
            <a href="https://jbrandyentertainment.com" className="underline decoration-dotted hover:text-blue-500">
              Jbrandyentertainment.com
            </a>.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#projects" className="rounded-2xl bg-gray-800 px-5 py-3 text-gray-300 flex items-center hover:text-gray-100">
              View Projects <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a href="#contact" className="rounded-2xl border border-gray-400 text-gray-400 px-5 py-3 flex items-center">
              Contact <Mail className="ml-2 h-4 w-4 text-gray-400" />
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span 
                key={skill} 
                ref={addToSkillsRef}
                className="px-3 py-1 bg-gray-800 rounded-xl text-sm text-gray-300 cursor-pointer hover:bg-gray-600 dark:hover:bg-indigo-900 transition-colors"
                onMouseEnter={(e) => {
                  gsap.to(e.target, { 
                    scale: 1.05, 
                    duration: 0.2,
                    ease: "power2.out"
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.target, { 
                    scale: 1, 
                    duration: 0.2,
                    ease: "power2.out"
                  });
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}