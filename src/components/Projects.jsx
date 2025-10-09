import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const projects = [
    {
      name: "BeCreativeUX",
      link: "https://becreativeux.com",
      description:
        "Community-driven platform offering mentorship and training in product design, graphic design, and motion design.",
    },
    {
      name: "JBrandy Entertainment",
      link: "https://jbrandyentertainment.com",
      description:
        "Entertainment website built with React and Tailwind, focusing on performance and engaging UI.",
    },
    {
      name: "Service Apartment Platform",
      link: "#",
      description:
        "Ongoing project for real estate listings with interactive booking flows and modern frontend architecture.",
    },
  ];

  const sectionRef = useRef(null);
  const projectsRef = useRef([]);

  const addToProjectsRef = (el) => {
    if (el && !projectsRef.current.includes(el)) {
      projectsRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(".projects-title",
        { 
          opacity: 0,
          y: 50,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "elastic.out(1, 0.8)",
          scrollTrigger: {
            trigger: ".projects-title",
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          }
        }
      );

      // Cards animation with complex entrance
      projectsRef.current.forEach((card, index) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          }
        });

        // Complex staggered animation
        tl.fromTo(card,
          {
            opacity: 0,
            y: 100,
            rotationX: 45,
            scale: 0.7
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 1.5,
            ease: "back.out(1.7)",
            delay: index * 0.2
          }
        )
        .fromTo(card.querySelector(".project-name"),
          {
            opacity: 0,
            x: -50,
            skewX: 15
          },
          {
            opacity: 1,
            x: 0,
            skewX: 0,
            duration: 0.8,
            ease: "power3.out"
          },
          "-=0.5"
        )
        .fromTo(card.querySelector(".project-description"),
          {
            opacity: 0,
            y: 30,
            rotationY: 10
          },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 0.6,
            ease: "power2.out"
          },
          "-=0.3"
        );

        // Magnetic hover effect
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -10,
            scale: 1.02,
            rotationY: 5,
            boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.25)",
            duration: 0.3,
            ease: "power2.out"
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            rotationY: 0,
            boxShadow: "none",
            duration: 0.4,
            ease: "elastic.out(1, 0.8)"
          });
        });
      });

      // Floating background animation
      gsap.to(".floating-bg", {
        y: 30,
        rotation: 180,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="max-w-6xl mx-auto px-4 py-20 relative overflow-hidden">
      {/* Floating background */}
      <div className="floating-bg absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl"></div>
      <div className="floating-bg absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>

      <h2 className="projects-title text-3xl font-bold mb-10 text-center">Projects</h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <a
            key={p.name}
            ref={addToProjectsRef}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl border border-slate-200 dark:border-white/10 p-6 hover:shadow-lg transition-all duration-300 bg-white/5 backdrop-blur-sm transform-style-preserve-3d"
          >
            <h3 className="project-name text-xl font-semibold mb-3 text-white">{p.name}</h3>
            <p className="project-description text-slate-600 dark:text-slate-400 leading-relaxed">
              {p.description}
            </p>
            
            {/* Animated arrow */}
            <div className="mt-4 flex items-center text-indigo-500 text-sm font-medium">
              View Project
              <svg 
                className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}