// src/components/nav/route-history.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "rms:userTrail:v1";
const MAX_ITEMS = 10;

const normalize = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);

const parseUserTag = (pathname: string) => {
  const p = normalize(pathname);
  const m = p.match(/^\/user\/([^/]+)$/);
  return m?.[1] ?? null;
};

type TrailItem = { tag: string };

export default function RouteHistory({ className }: { className?: string }) {
  const location = useLocation();
  const pathname = normalize(location.pathname);
  const tag = parseUserTag(pathname);

  const prevPathRef = useRef<string>(pathname);

  const [trail, setTrail] = useState<TrailItem[]>(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      const parsed = raw ? (JSON.parse(raw) as TrailItem[]) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (!tag) {
      prevPathRef.current = pathname;
      return;
    }

    const prevPath = prevPathRef.current;
    const prevWasUser = !!parseUserTag(prevPath);
    const forceReset =
      (location.search as any)?.trail === "reset" ||
      (location.state as any)?.trail === "reset";

    setTrail((cur) => {
      const last = cur[cur.length - 1]?.tag;

      if (last === tag) return cur;

      if (forceReset || !prevWasUser) {
        const next = [{ tag }];
        try {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {}
        return next;
      }

      const idx = cur.findIndex((x) => x.tag === tag);
      if (idx !== -1) {
        const next = cur.slice(0, idx + 1);
        try {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {}
        return next;
      }

      const next = [...cur, { tag }].slice(-MAX_ITEMS);
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });

    prevPathRef.current = pathname;
  }, [pathname, tag, location.search, location.state]);

  const crumbs = useMemo(() => {
    const items = trail.length ? trail : tag ? [{ tag }] : [];
    return items;
  }, [trail, tag]);

  if (!tag) return null;

  return (
    <div className={cn(["px-6 pt-1", className])}>
      <nav className="flex flex-wrap items-center gap-2 text-white/60 text-2xl">
        <Link to="/" className="hover:text-white transition-colors">
          Home
        </Link>

        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1;
          const to = `/user/${c.tag}`;

          return (
            <div key={`${c.tag}-${i}`} className="flex items-center gap-2">
              <span className="">/</span>
              {isLast ? (
                <span className="text-green">{`${c.tag}`}</span>
              ) : (
                <Link to={to} className="hover:text-white transition-colors ">
                  {`${c.tag}`}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
