"use client"
import Header from "@/components/header"
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, MapPin, Calendar, Download, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from 'react'
import { useMobile } from "@/lib/use-mobile"
interface BookTypes {
  email: string
  project: {
    plt: 'freelancer' | 'fiver' | string
    projectUrl: string
  } | null
}
export default function HirePage() {
  const booksDetails = useState();
  const isMobile = useMobile();
  const [isOpenSideBar, setOpenSideBar] = useState(false);
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Header isOpenSideBar={isOpenSideBar} setOpenSideBar={setOpenSideBar} />
      <div className='p-6 mt-4'>
        <div className="w-full h-full flex flex-col md:flex-row items-start gap-8 px-4 md:px-12 py-6 bg-white rounded-xl">
          <div className="flex-1 w-full">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Work with me</h1>
            <p className="text-gray-700 leading-relaxed mb-6">
              I help teams ship performant, maintainable products quickly. I can join as a
              contractor, part‑time collaborator, or for short consulting engagements.
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-6">
              <li>Frontend with Next.js, React, TypeScript, Tailwind</li>
              <li>API design, Node.js services, integrations</li>
              <li>AI/ML prototyping with Python, PyTorch, TensorFlow</li>
              <li>Performance, accessibility and developer experience improvements</li>
            </ul>
            <a href="mailto:contact@example.com" className="inline-flex items-center gap-2 rounded-full bg-gray-900 text-white px-5 py-2 text-md hover:bg-gray-800 transition">
              Contact me
            </a>
          </div>
          <div className="flex-1 w-full">
            <form className="bg-white border border-gray-200 rounded-xl p-6 w-full">
              <div className="grid grid-cols-1 gap-4">
                <label className="text-sm text-gray-700">Email
                  <input type="email" placeholder="you@company.com" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </label>
                <label className="text-sm text-gray-700">Project URL (optional)
                  <input type="url" placeholder="https://project.xyz" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </label>
                <label className="text-sm text-gray-700">How can I help?
                  <textarea placeholder="Tell me briefly about your project..." rows={4} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </label>
                <button type="submit" className="mt-2 inline-flex items-center justify-center rounded-md bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition">Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </main>
  )
}