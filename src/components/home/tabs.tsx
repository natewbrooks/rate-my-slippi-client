import { useMemo, useState } from "react";

type Tab = {
  key: string;
  label: string;
};

export function SlidingTabs() {
  const tabs = useMemo<Tab[]>(
    () => [
      { key: "feed", label: "Feed" },
      { key: "news", label: "News" },
      { key: "faq", label: "FAQ" },
      { key: "help", label: "Help" },
    ],
    []
  );

  const [active, setActive] = useState<string>(tabs[0].key);

  const activeIndex = tabs.findIndex((t) => t.key === active);
  const w = 100 / tabs.length;

  return (
    <div className="w-full bg-darkest rounded-2xl relative">
      <div
        className="absolute top-0 h-full rounded-2xl bg-red transition-transform duration-300 ease-out"
        style={{
          width: `${w}%`,
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      />
      <div className="relative z-10 flex">
        {tabs.map((t) => {
          const isActive = t.key === active;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setActive(t.key)}
              className={`w-full text-4xl rounded-xl text-center transition-colors duration-300 ${
                isActive ? "text-white" : "text-white/50 hover:text-white/80"
              }`}
            >
              <h3 className="leading-8">{t.label}</h3>
            </button>
          );
        })}
      </div>
    </div>
  );
}
