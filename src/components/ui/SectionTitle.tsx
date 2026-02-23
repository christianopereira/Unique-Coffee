import { ScrollReveal } from "./ScrollReveal";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionTitle({
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionTitleProps) {
  return (
    <div
      className={`mb-12 md:mb-16 ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      <ScrollReveal>
        <h2
          className={`text-section font-display ${
            light ? "text-warm-white" : "text-espresso"
          }`}
        >
          {title}
        </h2>
      </ScrollReveal>
      {subtitle && (
        <ScrollReveal delay={0.1}>
          <p
            className={`mt-4 text-subtitle font-body italic ${
              light ? "text-linen" : "text-mocha"
            }`}
          >
            {subtitle}
          </p>
        </ScrollReveal>
      )}
    </div>
  );
}
