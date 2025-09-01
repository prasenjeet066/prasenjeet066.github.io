// app/projects/page.tsx
"use client";
import Header from "@/components/header";
import { useState, useEffect } from 'react';
import { useMobile } from "@/lib/use-mobile";
import { motion } from "framer-motion";
import { Github, ExternalLink, Star, GitFork, Calendar, Search, Filter } from "lucide-react";

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  topics: string[];
  private: boolean;
}

const LanguageColors: { [key: string]: string } = {
  JavaScript: "#f1e05a",
  TypeScript: "#2b7489",
  Python: "#3572A5",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  PHP: "#4F5D95",
  C: "#555555",
  "C++": "#f34b7d",
  Go: "#00ADD8",
  Rust: "#dea584",
  Swift: "#ffac45",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Ruby: "#701516",
  Shell: "#89e051",
  Vue: "#41b883",
  React: "#61dafb",
};

export default function ProjectsPage() {
  const isMobile = useMobile();
  const [isOpenSideBar, setOpenSideBar] = useState(false);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // আপনার GitHub username এখানে দিন
  const GITHUB_USERNAME = "prasenjeet066"; // এটি আপনার সঠিক GitHub username দিয়ে replace করুন

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
        );
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`GitHub user "${GITHUB_USERNAME}" not found`);
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: Repository[] = await response.json();
        
        // Sort by updated_at descending
        const sortedRepos = data.sort(
          (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
        
        setRepositories(sortedRepos);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch repositories");
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, []);

  // Filter and search repositories
  const filteredRepos = repositories.filter(repo => {
    // Search filter
    const matchesSearch = searchTerm === "" || 
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    // Category filter
    if (filter === "all") return true;
    if (filter === "public") return !repo.private;
    if (filter === "starred") return repo.stargazers_count > 0;
    if (filter === "forked") return repo.forks_count > 0;
    return repo.language?.toLowerCase() === filter.toLowerCase();
  });

  // Get unique languages
  const languages = Array.from(
    new Set(repositories.map(repo => repo.language).filter(Boolean))
  ).sort();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="animate-pulse">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-32"></div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-3 bg-gray-300 rounded w-full"></div>
              <div className="h-3 bg-gray-300 rounded w-3/4"></div>
            </div>
            <div className="flex gap-1 mb-4">
              <div className="h-5 bg-gray-300 rounded w-16"></div>
              <div className="h-5 bg-gray-300 rounded w-20"></div>
            </div>
            <div className="flex gap-4 mb-4">
              <div className="h-4 bg-gray-300 rounded w-20"></div>
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </div>
            <div className="h-3 bg-gray-300 rounded w-24 mb-4"></div>
            <div className="flex gap-2">
              <div className="h-9 bg-gray-300 rounded flex-1"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <Header isOpenSideBar={isOpenSideBar} setOpenSideBar={setOpenSideBar} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            My Projects
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{`
            A collection of my open-source projects and contributions on GitHub. 
            Showcasing my journey in web development, AI, and software engineering.`}
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full transition ${
                filter === "all"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              All ({repositories.length})
            </button>
            <button
              onClick={() => setFilter("public")}
              className={`px-4 py-2 rounded-full transition ${
                filter === "public"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              Public
            </button>
            <button
              onClick={() => setFilter("starred")}
              className={`px-4 py-2 rounded-full transition ${
                filter === "starred"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              ⭐ Starred
            </button>
            <button
              onClick={() => setFilter("forked")}
              className={`px-4 py-2 rounded-full transition ${
                filter === "forked"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              🍴 Forked
            </button>
            {languages.slice(0, 4).map((lang) => (
              <button
                key={lang}
                onClick={() => setFilter(lang!)}
                className={`px-4 py-2 rounded-full transition ${
                  filter === lang
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: LanguageColors[lang!] || "#ccc",
                    }}
                  />
                  {lang}
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Repository Count */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-center mb-6"
          >
            <p className="text-gray-600">
              Showing {filteredRepos.length} of {repositories.length} repositories
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && <LoadingSkeleton />}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg max-w-md mx-auto">
              <h3 className="font-semibold mb-2">Error Loading Repositories</h3>
              <p className="text-sm">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition text-sm"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        )}

        {/* Repository Grid */}
        {!loading && !error && filteredRepos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredRepos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 group hover:border-blue-300 hover:scale-105"
              >
                {/* Repo Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <Github className="w-5 h-5 text-gray-700 flex-shrink-0 group-hover:text-blue-600 transition" />
                    <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition">
                      {repo.name}
                    </h3>
                  </div>
                  {repo.private && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded flex-shrink-0">
                      🔒 Private
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 min-h-[3rem] leading-relaxed">
                  {repo.description || "No description available"}
                </p>

                {/* Topics */}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {repo.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full hover:bg-blue-200 transition cursor-pointer"
                      >
                        #{topic}
                      </span>
                    ))}
                    {repo.topics.length > 3 && (
                      <span className="text-xs text-gray-500 px-2 py-1">
                        +{repo.topics.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Language and Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 flex-wrap">
                  {repo.language && (
                    <div className="flex items-center gap-1">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: LanguageColors[repo.language] || "#ccc",
                        }}
                      />
                      <span className="font-medium">{repo.language}</span>
                    </div>
                  )}
                  {repo.stargazers_count > 0 && (
                    <div className="flex items-center gap-1 text-yellow-600">
                      <Star className="w-4 h-4" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                  )}
                  {repo.forks_count > 0 && (
                    <div className="flex items-center gap-1 text-green-600">
                      <GitFork className="w-4 h-4" />
                      <span>{repo.forks_count}</span>
                    </div>
                  )}
                </div>

                {/* Updated Date */}
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
                  <Calendar className="w-3 h-3" />
                  <span>Updated {formatDate(repo.updated_at)}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition text-sm font-medium group-hover:bg-blue-600"
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </a>
                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredRepos.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Github className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No repositories found
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm 
                ? `No repositories match "${searchTerm}" with the current filter`
                : filter === "all" 
                ? "No repositories available" 
                : `No repositories match the "${filter}" filter`}
            </p>
            {(searchTerm || filter !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilter("all");
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Clear Filters
              </button>
            )}
          </motion.div>
        )}

        {/* Stats Section */}
        {!loading && !error && repositories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 bg-white rounded-lg shadow-md p-6 border border-gray-200"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Repository Statistics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {repositories.length}
                </div>
                <div className="text-sm text-gray-600">Total Repos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Stars</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {repositories.reduce((sum, repo) => sum + repo.forks_count, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Forks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {languages.length}
                </div>
                <div className="text-sm text-gray-600">Languages</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* GitHub Profile Link */}
        {!loading && !error && repositories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition font-medium"
            >
              <Github className="w-5 h-5" />
              View All on GitHub
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        )}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </main>
  );
}