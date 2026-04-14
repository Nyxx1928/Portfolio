import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React, { ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";

export const buttonVariants = cva(
  "font-heading uppercase tracking-wider border-2 border-manga-black cursor-pointer inline-flex items-center justify-center gap-2 transition-all duration-150 ease-out shadow-manga hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-manga-pressed focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] focus-visible:shadow-manga-pressed focus-visible:outline-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-60 disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-none",
  {
    variants: {
      variant: {
        default: "bg-manga-black text-manga-white",
        secondary: "bg-manga-gray-800 text-manga-white",
        outline: "bg-manga-white text-manga-black",
        link: "bg-transparent hover:underline",
        ghost: "bg-transparent text-manga-black shadow-none hover:bg-manga-gray-50 hover:translate-x-0 hover:translate-y-0"
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 lg:px-8 py-2.5 lg:py-3 text-base lg:text-lg",
        icon: "p-2",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  },
);

export interface IButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      children,
      size = "md",
      className = "",
      variant = "default",
      asChild = false,
      ...props
    }: IButtonProps,
    forwardedRef,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={forwardedRef}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);

Button.displayName = "Button";