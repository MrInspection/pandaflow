"use client";

import { UserButton } from "@clerk/nextjs";
import {
  Gem,
  Home,
  Key,
  type LucideIcon,
  Menu,
  Settings,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type PropsWithChildren, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";

interface SidebarItem {
  href: string;
  icon: LucideIcon;
  text: string;
}

interface SidebarCategory {
  category: string;
  items: SidebarItem[];
}

const SIDEBAR_ITEMS: SidebarCategory[] = [
  {
    category: "Overview",
    items: [{ href: "/dashboard", icon: Home, text: "Dashboard" }],
  },
  {
    category: "Account",
    items: [{ href: "/dashboard/upgrade", icon: Gem, text: "Upgrade" }],
  },
  {
    category: "Settings",
    items: [
      { href: "/dashboard/api-key", icon: Key, text: "API Key" },
      {
        href: "/dashboard/account-settings",
        icon: Settings,
        text: "Account Settings",
      },
    ],
  },
];

const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  return (
    <div className="relative z-20 flex h-full flex-col space-y-4 md:space-y-6">
      {/* logo */}
      <Link href="/" className="flex items-center gap-2 max-sm:hidden">
        <Image
          src="/pandaflow.png"
          alt="PandaFlow Logo"
          className="h-7 w-auto"
          width={40}
          height={40}
        />
        <p className="font-semibold text-lg/7">PandaFlow</p>
      </Link>

      {/* navigation items */}
      <div className="grow">
        <ul>
          {SIDEBAR_ITEMS.map(({ category, items }) => (
            <li key={category} className="mb-4 md:mb-8">
              <p className="font-medium text-xs text-zinc-500 leading-6">
                {category}
              </p>
              <div className="-mx-2 flex flex-1 flex-col">
                {items.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "group flex w-full items-center justify-start gap-x-2.5 rounded-md px-2 py-1.5 font-medium text-sm text-zinc-700 leading-6 transition hover:bg-gray-50",
                    )}
                    onClick={onClose}
                  >
                    <item.icon className="size-4 text-zinc-500 group-hover:text-zinc-700" />
                    {item.text}
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col">
        <hr className="my-4 h-px w-full bg-gray-100 md:my-6" />
        <UserButton
          showName
          appearance={{
            elements: {
              userButtonBox: "flex-row-reverse",
            },
          }}
        />
      </div>
    </div>
  );
};

const Layout = ({ children }: PropsWithChildren) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-white md:flex-row">
      {/* sidebar for desktop */}
      <div className="relative z-10 hidden h-full w-64 border-gray-100 border-r p-6 text-brand-900 md:block lg:w-80">
        <Sidebar />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* mobile header */}
        <div className="flex items-center justify-between border-gray-200/60 border-b px-6 py-4 backdrop-blur-sm md:hidden">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/pandaflow.png"
              alt="PandaFlow Logo"
              className="h-7 w-auto"
              width={40}
              height={40}
            />
            <p className="font-semibold text-lg/7">PandaFlow</p>
          </Link>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="text-gray-500 hover:text-gray-600"
          >
            <Menu className="size-6" />
          </button>
        </div>

        {/* main content area */}
        <div className="relative z-10 flex-1 overflow-y-auto bg-gray-50 p-4 shadow-md md:p-6">
          <div className="relative flex min-h-full flex-col">
            <div className="flex h-full flex-1 flex-col space-y-4">
              {children}
            </div>
          </div>
        </div>

        <Modal
          className="p-6"
          showModal={isDrawerOpen}
          setShowModal={setIsDrawerOpen}
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/pandaflow.png"
                alt="PandaFlow Logo"
                className="h-7 w-auto"
                width={40}
                height={40}
              />
              <p className="font-semibold text-lg/7">PandaFlow</p>
            </div>
            <button
              aria-label="Close modal"
              onClick={() => setIsDrawerOpen(false)}
            >
              <X className="size-6 transition-colors hover:text-red-600" />
            </button>
          </div>
          <Sidebar onClose={() => setIsDrawerOpen(false)} />
        </Modal>
      </div>
    </div>
  );
};

export default Layout;
