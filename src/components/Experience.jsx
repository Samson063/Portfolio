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

  return (
    <section id="experience" className="max-w-6xl mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold mb-10">Experience</h2>
      <div className="space-y-8">
        {experiences.map((exp) => (
          <div key={exp.title} className="border-l-2 border-indigo-500 pl-6">
            <h3 className="font-semibold text-lg">{exp.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {exp.company} • {exp.date}
            </p>
            <p className="mt-2 text-slate-700 dark:text-slate-400">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
