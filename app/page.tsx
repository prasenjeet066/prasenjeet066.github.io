// app/page.tsx
"use client";
import Header from "@/components/header";
import Content from "@/components/content";
import { useState } from 'react';
import { useMobile } from "@/lib/use-mobile";
import TextType from '@/components/text-anim';
export default function ProfilePage() {
  const isMobile = useMobile();
  const [isOpenSideBar, setOpenSideBar] = useState(false);
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Header isOpenSideBar={isOpenSideBar} setOpenSideBar={setOpenSideBar} />
      <Content />
      <div className='w-full flex flex-col items-center justify-center'>
                <TextType
          text={[
            "Python",
            "JavaScript",
            "Node.js",
            "React.js",
            "Next.js",
            "PHP",
            "Laravel",
            "Machine Learning",
            "Deep Learning",
            "PyTorch",
            "TensorFlow",
            "Data Analysis",
            "Web Development",
            "API Development",
            "Database Design",
          ]}
          typingSpeed={70}
          deletingSpeed={40}
          pauseDuration={1600}
          showCursor
          cursorCharacter="|"
          cursorBlinkDuration={0.6}
          textColors={["#111111", "#1a1a1a", "#0f172a"]}
          className="text-lg sm:text-xl font-medium tracking-tight"
        />
      </div>
    </main>
  );
}

