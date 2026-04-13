"use client";

import { useHorizontalScroll } from "@/components/horizontal-scroll/HorizontalScrollContext";
import { getNavigatorState } from "@/components/horizontal-scroll/utils";

export function PanelNavigator() {
  const { currentIndex, totalPanels, scrollToPanel } = useHorizontalScroll();

  if (totalPanels <= 0) {
    return null;
  }

  const state = getNavigatorState(currentIndex, totalPanels);

  return (
    <aside className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-md border-2 border-manga-black bg-manga-white/95 px-3 py-2 shadow-manga backdrop-blur">
      <div className="flex flex-col items-center gap-2">
        <p
          className="font-heading text-xs uppercase tracking-widest"
          aria-live="off"
        >
          {state.label}
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous panel"
            aria-disabled={state.prevDisabled}
            disabled={state.prevDisabled}
            onClick={() => scrollToPanel(currentIndex - 1)}
            className="flex h-11 w-11 items-center justify-center border border-manga-black bg-manga-white text-sm font-heading uppercase shadow-manga transition-all duration-150 ease-out hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-manga-pressed focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] focus-visible:shadow-manga-pressed focus-visible:outline-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-40 disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-none"
          >
            Prev
          </button>

          <div
            className="flex items-center gap-1.5"
            aria-label="Panel indicators"
          >
            {Array.from({ length: totalPanels }).map((_, index) => {
              const isActive = index === state.activeDot;
              return (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to panel ${index + 1}`}
                  onClick={() => scrollToPanel(index)}
                  className={`h-3 w-3 rounded-full border border-manga-black transition-transform duration-150 ease-out hover:translate-x-[1px] hover:translate-y-[1px] focus-visible:translate-x-[1px] focus-visible:translate-y-[1px] focus-visible:outline-none active:translate-x-[2px] active:translate-y-[2px] ${
                    isActive ? "bg-manga-black" : "bg-manga-white"
                  }`}
                />
              );
            })}
          </div>

          <button
            type="button"
            aria-label="Next panel"
            aria-disabled={state.nextDisabled}
            disabled={state.nextDisabled}
            onClick={() => scrollToPanel(currentIndex + 1)}
            className="flex h-11 w-11 items-center justify-center border border-manga-black bg-manga-white text-sm font-heading uppercase shadow-manga transition-all duration-150 ease-out hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-manga-pressed focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] focus-visible:shadow-manga-pressed focus-visible:outline-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-40 disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-none"
          >
            Next
          </button>
        </div>
      </div>
    </aside>
  );
}
