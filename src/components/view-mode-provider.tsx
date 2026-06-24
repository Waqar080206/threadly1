"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/navigation";

export type ViewMode =
  | "personal"
  | "teams"
  | "enterprise";

type ViewModeContextValue = {
  mode: ViewMode;
  setMode: (next: ViewMode) => void;
};

const ViewModeContext =
  createContext<ViewModeContextValue | null>(
    null
  );

export function ViewModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [mode, setModeState] =
    useState<ViewMode>("personal");

  const setMode = (next: ViewMode) => {
    setModeState(next);

    if (next === "enterprise") {
      router.push("/dashboard/enterprise");
      return;
    }

    if (next === "teams") {
      router.push("/dashboard");
      return;
    }

    router.push("/dashboard");
  };

  const value = useMemo(
    () => ({
      mode,
      setMode,
    }),
    [mode]
  );

  return (
    <ViewModeContext.Provider value={value}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  const ctx =
    useContext(ViewModeContext);

  if (!ctx) {
    return {
      mode: "personal" as ViewMode,
      setMode: () => {},
    };
  }

  return ctx;
}