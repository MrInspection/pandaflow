import { ReactNode } from "react"

export default function AuthLayout({children}: Readonly<{children: ReactNode}>) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {children}
    </div>
  )
}