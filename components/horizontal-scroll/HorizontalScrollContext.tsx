"use client";

import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { clampPanelIndex } from "@/components/horizontal-scroll/utils";

export interface HorizontalScrollContextValue {
  currentIndex: number;
  totalPanels: number;
  isHorizontalActive: boolean;
  isScrollHandlerReady: boolean;
  scrollToPanel: (index: number, animate?: boolean) => void;
}

interface HorizontalScrollInternalValue extends HorizontalScrollContextValue {
  hydrated: boolean;
  setCurrentIndexInternal: (index: number) => void;
  setTotalPanelsInternal: (count: number) => void;
  registerScrollHandler: (
    handler: ((index: number, animate?: boolean) => void) | null,
  ) => void;
  setHorizontalActive: (active: boolean) => void;
}

const HorizontalScrollContext =
  createContext<HorizontalScrollInternalValue | null>(null);

interface HorizontalScrollProviderProps {
  children: React.ReactNode;
  initialTotalPanels?: number;
}

export function HorizontalScrollProvider({
  children,
  initialTotalPanels = 0,
}: HorizontalScrollProviderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalPanels, setTotalPanels] = useState(initialTotalPanels);
  const [isHorizontalActive, setHorizontalActive] = useState(false);
  const [isScrollHandlerReady, setIsScrollHandlerReady] = useState(false);
  const hydrated = true;

  // We keep the scroll handler in a ref so callers can register/unregister it
  // without causing re-renders. The handler itself is invoked by the provider
  // when scrollToPanel is called.
  const scrollHandlerRef = useRef<
    ((index: number, animate?: boolean) => void) | null
  >(null);

  // Hydration is handled via the initial state above; no effect is required.

  // Stable scrollToPanel that callers can use. It depends on totalPanels so the
  // clamping logic is always correct when the number of panels changes.
  const scrollToPanel = useCallback(
    (index: number, animate = true) => {
      const clamped = clampPanelIndex(index, totalPanels);
      scrollHandlerRef.current?.(clamped, animate);
    },
    [totalPanels],
  );

  const setCurrentIndexInternal = useCallback(
    (index: number) => {
      setCurrentIndex(clampPanelIndex(index, totalPanels));
    },
    [totalPanels],
  );

  const setTotalPanelsInternal = useCallback((count: number) => {
    setTotalPanels(Math.max(0, count));
  }, []);

  const registerScrollHandler = useCallback(
    (handler: ((index: number, animate?: boolean) => void) | null) => {
      scrollHandlerRef.current = handler;
      setIsScrollHandlerReady(Boolean(handler));
    },
    [],
  );

  // Compose the value. All functions used by consumers are stable (useCallback),
  // so the identity of `value` only changes when actual state changes.
  const value = useMemo<HorizontalScrollInternalValue>(
    () => ({
      currentIndex,
      totalPanels,
      isHorizontalActive,
      isScrollHandlerReady,
      scrollToPanel,
      hydrated,
      setCurrentIndexInternal,
      setTotalPanelsInternal,
      registerScrollHandler,
      setHorizontalActive,
    }),
    [
      currentIndex,
      totalPanels,
      isHorizontalActive,
      isScrollHandlerReady,
      scrollToPanel,
      hydrated,
      setCurrentIndexInternal,
      setTotalPanelsInternal,
      registerScrollHandler,
    ],
  );

  return (
    <HorizontalScrollContext.Provider value={value}>
      {children}
    </HorizontalScrollContext.Provider>
  );
}

export function useHorizontalScroll(): HorizontalScrollContextValue {
  const context = useContext(HorizontalScrollContext);
  if (!context) {
    throw new Error(
      "useHorizontalScroll must be used within HorizontalScrollProvider",
    );
  }

  return {
    currentIndex: context.currentIndex,
    totalPanels: context.totalPanels,
    isHorizontalActive: context.isHorizontalActive,
    isScrollHandlerReady: context.isScrollHandlerReady,
    scrollToPanel: context.scrollToPanel,
  };
}

export function useHorizontalScrollController() {
  const context = useContext(HorizontalScrollContext);
  if (!context) {
    throw new Error(
      "useHorizontalScrollController must be used within HorizontalScrollProvider",
    );
  }

  return {
    hydrated: context.hydrated,
    currentIndex: context.currentIndex,
    totalPanels: context.totalPanels,
    setCurrentIndexInternal: context.setCurrentIndexInternal,
    setTotalPanelsInternal: context.setTotalPanelsInternal,
    registerScrollHandler: context.registerScrollHandler,
    setHorizontalActive: context.setHorizontalActive,
    scrollToPanel: context.scrollToPanel,
  };
}
