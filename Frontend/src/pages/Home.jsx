import React from "react";

export default function Home() {
  return (
    <div>
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-5xl font-bold text-blue-600"></h1>
        <section className="mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
          <h1 className="max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
            Manage Your Tasks
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Like Never Before
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
            Organize your work, track priorities, manage deadlines, and stay
            productive with a fast and secure task management application.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button className="rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-700">
              Get Started
            </button>

            <button className="rounded-xl border border-slate-600 bg-slate-800/40 px-8 py-4 font-semibold transition hover:bg-slate-700/50">
              Learn More
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
