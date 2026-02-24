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
    primary: "btn-primary px-8 py-3",
    secondary: "btn-secondary border px-8 py-3",
    ghost: "btn-ghost relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:transition-all after:duration-400 hover:after:w-full",
  };

  const classes = cn(baseStyles, variants[variant], className);
  const btnStyle = { borderRadius: "var(--btn-radius, 8px)" };

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        style={btnStyle}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} style={btnStyle} {...props}>
      {children}
    </button>
  );
}
