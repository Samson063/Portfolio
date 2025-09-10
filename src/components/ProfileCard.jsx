import { ArrowRight } from "lucide-react";

export default function ProfileCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 p-6 md:p-8 bg-white dark:bg-slate-900 mt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-fuchsia-500/10" />
      <div className="relative">
        <h3 className="text-xl font-semibold">Anthony Samson</h3>
        <p className="text-slate-600 dark:text-slate-300">
          Software Developer • Frontend Engineer • Computer Science Student
        </p>
        <ul className="mt-6 space-y-3 text-sm">
          <li className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4" /> Focused on performance & a11y
          </li>
          <li className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4" /> Building with React, Go, Node.js
          </li>
          <li className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4" /> Exploring video editing
          </li>
        </ul>
      </div>
    </div>
  );
}
