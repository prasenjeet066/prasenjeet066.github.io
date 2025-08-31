// app/page.tsx (Next.js 13+ with App Router)
"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8 text-center"
      >
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <Image
            src="/profile.jpg"
            alt="Profile"
            width={120}
            height={120}
            className="rounded-full border-4 border-gray-200 shadow-md"
          />
        </div>

        {/* Name + Title */}
        <h1 className="text-3xl font-bold text-gray-900">Prasenjeet Howlader</h1>
        <p className="text-gray-600 mt-2">Web Developer | ML/DL Enthusiast</p>

        {/* Bio */}
        <p className="mt-4 text-gray-700 leading-relaxed">
          Passionate about building scalable web applications and working with
          cutting-edge technologies like React, Next.js, Python, and PyTorch.
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-6">
          <a href="https://github.com/yourusername" target="_blank" rel="noreferrer">
            <Github className="w-6 h-6 text-gray-600 hover:text-black transition" />
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer">
            <Linkedin className="w-6 h-6 text-gray-600 hover:text-blue-600 transition" />
          </a>
          <a href="mailto:your@email.com">
            <Mail className="w-6 h-6 text-gray-600 hover:text-red-500 transition" />
          </a>
        </div>

        {/* Skills Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Skills</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["React", "Next.js", "TypeScript", "Node.js", "Python", "TensorFlow", "PyTorch"].map(
              (skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-sm font-medium shadow-sm"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </div>
      </motion.div>
    </main>
  );
}