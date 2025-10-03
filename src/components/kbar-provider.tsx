"use client";

import {
  KBarProvider as BaseKBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  KBarResults,
  useMatches,
  Action,
} from "kbar";
import { useRouter } from "next/navigation";

export function KBarProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const actions: Action[] = [
    {
      id: "home",
      name: "Home",
      shortcut: ["h"],
      keywords: "home start",
      perform: () => router.push("/"),
    },
    {
      id: "plan-step",
      name: "Plan Step by Step",
      shortcut: ["s"],
      keywords: "step plan questionnaire",
      perform: () => router.push("/plan/step"),
    },
    {
      id: "plan-full",
      name: "Full Trip Plan",
      shortcut: ["f"],
      keywords: "full plan complete",
      perform: () => router.push("/plan/full"),
    },
  ];

  return (
    <BaseKBarProvider actions={actions}>
      <KBarPortal>
        <KBarPositioner className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm">
          <KBarAnimator className="w-full max-w-2xl mx-auto mt-32 bg-background border rounded-xl shadow-2xl overflow-hidden">
            <KBarSearch className="w-full px-4 py-3 text-base border-b bg-background text-foreground placeholder:text-muted-foreground outline-none" />
            <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </BaseKBarProvider>
  );
}

function RenderResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div className="px-4 py-2 text-xs text-muted-foreground uppercase font-semibold">
            {item}
          </div>
        ) : (
          <div
            className={`px-4 py-3 cursor-pointer transition-colors ${
              active ? "bg-primary/10" : "bg-background"
            }`}
          >
            <div className="font-medium">{item.name}</div>
            {item.shortcut && (
              <div className="text-xs text-muted-foreground mt-1">{item.shortcut.join(" + ")}</div>
            )}
          </div>
        )
      }
    />
  );
}
