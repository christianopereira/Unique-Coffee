import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, CSSProperties } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  /** Per-button background/border color override */
  ctaBg?: string;
  /** Per-button text color override */
  ctaTextColor?: string;
}

export function Button({
  children,
  variant = "primary",
  href,
  className,
  ctaBg,
  ctaTextColor,
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
  const btnStyle: CSSProperties = { borderRadius: "var(--btn-radius, 8px)" };

  // Apply per-button color overrides via inline styles
  if (ctaBg) {
    if (variant === "primary") btnStyle.backgroundColor = ctaBg;
    else if (variant === "secondary") btnStyle.borderColor = ctaBg;
    else if (variant === "ghost") btnStyle.color = ctaBg;
  }
  if (ctaTextColor) {
    if (variant === "primary" || variant === "secondary") btnStyle.color = ctaTextColor;
  }

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
