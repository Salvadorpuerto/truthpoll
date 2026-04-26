'use client'
import './globals.css'
import { useEffect } from 'react'
import { MiniKit } from '@worldcoin/minikit-js'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize MiniKit — required for World App Mini Apps
    MiniKit.install(process.env.NEXT_PUBLIC_APP_ID)
  }, [])

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <title>TruthPoll</title>
      </head>
      <body>{children}</body>
    </html>
  )
}
