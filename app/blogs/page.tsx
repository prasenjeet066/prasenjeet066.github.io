"use client";
import Header from "@/components/header";
import { useState } from "react";
import { useMobile } from "@/lib/use-mobile";

const posts = [
  {
    id: 1,
    title: "Designing pragmatic APIs with Next.js",
    excerpt:
      "Thoughts on shaping API routes, validation, and DX while keeping things simple.",
    date: "2025-01-15",
    tags: ["nextjs", "api", "typescript"],
  },
  {
    id: 2,
    title: "TypeScript techniques I use in real projects",
    excerpt:
      "Utility types, narrowing, discriminated unions and ergonomics I reach for.",
    date: "2024-12-20",
    tags: ["typescript", "patterns"],
  },
  {
    id: 3,
    title: "Shipping fast with Tailwind while keeping consistency",
    excerpt:
      "How I structure utility classes and extract components to avoid entropy.",
    date: "2024-11-03",
    tags: ["tailwind", "ui"],
  },
];

export default function Blog() {
  const isMobile = useMobile();
  const [isOpenSideBar, setOpenSideBar] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header isOpenSideBar={isOpenSideBar} setOpenSideBar={setOpenSideBar} />
      <div className='p-6 mt-4'>
        <div className="w-full h-full gap-8 px-4 md:px-12 py-6 bg-white rounded-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Blog</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article key={post.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
                <p className="text-gray-600 text-sm mb-3">{new Date(post.date).toLocaleDateString()}</p>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                      #{tag}
                    </span>
                  ))}
                </div>
                <a href="#" className="text-sm font-medium text-blue-600 hover:underline">Read more</a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}