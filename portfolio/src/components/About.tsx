import React from "react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-dark-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">About Me</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <div className="relative">
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-accent to-purple-500 rounded-full p-1">
                <div className="w-full h-full bg-dark-card rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">👨‍💻</div>
                    <div className="text-accent font-bold text-xl">Programmer</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
            </div>
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-3xl font-bold mb-6 text-white">
              Passionate Developer & Problem Solver
            </h3>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              I am a dedicated programmer and web developer with expertise in Python, 
              PyTorch, and modern web technologies. My passion lies in creating 
              innovative solutions that solve real-world problems.
            </p>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              With a strong foundation in machine learning and deep learning, 
              I specialize in developing intelligent applications and robust web solutions. 
              I believe in writing clean, maintainable code and staying up-to-date 
              with the latest industry trends.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="text-center p-4 bg-dark-bg rounded-lg border border-dark-border">
                <div className="text-2xl font-bold text-accent">3+</div>
                <div className="text-gray-400">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-dark-bg rounded-lg border border-dark-border">
                <div className="text-2xl font-bold text-accent">50+</div>
                <div className="text-gray-400">Projects Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
