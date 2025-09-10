export default function Writing() {
  const posts = [
    { title: "Learning Go as a Frontend Engineer", date: "2025", link: "#" },
    { title: "Why Accessibility Matters in Modern Web Apps", date: "2024", link: "#" },
  ];

  return (
    <section id="writing" className="max-w-6xl mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold mb-10">Writing</h2>
      <ul className="space-y-6">
        {posts.map((p) => (
          <li key={p.title}>
            <a href={p.link} className="text-lg font-semibold hover:text-indigo-500">
              {p.title}
            </a>
            <p className="text-sm text-slate-600 dark:text-slate-400">{p.date}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
