// src/app/tools/page.tsx
export const metadata = { title: "Tools | IkoConnect" };

const tools = [
  { name: "CodeSandbox", desc: "Instant online code editor.", url: "#" },
  { name: "Figma", desc: "Collaborative UI design tool.", url: "#" },
  { name: "Notion", desc: "All-in-one workspace.", url: "#" },
  { name: "Zapier", desc: "Automate your workflows.", url: "#" },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen px-6 py-20 bg-gray-50">
      <h1 className="text-4xl font-extrabold text-center mb-6">Tools Hub</h1>
      <p className="text-center text-gray-600 mb-12">
        Curated toolkit to supercharge your freelance workflow.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map(({ name, desc, url }) => (
          <a
            key={name}
            href={url}
            className="tool-card block transition hover:shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-2">{name}</h2>
            <p className="text-gray-700">{desc}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
