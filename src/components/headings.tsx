import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
}

export const Heading = ({ children, className, ...props }: HeadingProps) => {
  return (
    <h1
      className={cn(
        "text-pretty font-heading font-semibold text-4xl text-zinc-800 tracking-tight sm:text-5xl",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
};
