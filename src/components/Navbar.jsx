import { useState, useEffect } from "react";
import { Github, Linkedin, Twitter, Mail, FileText, Sparkles, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    // Use requestAnimationFrame
    let ticking = false;
    const updateScroll = () => {
      handleScroll();
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
    { icon: FileText, href: "/resume.pdf", label: "Resume" }
  ];

  const navLinks = [
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Writing', href: '#writing' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-black/95 backdrop-blur-md border-b border-gray-800 py-3" 
          : "bg-transparent py-4"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">

            <a 
              href="#home"
              className={`flex items-center space-x-2 transition-all duration-500 ${
                isScrolled ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}
            >
              <Sparkles size={18} className="text-gray-400" />
              <span className="font-bold text-xl bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">
                Anthony Samson
              </span>
            </a>

            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300 rounded-lg hover:bg-gray-800/50"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-2">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`p-2 text-gray-400 hover:text-white transition-all duration-300 ${
                      isScrolled ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: isScrolled ? `${index * 50}ms` : '0ms' }}
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>

            <button
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <>
          <div 
            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          <div className="md:hidden fixed top-0 right-0 h-full w-80 bg-black/95 backdrop-blur-xl border-l border-gray-800 z-50 transform transition-transform duration-300">
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-lg font-semibold text-gray-300">Menu</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white transition-colors duration-300 border border-gray-700 hover:border-gray-500 rounded-lg"
              >
                <X size={18} />
                <span>Cancel</span>
              </button>
            </div>

            <div className="flex flex-col h-full pt-4 pb-8 px-6 overflow-y-auto">

              <div className="space-y-4 mb-8">
                {navLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block py-3 text-lg text-gray-300 hover:text-white transition-colors duration-300 border-l-2 border-transparent hover:border-gray-400 hover:pl-4"
                    onClick={handleLinkClick}
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              <div className="mb-8">
                <h3 className="text-gray-400 text-sm font-medium mb-4">Follow Me</h3>
                <div className="flex space-x-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        className="p-3 text-gray-400 hover:text-white transition-colors duration-300 bg-gray-900/50 rounded-lg hover:bg-gray-800/50"
                        aria-label={social.label}
                        onClick={handleLinkClick}
                      >
                        <Icon size={20} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}