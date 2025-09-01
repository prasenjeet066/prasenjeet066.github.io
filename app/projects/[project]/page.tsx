"use client"
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Calendar, 
  User, 
  Code, 
  Palette,
  Database,
  Globe,
  Smartphone,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Image from 'next/image';
import Header from "@/components/header";
import { useMobile } from "@/lib/use-mobile";

// Mock project data - replace with your actual data source
const projectsData: { [key: string]: any } = {
  'ecommerce-platform': {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    subtitle: 'Full-stack online shopping experience',
    description: 'A modern e-commerce platform built with Next.js and Stripe integration, featuring real-time inventory management, advanced search capabilities, and a responsive design that works seamlessly across all devices.',
    longDescription: 'This comprehensive e-commerce solution was built from the ground up to provide both administrators and customers with an exceptional online shopping experience. The platform features a robust product catalog system, secure payment processing, real-time inventory tracking, and advanced analytics dashboard. The responsive design ensures optimal performance across desktop, tablet, and mobile devices.',
    images: [
      '/projects/ecommerce/hero.jpg',
      '/projects/ecommerce/dashboard.jpg',
      '/projects/ecommerce/mobile.jpg',
      '/projects/ecommerce/admin.jpg'
    ],
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind CSS', 'Prisma'],
    category: 'Web Development',
    client: 'TechCorp Solutions',
    duration: '4 months',
    year: '2024',
    liveUrl: 'https://example-store.com',
    githubUrl: 'https://github.com/yourusername/ecommerce-platform',
    challenges: [
      'Implementing real-time inventory synchronization across multiple warehouses',
      'Creating a scalable search system that handles thousands of products',
      'Optimizing performance for mobile devices with slow connections'
    ],
    solutions: [
      'Built a custom inventory management system with WebSocket connections',
      'Implemented Elasticsearch for fast and accurate product search',
      'Used Next.js image optimization and implemented progressive loading'
    ],
    features: [
      'Product catalog with advanced filtering',
      'Secure payment processing with Stripe',
      'Real-time inventory management',
      'Admin dashboard with analytics',
      'Mobile-responsive design',
      'User authentication and profiles'
    ]
  },
  'mobile-banking-app': {
    id: 'mobile-banking-app',
    title: 'Mobile Banking App',
    subtitle: 'Secure financial management on mobile',
    description: 'A secure mobile banking application with biometric authentication, real-time transactions, and comprehensive financial management tools built with React Native.',
    longDescription: 'This mobile banking application prioritizes security and user experience, implementing bank-grade security measures while maintaining an intuitive interface. The app features biometric authentication, real-time transaction monitoring, budgeting tools, and seamless money transfers. Built with React Native for cross-platform compatibility.',
    images: [
      '/projects/banking/login.jpg',
      '/projects/banking/dashboard.jpg',
      '/projects/banking/transactions.jpg',
      '/projects/banking/transfer.jpg'
    ],
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Express', 'Firebase', 'Plaid API'],
    category: 'Mobile Development',
    client: 'SecureBank Corp',
    duration: '6 months',
    year: '2023',
    liveUrl: 'https://apps.apple.com/app/securebank',
    githubUrl: null, // Private repository
    challenges: [
      'Implementing bank-grade security standards',
      'Creating smooth animations while maintaining performance',
      'Integrating multiple third-party financial APIs'
    ],
    solutions: [
      'Used industry-standard encryption and biometric authentication',
      'Optimized React Native animations with native drivers',
      'Built a unified API layer to handle multiple financial data sources'
    ],
    features: [
      'Biometric authentication',
      'Real-time transaction tracking',
      'Budget management tools',
      'Secure money transfers',
      'Bill payment system',
      'Financial insights and analytics'
    ]
  },
  'portfolio-website': {
    id: 'portfolio-website',
    title: 'Creative Portfolio',
    subtitle: 'Interactive portfolio for digital artist',
    description: 'An interactive portfolio website showcasing digital art with smooth animations, 3D elements, and an immersive gallery experience built with Three.js and Next.js.',
    longDescription: 'This creative portfolio pushes the boundaries of web design, combining cutting-edge web technologies to create an immersive digital art gallery. The site features 3D elements, particle effects, smooth scroll animations, and an innovative navigation system that makes browsing artwork feel like an interactive experience.',
    images: [
      '/projects/portfolio/home.jpg',
      '/projects/portfolio/gallery.jpg',
      '/projects/portfolio/about.jpg',
      '/projects/portfolio/contact.jpg'
    ],
    technologies: ['Next.js', 'Three.js', 'GSAP', 'Framer Motion', 'TypeScript', 'Tailwind CSS'],
    category: 'Web Design',
    client: 'Alexandra Chen (Digital Artist)',
    duration: '3 months',
    year: '2024',
    liveUrl: 'https://alexandra-chen-art.com',
    githubUrl: 'https://github.com/yourusername/portfolio-site',
    challenges: [
      'Creating smooth 3D animations without impacting performance',
      'Making complex interactions accessible across devices',
      'Optimizing large image assets for fast loading'
    ],
    solutions: [
      'Implemented level-of-detail (LOD) system for 3D models',
      'Created fallback experiences for devices without WebGL support',
      'Used Next.js Image component with custom optimization pipeline'
    ],
    features: [
      'Interactive 3D gallery',
      'Smooth scroll animations',
      'Particle effect backgrounds',
      'Responsive grid layouts',
      'Contact form integration',
      'Social media integration'
    ]
  }
};

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const isMobile = useMobile();
  const [isOpenSideBar, setOpenSideBar] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [project, setProject] = useState<any>(null);

  const listNavs = ["Home", "About Me", "Projects", "Hire Me"];
  
  useEffect(() => {
    if (params?.project) {
      const projectData = projectsData[params.project as string];
      if (projectData) {
        setProject(projectData);
      } else {
        // Project not found, redirect to projects page
        router.push('/projects');
      }
    }
  }, [params, router]);

  const nextImage = () => {
    if (project?.images) {
      setCurrentImageIndex((prev) => 
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (project?.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? project.images.length - 1 : prev - 1
      );
    }
  };

  if (!project) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h1>
          <p className="text-gray-600">Please wait while we load the project details.</p>
        </div>
      </main>
    );
  }

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
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Back to Projects
        </motion.button>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                {project.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-gray-600 mb-6">{project.subtitle}</p>
              <p className="text-gray-700 mb-8 leading-relaxed">{project.longDescription}</p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Github size={18} />
                    View Code
                  </a>
                )}
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <User size={16} />
                    <span className="text-sm">Client</span>
                  </div>
                  <p className="font-medium">{project.client}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <Calendar size={16} />
                    <span className="text-sm">Duration</span>
                  </div>
                  <p className="font-medium">{project.duration}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <Code size={16} />
                    <span className="text-sm">Year</span>
                  </div>
                  <p className="font-medium">{project.year}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <Palette size={16} />
                    <span className="text-sm">Type</span>
                  </div>
                  <p className="font-medium">{project.category}</p>
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="relative">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-200">
                {project.images && project.images.length > 0 && (
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-200 rounded-lg mb-4 mx-auto flex items-center justify-center">
                        <Globe className="text-blue-600" size={24} />
                      </div>
                      <p className="text-gray-600">Project Screenshot</p>
                      <p className="text-sm text-gray-500 mt-2">Image {currentImageIndex + 1} of {project.images.length}</p>
                    </div>
                  </div>
                )}
                
                {project.images && project.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>
              
              {/* Image Dots */}
              {project.images && project.images.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {project.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        currentImageIndex === index ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Technologies */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech: string, index: number) => (
              <span 
                key={index}
                className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 text-gray-700 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Features */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {project.features.map((feature: string, index: number) => (
              <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Challenges & Solutions */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-12"
        >
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Challenges</h2>
              <div className="space-y-6">
                {project.challenges.map((challenge: string, index: number) => (
                  <div key={index} className="bg-red-50 p-6 rounded-lg border border-red-100">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-red-600 text-sm font-bold">{index + 1}</span>
                      </div>
                      <p className="text-gray-700">{challenge}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Solutions</h2>
              <div className="space-y-6">
                {project.solutions.map((solution: string, index: number) => (
                  <div key={index} className="bg-green-50 p-6 rounded-lg border border-green-100">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-green-600 text-sm font-bold">{index + 1}</span>
                      </div>
                      <p className="text-gray-700">{solution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Related Projects */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(projectsData)
              .filter((p: any) => p.id !== project.id)
              .slice(0, 3)
              .map((relatedProject: any) => (
                <motion.div
                  key={relatedProject.id}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
                  onClick={() => router.push(`/projects/${relatedProject.id}`)}
                >
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-200 rounded-lg mb-2 mx-auto flex items-center justify-center">
                        {relatedProject.category === 'Mobile Development' ? (
                          <Smartphone className="text-blue-600" size={20} />
                        ) : relatedProject.category === 'Web Design' ? (
                          <Palette className="text-blue-600" size={20} />
                        ) : (
                          <Globe className="text-blue-600" size={20} />
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{relatedProject.category}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {relatedProject.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                      {relatedProject.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{relatedProject.year}</span>
                      <span className="text-blue-600 text-sm font-medium">View Project →</span>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-gray-900 text-white rounded-2xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Interested in Working Together?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            I'm always excited to take on new challenges and create amazing digital experiences. 
            Let's discuss how we can bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => router.push('/hire')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start a Project
            </button>
            <button 
              onClick={() => router.push('/projects')}
              className="border border-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              View All Projects
            </button>
          </div>
        </motion.section>
      </div>
    </main>
  );
}