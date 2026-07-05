"use client";

import { useHorizontalScrollController } from "@/components/horizontal-scroll/HorizontalScrollContext";
import { PageCurlOverlay } from "@/components/horizontal-scroll/PageCurlOverlay";
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
  const touchStartYRef = useRef(0);
  const accumulatedDeltaRef = useRef(0);
  const gestureTimeoutRef = useRef<number | null>(null);
  const navigatedRef = useRef(false);
  const programmaticScrollRef = useRef(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pageCurlDirection, setPageCurlDirection] = useState<'left' | 'right'>('right');

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

  // Update localStorage with current panel label for "Previously On..." banner
  const panelLabels = useMemo(() => panels.map((p) => p.label), [panels]);
  useEffect(() => {
    try {
      const label = panelLabels[currentIndex];
      if (!label) return;
      const raw = localStorage.getItem('manga-portfolio-history');
      const history = raw ? JSON.parse(raw) : { visitCount: 1 };
      history.lastSection = `/#panel-${currentIndex}`;
      history.lastSectionLabel = `the "${label}" section`;
      localStorage.setItem('manga-portfolio-history', JSON.stringify(history));
    } catch {
      // localStorage unavailable
    }
  }, [currentIndex, panelLabels]);

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

      if (animate && clamped !== currentIndexRef.current) {
        setPageCurlDirection(clamped > currentIndexRef.current ? 'right' : 'left');
      }
      setIsTransitioning(animate);
      programmaticScrollRef.current = true;
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

      if (programmaticScrollRef.current) {
        programmaticScrollRef.current = false;
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

      const activeWrapper = container.children.item(
        currentIndexRef.current,
      ) as HTMLElement | null;
      const activePanel = activeWrapper?.querySelector(
        '[data-allow-internal-scroll="true"]',
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
      touchStartYRef.current = event.changedTouches[0]?.clientY ?? 0;
    };

    const onTouchEnd = (event: TouchEvent) => {
      const touch = event.changedTouches[0];
      if (!touch) return;

      const endX = touch.clientX;
      const endY = touch.clientY;
      const deltaX = endX - touchStartXRef.current;
      const deltaY = endY - touchStartYRef.current;
      const threshold = 50;

      // Horizontal swipe: navigate panels
      if (Math.abs(deltaX) >= threshold) {
        const directionStep = 1;
        if (deltaX < 0) {
          scrollToPanel(currentIndex + directionStep);
        } else {
          scrollToPanel(currentIndex - directionStep);
        }
        return;
      }

      // Vertical swipe at panel boundary: navigate panels
      //
      // On touch, the finger moves OPPOSITE to content:
      //  - Finger swipes UP   → content scrolls DOWN  → deltaY < 0
      //  - Finger swipes DOWN → content scrolls UP    → deltaY > 0
      //
      // So at the bottom, the user naturally continues swiping UP (deltaY < 0).
      if (Math.abs(deltaY) >= threshold) {
        const activeWrapper = container?.children.item(currentIndex) as HTMLElement | null;
        const activePanel = activeWrapper?.querySelector(
          '[data-allow-internal-scroll="true"]',
        ) as HTMLElement | null;

        const atBottom = activePanel
          ? (panelBottomStateRef.current[currentIndex] ?? false)
          : true; // panels without internal scroll are always "at bottom"
        const atTop = activePanel
          ? activePanel.scrollTop <= 0
          : true; // panels without internal scroll are always "at top"

        // Swipe UP at bottom → next panel
        if (deltaY < 0 && atBottom && currentIndex < panels.length - 1) {
          scrollToPanel(currentIndex + 1);
          return;
        }
        // Swipe DOWN at top → previous panel
        if (deltaY > 0 && atTop && currentIndex > 0) {
          scrollToPanel(currentIndex - 1);
          return;
        }
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
          <div key={panel.id} className="w-screen shrink-0 snap-start">
            <PanelPage
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
          </div>
        );
      }),
    [currentIndex, panels],
  );

  const handleCurlComplete = () => {
    setIsTransitioning(false);
  };

  return (
    <>
      <div
        ref={setContainerRef}
        className="flex h-screen w-full snap-x snap-mandatory overflow-x-scroll overflow-y-hidden scroll-smooth"
        dir="ltr"
        data-page-curl-direction={pageCurlDirection}
      >
        {renderedPanels}
      </div>

      <PanelNavigator />
      <PageTransitionOverlay
        isTransitioning={isTransitioning}
        onComplete={() => {
          /* handled by PageCurlOverlay */
        }}
      />
      <PageCurlOverlay
        isActive={isTransitioning}
        direction={pageCurlDirection}
        onComplete={handleCurlComplete}
      />
    </>
  );
}
