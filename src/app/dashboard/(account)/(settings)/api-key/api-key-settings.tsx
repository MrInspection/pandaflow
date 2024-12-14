"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { CheckIcon, ClipboardIcon } from "lucide-react"

export const ApiKeySettings = ({ apiKey }: { apiKey: string }) => {
  const [copySuccess, setCopySuccess] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey)
    setCopySuccess(true)
    setTimeout(() => {
      setCopySuccess(false)
    }, 2000)
  }

  return (
    <Card className="max-w-xl w-full">
      <div>
        <Label>Your API Key</Label>
        <div className="mt-1.5 relative">
          <Input type="password" value={apiKey} className="mt-1.5" readOnly />
          <div className="absolute space-x-0.5 inset-y-0 right-0 flex items-center">
            <Button variant="ghost" onClick={copyToClipboard} className="p-2 w-10 focus:outline-none focus:ring-2 focus:ring-brand-500 hover:bg-none">
              {copySuccess ? <CheckIcon className="size-4 text-brand-900" /> : <ClipboardIcon className="size-4 text-brand-900" />}
            </Button>
          </div>
        </div>
        <p className="mt-2 text-sm/6 text-gray-600">
          Keep your key secret and do not share it with anyone.
        </p>
      </div>
    </Card>
  )
}