"use client"

import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="w-full flex-1 flex items-center justify-center flex-grow">
      <SignIn />
    </div>
  )
}