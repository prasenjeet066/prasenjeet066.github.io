import type React from "react";
import type { Metadata } from "next";
import { Raleway, Inconsolata, Besley as Bytesized } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prasenjeet Howlader",
  description: "One of the best programmer ",
  openGraph: {
    title: "Prasenjeet Howlader",
    description: "One of the best programmer",
    url: "https://prasenjeet066.github.io/",
    siteName: "Prasenjeet",
    type: "website",
    images: [
      {
        url: "https://yourmicroblog.com/logo.png",
        width: 800,
        height: 800,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Microblog - Share Your Thoughts",
    description: "A modern microblogging platform built with Next.js",
    images: ["https://yourmicroblog.com/logo.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />
         <meta name="msvalidate.01" content="B2065EBF0E7E141FBC052B17F5B9FAE3" />
        <link href="/fonts/main.css" rel="stylesheet" />

        {/* JSON-LD Structured Data for Google Knowledge Panel */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Prasenjeet Howlader",
              "url": "https://prasenjeet066.github.io/",
              "image": "https://yourmicroblog.com/profile.jpg",
              "sameAs": [
                "https://x.com/prasenjeet066",
                "https://github.com/prasenjeet066",
                "https://linkedin.com/in/prasenjeet066"
              ],
              "jobTitle": "Full-Stack Web Developer & AI/ML Specialist",
              "worksFor": {
                "@type": "Organization",
                "name": "Microblog"
              },
              "alumniOf": [
                {
                  "@type": "EducationalOrganization",
                  "name": "Your University"
                }
              ],
              "birthDate": "2005-04-08",
              "birthPlace": {
                "@type": "Place",
                "name": "Barishal, Bangladesh"
              },
              "award": [
                "Top Developer Award 2023",
                "Best AI Project 2022"
              ],
              "description": "Official profile of Your Name, creator of Microblog, a modern microblogging platform built with Next.js, and expert in web development and AI/ML."
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}