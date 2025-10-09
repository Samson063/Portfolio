import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with wave effect
      gsap.fromTo(".contact-title",
        {
          opacity: 0,
          y: 60,
          rotationY: 90,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 1.5,
          ease: "elastic.out(1, 0.8)",
          scrollTrigger: {
            trigger: ".contact-title",
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          }
        }
      );

      // Text animation with typewriter effect
      gsap.fromTo(".contact-text",
        {
          opacity: 0,
          y: 30,
          skewY: 5
        },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-text",
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          }
        }
      );

      // Button complex animation
      gsap.fromTo(buttonRef.current,
        {
          opacity: 0,
          scale: 0,
          rotation: -180,
          x: -100
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          x: 0,
          duration: 1.2,
          delay: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: buttonRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          }
        }
      );

      // Button hover animation
      buttonRef.current.addEventListener("mouseenter", () => {
        const tl = gsap.timeline();
        tl.to(buttonRef.current, {
          scale: 1.1,
          rotationY: 10,
          duration: 0.3,
          ease: "power2.out"
        })
        .to(buttonRef.current, {
          y: -5,
          boxShadow: "0 20px 40px rgba(99, 102, 241, 0.4)",
          duration: 0.2,
          ease: "power2.out"
        }, "-=0.2");
      });

      buttonRef.current.addEventListener("mouseleave", () => {
        const tl = gsap.timeline();
        tl.to(buttonRef.current, {
          scale: 1,
          rotationY: 0,
          y: 0,
          boxShadow: "none",
          duration: 0.5,
          ease: "elastic.out(1, 0.8)"
        });
      });

      // Button click animation
      buttonRef.current.addEventListener("click", (e) => {
        // Ripple effect
        const ripple = document.createElement("span");
        const rect = buttonRef.current.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          transform: scale(0);
          animation: ripple 0.6s linear;
          top: ${y}px;
          left: ${x}px;
          width: ${size}px;
          height: ${size}px;
          pointer-events: none;
        `;

        buttonRef.current.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);

        // Button pulse animation
        gsap.to(buttonRef.current, {
          scale: 0.9,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        });
      });

      // Floating particles animation
      const particles = gsap.utils.toArray(".particle");
      particles.forEach((particle, i) => {
        gsap.to(particle, {
          y: -30,
          x: i % 2 === 0 ? 20 : -20,
          rotation: 360,
          duration: 3 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.5
        });
      });

      // Background pulse animation
      gsap.to(".contact-bg", {
        scale: 1.1,
        opacity: 0.8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="max-w-6xl mx-auto px-4 py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="contact-bg absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
      <div className="contact-bg absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      {/* Floating particles */}
      <div className="particle absolute top-20 left-1/4 w-4 h-4 bg-indigo-400/30 rounded-full"></div>
      <div className="particle absolute top-40 right-1/3 w-3 h-3 bg-purple-400/30 rounded-full"></div>
      <div className="particle absolute bottom-32 left-1/3 w-5 h-5 bg-blue-400/30 rounded-full"></div>
      <div className="particle absolute bottom-20 right-1/4 w-2 h-2 bg-pink-400/30 rounded-full"></div>

      <h2 className="contact-title text-3xl font-bold mb-10 text-center">Contact</h2>
      
      <div className="text-center max-w-2xl mx-auto">
        <p className="contact-text mb-8 text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
          Interested in collaborating, freelancing, or just want to say hi?
        </p>
        
        <a
          ref={buttonRef}
          href="mailto:anthonysamson.dev@outlook.com"
          className="inline-block relative rounded-2xl bg-indigo-600 px-8 py-4 text-white font-semibold overflow-hidden transform-style-preserve-3d"
          style={{ willChange: 'transform' }}
        >
          <span className="relative z-10">Say Hello 👋</span>
          
          {/* Button gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </a>

        {/* Additional contact info with animation */}
        <div className="mt-8 opacity-0 contact-info">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Let's create something amazing together!
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}