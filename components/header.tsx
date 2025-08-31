"use client";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

export default function Header() {
  const listNavs = ["Home", "About Me", "Projects", "Hire Me"];
  
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex items-center justify-between w-full p-4 "
    >
      {/* Brand */}
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg logo tracking-wide italic text-red-600"
      >
        prasenjeet
      </motion.span>

      {/* Navigation + LinkedIn button */}
      <div className="flex items-center gap-6 ml-auto">
        <nav className="flex items-center gap-6">
          {listNavs.map((name, i) => {
            const href = `/${name.toLowerCase().split(' ')[0]}`;
            return (
              <motion.a
                key={name}
                href={href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="text-sm text-gray-700 transition h over:text-black hover:underline after:content-['_↗']"
              >
                {name}
              </motion.a>
            );
          })}
        </nav>

        <motion.a
          href="https://www.linkedin.com/in/prasenjeet066" // replace with your LinkedIn URL
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
        >
          <Linkedin size={18} />
          <span className="text-sm font-medium">Visit LinkedIn</span>
        </motion.a>
      </div>
    </motion.header>
  );
}