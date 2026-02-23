import type { LegalSection } from "@/types/site-data";

interface LegalPageProps {
  data: LegalSection;
}

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];

  function flushList() {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="list-disc pl-5 mt-2 space-y-1">
          {listItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  }

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("- ")) {
      listItems.push(trimmed.slice(2));
    } else {
      flushList();
      if (trimmed === "") {
        continue;
      }
      elements.push(
        <p key={`p-${elements.length}`} className={elements.length > 0 ? "mt-2" : ""}>
          {trimmed}
        </p>
      );
    }
  }
  flushList();

  return elements;
}

export function LegalPage({ data }: LegalPageProps) {
  return (
    <>
      <div className="pt-24" />
      <section className="section-padding bg-cream">
        <div className="section-container max-w-3xl">
          <h1 className="text-section font-display text-espresso mb-8">
            {data.title}
          </h1>

          {data.intro && (
            <p className="font-body text-roast text-sm leading-relaxed mb-8">
              {data.intro}
            </p>
          )}

          <div className="space-y-8 font-body text-roast text-sm leading-relaxed">
            {data.sections.map((section, i) => (
              <div key={i}>
                <h2 className="font-display text-lg text-espresso mb-3">
                  {section.heading}
                </h2>
                {renderContent(section.content)}
              </div>
            ))}

            {data.lastUpdated && (
              <p className="text-xs text-mocha pt-4 border-t border-linen">
                Ultima actualizacao: {data.lastUpdated}
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
