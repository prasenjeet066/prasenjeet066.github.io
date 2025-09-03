"use client";
import Header from "@/components/header";
import Image from "next/image";
import { useState } from "react";
import { useMobile } from "@/lib/use-mobile";

const members = [
  { name: "Prasenjeet Howlader", role: "Full‑Stack Developer", avatar: "/img/pf.png" },
  { name: "Jane Doe", role: "Product Designer", avatar: "/img/pf.png" },
  { name: "John Smith", role: "ML Engineer", avatar: "/img/pf.png" },
];

export default function Team() {
  const isMobile = useMobile();
  const [isOpenSideBar, setOpenSideBar] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header isOpenSideBar={isOpenSideBar} setOpenSideBar={setOpenSideBar} />
      <div className='p-6 mt-4'>
        <div className="w-full h-full gap-8 px-4 md:px-12 py-6 bg-white rounded-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Team</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((m) => (
              <div key={m.name} className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-md transition">
                <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden shadow-[4px_4px_0px_-2px_rgba(0,_0,_0,_1)]">
                  <Image src={m.avatar} alt={m.name} fill className="object-cover" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{m.name}</h3>
                <p className="text-gray-600 text-sm">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}