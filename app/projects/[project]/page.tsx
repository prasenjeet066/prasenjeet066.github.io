// app/projects/[project]/page.tsx

type ProjectPageProps = {
  params: { project: string };
};

// ✅ Tell Next.js which project pages to generate at build time
export async function generateStaticParams() {
  return [
    { project: "alpha" },
    { project: "beta" },
    { project: "gamma" },
  ];
}

export default function Project({ params }: ProjectPageProps) {
  const { project } = params;
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Project: {project}</h1>
      <p className="text-gray-600 mt-2">
        This is the details page for <strong>{project}</strong>.
      </p>
    </div>
  );
}