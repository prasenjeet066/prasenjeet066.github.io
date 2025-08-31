// app/page.tsx (Next.js 13+ with App Router)
"use client";
import Header from "@/components/header"
import Content from "@/components/content"
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import {useState , useEffect} from 'react'
import {useMobile} from "@/lib/use-mobile"
export default function ProfilePage() {
  const isMobile = useMobile()
  const [isOpenSideBar,setOpenSideBar] = useState(false);
  const listNavs = ["Home", "About Me", "Projects", "Hire Me"];
  return (
    <main className="min-h-screen bg-gray-50">
      {isMobile &&  (<>
        {
          isOpenSideBar &&  (
            <>
              <div className='w-full h-full flex flex-col items-center justify-center gap-4'>
                {
                  listNavs.map((nav,i)=>{
                  const href = `/${nav.toLowerCase().split(' ')[0]}`;
                  return (
                    <a key = {i} href className='text-lg'>
                      {nav}
                    </a>)
                      
                  })
                }
              </div>
            </>
          )
        }</>
      )}
      <Header isOpenSideBar setOpenSideBar/>
      <Content/>
    </main>
  );
}