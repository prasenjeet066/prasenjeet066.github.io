"use client"
import Header from "@/components/header"
import Content from "@/components/content"
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, MapPin, Calendar, Download, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from 'react'
import { useMobile } from "@/lib/use-mobile"

export default function HirePage() {
  const isMobile = useMobile()
  const [isOpenSideBar, setOpenSideBar] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    timeline: '',
    message: ''
  });

  const listNavs = ["Home", "About Me", "Projects", "Hire Me"];

  const services = [
    {
      title: "Web Development",
      description: "Full-stack web applications using modern frameworks",
      price: "Starting at $5,000",
      features: ["React/Next.js", "Node.js/Express", "Database Design", "API Development"]
    },
    {
      title: "Mobile Development", 
      description: "Cross-platform mobile apps for iOS and Android",
      price: "Starting at $8,000",
      features: ["React Native", "Native iOS/Android", "App Store Deployment", "Backend Integration"]
    },
    {
      title: "UI/UX Design",
      description: "User-centered design and prototyping",
      price: "Starting at $3,000", 
      features: ["Wireframing", "Prototyping", "User Research", "Design Systems"]
    },
    {
      title: "Consulting",
      description: "Technical consulting and code reviews",
      price: "$150/hour",
      features: ["Architecture Review", "Code Audits", "Tech Stack Selection", "Performance Optimization"]
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // You can integrate with your preferred form handling service
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {isMobile && (
        <>
          {isOpenSideBar && (
            <div className='fixed inset-0 bg-white z-50 flex flex-col items-center justify-center gap-4'>
              {listNavs.map((nav, i) => {
                const href = `/${nav.toLowerCase().split(' ')[0]}`;
                return (
                  <a key={i} href={href} className='text-lg hover:text-blue-600 transition-colors'>
                    {nav}
                  </a>)
              })}
            </div>
          )}
        </>
      )}
      
      <Header isOpenSideBar={isOpenSideBar} setOpenSideBar={setOpenSideBar} />
      
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Let's Work Together
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            I'm available for freelance projects and full-time opportunities. 
            Let's discuss how we can bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#contact" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get In Touch
            </a>
            <a 
              href="/resume.pdf" 
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 justify-center"
            >
              <Download size={20} />
              Download Resume
            </a>
          </div>
        </motion.div>

        {/* Services Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="text-blue-600 font-semibold mb-4">{service.price}</div>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Form Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          id="contact"
          className="mb-16"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Start Your Project</h2>
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h3 className="text-2xl font-semibold mb-6">Get In Touch</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Mail className="text-blue-600" size={20} />
                    <span>your.email@example.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-blue-600" size={20} />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="text-blue-600" size={20} />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="text-blue-600" size={20} />
                    <span>Available for projects</span>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <a href="https://github.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                    <Github size={24} />
                  </a>
                  <a href="https://linkedin.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                    <Linkedin size={24} />
                  </a>
                  <a href="mailto:your.email@example.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                    <Mail size={24} />
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        <option value="">Select budget</option>
                        <option value="under-5k">Under $5,000</option>
                        <option value="5k-15k">$5,000 - $15,000</option>
                        <option value="15k-30k">$15,000 - $30,000</option>
                        <option value="30k-plus">$30,000+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">ASAP</option>
                      <option value="1-month">Within 1 month</option>
                      <option value="2-3-months">2-3 months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project, goals, and requirements..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                question: "What's your typical project timeline?",
                answer: "Project timelines vary based on complexity. Simple websites take 2-4 weeks, while complex applications can take 2-6 months. I'll provide a detailed timeline after our initial consultation."
              },
              {
                question: "Do you work with international clients?",
                answer: "Yes! I work with clients worldwide and am experienced in remote collaboration. I'm flexible with time zones and communication preferences."
              },
              {
                question: "What's included in your development process?",
                answer: "My process includes discovery, planning, design, development, testing, and deployment. I provide regular updates and involve you in key decisions throughout the project."
              },
              {
                question: "Do you provide ongoing maintenance?",
                answer: "Yes, I offer maintenance packages for ongoing support, updates, and improvements after project completion."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold text-lg mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  )
}