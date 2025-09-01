import type React from "react"
import type { Metadata } from "next"
import { Raleway, Inconsolata, Besley as Bytesized } from "next/font/google" // Import Raleway, Inconsolata, and Bytesized
import "./globals.css"


export const metadata: Metadata = {
  title: "Microblog - Share Your Thoughts",
  description: "A modern microblogging platform built with Next.js"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
       >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet"/>
        <link href='/fonts/main.css' rel='stylesheet'/>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}