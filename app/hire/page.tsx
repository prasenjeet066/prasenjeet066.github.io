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
  const booksDetails: BookTypes | null = useState();
  const isMobile = useMobile();
  const [isOpenSideBar, setOpenSideBar] = useState(false);
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Header isOpenSideBar={isOpenSideBar} setOpenSideBar={setOpenSideBar} />
      <div className='p-6'>
        <div className="w-full h-full flex flex-col md:flex-row items-center gap-8 px-4 md:px-12 py-6 bg-white rounded-xl">
          
      </div>
      </div>
      </main>
  )
}