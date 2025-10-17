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

  const handleSubmit = (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  const { name, email, subject, message } = formData;

  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=anthonysamson063@gmail.com&su=${encodeURIComponent(
    subject || `Message from ${name}`
  )}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  )}`;

  const mailtoLink = `mailto:anthonysamson063@gmail.com?subject=${encodeURIComponent(
    subject || `Message from ${name}`
  )}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  )}`;

  // Check if the user is on a mobile device
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile) {
    // On mobile → open the Gmail app or default email app directly
    window.location.href = mailtoLink;
  } else {
    // On desktop → open Gmail in a new tab, fallback to mailto if blocked
    const newTab = window.open(gmailLink, "_blank");
    if (!newTab || newTab.closed || typeof newTab.closed === "undefined") {
      window.location.href = mailtoLink;
    }
  }

  setTimeout(() => {
    setIsSubmitting(false);
    setSubmitStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitStatus(""), 3000);
  }, 1000);
};


  useEffect(() => {
    const ctx = gsap.context(() => {
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
    <section ref={sectionRef} id="contact" className="max-w-4xl mx-auto px-4 py-20 relative overflow-hidden font-mono">
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
              placeholder="Collaboration idea, or just say hello!"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-btn w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-gray-100 hover:to-gray-200 hover:text-gray-950 flex items-center justify-center"
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

      </div>
    </section>
  );
}
