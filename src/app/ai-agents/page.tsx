import React from "react";

type Agent = {
  id: string;
  emoji: string;
  title: string;
  description: string;
};

const AGENTS: Agent[] = [
  {
    id: "coding",
    emoji: "🤖",
    title: "Coding Agent",
    description: "Assist with code generation, suggestions, and debugging for your projects.",
  },
  {
    id: "website",
    emoji: "🌐",
    title: "Website Builder",
    description: "Generate pages, components, and layouts to rapidly scaffold websites.",
  },
  {
    id: "debug",
    emoji: "🐞",
    title: "Debug Agent",
    description: "Analyze errors, reproduce issues, and suggest fixes with clear steps.",
  },
  {
    id: "content",
    emoji: "📝",
    title: "Content Agent",
    description: "Create marketing copy, blog posts, and structured content tailored to tone.",
  },
  {
    id: "research",
    emoji: "🔍",
    title: "Research Agent",
    description: "Gather summaries, references, and actionable insights from source material.",
  },
];

export default function Page() {
  return (
    <main style={{ padding: "2rem", maxWidth: 1100, margin: "0 auto" }}>
      <header>
        <h1 style={{ margin: 0, fontSize: "1.75rem" }}>AI Agents</h1>
        <p style={{ marginTop: 8, color: "#666" }}>
          Pick an agent to get started — each one can be extended to run specialized workflows.
        </p>
      </header>

      <section
        aria-labelledby="agents-heading"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1rem",
          marginTop: "1.25rem",
        }}
      >
        {AGENTS.map((a) => (
          <article
            key={a.id}
            role="button"
            tabIndex={0}
            aria-pressed="false"
            style={{
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: 12,
              padding: "1rem",
              background: "white",
              boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
              cursor: "pointer",
            }}
            onKeyDown={() => {}}
            onClick={() => {}}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                aria-hidden
                style={{
                  fontSize: "1.75rem",
                  width: 48,
                  height: 48,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {a.emoji}
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: "1.1rem" }}>{a.title}</h2>
                <p style={{ margin: "0.25rem 0 0", color: "#444", fontSize: "0.95rem" }}>
                  {a.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
