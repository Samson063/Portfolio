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

  return (
    <section id="projects" className="max-w-6xl mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold mb-10">Projects</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <a
            key={p.name}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl border border-slate-200 dark:border-white/10 p-6 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">{p.name}</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              {p.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
