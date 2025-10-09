import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const experiences = [
    {
      title: "Frontend Engineer & Mentor",
      company: "BeCreative",
      date: "2023 – Present",
      description:
        "Mentoring creatives in UI/UX, product design, motion design, and data analysis. Building community-driven projects with React and modern web tools.",
    },
    {
      title: "Freelance Software Developer",
      company: "Self-employed",
      date: "2022 – Present",
      description:
        "Built websites including Becreativeux.com and Jbrandyentertainment.com. Focused on performance, accessibility, and beautiful UI design.",
    },
    {
      title: "Computer Science Student",
      company: "University",
      date: "Ongoing",
      description:
        "Studying core computer science while specializing in frontend development and exploring backend with Go, Node.js, and PostgreSQL.",
    },
  ];

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const experienceItemsRef = useRef([]);

  // Add experience item to refs array
  const addToExperienceRefs = (el) => {
    if (el && !experienceItemsRef.current.includes(el)) {
      experienceItemsRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with text reveal effect - REPEATS on scroll
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
            toggleActions: "play reverse play reverse", // Repeats on both scroll directions
            markers: false, // Set to true to see scroll trigger markers
          }
        }
      );

      // Experience items timeline - REPEATS on scroll
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
        
        // Border line drawing animation
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

      // Floating background elements animation - Continuous loop
      const floatingShapes = gsap.timeline({ repeat: -1, yoyo: true });
      floatingShapes.to('.floating-shape-1', {
        y: -20,
        rotation: 5,
        duration: 3,
        ease: "sine.inOut"
      })
      .to('.floating-shape-2', {
        y: 15,
        rotation: -3,
        duration: 2.5,
        ease: "sine.inOut"
      }, "-=3")
      .to('.floating-shape-3', {
        y: -10,
        rotation: 7,
        duration: 4,
        ease: "sine.inOut"
      }, "-=4");

      // Hover animations
      experienceItemsRef.current.forEach((item) => {
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            scale: 1.02,
            y: -5,
            boxShadow: "0 20px 40px rgba(99, 102, 241, 0.15)",
            duration: 0.3,
            ease: "power2.out"
          });
          
          // Animate the timeline dot
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

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="max-w-6xl mx-auto px-4 py-20 relative overflow-hidden">
      <div className="floating-shape-1 absolute top-20 right-10 w-20 h-20 bg-gray-500 rounded-full blur-xl"></div>
      <div className="floating-shape-2 absolute bottom-40 left-5 w-16 h-16 bg-gray-500 rounded-full blur-xl"></div>
      <div className="floating-shape-3 absolute top-1/2 right-1/4 w-12 h-12 bg-gray-500 rounded-full blur-xl"></div>

      <h2 ref={titleRef} className="text-3xl text-gray-400 font-bold mb-16 font-mono text-center">
        Experience
      </h2>
      
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500/30 to-purple-500/30"></div>
        
        <div className="space-y-12 ml-8">
          {experiences.map((exp) => (
            <div 
              key={exp.title} 
              ref={addToExperienceRefs}
              className="relative pl-8 group cursor-pointer "
            >
              {/* Animated timeline dot */}
              <div className="absolute left-0 top-2 w-4 h-4 bg-gray-500 rounded-full timeline-dot z-10 shadow-lg shadow-gray-500"></div>
              
              {/* Animated vertical line for each item */}
              <div className="absolute left-2 top-6 bottom-0 w-0.5 bg-gradient-to-b from-gray-500 to-transparent timeline-line"></div>

              {/* Main content container */}
              <div className="experience-content bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-indigo-500/30 transition-all duration-300">
                <div className="experience-text">
                  <h3 className="font-semibold text-lg text-white mb-2">{exp.title}</h3>
                  <p className="text-sm text-slate-400 mb-3">
                    {exp.company} • <span className="text-indigo-400">{exp.date}</span>
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
                
                {/* Hover effect gradient */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </div>

              {/* Connection line animation */}
              <div className="absolute left-6 top-2 w-2 h-0.5 bg-indigo-500 connection-line opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Background grid pattern */}
      <div className="absolute inset-0 -z-20 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent"></div>
      </div>
    </section>
  );
}