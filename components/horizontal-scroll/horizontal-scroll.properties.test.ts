import {
  clampPanelIndex,
  computeContainerWidth,
  getClosestPanelIndexFromScroll,
  getDirectionalDelta,
  getNavigatorState,
  getOverlayDuration,
  getRawScrollLeftForIndex,
  readReadingDirection,
  shouldAdvanceInternalPanel,
  shouldEnableLenis,
  shouldIgnoreArrowNavigation,
  toggleReadingDirection,
} from "@/components/horizontal-scroll/utils";
import fc from "fast-check";

describe("horizontal-scroll properties", () => {
  // Feature: horizontal-scroll-manga, Property 1: Panel count invariant
  it("P1: container width is N * viewport width", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 10 }),
        fc.integer({ min: 320, max: 2560 }),
        (n, viewport) => {
          expect(computeContainerWidth(viewport, n)).toBe(viewport * n);
        },
      ),
      { numRuns: 100 },
    );
  });

  // Feature: horizontal-scroll-manga, Property 2: Scroll boundary clamping
  it("P2: clamped index always remains in [0, N-1]", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 10 }),
        fc.integer({ min: -100, max: 100 }),
        (n, index) => {
          const clamped = clampPanelIndex(index, n);
          expect(clamped).toBeGreaterThanOrEqual(0);
          expect(clamped).toBeLessThanOrEqual(n - 1);
        },
      ),
      { numRuns: 100 },
    );
  });

  // Feature: horizontal-scroll-manga, Property 3: direction toggle API remains available
  // The project no longer exercises multiple reading directions; ensure the API surface exists.
  it("P3: toggleReadingDirection exists", () => {
    expect(typeof toggleReadingDirection).toBe("function");
  });

  // Feature: horizontal-scroll-manga, Property 3b: directional delta (single-direction mode)
  it("P3b: directional delta returns same value in single-direction mode", () => {
    fc.assert(
      fc.property(fc.integer({ min: -1000, max: 1000 }), (delta) => {
        expect(getDirectionalDelta(delta, "ltr")).toBe(delta);
      }),
      { numRuns: 100 },
    );
  });

  // Feature: horizontal-scroll-manga, Property 4: localStorage behavior in single-direction mode
  it("P4: readReadingDirection falls back to ltr for unknown storage", () => {
    const storage = {
      getItem: jest.fn(() => null),
      setItem: jest.fn(),
    } as unknown as Storage;

    expect(readReadingDirection(storage)).toBe("ltr");
  });

  // Feature: horizontal-scroll-manga, Property 5: Navigator state consistency
  it("P5: navigator label, dots, and disabled states remain consistent", () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 10 }), (total) => {
        return fc
          .sample(fc.integer({ min: 0, max: total - 1 }), 1)
          .every((index) => {
            const state = getNavigatorState(index, total);
            expect(state.label).toBe(`Panel ${index + 1} / ${total}`);
            expect(state.activeDot).toBe(index);
            expect(state.prevDisabled).toBe(index === 0);
            expect(state.nextDisabled).toBe(index === total - 1);
            return true;
          });
      }),
      { numRuns: 100 },
    );
  });

  // Feature: horizontal-scroll-manga, Property 6: Reduced-motion skips overlay
  it("P6: reduced motion forces zero-duration overlay", () => {
    fc.assert(
      fc.property(fc.boolean(), (reduced) => {
        const duration = getOverlayDuration(reduced);
        if (reduced) {
          expect(duration).toBe(0);
        } else {
          expect(duration).toBeGreaterThan(0);
        }
      }),
      { numRuns: 100 },
    );
  });

  // Feature: horizontal-scroll-manga, Property 7: Internal scroll sentinel behavior
  it("P7: downward scroll advances only at bottom and upward only at top", () => {
    fc.assert(
      fc.property(fc.boolean(), fc.boolean(), (atTop, atBottom) => {
        expect(shouldAdvanceInternalPanel(100, atTop, atBottom)).toBe(atBottom);
        expect(shouldAdvanceInternalPanel(-100, atTop, atBottom)).toBe(atTop);
      }),
      { numRuns: 100 },
    );
  });

  // Feature: horizontal-scroll-manga, Property 8: Navigation active link consistency
  it("P8: active link index maps to panel index", () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 10 }), (total) => {
        return fc
          .sample(fc.integer({ min: 0, max: total - 1 }), 1)
          .every((index) => {
            const state = getNavigatorState(index, total);
            expect(state.activeDot).toBe(index);
            return true;
          });
      }),
      { numRuns: 100 },
    );
  });

  // Feature: horizontal-scroll-manga, Property 8b: index/scroll mapping round-trip (single-direction)
  it("P8b: scroll-left mapping round-trips index", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 8 }),
        fc.integer({ min: 200, max: 1920 }),
        (totalPanels, panelWidth) => {
          const maxScrollLeft = Math.max(0, panelWidth * (totalPanels - 1));

          for (let index = 0; index < totalPanels; index += 1) {
            const rawLeft = getRawScrollLeftForIndex(
              index,
              panelWidth,
              maxScrollLeft,
              "ltr",
            );
            const derived = getClosestPanelIndexFromScroll(
              rawLeft,
              panelWidth,
              totalPanels,
              maxScrollLeft,
              "ltr",
            );

            expect(derived).toBe(index);
          }
        },
      ),
      { numRuns: 100 },
    );
  });

  // Feature: horizontal-scroll-manga, Property 9: Keyboard navigation guard
  it("P9: arrow key events from form fields are ignored", () => {
    fc.assert(
      fc.property(
        fc.constantFrom("INPUT", "TEXTAREA", "SELECT", "BUTTON", "A"),
        (tagName) => {
          const element = document.createElement(tagName.toLowerCase());
          expect(shouldIgnoreArrowNavigation(element)).toBe(true);
        },
      ),
      { numRuns: 100 },
    );
  });

  // Feature: horizontal-scroll-manga, Property 10: Lenis disabled when horizontal active
  it("P10: Lenis runs iff horizontal mode is inactive", () => {
    fc.assert(
      fc.property(fc.boolean(), (active) => {
        expect(shouldEnableLenis(active)).toBe(!active);
      }),
      { numRuns: 100 },
    );
  });
});
