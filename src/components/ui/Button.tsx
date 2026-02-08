import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
}

export function Button({
  children,
  variant = "primary",
  href,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-block font-sans text-sm font-semibold tracking-widest uppercase transition-all duration-400";

  const variants = {
    primary:
      "bg-copper text-warm-white px-8 py-3 hover:bg-copper/90",
    secondary:
      "border border-copper text-copper px-8 py-3 hover:bg-copper hover:text-warm-white",
    ghost:
      "text-copper relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-copper after:transition-all after:duration-400 hover:after:w-full",
  };

  const classes = cn(baseStyles, variants[variant], className);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
