import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-card border-t border-dark-border py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-accent mb-4">Portfolio</h3>
            <p className="text-gray-300 leading-relaxed">
              A passionate programmer and web developer creating innovative solutions 
              with cutting-edge technology.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-accent transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-accent transition-colors">About</a></li>
              <li><a href="#skills" className="text-gray-300 hover:text-accent transition-colors">Skills</a></li>
              <li><a href="#projects" className="text-gray-300 hover:text-accent transition-colors">Projects</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="/" className="text-gray-300 hover:text-accent transition-colors text-2xl">
                📧
              </a>
              <a href="/" className="text-gray-300 hover:text-accent transition-colors text-2xl">
                💼
              </a>
              <a href="/" className="text-gray-300 hover:text-accent transition-colors text-2xl">
                🐙
              </a>
              <a href="/" className="text-gray-300 hover:text-accent transition-colors text-2xl">
                🐦
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-dark-border pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} Your Name. All rights reserved. Made with ❤️ and React.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
