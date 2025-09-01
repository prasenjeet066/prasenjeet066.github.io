// app/page.tsx
"use client";
import Header from "@/components/header";
import Content from "@/components/content";
import { useState } from 'react';
import { useMobile } from "@/lib/use-mobile";

export default function ProfilePage() {
  const isMobile = useMobile();
  const [isOpenSideBar, setOpenSideBar] = useState(false);
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Header isOpenSideBar={isOpenSideBar} setOpenSideBar={setOpenSideBar} />
      <Content />
    </main>
  );
}

