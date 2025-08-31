import React from "react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "Python", level: 95, icon: "🐍" },
        { name: "JavaScript/TypeScript", level: 90, icon: "⚡" },
        { name: "C++", level: 85, icon: "⚙️" },
        { name: "Java", level: 80, icon: "☕" },
      ]
    },
    {
      title: "Machine Learning & AI",
      skills: [
        { name: "PyTorch", level: 95, icon: "🔥" },
        { name: "TensorFlow", level: 90, icon: "🧠" },
        { name: "Scikit-learn", level: 85, icon: "📊" },
        { name: "OpenCV", level: 80, icon: "👁️" },
      ]
    },
    {
      title: "Web Technologies",
      skills: [
        { name: "React", level: 90, icon: "⚛️" },
        { name: "Node.js", level: 85, icon: "🟢" },
        { name: "Next.js", level: 80, icon: "⚡" },
        { name: "Tailwind CSS", level: 90, icon: "🎨" },
      ]
    },
    {
      title: "Tools & Platforms",
      skills: [
        { name: "Git", level: 90, icon: "📝" },
        { name: "Docker", level: 85, icon: "🐳" },
        { name: "AWS", level: 80, icon: "☁️" },
        { name: "Linux", level: 85, icon: "🐧" },
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-dark-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Skills & Expertise</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div key={category.title} className="card animate-slide-up" style={{ animationDelay: `${categoryIndex * 0.1}s` }}>
              <h3 className="text-2xl font-bold mb-6 text-accent">{category.title}</h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="animate-slide-up" style={{ animationDelay: `${(categoryIndex * 0.1) + (skillIndex * 0.05)}s` }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{skill.icon}</span>
                        <span className="font-medium text-white">{skill.name}</span>
                      </div>
                      <span className="text-accent font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-dark-border rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-accent to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <h3 className="text-2xl font-bold mb-6 text-white">Always Learning & Growing</h3>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            I believe in continuous learning and staying updated with the latest technologies. 
            Currently exploring advanced AI/ML techniques and cloud-native development.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
