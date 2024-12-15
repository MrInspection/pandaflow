import { ReactNode } from "react"
import { Icons } from "@/components/icons"
import {
  Bolt,
  Cog,
  Compass, Gift,
  Headphones, HelpCircle, Inbox,
  Mic,
  Phone,
  Pin,
  Plus, PlusCircle, Search, Smile, Sticker,
  Store,
  UserCircle, UserPlus2,
  Video,
} from "lucide-react"
import Image from "next/image"

export const MockDiscordUI = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-[800px] w-full max-w-[1200px] bg-discord-gray text-white rounded-lg overflow-hidden shadow-xl">

      {/* Discord Server List */}
      <section className="hidden sm:flex w-[72px] bg-[#202225] py-3 flex-col items-center">
        <div className="size-12 bg-discord-brand-color rounded-2xl flex items-center justify-center mb-2 hover:rounded-xl transition-all duration-200">
          <Icons.discord className="size-3/5 text-white" />
        </div>
        <div className="w-8 h-[2px] bg-discord-gray rounded-full my-2" />
        {[...Array(5)].map((_, i) => (
          <div key={i}
               className="size-12 bg-discord-gray rounded-3xl flex items-center justify-center mb-3 hover:rounded-xl transition-all duration-200 hover:bg-discord-brand-color cursor-not-allowed">
            <span className="text-lg font-semibold text-gray-400">
              {String.fromCharCode(65 + i)}
            </span>
          </div>
        ))}
        <div className="group size-12 bg-discord-gray rounded-3xl flex items-center justify-center mb-3 hover:rounded-xl transition-all duration-200 hover:bg-[#3ba55c] cursor-not-allowed">
          <Plus className="text-[#3ba55c] group-hover:text-white" />
        </div>
        <div
          className="group size-12 bg-discord-gray rounded-3xl flex items-center justify-center mb-3 hover:rounded-xl transition-all duration-200 hover:bg-[#3ba55c] cursor-not-allowed">
          <Compass className="text-white" />
        </div>
      </section>

      {/* Discord DM List */}
      <section className="hidden lg:flex w-60 bg-[#2f3136] flex-col">
        <div className="px-4 h-16 border-b border-[#202225] flex items-center shadow-sm">
          <div
            className="w-full bg-[#202225] text-sm rounded pl-0 pr-2 h-8 flex items-center justify-center text-gray-500 cursor-not-allowed">
            Find or start a conversation
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pt-4">
          <div className="px-2 mb-4">
            <div
              className="flex items-center text-sm px-2 py-1.5 rounded hover:bg-[#393c43] text-discord-text cursor-not-allowed">
              <UserCircle className="mr-4 size-8 text-discord-text" />
              <span className="font-medium text-sm">Friends</span>
            </div>
            <div
              className="flex items-center text-sm px-2 py-1.5 rounded hover:bg-[#393c43] text-discord-text cursor-not-allowed">
              <Bolt className="mr-4 size-8 text-discord-text" />
              <span className="font-medium text-sm">Nitro</span>
            </div>
            <div
              className="flex items-center text-sm px-2 py-1.5 rounded hover:bg-[#393c43] text-discord-text cursor-not-allowed">
              <Store className="mr-4 size-8 text-discord-text" />
              <span className="font-medium text-sm">Shop</span>
            </div>
          </div>

          <div className="px-2 mb-4">
            <h3 className="text-xs font-semibold text-[#8e9297] px-2 mb-2 uppercase">
              Direct Messages
            </h3>
            <section className="flex items-center px-2 py-1.5 rounded bg-[#393c43] text-white cursor-pointer">
              <Image
                src="/brand-asset-profile-picture.png"
                alt="PandaFlow Avatar"
                width={32}
                height={32}
                className="object-cover rounded-full mr-3"
              />
              <span className="font-medium">PandaFlow</span>
            </section>
            <section className="my-1 space-y-px">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center px-2 py-1.5 rounded text-gray-600 cursor-not-allowed">
                  <div className="size-8 rounded-full bg-discord-gray mr-3" />
                  <span className="font-medium">User {i + 1}</span>
                </div>
              ))}
            </section>
          </div>
        </div>

        <div className="p-2 bg-[#292b2f] flex items-center">
          <div className="relative">
            <Image
              src="/mrinspection.png"
              alt="PandaFlow Avatar"
              width={32}
              height={32}
              className="object-cover rounded-full mr-2 size-8"
            />
            <div className="absolute bottom-0 right-2 size-3 bg-red-500 rounded-full border-2 border-[#36393f]" />
          </div>

          <div className="flex-1">
            <p className="text-sm font-medium text-white">Moussa</p>
            <p className="text-xs text-[#b9bbbe] flex items-center">Do not disturb</p>
          </div>
          <div className="flex items-center space-x-2">
            <Mic className="size-5 text-[#b9bbbe] hover:text-white cursor-pointer" />
            <Headphones className="size-5 text-[#b9bbbe] hover:text-white cursor-pointer" />
            <Cog className="size-5 text-[#b9bbbe] hover:text-white cursor-pointer" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 flex flex-col">
        <div className="h-16 bg-[#36393f] flex items-center px-4 shadow-sm border-b border-[#202225]">
          <div className="flex items-center">
            <div className="relative">
              <Image
                src="/brand-asset-profile-picture.png"
                alt="PandaFlow Avatar"
                width={40}
                height={40}
                className="object-cover rounded-full mr-3"
              />
              <div className="absolute bottom-0 right-3 size-3 bg-green-500 rounded-full border-2 border-[#36393f]" />
            </div>
            <p className="font-semibold">PandaFlow</p>
          </div>
          <div className="ml-auto flex items-center space-x-4 text-[#b9bbbe]">
            <Phone className="size-5 hover:text-white cursor-not-allowed" />
            <Video className="size-5 hover:text-white cursor-not-allowed" />
            <Pin className="size-5 hover:text-white cursor-not-allowed max-sm:hidden" />
            <UserPlus2 className="size-5 hover:text-white cursor-not-allowed max-sm:hidden" />
            <Search className="size-5 hover:text-white cursor-not-allowed max-sm:hidden" />
            <Inbox className="size-5 hover:text-white cursor-not-allowed max-sm:hidden" />
            <HelpCircle className="size-5 hover:text-white cursor-not-allowed max-sm:hidden" />
          </div>
        </div>

        {/* Message History */}
        <div className="flex-1 overflow-y-auto p-4 bg-discord-gray flex flex-col-reverse">
          {children}
        </div>

        {/* Message Input */}
        <div className="p-4">
          <div className="flex items-center bg-[#40444b] rounded-lg p-1">
            <PlusCircle className="mx-3 text-[#b9bbbe] hover:text-white cursor-not-allowed" />
            <input
              readOnly type="text"
              placeholder="Message @PandaFlow"
              className="flex-1 bg-transparent py-2.5 px-1 focus:outline-none text-white placeholder-[#72767d] cursor-not-allowed"
            />
            <div className="flex items-center space-x-3 mx-3 text-[#b9bbbe]">
              <Gift className="size-5 hover:text-white cursor-not-allowed max-sm:hidden" />
              <Sticker className="size-5 hover:text-white cursor-not-allowed max-sm:hidden" />
              <Smile className="size-5 hover:text-white cursor-not-allowed max-sm:hidden" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}