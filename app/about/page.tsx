"use client";
import Header from "@/components/header";
import Image from "next/image";
import { useState } from "react";
import { useMobile } from "@/lib/use-mobile";

export default function About() {
  const isMobile = useMobile();
  const [isOpenSideBar, setOpenSideBar] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header isOpenSideBar={isOpenSideBar} setOpenSideBar={setOpenSideBar} />
      <div className='p-6'>
        <div className="w-full h-full flex flex-col md:flex-row items-center gap-8 px-4 md:px-12 py-6 bg-white rounded-xl">
          <div className="flex-1 w-full flex flex-col gap-4 p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">About Me</h1>
            <p className="text-gray-700 leading-relaxed">
              I’m a full‑stack web developer and AI/ML enthusiast focused on building
              clean, reliable and user‑friendly products. I enjoy working with
              TypeScript, Next.js and Tailwind on the frontend, and Python
              ecosystems for data and machine learning. I love solving real
              problems, teaching what I learn, and collaborating with great teams.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Beyond coding, I explore system design, developer tooling and
              performance optimization. I believe craftsmanship shows in the
              details — readable code, accessible UI, and thoughtful UX.
            </p>
          </div>
          <div className="flex-1 relative w-full h-[320px] md:h-[420px] shadow-[6px_6px_0px_-3px_rgba(0,_0,_0,_1)] rounded-xl overflow-hidden">
            <Image
              src="/img/pf.png"
              alt="Portrait"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </main>
  );
}