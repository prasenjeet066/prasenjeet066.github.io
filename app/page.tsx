// app/page.tsx (Next.js 13+ with App Router)
"use client";
import Header from "@/components/header"
import Content from "@/components/content"
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center  p-6">
      <Header/>
      <Content/>
    </main>
  );
}