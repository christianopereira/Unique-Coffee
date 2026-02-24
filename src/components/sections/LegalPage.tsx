import type { LegalSection } from "@/types/site-data";

interface LegalPageProps {
  data: LegalSection;
}

const URL_REGEX = /(https?:\/\/[^\s,.!?)]+(?:[,.!?)]+[^\s,.!?)]+)*)/g;

function linkify(text: string, keyPrefix: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  URL_REGEX.lastIndex = 0;
  while ((match = URL_REGEX.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <a
        key={`${keyPrefix}-link-${match.index}`}
        href={match[1]}
        target="_blank"
        rel="noopener noreferrer"
        className="text-copper underline hover:text-copper/80 transition-colors"
      >
        {match[1]}
      </a>
    );
    lastIndex = URL_REGEX.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
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
            <li key={i}>{linkify(item, `li-${elements.length}-${i}`)}</li>
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
          {linkify(trimmed, `p-${elements.length}`)}
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
