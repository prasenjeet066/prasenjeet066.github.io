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
        <link href='/fonts/main.css' rel='stylesheet'/>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}