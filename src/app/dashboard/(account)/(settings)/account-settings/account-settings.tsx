"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { client } from "@/lib/client";

export const AccountSettings = ({
  discordId: InitialDiscordId,
}: {
  discordId: string;
}) => {
  const [discordId, setDiscordId] = useState(InitialDiscordId);

  const { mutate, isPending } = useMutation({
    mutationFn: async (discordId: string) => {
      const res = await client.project.setDiscordId.$post({ discordId });
      return await res.json();
    },
  });

  return (
    <Card className="w-full max-w-xl space-y-4">
      <div className="mt-2">
        <Label>Discord ID</Label>
        <Input
          className="mt-1.5"
          value={discordId}
          onChange={(e) => setDiscordId(e.target.value)}
          placeholder="Enter your Discord ID"
        />
      </div>
      <p className="mt-2 text-gray-600 text-sm/6">
        Don&apos; know how to find your Discord ID?{" "}
        <Link
          href="https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID"
          className="text-brand-600 hover:text-brand-500"
        >
          Learn how to obtain it here
        </Link>
        .
      </p>
      <div className="w-full pt-4">
        <Button
          onClick={() => mutate(discordId)}
          disabled={isPending}
          className="mr-auto"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </Card>
  );
};
