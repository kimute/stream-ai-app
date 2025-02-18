// import 'regenerator-runtime/runtime'; 
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react" // Import React


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Voice Recognition and AI Interaction",
  description: "An app that combines voice recognition with AI-powered summarization and question-answering.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>{children}</body>
    </html>
  )
}



import './globals.css'