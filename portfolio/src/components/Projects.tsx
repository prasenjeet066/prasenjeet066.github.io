import React, { useState } from "react";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "AI Image Recognition System",
      description: "Advanced computer vision system using PyTorch and OpenCV for real-time object detection and classification.",
      image: "🤖",
      category: "ai",
      technologies: ["Python", "PyTorch", "OpenCV", "TensorFlow"],
      github: "#",
      live: "#"
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React frontend, Node.js backend, and MongoDB database.",
      image: "🛒",
      category: "web",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      github: "#",
      live: "#"
    },
    {
      id: 3,
      title: "Machine Learning Dashboard",
      description: "Interactive dashboard for visualizing ML model performance and data analytics.",
      image: "📊",
      category: "ai",
      technologies: ["Python", "Streamlit", "Pandas", "Plotly"],
      github: "#",
      live: "#"
    },
    {
      id: 4,
      title: "Real-time Chat Application",
      description: "Modern chat app with real-time messaging, user authentication, and file sharing capabilities.",
      image: "💬",
      category: "web",
      technologies: ["React", "Socket.io", "Node.js", "MongoDB"],
      github: "#",
      live: "#"
    },
    {
      id: 5,
      title: "Neural Network Framework",
      description: "Custom neural network implementation from scratch with backpropagation and optimization algorithms.",
      image: "🧠",
      category: "ai",
      technologies: ["Python", "NumPy", "Matplotlib", "Jupyter"],
      github: "#",
      live: "#"
    },
    {
      id: 6,
      title: "Portfolio Website",
      description: "Modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS.",
      image: "🌐",
      category: "web",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      github: "#",
      live: "#"
    }
  ];

  const filters = [
    { name: "All", value: "all" },
    { name: "AI/ML", value: "ai" },
    { name: "Web", value: "web" }
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 bg-dark-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Featured Projects</h2>
        
        {/* Filter Buttons */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-2 p-1 bg-dark-bg rounded-lg border border-dark-border">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
                  activeFilter === filter.value
                    ? "bg-accent text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className="card group hover:scale-105 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-6xl mb-4 text-center">{project.image}</div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 bg-dark-bg text-accent text-sm rounded-full border border-accent/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-3">
                <a 
                  href={project.github}
                  className="flex-1 text-center py-2 px-4 bg-dark-bg text-accent border border-accent rounded-lg hover:bg-accent hover:text-white transition-all duration-300"
                >
                  GitHub
                </a>
                <a 
                  href={project.live}
                  className="flex-1 text-center py-2 px-4 bg-accent text-white rounded-lg hover:bg-accent-hover transition-all duration-300"
                >
                  Live Demo
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 animate-slide-up" style={{ animationDelay: "0.6s" }}>
          <a href="/" className="btn-secondary">
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
