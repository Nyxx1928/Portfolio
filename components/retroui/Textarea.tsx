import React from "react";
import { cn } from "@/lib/utils";

export function Textarea({
  placeholder = "Enter text...",
  className = "",
  ...props
}) {
  return (
    <textarea
      placeholder={placeholder}
      rows={4}
      className={cn(
        "w-full border-2 border-manga-black bg-[#e8e8e8]",
        "px-4 py-3 font-body text-lg text-manga-black",
        "shadow-manga",
        "placeholder:text-manga-gray-600",
        "outline-none transition-all duration-150 ease-out",
        "hover:-translate-y-0.5",
        "focus-visible:translate-x-1 focus-visible:translate-y-1",
        "focus-visible:shadow-none",
        "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0",
        className
      )}
      {...props}
    />
  );
}
