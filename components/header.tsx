"use client";

import { motion } from "framer-motion";
import { Linkedin, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useMobile } from "@/lib/use-mobile";
import { useSession } from "next-auth/react";

interface HeaderProps {
  isOpenSideBar: boolean;
  setOpenSideBar: (open: boolean) => void;
}

interface NavItem {
  name: string;
  path ? : string;
  submenu ? : NavItem[];
}

// Navigation list with submenu
const listNavs: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  {
    name: "Projects",
    submenu: [
      { name: "All Projects", path: "/projects" },
      { name: "Research", path: "/research" },
      { name: "Future Plans", path: "/future" },
    ],
  },
  { name: "Team", path: "/team" },
  { name: "Blog", path: "/blog" },
  { name: "Hire Me", path: "/hire" },
];

// NavLink component
function NavLink({
  nav,
  delay,
  onClick,
  isMobile = false,
}: {
  nav: NavItem;
  delay ? : number;
  onClick ? : () => void;
  isMobile ? : boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Mobile submenu toggle
  const toggleSubmenu = () => setIsOpen(!isOpen);
  
  if (isMobile && nav.submenu) {
    return (
      <div className="w-full">
        <button
          className="flex justify-between items-center w-full text-lg text-gray-700 py-2 px-4 hover:text-black transition"
          onClick={toggleSubmenu}
        >
          {nav.name} <ChevronDown size={18} className={`${isOpen ? "rotate-180" : ""} transition`} />
        </button>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col ml-4 border-l border-gray-200"
          >
            {nav.submenu.map((sub, i) => (
              <motion.a
                key={sub.name}
                href={sub.path}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="text-gray-700 py-2 px-4 hover:text-black transition"
                onClick={onClick}
              >
                {sub.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </div>
    );
  }
  
  return (
    <div className="relative group">
      {nav.path && (
        <motion.a
          href={nav.path}
          initial={isMobile ? { opacity: 0, x: -20 } : { opacity: 0, y: -10 }}
          animate={isMobile ? { opacity: 1, x: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay }}
          className={
            isMobile
              ? "text-lg text-gray-700 hover:text-black transition"
              : "text-sm text-gray-700 hover:text-black hover:underline  transition"
          }
          onClick={onClick}
        >
          {nav.name}
        </motion.a>
      )}

      {/* Desktop submenu */}
      {!isMobile && nav.submenu && (
        <div className="absolute top-full left-0 mt-2 hidden group-hover:flex flex-col bg-white shadow-lg rounded-md p-2 z-50 min-w-[160px]">
          {nav.submenu.map((sub, i) => (
            <motion.a
              key={sub.name}
              href={sub.path}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="text-sm text-gray-700 px-4 py-2 hover:bg-gray-100 rounded-md transition"
            >
              {sub.name}
            </motion.a>
          ))}
        </div>
      )}
    </div>
  );
}

// Header Component
export default function Header({ isOpenSideBar, setOpenSideBar }: HeaderProps) {
  const isMobile = useMobile();
  const { data: session, status } = useSession();
  
  return (
    <>
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center justify-between w-full p-4 relative sticky top-0 z-50 bg-white bg-white/50 z-30 backdrop-blur-md"
      >
        {/* Mobile menu button */}
        {isMobile && (
          <button
            className="outline-none border-none p-2"
            onClick={() => setOpenSideBar(!isOpenSideBar)}
            aria-label="Toggle menu"
          >
            {isOpenSideBar ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}

        {/* Brand */}
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg logo tracking-wide italic text-red-600"
        >
          prasenjeet
        </motion.span>

        {/* Desktop Navigation + LinkedIn button */}
        {!isMobile && (
          <div className="flex items-center gap-6 ml-auto">
            <nav className="flex items-center gap-6">
              {listNavs.map((nav, i) => (
                <NavLink key={nav.name} nav={nav} delay={0.3 + i * 0.1} />
              ))}
            </nav>

            <motion.a
              href="https://www.linkedin.com/in/prasenjeet066"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
            >
              <Linkedin size={16} />
              <span className="text-sm font-medium">Visit LinkedIn</span>
            </motion.a>
          </div>
        )}
      </motion.header>

      {/* Mobile Sidebar Overlay */}
      {isMobile && isOpenSideBar && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpenSideBar(false)}
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            className="fixed left-0 top-0 h-full w-full bg-white shadow-lg z-50 p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-start justify-start gap-2 mt-16">
              {listNavs.map((nav, i) => (
                <NavLink
                  key={nav.name}
                  nav={nav}
                  delay={i * 0.1}
                  isMobile
                  onClick={() => setOpenSideBar(false)}
                />
              ))}

              {/* Mobile SignUp / SignIn */}
              <motion.a
                href="/admin/signup"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-800 transition"
              >
                <span>SignUp or SignIn</span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}