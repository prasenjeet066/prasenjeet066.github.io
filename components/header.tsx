"use client";
import { motion } from "framer-motion";
import { Linkedin, Menu, X } from "lucide-react";
import { useMobile } from "@/lib/use-mobile";

interface HeaderProps {
  isOpenSideBar: boolean;
  setOpenSideBar: (open: boolean) => void;
}

export default function Header({ isOpenSideBar, setOpenSideBar }: HeaderProps) {
  const listNavs = ["Home", "About Me", "Projects", "Hire Me"];
  const isMobile = useMobile();

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center justify-between w-full p-4 relative z-50"
      >
        {/* Mobile menu button */}
        {isMobile && (
          <button 
            className='outline-none border-none p-2' 
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
              {listNavs.map((name, i) => {
                const href = name === "Home" ? "/" : `/${name.toLowerCase().replace(' ', '')}`;
                return (
                  <motion.a
                    key={name}
                    href={href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className="text-sm text-gray-700 transition hover:text-black hover:underline after:content-['_↗']"
                  >
                    {name}
                  </motion.a>
                );
              })}
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
            className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-6 mt-16">
              {listNavs.map((nav, i) => {
                const href = nav === "Home" ? "/" : `/${nav.toLowerCase().replace(' ', '')}`;
                return (
                  <motion.a
                    key={i}
                    href={href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-lg text-gray-700 hover:text-black transition"
                    onClick={() => setOpenSideBar(false)}
                  >
                    {nav}
                  </motion.a>
                );
              })}
              
              {/* Mobile LinkedIn link */}
              <motion.a
                href="https://www.linkedin.com/in/prasenjeet066"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-800 transition"
              >
                <Linkedin size={20} />
                <span>LinkedIn Profile</span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}