import React from "react";
import { cn } from "@/lib/utils";

type TooltipProps = {
  label: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  side?: "top" | "bottom" | "left" | "right";
};

const SIDE: Record<NonNullable<TooltipProps["side"]>, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2 origin-bottom",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2 origin-top",
  left: "right-full top-1/2 -translate-y-1/2 mr-2 origin-right",
  right: "left-full top-1/2 -translate-y-1/2 ml-2 origin-left",
};

export function Tooltip({ label, children, className, side = "top" }: TooltipProps) {
  return (
    <span className="relative inline-flex group">
      {children}
      <span
        className={cn(
          "absolute z-50 px-2 py-1 rounded text-xl whitespace-nowrap",
          "bg-darkest text-white",
          "pointer-events-none",
          "opacity-0 scale-95 translate-y-1",
          "transition duration-150 ease-out",
          "group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0",
          "group-focus-within:opacity-100 group-focus-within:scale-100 group-focus-within:translate-y-0",
          SIDE[side],
          className
        )}
        role="tooltip"
      >
        {label}
      </span>
    </span>
  );
}
