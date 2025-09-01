// app/projects/[project]/page.tsx

type ProjectPageProps = {
  params: { project: string };
};

// ✅ Generate static paths for all GitHub repos
export async function generateStaticParams() {
  const res = await fetch("https://api.github.com/users/prasenjeet066/repos", {
    headers: { Accept: "application/vnd.github.v3+json" },
  });
  
  if (!res.ok) throw new Error("Failed to fetch GitHub repos");
  
  const repos = await res.json();
  
  return repos.map((repo: any) => ({
    project: repo.name, // repo name becomes [project]
  }));
}

// ✅ Page component fetches repo data
export default async function Project({ params }: ProjectPageProps) {
  const { project } = params;
  
  const res = await fetch(`https://api.github.com/repos/prasenjeet066/${project}`, {
    headers: { Accept: "application/vnd.github.v3+json" },
  });
  
  if (!res.ok) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600">
          Repo "{project}" not found
        </h1>
      </div>
    );
  }
  
  const repo = await res.json();
  
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{repo.name}</h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-4">
          {repo.description || "No description available."}
        </p>
        <p className="text-sm text-gray-500">
          ⭐ Stars: {repo.stargazers_count} | 🍴 Forks: {repo.forks_count} | 📝 Language: {repo.language || "N/A"}
        </p>
        <a
          href={repo.html_url}
          target="_blank"
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          View on GitHub
        </a>
      </div>
    </main>
  );
}