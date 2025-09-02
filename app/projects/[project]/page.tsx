import { Metadata } from "next";
import { allProject } from "@/lib/projects";

// 🔹 Pre-generate static params

// 🔹 Dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: { project: string };
}): Promise < Metadata > {
  const projects = await allProject();
  const project = projects.find((p) => p.name === params.project);
  
  return {
    title: project ? `${project.name} | Project` : "Project Not Found",
    description: project?.description || "A project from GitHub",
  };
}

// 🔹 Page Component
export default async function ProjectPage({
  params,
}: {
  params: { project: string };
}) {
  const projects = await allProject();
  const project = projects.find((p) => p.name === params.project);
  
  if (!project) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold">Project Not Found</h1>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
      <p className="text-gray-600 mb-4">{project.description}</p>

      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        View on GitHub
      </a>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Details</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Language: {project.language || "Unknown"}</li>
          <li>Last updated: {new Date(project.updated_at).toLocaleDateString()}</li>
          <li>Topics: {project.topics.join(", ")}</li>
        </ul>
      </div>
    </div>
  );
}