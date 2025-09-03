"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Menu, X, ChevronDown, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useMobile } from "@/lib/use-mobile";
import { useSession } from "next-auth/react";

interface HeaderProps {
  isOpenSideBar: boolean;
  setOpenSideBar: (open: boolean) => void;
}

interface NavItem {
  name: string;
  path?: string;
  submenu?: NavItem[];
  icon?: React.ReactNode;
}

// Navigation configuration
const navigationConfig: NavItem[] = [
  { 
    name: "Home", 
    path: "/" 
  },
  { 
    name: "About", 
    path: "/about" 
  },
  {
    name: "Projects",
    submenu: [
      { name: "All Projects", path: "/projects" },
      { name: "Research", path: "/research" },
      { name: "Future Plans", path: "/future" },
      { name: "Case Studies", path: "/case-studies" },
    ],
  },
  { 
    name: "Team", 
    path: "/team" 
  },
  { 
    name: "Blog", 
    path: "/blogs" 
  },
  { 
    name: "Hire Me", 
    path: "/hire" 
  },
];

// Enhanced NavLink component with better UX
function NavLink({
  nav,
  delay = 0,
  onClick,
  isMobile = false,
  isActive = false,
}: {
  nav: NavItem;
  delay?: number;
  onClick?: () => void;
  isMobile?: boolean;
  isActive?: boolean;
}) {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const submenuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = () => {
    if (!isMobile && nav.submenu) {
      clearTimeout(timeoutRef.current);
      setIsHovered(true);
      setIsSubmenuOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && nav.submenu) {
      timeoutRef.current = setTimeout(() => {
        setIsHovered(false);
        setIsSubmenuOpen(false);
      }, 150);
    }
  };

  const toggleMobileSubmenu = () => {
    if (isMobile && nav.submenu) {
      setIsSubmenuOpen(!isSubmenuOpen);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Mobile navigation item with submenu
  if (isMobile && nav.submenu) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay }}
        className="w-full"
      >
        <button
          className="flex items-center justify-between w-full text-lg text-gray-700 py-3 px-4 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200"
          onClick={toggleMobileSubmenu}
        >
          <span className="font-medium">{nav.name}</span>
          <motion.div
            animate={{ rotate: isSubmenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </button>

        <AnimatePresence>
          {isSubmenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="ml-4 mt-2 border-l-2 border-gray-200 pl-4">
                {nav.submenu.map((sub, i) => (
                  <motion.a
                    key={sub.name}
                    href={sub.path}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="block text-gray-600 py-2 px-3 hover:text-black hover:bg-gray-50 rounded-md transition-all duration-200"
                    onClick={onClick}
                  >
                    {sub.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  // Mobile navigation item without submenu
  if (isMobile && nav.path) {
    return (
      <motion.a
        href={nav.path}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay }}
        className="block text-lg text-gray-700 py-3 px-4 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
        onClick={onClick}
      >
        {nav.name}
      </motion.a>
    );
  }

  // Desktop navigation
  return (
    <div 
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {nav.path ? (
        <motion.a
          href={nav.path}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay }}
          className={`relative text-sm font-medium transition-all duration-200 px-3 py-2 rounded-md ${
            isActive 
              ? "text-black bg-gray-100" 
              : "text-gray-700 hover:text-black hover:bg-gray-50"
          }`}
          onClick={onClick}
        >
          {nav.name}
          {isActive && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-gray-100 rounded-md -z-10"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </motion.a>
      ) : (
        <button
          className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-black transition-all duration-200 px-3 py-2 rounded-md hover:bg-gray-50"
        >
          {nav.name}
          <ChevronDown size={16} className={`transition-transform duration-200 ${isSubmenuOpen ? 'rotate-180' : ''}`} />
        </button>
      )}

      {/* Desktop submenu */}
      <AnimatePresence>
        {!isMobile && nav.submenu && isSubmenuOpen && (
          <motion.div
            ref={submenuRef}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 mt-2 bg-white shadow-xl rounded-xl border border-gray-200 p-2 z-50 min-w-[200px]"
            onMouseEnter={() => {
              clearTimeout(timeoutRef.current);
              setIsHovered(true);
            }}
            onMouseLeave={handleMouseLeave}
          >
            {nav.submenu.map((sub, i) => (
              <motion.a
                key={sub.name}
                href={sub.path}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                className="block text-sm text-gray-700 px-4 py-3 hover:bg-gray-50 hover:text-black rounded-lg transition-all duration-200 font-medium"
              >
                {sub.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Main Header component
export default function Header({ isOpenSideBar, setOpenSideBar }: HeaderProps) {
  const isMobile = useMobile();
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-100" 
            : "bg-white/70 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            {isMobile && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setOpenSideBar(!isOpenSideBar)}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isOpenSideBar ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )}

            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center"
            >
              <a href="/" className="text-xl font-bold tracking-wide italic text-gray-900 hover:text-gray-700 transition-colors logo">
                prasenjeet
              </a>
            </motion.div>

            {/* Desktop navigation */}
            {!isMobile && (
              <div className="flex items-center gap-8">
                <nav className="flex items-center gap-2">
                  {navigationConfig.map((nav, i) => (
                    <NavLink 
                      key={nav.name} 
                      nav={nav} 
                      delay={0.3 + i * 0.1}
                      isActive={false} // You can implement active route logic here
                    />
                  ))}
                </nav>

                {/* LinkedIn CTA */}
                <motion.a
                  href="https://www.linkedin.com/in/prasenjeet066"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-xl"
                >
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </motion.a>

                {/* User session indicator */}
                {session && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full text-sm text-gray-700"
                  >
                    <User size={16} />
                    <span className="hidden sm:inline">Welcome</span>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobile && isOpenSideBar && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setOpenSideBar(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              className="fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* Sidebar header */}
                <div className="mb-8 pt-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Navigation</h2>
                  <div className="w-12 h-1 bg-black rounded-full"></div>
                </div>

                {/* Navigation items */}
                <div className="space-y-2">
                  {navigationConfig.map((nav, i) => (
                    <NavLink
                      key={nav.name}
                      nav={nav}
                      delay={i * 0.1}
                      isMobile
                      onClick={() => setOpenSideBar(false)}
                    />
                  ))}
                </div>

                {/* Mobile footer */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <motion.a
                    href="/admin/signup"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium"
                    onClick={() => setOpenSideBar(false)}
                  >
                    <User size={18} />
                    <span>SignUp / SignIn</span>
                  </motion.a>

                  <motion.a
                    href="https://www.linkedin.com/in/prasenjeet066"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-center gap-2 mt-4 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                    onClick={() => setOpenSideBar(false)}
                  >
                    <Linkedin size={18} />
                    <span>Visit LinkedIn</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}