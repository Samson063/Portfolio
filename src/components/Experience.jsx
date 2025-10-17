import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const experiences = [
    {
      title: "Frontend Engineer",
      company: "BeCreative",
      date: "2025 – Present",
      description:
        "Building community-driven projects with React and modern web tools.",
    },
    {
      title: "Freelance Software Developer",
      company: "Self-employed",
      date: "2023 – Present",
      description:
        "Built websites including Jbrandyentertainment.com. Focused on performance, accessibility, and beautiful UI design.",
    },
    {
      title: "Computer Science Student",
      company: "BOUESTI",
      date: "Ongoing",
      description:
        "Studying core computer science while specializing in frontend development and exploring backend with Go, and PostgreSQL.",
    },
  ];

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const experienceItemsRef = useRef([]);

  const addToExperienceRefs = (el) => {
    if (el && !experienceItemsRef.current.includes(el)) {
      experienceItemsRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { 
          opacity: 0,
          y: 50,
          rotationX: 90
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
            markers: false,
          }
        }
      );

      const experienceTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play reverse play reverse",
          markers: false,
        }
      });

      experienceItemsRef.current.forEach((item, index) => {
        const itemTimeline = gsap.timeline();
        
        itemTimeline.fromTo(item.querySelector('.timeline-line'),
          { scaleY: 0, transformOrigin: "top center" },
          { 
            scaleY: 1, 
            duration: 1.2, 
            ease: "power2.inOut",
            delay: index * 0.3 
          }
        );

        itemTimeline.fromTo(item,
          { 
            opacity: 0,
            x: -100,
            rotationY: 15,
            scale: 0.8
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            scale: 1,
            duration: 1,
            ease: "back.out(1.7)",
            delay: index * 0.2
          },
          "-=0.8"
        );

        itemTimeline.fromTo(item.querySelectorAll('.experience-text > *'),
          { 
            opacity: 0, 
            y: 30,
            skewY: 5
          },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out"
          },
          "-=0.5"
        );

        experienceTimeline.add(itemTimeline, index * 0.4);
      });

      // Individual scroll triggers for each experience item - REPEATS on scroll
      experienceItemsRef.current.forEach((item) => {
        gsap.fromTo(item,
          {
            opacity: 0,
            x: -50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
              markers: false,
            }
          }
        );
      });


      experienceItemsRef.current.forEach((item) => {
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            scale: 1.02,
            y: -5,
            boxShadow: "0 20px 40px rgba(99, 102, 241, 0.15)",
            duration: 0.3,
            ease: "power2.out"
          });
          

          gsap.to(item.querySelector('.timeline-dot'), {
            scale: 1.5,
            backgroundColor: "#4F46E5",
            duration: 0.3,
            ease: "power2.out"
          });
        });

        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            scale: 1,
            y: 0,
            boxShadow: "none",
            duration: 0.3,
            ease: "power2.out"
          });
          
          gsap.to(item.querySelector('.timeline-dot'), {
            scale: 1,
            backgroundColor: "#6366F1",
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="max-w-6xl mx-auto px-4 py-20 relative overflow-hidden font-mono">
      <h2 ref={titleRef} className="text-3xl text-gray-400 font-bold mb-16 font-mono text-center">
        Experience
      </h2>
      
      <div className="relative">
        <div className="space-y-12 md:ml-8">
          {experiences.map((exp) => (
            <div 
              key={exp.title} 
              ref={addToExperienceRefs}
              className="relative pl-8 group cursor-pointer "
            >
              

              <div className="absolute left-2 top-6 bottom-0 w-0.5 bg-gradient-to-b from-gray-500 to-transparent timeline-line"></div>

              {/* content container */}
              <div className="experience-content bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-600 hover:border-blue-500 transition-all duration-300">
                <div className="experience-text">
                  <h3 className="font-semibold text-lg text-gray-300 mb-2">{exp.title}</h3>
                  <p className="text-sm text-slate-400 mb-3">
                    {exp.company} • <span className="text-blue-400">{exp.date}</span>
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
                
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </div>

              <div className="absolute left-6 top-2 w-2 h-0.5 bg-blue-200 connection-line opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}