import {
  Bolt,
  Cog,
  Compass,
  Gift,
  Headphones,
  HelpCircle,
  Inbox,
  Mic,
  Phone,
  Pin,
  Plus,
  PlusCircle,
  Search,
  Smile,
  Sticker,
  Store,
  UserCircle,
  UserPlus2,
  Video,
} from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { Icons } from "@/components/icons";

export const MockDiscordUI = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-[800px] w-full max-w-[1200px] overflow-hidden rounded-lg bg-discord-gray text-white shadow-xl">
      {/* Discord Server List */}
      <section className="hidden w-[72px] flex-col items-center bg-[#202225] py-3 sm:flex">
        <div className="mb-2 flex size-12 items-center justify-center rounded-2xl bg-discord-brand-color transition-all duration-200 hover:rounded-xl">
          <Icons.discord className="size-3/5 text-white" />
        </div>
        <div className="my-2 h-[2px] w-8 rounded-full bg-discord-gray" />
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="mb-3 flex size-12 cursor-not-allowed items-center justify-center rounded-3xl bg-discord-gray transition-all duration-200 hover:rounded-xl hover:bg-discord-brand-color"
          >
            <span className="font-semibold text-gray-400 text-lg">
              {String.fromCharCode(65 + i)}
            </span>
          </div>
        ))}
        <div className="group mb-3 flex size-12 cursor-not-allowed items-center justify-center rounded-3xl bg-discord-gray transition-all duration-200 hover:rounded-xl hover:bg-[#3ba55c]">
          <Plus className="text-[#3ba55c] group-hover:text-white" />
        </div>
        <div className="group mb-3 flex size-12 cursor-not-allowed items-center justify-center rounded-3xl bg-discord-gray transition-all duration-200 hover:rounded-xl hover:bg-[#3ba55c]">
          <Compass className="text-white" />
        </div>
      </section>

      {/* Discord DM List */}
      <section className="hidden w-60 flex-col bg-[#2f3136] lg:flex">
        <div className="flex h-16 items-center border-[#202225] border-b px-4 shadow-xs">
          <div className="flex h-8 w-full cursor-not-allowed items-center justify-center rounded bg-[#202225] pr-2 pl-0 text-gray-500 text-sm">
            Find or start a conversation
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pt-4">
          <div className="mb-4 px-2">
            <div className="flex cursor-not-allowed items-center rounded px-2 py-1.5 text-discord-text text-sm hover:bg-[#393c43]">
              <UserCircle className="mr-4 size-8 text-discord-text" />
              <span className="font-medium text-sm">Friends</span>
            </div>
            <div className="flex cursor-not-allowed items-center rounded px-2 py-1.5 text-discord-text text-sm hover:bg-[#393c43]">
              <Bolt className="mr-4 size-8 text-discord-text" />
              <span className="font-medium text-sm">Nitro</span>
            </div>
            <div className="flex cursor-not-allowed items-center rounded px-2 py-1.5 text-discord-text text-sm hover:bg-[#393c43]">
              <Store className="mr-4 size-8 text-discord-text" />
              <span className="font-medium text-sm">Shop</span>
            </div>
          </div>

          <div className="mb-4 px-2">
            <h3 className="mb-2 px-2 font-semibold text-[#8e9297] text-xs uppercase">
              Direct Messages
            </h3>
            <section className="flex cursor-pointer items-center rounded bg-[#393c43] px-2 py-1.5 text-white">
              <Image
                src="/brand-asset-profile-picture.png"
                alt="PandaFlow Avatar"
                width={32}
                height={32}
                className="mr-3 rounded-full object-cover"
              />
              <span className="font-medium">PandaFlow</span>
            </section>
            <section className="my-1 space-y-px">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex cursor-not-allowed items-center rounded px-2 py-1.5 text-gray-600"
                >
                  <div className="mr-3 size-8 rounded-full bg-discord-gray" />
                  <span className="font-medium">User {i + 1}</span>
                </div>
              ))}
            </section>
          </div>
        </div>

        <div className="flex items-center bg-[#292b2f] p-2">
          <div className="relative">
            <Image
              src="/mrinspection.png"
              alt="PandaFlow Avatar"
              width={32}
              height={32}
              className="mr-2 size-8 rounded-full object-cover"
            />
            <div className="absolute right-2 bottom-0 size-3 rounded-full border-2 border-discord-gray bg-red-500" />
          </div>

          <div className="flex-1">
            <p className="font-medium text-sm text-white">Moussa</p>
            <p className="flex items-center text-[#b9bbbe] text-xs">
              Do not disturb
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Mic className="size-5 cursor-pointer text-[#b9bbbe] hover:text-white" />
            <Headphones className="size-5 cursor-pointer text-[#b9bbbe] hover:text-white" />
            <Cog className="size-5 cursor-pointer text-[#b9bbbe] hover:text-white" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex flex-1 flex-col">
        <div className="flex h-16 items-center border-[#202225] border-b bg-discord-gray px-4 shadow-xs">
          <div className="flex items-center">
            <div className="relative">
              <Image
                src="/brand-asset-profile-picture.png"
                alt="PandaFlow Avatar"
                width={40}
                height={40}
                className="mr-3 rounded-full object-cover"
              />
              <div className="absolute right-3 bottom-0 size-3 rounded-full border-2 border-discord-gray bg-green-500" />
            </div>
            <p className="font-semibold">PandaFlow</p>
          </div>
          <div className="ml-auto flex items-center space-x-4 text-[#b9bbbe]">
            <Phone className="size-5 cursor-not-allowed hover:text-white" />
            <Video className="size-5 cursor-not-allowed hover:text-white" />
            <Pin className="size-5 cursor-not-allowed hover:text-white max-sm:hidden" />
            <UserPlus2 className="size-5 cursor-not-allowed hover:text-white max-sm:hidden" />
            <Search className="size-5 cursor-not-allowed hover:text-white max-sm:hidden" />
            <Inbox className="size-5 cursor-not-allowed hover:text-white max-sm:hidden" />
            <HelpCircle className="size-5 cursor-not-allowed hover:text-white max-sm:hidden" />
          </div>
        </div>

        {/* Message History */}
        <div className="flex flex-1 flex-col-reverse overflow-y-auto bg-discord-gray p-4">
          {children}
        </div>

        {/* Message Input */}
        <div className="p-4">
          <div className="flex items-center rounded-lg bg-[#40444b] p-1">
            <PlusCircle className="mx-3 cursor-not-allowed text-[#b9bbbe] hover:text-white" />
            <input
              readOnly
              type="text"
              placeholder="Message @PandaFlow"
              className="flex-1 cursor-not-allowed bg-transparent px-1 py-2.5 text-white placeholder-discord-timestamp focus:outline-hidden"
            />
            <div className="mx-3 flex items-center space-x-3 text-[#b9bbbe]">
              <Gift className="size-5 cursor-not-allowed hover:text-white max-sm:hidden" />
              <Sticker className="size-5 cursor-not-allowed hover:text-white max-sm:hidden" />
              <Smile className="size-5 cursor-not-allowed hover:text-white max-sm:hidden" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
