import React, { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "Enter text",
  className = "",
  ...props
}) => {
  const isInvalid = Boolean(props["aria-invalid"]);

  return (
    <input
      type={type}
      placeholder={placeholder}
      className={cn(
        "w-full border-2 border-manga-black bg-[#e8e8e8]",
        "px-4 py-3 font-body text-lg text-manga-black",
        "placeholder:text-manga-gray-600",
        "shadow-manga",
        "outline-none transition-all duration-150 ease-out",
        "hover:-translate-y-0.5",
        "focus-visible:translate-x-1 focus-visible:translate-y-1",
        "focus-visible:shadow-none",
        "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0",
        isInvalid && "border-manga-gray-600 bg-manga-gray-50",
        className
      )}
      {...props}
    />
  );
};
