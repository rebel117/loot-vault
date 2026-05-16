import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Loot Vault',
  description: 'A Gamified DeFi Ecosystem built on Stellar Soroban',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
