const allProject = async (): Promise < any[] > => {
  const GITHUB_USERNAME = "prasenjeet066";
  const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;
  
  const projectPlatform: string[] = ["github"];
  let projects: any[] = [];
  
  for (const pt of projectPlatform) {
    if (pt === "github") {
      try {
        const res = await fetch(GITHUB_API_URL, {
          headers: {
            Accept: "application/vnd.github.mercy-preview+json", // needed for topics
          },
        });
        
        if (!res.ok) {
          throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
        }
        
        const data = await res.json();
        
        const repoList = data
          .filter((repo: any) => repo.topics?.includes("project")) // only repos tagged as project
          .map((repo: any) => ({
            name: repo.name,
            url: repo.html_url,
            description: repo.description,
            language: repo.language,
            updated_at: repo.updated_at,
            topics: repo.topics,
          }));
        
        projects = [...projects, ...repoList];
      } catch (e) {
        console.error("Error fetching GitHub repos:", e);
      }
    }
  }
  
  return projects;
};

export {allProject};