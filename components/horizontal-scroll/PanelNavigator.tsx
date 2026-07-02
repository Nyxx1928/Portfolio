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
    <aside className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-md border-2 border-manga-black bg-manga-white/95 px-4 py-3 shadow-manga backdrop-blur">
      <div className="flex flex-col items-center gap-3">
        <p
          className="font-heading text-xs uppercase tracking-widest"
          aria-live="off"
        >
          {state.label}
        </p>

        {/* Numbered manga tabs */}
        <div
          className="flex items-center gap-1"
          aria-label="Panel indicators"
          role="tablist"
        >
          {Array.from({ length: totalPanels }).map((_, index) => {
            const isActive = index === state.activeTab;
            return (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to panel ${index + 1}`}
                onClick={() => scrollToPanel(index)}
                className={`relative flex h-11 w-11 items-center justify-center border border-manga-black text-xs font-heading transition-all duration-150 ease-out hover:translate-x-[1px] hover:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-manga-black ${
                  isActive
                    ? "bg-manga-black text-manga-white shadow-manga-sm"
                    : "bg-manga-white text-manga-black hover:shadow-manga-sm"
                }`}
              >
                {index + 1}
                {isActive && (
                  <span className="absolute -top-[1px] -right-[1px] h-2 w-2 border-b border-l border-manga-white bg-manga-white" />
                )}
              </button>
            );
          })}
        </div>

        {/* Binding-strip progress bar */}
        <div className="relative w-full max-w-[200px] h-1 bg-manga-gray-200">
          <div
            className="absolute inset-y-0 left-0 bg-manga-black transition-all duration-300 ease-out"
            style={{ width: `${((currentIndex + 1) / totalPanels) * 100}%` }}
          />
        </div>

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
