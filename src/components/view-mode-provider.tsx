"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

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
  const [mode, setMode] =
    useState<ViewMode>("personal");

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