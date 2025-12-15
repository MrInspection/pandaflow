"use client";

import { CheckIcon, ClipboardIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ApiKeySettings = ({ apiKey }: { apiKey: string }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  };

  return (
    <Card className="w-full max-w-xl">
      <div>
        <Label>Your API Key</Label>
        <div className="relative mt-1.5">
          <Input type="password" value={apiKey} className="mt-1.5" readOnly />
          <div className="absolute inset-y-0 right-0 flex items-center space-x-0.5">
            <Button
              variant="ghost"
              onClick={copyToClipboard}
              className="w-10 p-2 hover:bg-none focus:outline-hidden focus:ring-2 focus:ring-brand-500"
            >
              {copySuccess ? (
                <CheckIcon className="size-4 text-brand-900" />
              ) : (
                <ClipboardIcon className="size-4 text-brand-900" />
              )}
            </Button>
          </div>
        </div>
        <p className="mt-2 text-gray-600 text-sm/6">
          Keep your key secret and do not share it with anyone.
        </p>
      </div>
    </Card>
  );
};
