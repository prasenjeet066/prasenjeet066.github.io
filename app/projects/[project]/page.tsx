// pages/projects/[project].js

// 🔹 Pre-render all GitHub repos as static paths
export async function getStaticPaths() {
  const res = await fetch("https://api.github.com/users/prasenjeet066/repos", {
    headers: { Accept: "application/vnd.github.v3+json" },
  });
  
  if (!res.ok) {
    throw new Error("Failed to fetch GitHub repos");
  }
  
  const repos = await res.json();
  
  // Each repo name becomes the [project] param
  const paths = repos.map((repo) => ({
    params: { project: repo.name },
  }));
  
  return {
    paths,
    fallback: false, // Only pre-render existing repos
  };
}

// 🔹 Fetch data for each repo
export async function getStaticProps({ params }) {
  const { project } = params;
  
  const res = await fetch(
    `https://api.github.com/repos/prasenjeet066/${project}`,
    {
      headers: { Accept: "application/vnd.github.v3+json" },
    }
  );
  
  if (!res.ok) {
    return { notFound: true }; // 404 if repo not found
  }
  
  const repo = await res.json();
  
  return {
    props: {
      repo,
    },
  };
}

// 🔹 Page Component
export default function ProjectPage({ repo }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
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
    </div>
  );
}