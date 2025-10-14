import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const sectionRef = useRef(null);
  const formRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    // Create mailto link with form data
    const mailtoLink = `mailto:anthonysamson.dev@outlook.com?subject=${encodeURIComponent(formData.subject || `Message from ${formData.name}`)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    // Open default email client
    window.location.href = mailtoLink;
    
    // Simulate submission success
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(""), 3000);
    }, 1000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
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

      // Form animation
      gsap.fromTo(formRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          }
        }
      );

      // Input field animations
      const inputs = gsap.utils.toArray(".form-input");
      inputs.forEach((input, index) => {
        gsap.fromTo(input,
          {
            opacity: 0,
            x: -30,
            rotationY: 10
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 0.8,
            delay: 0.5 + (index * 0.1),
            ease: "power2.out",
            scrollTrigger: {
              trigger: input,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
            }
          }
        );

        // Input focus animation
        input.addEventListener("focus", () => {
          gsap.to(input, {
            scale: 1.02,
            borderColor: "#6366f1",
            boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)",
            duration: 0.3,
            ease: "power2.out"
          });
        });

        input.addEventListener("blur", () => {
          gsap.to(input, {
            scale: 1,
            borderColor: "#e2e8f0",
            boxShadow: "none",
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

      // Button animation
      gsap.fromTo(".submit-btn",
        {
          opacity: 0,
          scale: 0.8,
          y: 30
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          delay: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".submit-btn",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          }
        }
      );

      // Button hover animation
      const button = document.querySelector(".submit-btn");
      if (button) {
        button.addEventListener("mouseenter", () => {
          gsap.to(button, {
            scale: 1.05,
            y: -2,
            boxShadow: "0 10px 25px rgba(99, 102, 241, 0.3)",
            duration: 0.3,
            ease: "power2.out"
          });
        });

        button.addEventListener("mouseleave", () => {
          gsap.to(button, {
            scale: 1,
            y: 0,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            duration: 0.3,
            ease: "power2.out"
          });
        });
      }

      // Floating background animation
      gsap.to(".contact-bg", {
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
    <section ref={sectionRef} id="contact" className="max-w-4xl mx-auto px-4 py-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="contact-bg absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
      <div className="contact-bg absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>

      <h2 className="contact-title text-4xl font-bold mb-4 text-center text-white">
        Get In Touch
      </h2>
      
      <p className="text-center text-slate-400 mb-12 text-lg">
        Ready to bring your ideas to life? Let's start a conversation.
      </p>

      <div ref={formRef} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="form-input w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all duration-300"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="form-input w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all duration-300"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="form-input w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all duration-300"
              placeholder="What's this about?"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
              Your Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows="6"
              value={formData.message}
              onChange={handleChange}
              className="form-input w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all duration-300 resize-none"
              placeholder="Tell me about your project, collaboration idea, or just say hello!"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-btn w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-gray-100 hover:to-gray-200 hover:text-gray-950 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Opening Email Client...
              </>
            ) : (
              <>
                Send Message
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </>
            )}
          </button>

          {submitStatus === "success" && (
            <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 text-center">
              ✅ Email client opened! Please send your message.
            </div>
          )}
        </form>

        {/* Alternative contact methods */}
        <div className="mt-8 pt-8 border-t border-slate-700/50">
          <p className="text-center text-slate-400 mb-4">Or reach out directly</p>
          <div className="flex justify-center space-x-6">
            <a
              href="mailto:anthonysamson.dev@outlook.com"
              className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}