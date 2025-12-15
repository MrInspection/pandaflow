import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ShinyButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

export const ShinyButton = ({
  className,
  children,
  href,
  ...props
}: ShinyButtonProps) => {
  return (
    <Link
      href={href ?? "#"}
      className={cn(
        "group relative flex transform items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md border-white bg-brand-700 px-8 font-medium text-base/7 text-white transition-all duration-300 hover:ring-2 hover:ring-brand-700 hover:ring-offset-2 focus:outline-hidden focus:ring-2 focus:ring-offset-2",
        className,
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <ArrowRightIcon className="size-4 shrink-0 text-white transition-transform ease-in-out group-hover:translate-x-[2px]" />
      </span>
      <div className="absolute -top-[50px] -left-[75px] -z-10 h-[155px] w-8 rotate-35 bg-white opacity-20 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:left-[120%]" />
    </Link>
  );
};
