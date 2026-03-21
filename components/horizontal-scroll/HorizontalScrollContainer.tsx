"use client";

import { useHorizontalScrollController } from "@/components/horizontal-scroll/HorizontalScrollContext";
import { PageTransitionOverlay } from "@/components/horizontal-scroll/PageTransitionOverlay";
import { PanelNavigator } from "@/components/horizontal-scroll/PanelNavigator";
import { PanelPage } from "@/components/horizontal-scroll/PanelPage";
import {
  clampPanelIndex,
  getClosestPanelIndexFromScroll,
  getDirectionalDelta,
  getRawScrollLeftForIndex,
  shouldIgnoreArrowNavigation,
} from "@/components/horizontal-scroll/utils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface PanelConfig {
  id: string;
  label: string;
  component: React.ComponentType;
  allowInternalScroll?: boolean;
}

interface HorizontalScrollContainerProps {
  panels: PanelConfig[];
}

export function HorizontalScrollContainer({
  panels,
}: HorizontalScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerNode, setContainerNode] = useState<HTMLDivElement | null>(
    null,
  );
  const rafRef = useRef<number | null>(null);
  const resizeTimerRef = useRef<number | null>(null);
  const panelBottomStateRef = useRef<Record<number, boolean>>({});
  const touchStartXRef = useRef(0);
  const accumulatedDeltaRef = useRef(0);
  const gestureTimeoutRef = useRef<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const {
    currentIndex,
    totalPanels,
    hydrated,
    setCurrentIndexInternal,
    setTotalPanelsInternal,
    registerScrollHandler,
    scrollToPanel,
  } = useHorizontalScrollController();

  const currentIndexRef = useRef(currentIndex);

  // Keep currentIndexRef in sync with currentIndex
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const setContainerRef = useCallback((node: HTMLDivElement | null) => {
    containerRef.current = node;
    setContainerNode(node);
  }, []);

  useEffect(() => {
    setTotalPanelsInternal(panels.length);
  }, [panels.length, setTotalPanelsInternal]);

  useEffect(() => {
    if (!hydrated || !containerNode) {
      return;
    }

    const container = containerNode;

    const handler = (index: number, animate = true) => {
      const clamped = clampPanelIndex(index, panels.length);
      if (panels.length === 0) {
        return;
      }

      const panelWidth = container.clientWidth;
      if (panelWidth <= 0) {
        return;
      }

      const maxScrollLeft = Math.max(
        0,
        container.scrollWidth - container.clientWidth,
      );
      const left = getRawScrollLeftForIndex(
        clamped,
        panelWidth,
        maxScrollLeft,
        "ltr",
      );

      setIsTransitioning(animate);
      container.scrollTo({ left, behavior: animate ? "smooth" : "auto" });
      setCurrentIndexInternal(clamped);
    };

    registerScrollHandler(handler);
    handler(0, false);

    return () => {
      registerScrollHandler(null);
    };
  }, [
    containerNode,
    hydrated,
    panels.length,
    registerScrollHandler,
    setCurrentIndexInternal,
  ]);

  useEffect(() => {
    if (!containerNode || totalPanels === 0) {
      return;
    }

    const container = containerNode;

    const updateActiveIndex = () => {
      const panelWidth = container.clientWidth;
      if (panelWidth <= 0) {
        return;
      }

      const maxScrollLeft = Math.max(
        0,
        container.scrollWidth - container.clientWidth,
      );
      const closest = getClosestPanelIndexFromScroll(
        container.scrollLeft,
        panelWidth,
        totalPanels,
        maxScrollLeft,
        "ltr",
      );

      setCurrentIndexInternal(closest);
    };

    const onScroll = () => {
      if (rafRef.current !== null) {
        return;
      }

      rafRef.current = requestAnimationFrame(() => {
        updateActiveIndex();
        rafRef.current = null;
      });
    };

    container.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [containerNode, setCurrentIndexInternal, totalPanels]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    scrollToPanel(0, false);
  }, [scrollToPanel]);

  useEffect(() => {
    const activePanel = document.getElementById(panels[currentIndex]?.id ?? "");
    const heading = activePanel?.querySelector<HTMLElement>(
      '[data-panel-heading="true"]',
    );
    heading?.focus({ preventScroll: true });
  }, [currentIndex, panels]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const container = containerRef.current;
      if (!container) {
        return;
      }

      const activeElement = document.activeElement;
      if (!activeElement || !container.contains(activeElement)) {
        return;
      }

      if (shouldIgnoreArrowNavigation(event.target)) {
        return;
      }

      const directionStep = 1;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        scrollToPanel(currentIndex + directionStep);
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        scrollToPanel(currentIndex - directionStep);
      }
    },
    [currentIndex, scrollToPanel],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 1) {
        return;
      }

      // Use ref to get current index — avoids stale closure bug
      const idx = currentIndexRef.current;
      const activePanel = container.children.item(idx) as HTMLElement | null;
      const allowsInternalScroll =
        activePanel?.dataset.allowInternalScroll === "true";

      if (allowsInternalScroll && activePanel) {
        const atTop = activePanel.scrollTop <= 0;
        // A panel with no overflow (scrollHeight === clientHeight) is always at
        // bottom — treat it as such so horizontal navigation still fires.
        const hasOverflow = activePanel.scrollHeight > activePanel.clientHeight + 1;
        const atBottom = !hasOverflow || (panelBottomStateRef.current[idx] ?? false);

        // Scrolling down: allow internal scroll if not at bottom
        if (event.deltaY > 0 && !atBottom) {
          return; // Allow browser to scroll the panel
        }

        // Scrolling up: allow internal scroll if not at top
        if (event.deltaY < 0 && !atTop) {
          return; // Allow browser to scroll the panel
        }
      }

      event.preventDefault();

      // Trackpad detection
      const isTrackpad = event.deltaMode === 0 && Math.abs(event.deltaY) < 100;

      if (isTrackpad) {
        // Trackpad gesture handling with delta accumulation
        accumulatedDeltaRef.current += event.deltaY;

        // Clear existing gesture timeout
        if (gestureTimeoutRef.current !== null) {
          window.clearTimeout(gestureTimeoutRef.current);
        }

        // Set timeout to detect gesture end (150ms)
        gestureTimeoutRef.current = window.setTimeout(() => {
          const accumulated = accumulatedDeltaRef.current;
          const threshold = 50;

          if (Math.abs(accumulated) >= threshold) {
            // Determine direction
            const direction = accumulated > 0 ? 1 : -1;
            scrollToPanel(currentIndexRef.current + direction);
          }

          // Reset accumulation after gesture completes
          accumulatedDeltaRef.current = 0;
          gestureTimeoutRef.current = null;
        }, 150);
      } else {
        // Mouse wheel events bypass accumulation logic
        const directionalDelta = getDirectionalDelta(event.deltaY, "ltr");
        container.scrollBy({ left: directionalDelta, behavior: "smooth" });
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", onWheel);
      if (gestureTimeoutRef.current !== null) {
        window.clearTimeout(gestureTimeoutRef.current);
        gestureTimeoutRef.current = null;
      }
    };
  // scrollToPanel is stable; currentIndex is read via ref to avoid re-registering
   
  }, [scrollToPanel]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const onTouchStart = (event: TouchEvent) => {
      touchStartXRef.current = event.changedTouches[0]?.clientX ?? 0;
    };

    const onTouchEnd = (event: TouchEvent) => {
      const endX = event.changedTouches[0]?.clientX ?? 0;
      const deltaX = endX - touchStartXRef.current;
      const threshold = 50;
      if (Math.abs(deltaX) < threshold) {
        return;
      }

      const directionStep = 1;

      if (deltaX < 0) {
        scrollToPanel(currentIndex + directionStep);
      } else {
        scrollToPanel(currentIndex - directionStep);
      }
    };

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, [currentIndex, scrollToPanel]);

  useEffect(() => {
    const onResize = () => {
      if (resizeTimerRef.current !== null) {
        window.clearTimeout(resizeTimerRef.current);
      }

      resizeTimerRef.current = window.setTimeout(() => {
        scrollToPanel(currentIndex, false);
      }, 150);
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (resizeTimerRef.current !== null) {
        window.clearTimeout(resizeTimerRef.current);
      }
    };
  }, [currentIndex, scrollToPanel]);

  const renderedPanels = useMemo(
    () =>
      panels.map((panel, index) => {
        const PanelComponent = panel.component;
        return (
          <PanelPage
            key={panel.id}
            id={panel.id}
            label={panel.label}
            index={index}
            allowInternalScroll={panel.allowInternalScroll}
            isActive={index === currentIndex}
            onBottomInViewChange={(panelIndex, inView) => {
              panelBottomStateRef.current[panelIndex] = inView;
            }}
          >
            <PanelComponent />
          </PanelPage>
        );
      }),
    [currentIndex, panels],
  );

  return (
    <>
      <div
        ref={setContainerRef}
        className="flex h-screen w-full snap-x snap-mandatory overflow-x-scroll overflow-y-hidden scroll-smooth"
        dir="ltr"
      >
        {renderedPanels}
      </div>

      <PanelNavigator />
      <PageTransitionOverlay
        isTransitioning={isTransitioning}
        onComplete={() => setIsTransitioning(false)}
      />
    </>
  );
}
