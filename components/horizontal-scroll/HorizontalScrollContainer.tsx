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
import { usePanelFocus } from "@/lib/hooks/usePanelFocus";
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
  const navigatedRef = useRef(false);
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

  usePanelFocus(panels, currentIndex);

  // Merged scroll-init + scroll-position tracking (6.2)
  useEffect(() => {
    if (!hydrated || !containerNode || totalPanels === 0) {
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
      registerScrollHandler(null);
      container.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [
    containerNode,
    hydrated,
    panels.length,
    registerScrollHandler,
    setCurrentIndexInternal,
    totalPanels,
  ]);

  // Body overflow lock using CSS class (6.1)
  useEffect(() => {
    document.documentElement.classList.add('scroll-lock');
    return () => document.documentElement.classList.remove('scroll-lock');
  }, []);

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

      const activePanel = container.children.item(
        currentIndexRef.current,
      ) as HTMLElement | null;
      const allowsInternalScroll =
        activePanel?.dataset.allowInternalScroll === "true";

      if (allowsInternalScroll && activePanel) {
        const atTop = activePanel.scrollTop <= 0;
        const atBottom = panelBottomStateRef.current[currentIndexRef.current] ?? false;

        if (event.deltaY > 0 && !atBottom) {
          return;
        }

        if (event.deltaY < 0 && !atTop) {
          return;
        }
      }

      event.preventDefault();

      const isTrackpad = event.deltaMode === 0 && Math.abs(event.deltaY) <= 100;

      if (isTrackpad) {
        if (gestureTimeoutRef.current === null) {
          navigatedRef.current = false;
        }

        accumulatedDeltaRef.current += event.deltaY;

        if (gestureTimeoutRef.current !== null) {
          window.clearTimeout(gestureTimeoutRef.current);
        }

        gestureTimeoutRef.current = window.setTimeout(() => {
          const accumulated = accumulatedDeltaRef.current;
          const threshold = 50;

          if (Math.abs(accumulated) >= threshold && !navigatedRef.current) {
            const direction = accumulated > 0 ? 1 : -1;
            scrollToPanel(currentIndexRef.current + direction);
            navigatedRef.current = true;
            accumulatedDeltaRef.current = 0;
          }

          gestureTimeoutRef.current = null;
        }, 150);
      } else {
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

  // Resize handler with ref to avoid stale closure (6.3)
  useEffect(() => {
    const onResize = () => {
      if (resizeTimerRef.current !== null) {
        window.clearTimeout(resizeTimerRef.current);
      }

      resizeTimerRef.current = window.setTimeout(() => {
        scrollToPanel(currentIndexRef.current, false);
      }, 150);
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (resizeTimerRef.current !== null) {
        window.clearTimeout(resizeTimerRef.current);
      }
    };
  }, [scrollToPanel]);

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
