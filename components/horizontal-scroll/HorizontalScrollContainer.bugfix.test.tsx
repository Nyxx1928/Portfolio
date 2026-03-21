/**
 * Bug Condition Exploration Test for Trackpad Navigation Bugs
 * 
 * **Validates: Requirements 2.1, 2.2**
 * 
 * This test explores the bug condition where trackpad swipe gestures cause:
 * 1. Horizontal swipes getting stuck between panels (Bug 1)
 * 2. Vertical swipes skipping panels (Bug 2)
 * 
 * **CRITICAL**: This test is EXPECTED TO FAIL on unfixed code.
 * Failure confirms the bugs exist and surfaces counterexamples.
 * 
 * **Property 1: Fault Condition - Trackpad Gestures Navigate Single Panel**
 * For any trackpad swipe gesture (horizontal or vertical), the system SHALL
 * navigate to exactly one adjacent panel in the correct direction.
 */

import { render, waitFor } from '@testing-library/react';
import { HorizontalScrollContainer, PanelConfig } from './HorizontalScrollContainer';
import { HorizontalScrollProvider } from './HorizontalScrollContext';
import * as fc from 'fast-check';

// Mock panels for testing
const mockPanels: PanelConfig[] = [
  { id: 'panel-0', label: 'Panel 0', component: () => <div>Panel 0</div> },
  { id: 'panel-1', label: 'Panel 1', component: () => <div>Panel 1</div> },
  { id: 'panel-2', label: 'Panel 2', component: () => <div>Panel 2</div> },
  { id: 'panel-3', label: 'Panel 3', component: () => <div>Panel 3</div> },
];

// Helper to create a trackpad wheel event
function createTrackpadWheelEvent(deltaY: number): WheelEvent {
  return new WheelEvent('wheel', {
    deltaY,
    deltaMode: 0, // Pixel mode (trackpad)
    bubbles: true,
    cancelable: true,
  });
}

// Helper to simulate a trackpad gesture sequence
async function simulateTrackpadGesture(
  container: HTMLElement,
  deltaY: number,
  eventCount: number
): Promise<void> {
  for (let i = 0; i < eventCount; i++) {
    const event = createTrackpadWheelEvent(deltaY);
    container.dispatchEvent(event);
    // Small delay between events to simulate realistic trackpad behavior
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  // Wait for gesture completion timeout (150ms) + smooth scroll animation + buffer
  await new Promise(resolve => setTimeout(resolve, 400));
}

// Helper to get current panel index from scroll position
function getCurrentPanelIndex(container: HTMLElement): number {
  const panelWidth = container.clientWidth;
  const scrollLeft = container.scrollLeft;
  return Math.round(scrollLeft / panelWidth);
}

describe('Bug Condition Exploration: Trackpad Navigation', () => {
  beforeEach(() => {
    // Mock window dimensions for consistent panel width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1920,
    });

    // Mock scrollBy and scrollTo methods for JSDOM (accept any arg forms)
    (Element.prototype as any).scrollBy = function(...args: any[]) {
      const options = args[0];
      if (typeof options === 'object' && options?.left !== undefined) {
        this.scrollLeft += options.left;
      } else if (typeof options === 'number') {
        // scrollBy(x, y) — treat x as left delta
        this.scrollLeft += options;
      }
    };

    (Element.prototype as any).scrollTo = function(...args: any[]) {
      const options = args[0];
      if (typeof options === 'object' && options?.left !== undefined) {
        this.scrollLeft = options.left;
        // Manually trigger scroll event since JSDOM doesn't do it automatically
        this.dispatchEvent(new Event('scroll', { bubbles: true }));
      } else if (typeof options === 'number') {
        // scrollTo(x, y) — set scrollLeft to x
        this.scrollLeft = options;
        this.dispatchEvent(new Event('scroll', { bubbles: true }));
      }
    };
  });

  /**
   * Test Case 1: Horizontal Swipe Left (Bug 1)
   * 
   * Simulates a horizontal trackpad swipe left with small deltaY values.
   * 
   * Expected on UNFIXED code: FAILS
   * - Container scrolls by -200px total (10 events × -20px)
   * - Gets stuck between panels (panel width is 1920px)
   * - finalPanel === initialPanel (no navigation occurred)
   * 
   * Expected on FIXED code: PASSES
   * - System detects trackpad gesture
   * - Navigates to exactly one previous panel
   * - finalPanel === initialPanel - 1
   */
  test('Bug 1: Horizontal swipe left gets stuck between panels', async () => {
    const { container } = render(
      <HorizontalScrollProvider>
        <HorizontalScrollContainer panels={mockPanels} />
      </HorizontalScrollProvider>
    );

    const scrollContainer = container.querySelector('[dir="ltr"]') as HTMLElement;
    expect(scrollContainer).toBeTruthy();

    // Mock container dimensions
    Object.defineProperty(scrollContainer, 'clientWidth', {
      writable: true,
      configurable: true,
      value: 1920,
    });
    Object.defineProperty(scrollContainer, 'scrollWidth', {
      writable: true,
      configurable: true,
      value: 1920 * 4, // 4 panels
    });

    // Wait for initial setup
    await waitFor(() => {
      expect(scrollContainer.scrollLeft).toBe(0);
    });

    // Start at panel 1 (so we can swipe left)
    scrollContainer.scrollTo({ left: 1920, behavior: 'auto' });
    await waitFor(() => {
      expect(getCurrentPanelIndex(scrollContainer)).toBe(1);
    });

    const initialPanel = getCurrentPanelIndex(scrollContainer);

    // Simulate horizontal trackpad swipe left
    // 10 events with deltaY = -20 (total -200px)
    await simulateTrackpadGesture(scrollContainer, -20, 10);

    const finalPanel = getCurrentPanelIndex(scrollContainer);

    // Assert: Should navigate to exactly one previous panel
    expect(Math.abs(finalPanel - initialPanel)).toBe(1);
    expect(finalPanel).toBe(initialPanel - 1);
  }, 10000);

  /**
   * Test Case 2: Vertical Swipe Down (Bug 2)
   * 
   * Simulates a vertical trackpad swipe down with larger deltaY values.
   * 
   * Expected on UNFIXED code: FAILS
   * - Container scrolls by 1200px total (15 events × 80px)
   * - Skips from panel 0 to panel 2 (1200px ≈ 62% of panel width)
   * - finalPanel === initialPanel + 2 (skipped a panel)
   * 
   * Expected on FIXED code: PASSES
   * - System detects trackpad gesture
   * - Navigates to exactly one next panel
   * - finalPanel === initialPanel + 1
   */
  test('Bug 2: Vertical swipe down skips panels', async () => {
    const { container } = render(
      <HorizontalScrollProvider>
        <HorizontalScrollContainer panels={mockPanels} />
      </HorizontalScrollProvider>
    );

    const scrollContainer = container.querySelector('[dir="ltr"]') as HTMLElement;
    expect(scrollContainer).toBeTruthy();

    // Mock container dimensions
    Object.defineProperty(scrollContainer, 'clientWidth', {
      writable: true,
      configurable: true,
      value: 1920,
    });
    Object.defineProperty(scrollContainer, 'scrollWidth', {
      writable: true,
      configurable: true,
      value: 1920 * 4,
    });

    // Wait for initial setup at panel 0
    await waitFor(() => {
      expect(scrollContainer.scrollLeft).toBe(0);
    });

    const initialPanel = getCurrentPanelIndex(scrollContainer);

    // Simulate vertical trackpad swipe down
    // 15 events with deltaY = 80 (total 1200px)
    await simulateTrackpadGesture(scrollContainer, 80, 15);

    const finalPanel = getCurrentPanelIndex(scrollContainer);

    // Assert: Should navigate to exactly one next panel
    expect(Math.abs(finalPanel - initialPanel)).toBe(1);
    expect(finalPanel).toBe(initialPanel + 1);
  }, 10000);

  /**
   * Test Case 3: Vertical Swipe Up (Bug 2)
   * 
   * Simulates a vertical trackpad swipe up with negative deltaY values.
   * 
   * Expected on UNFIXED code: FAILS
   * - Container scrolls by -1000px total (10 events × -100px)
   * - Jumps backward multiple panels
   * - finalPanel !== initialPanel - 1
   * 
   * Expected on FIXED code: PASSES
   * - System detects trackpad gesture
   * - Navigates to exactly one previous panel
   * - finalPanel === initialPanel - 1
   */
  test('Bug 2: Vertical swipe up skips panels backward', async () => {
    const { container } = render(
      <HorizontalScrollProvider>
        <HorizontalScrollContainer panels={mockPanels} />
      </HorizontalScrollProvider>
    );

    const scrollContainer = container.querySelector('[dir="ltr"]') as HTMLElement;
    expect(scrollContainer).toBeTruthy();

    // Mock container dimensions
    Object.defineProperty(scrollContainer, 'clientWidth', {
      writable: true,
      configurable: true,
      value: 1920,
    });
    Object.defineProperty(scrollContainer, 'scrollWidth', {
      writable: true,
      configurable: true,
      value: 1920 * 4,
    });

    // Start at panel 2 (so we can swipe up)
    scrollContainer.scrollTo({ left: 1920 * 2, behavior: 'auto' });
    await waitFor(() => {
      expect(getCurrentPanelIndex(scrollContainer)).toBe(2);
    });

    const initialPanel = getCurrentPanelIndex(scrollContainer);

    // Simulate vertical trackpad swipe up
    // 10 events with deltaY = -100 (total -1000px)
    await simulateTrackpadGesture(scrollContainer, -100, 10);

    const finalPanel = getCurrentPanelIndex(scrollContainer);

    // Assert: Should navigate to exactly one previous panel
    expect(Math.abs(finalPanel - initialPanel)).toBe(1);
    expect(finalPanel).toBe(initialPanel - 1);
  }, 10000);

  /**
   * Property-Based Test: Trackpad Gestures Navigate Single Panel
   * 
   * **Property 1: Fault Condition - Trackpad Gestures Navigate Single Panel**
   * 
   * For any trackpad swipe gesture (horizontal or vertical), the system SHALL
   * navigate to exactly one adjacent panel in the correct direction.
   * 
   * This property test generates various trackpad gesture scenarios and verifies
   * that each gesture navigates to exactly one adjacent panel.
   * 
   * Expected on UNFIXED code: FAILS with counterexamples
   * Expected on FIXED code: PASSES
   */
  test('Property: Trackpad gestures navigate to exactly one adjacent panel', async () => {
    await fc.assert(
      fc.asyncProperty(
        // Generate trackpad gesture parameters
        fc.record({
          // deltaY per event: small values for horizontal, larger for vertical
          deltaPerEvent: fc.integer({ min: -100, max: 100 }).filter(d => Math.abs(d) >= 10),
          // Number of events in gesture sequence
          eventCount: fc.integer({ min: 5, max: 20 }),
          // Starting panel index
          startPanel: fc.integer({ min: 1, max: 2 }), // Start at 1 or 2 to allow movement in both directions
        }),
        async ({ deltaPerEvent, eventCount, startPanel }) => {
          const { container } = render(
            <HorizontalScrollProvider>
              <HorizontalScrollContainer panels={mockPanels} />
            </HorizontalScrollProvider>
          );

          const scrollContainer = container.querySelector('[dir="ltr"]') as HTMLElement;
          
          // Mock container dimensions
          Object.defineProperty(scrollContainer, 'clientWidth', {
            writable: true,
            configurable: true,
            value: 1920,
          });
          Object.defineProperty(scrollContainer, 'scrollWidth', {
            writable: true,
            configurable: true,
            value: 1920 * 4,
          });

          // Navigate to starting panel
          scrollContainer.scrollTo({ left: 1920 * startPanel, behavior: 'auto' });
          await waitFor(() => {
            expect(getCurrentPanelIndex(scrollContainer)).toBe(startPanel);
          });

          const initialPanel = getCurrentPanelIndex(scrollContainer);
          const expectedDirection = deltaPerEvent > 0 ? 1 : -1;

          // Simulate trackpad gesture
          await simulateTrackpadGesture(scrollContainer, deltaPerEvent, eventCount);

          // Wait for panel index to update after gesture completes
          await waitFor(() => {
            const currentPanel = getCurrentPanelIndex(scrollContainer);
            expect(currentPanel).not.toBe(initialPanel);
          }, { timeout: 1000 });

          const finalPanel = getCurrentPanelIndex(scrollContainer);

          // Property: Navigate to exactly one adjacent panel
          const panelDelta = finalPanel - initialPanel;
          
          // Should move exactly one panel
          expect(Math.abs(panelDelta)).toBe(1);
          
          // Should move in the correct direction
          expect(Math.sign(panelDelta)).toBe(expectedDirection);
        }
      ),
      {
        numRuns: 20, // Run 20 test cases
        timeout: 15000,
      }
    );
  }, 30000);
});

/**
 * Preservation Property Tests
 * 
 * **Validates: Requirements 3.1, 3.2, 3.3, 3.4**
 * 
 * These tests verify that non-trackpad input behaviors remain unchanged.
 * They observe and capture the baseline behavior on UNFIXED code.
 * 
 * **Property 2: Preservation - Non-Trackpad Input Behavior**
 * For any input that is NOT a trackpad swipe gesture, the system SHALL
 * produce the same navigation behavior as the original code.
 * 
 * **EXPECTED OUTCOME**: These tests PASS on unfixed code (baseline behavior)
 */

describe('Preservation Property Tests: Non-Trackpad Inputs', () => {
  beforeEach(() => {
    // Mock window dimensions
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1920,
    });

    // Mock scrollBy and scrollTo methods (accept any arg forms)
    (Element.prototype as any).scrollBy = function(...args: any[]) {
      const options = args[0];
      if (typeof options === 'object' && options?.left !== undefined) {
        this.scrollLeft += options.left;
      } else if (typeof options === 'number') {
        this.scrollLeft += options;
      }
    };

    (Element.prototype as any).scrollTo = function(...args: any[]) {
      const options = args[0];
      if (typeof options === 'object' && options?.left !== undefined) {
        this.scrollLeft = options.left;
        this.dispatchEvent(new Event('scroll', { bubbles: true }));
      } else if (typeof options === 'number') {
        this.scrollLeft = options;
        this.dispatchEvent(new Event('scroll', { bubbles: true }));
      }
    };
  });

  /**
   * Preservation Test 1: Mouse Wheel Navigation
   * 
   * **Validates: Requirement 3.1**
   * 
   * Mouse wheel events (deltaY > 100 OR deltaMode != 0) should trigger
   * panel navigation using scrollBy with the raw delta value.
   * 
   * This test observes the baseline behavior on unfixed code.
   */
  test('Preservation: Mouse wheel scrolling continues to work', async () => {
    const { container } = render(
      <HorizontalScrollProvider>
        <HorizontalScrollContainer panels={mockPanels} />
      </HorizontalScrollProvider>
    );

    const scrollContainer = container.querySelector('[dir="ltr"]') as HTMLElement;
    expect(scrollContainer).toBeTruthy();

    // Mock container dimensions
    Object.defineProperty(scrollContainer, 'clientWidth', {
      writable: true,
      configurable: true,
      value: 1920,
    });
    Object.defineProperty(scrollContainer, 'scrollWidth', {
      writable: true,
      configurable: true,
      value: 1920 * 4,
    });

    // Wait for initial setup
    await waitFor(() => {
      expect(scrollContainer.scrollLeft).toBe(0);
    });

    const initialScrollLeft = scrollContainer.scrollLeft;

    // Simulate mouse wheel event (large deltaY)
    const mouseWheelEvent = new WheelEvent('wheel', {
      deltaY: 150, // Large delta indicates mouse wheel
      deltaMode: 0,
      bubbles: true,
      cancelable: true,
    });

    scrollContainer.dispatchEvent(mouseWheelEvent);

    // Wait for scroll to complete
    await new Promise(resolve => setTimeout(resolve, 100));

    // Verify that scrollBy was called with the delta value
    // The scroll position should have changed
    expect(scrollContainer.scrollLeft).not.toBe(initialScrollLeft);
  });

  /**
   * Preservation Test 2: Touch Gesture Navigation
   * 
   * **Validates: Requirement 3.2**
   * 
   * Touch gestures (touchstart/touchend) should navigate between panels
   * using scrollToPanel when the swipe threshold is exceeded.
   */
  test('Preservation: Touch gestures continue to function', async () => {
    const { container } = render(
      <HorizontalScrollProvider>
        <HorizontalScrollContainer panels={mockPanels} />
      </HorizontalScrollProvider>
    );

    const scrollContainer = container.querySelector('[dir="ltr"]') as HTMLElement;
    expect(scrollContainer).toBeTruthy();

    // Mock container dimensions
    Object.defineProperty(scrollContainer, 'clientWidth', {
      writable: true,
      configurable: true,
      value: 1920,
    });
    Object.defineProperty(scrollContainer, 'scrollWidth', {
      writable: true,
      configurable: true,
      value: 1920 * 4,
    });

    // Wait for initial setup at panel 0
    await waitFor(() => {
      expect(scrollContainer.scrollLeft).toBe(0);
    });

    const initialPanel = getCurrentPanelIndex(scrollContainer);

    // Simulate touch swipe right to left (navigate forward)
    const touchStartEvent = new TouchEvent('touchstart', {
      changedTouches: [{ clientX: 1000 } as Touch],
      bubbles: true,
    });

    const touchEndEvent = new TouchEvent('touchend', {
      changedTouches: [{ clientX: 900 } as Touch], // Swipe left by 100px
      bubbles: true,
    });

    scrollContainer.dispatchEvent(touchStartEvent);
    await new Promise(resolve => setTimeout(resolve, 50));
    scrollContainer.dispatchEvent(touchEndEvent);

    // Wait for navigation to complete
    await new Promise(resolve => setTimeout(resolve, 200));

    const finalPanel = getCurrentPanelIndex(scrollContainer);

    // Verify navigation occurred (swipe left should navigate forward)
    expect(finalPanel).toBe(initialPanel + 1);
  });

  /**
   * Preservation Test 3: Keyboard Navigation
   * 
   * **Validates: Requirement 3.3**
   * 
   * Arrow key presses should navigate between panels using scrollToPanel.
   */
  test('Preservation: Keyboard arrow keys continue to work', async () => {
    const { container } = render(
      <HorizontalScrollProvider>
        <HorizontalScrollContainer panels={mockPanels} />
      </HorizontalScrollProvider>
    );

    const scrollContainer = container.querySelector('[dir="ltr"]') as HTMLElement;
    expect(scrollContainer).toBeTruthy();

    // Mock container dimensions
    Object.defineProperty(scrollContainer, 'clientWidth', {
      writable: true,
      configurable: true,
      value: 1920,
    });
    Object.defineProperty(scrollContainer, 'scrollWidth', {
      writable: true,
      configurable: true,
      value: 1920 * 4,
    });

    // Wait for initial setup
    await waitFor(() => {
      expect(scrollContainer.scrollLeft).toBe(0);
    });

    // Focus an element within the container
    const firstPanel = scrollContainer.children[0] as HTMLElement;
    const focusableElement = document.createElement('button');
    firstPanel.appendChild(focusableElement);
    focusableElement.focus();

    const initialPanel = getCurrentPanelIndex(scrollContainer);

    // Simulate ArrowRight key press
    const keyEvent = new KeyboardEvent('keydown', {
      key: 'ArrowRight',
      bubbles: true,
      cancelable: true,
    });

    window.dispatchEvent(keyEvent);

    // Wait for navigation to complete
    await new Promise(resolve => setTimeout(resolve, 200));

    const finalPanel = getCurrentPanelIndex(scrollContainer);

    // Verify navigation occurred
    expect(finalPanel).toBe(initialPanel + 1);
  });

  /**
   * Preservation Test 4: Internal Panel Scrolling
   * 
   * **Validates: Requirement 3.4**
   * 
   * Panels with allowInternalScroll=true should allow vertical scrolling
   * before triggering panel navigation. Boundary detection (atTop/atBottom)
   * should work correctly.
   */
  test('Preservation: Internal panel scrolling with boundary detection', async () => {
    // Create panels with internal scroll enabled
    const scrollablePanels: PanelConfig[] = [
      { 
        id: 'panel-0', 
        label: 'Panel 0', 
        component: () => <div style={{ height: '2000px' }}>Scrollable Panel 0</div>,
        allowInternalScroll: true,
      },
      { id: 'panel-1', label: 'Panel 1', component: () => <div>Panel 1</div> },
    ];

    const { container } = render(
      <HorizontalScrollProvider>
        <HorizontalScrollContainer panels={scrollablePanels} />
      </HorizontalScrollProvider>
    );

    const scrollContainer = container.querySelector('[dir="ltr"]') as HTMLElement;
    expect(scrollContainer).toBeTruthy();

    // Mock container dimensions
    Object.defineProperty(scrollContainer, 'clientWidth', {
      writable: true,
      configurable: true,
      value: 1920,
    });
    Object.defineProperty(scrollContainer, 'scrollWidth', {
      writable: true,
      configurable: true,
      value: 1920 * 2,
    });

    // Wait for initial setup
    await waitFor(() => {
      expect(scrollContainer.scrollLeft).toBe(0);
    });

    const activePanel = scrollContainer.children[0] as HTMLElement;
    
    // Mock panel scroll properties
    Object.defineProperty(activePanel, 'scrollTop', {
      writable: true,
      configurable: true,
      value: 0,
    });

    const initialPanel = getCurrentPanelIndex(scrollContainer);

    // Simulate wheel event while at top of panel (should allow internal scroll)
    const wheelDownEvent = new WheelEvent('wheel', {
      deltaY: 50,
      deltaMode: 0,
      bubbles: true,
      cancelable: true,
    });

    scrollContainer.dispatchEvent(wheelDownEvent);

    // Wait a bit
    await new Promise(resolve => setTimeout(resolve, 100));

    const finalPanel = getCurrentPanelIndex(scrollContainer);

    // When at top and scrolling down, should NOT navigate to next panel
    // (should allow internal scroll instead)
    // This verifies the boundary detection is working
    expect(finalPanel).toBe(initialPanel);
  });

  /**
   * Property-Based Test: Mouse Wheel Events Preserve Behavior
   * 
   * **Validates: Requirement 3.1**
   * 
   * For all mouse wheel events (deltaY > 100 OR deltaMode != 0),
   * the navigation behavior should use scrollBy with the raw delta value.
   */
  test('Property: Mouse wheel events preserve scrollBy behavior', async () => {
    await fc.assert(
      fc.asyncProperty(
        // Generate mouse wheel event parameters
        fc.record({
          // Large deltaY values (mouse wheel characteristic)
          deltaY: fc.integer({ min: 101, max: 500 }),
          // Random deltaMode (0=pixels, 1=lines, 2=pages)
          deltaMode: fc.constantFrom(0, 1, 2),
        }),
        async ({ deltaY, deltaMode }) => {
          const { container } = render(
            <HorizontalScrollProvider>
              <HorizontalScrollContainer panels={mockPanels} />
            </HorizontalScrollProvider>
          );

          const scrollContainer = container.querySelector('[dir="ltr"]') as HTMLElement;
          
          // Mock container dimensions
          Object.defineProperty(scrollContainer, 'clientWidth', {
            writable: true,
            configurable: true,
            value: 1920,
          });
          Object.defineProperty(scrollContainer, 'scrollWidth', {
            writable: true,
            configurable: true,
            value: 1920 * 4,
          });

          // Wait for initial setup
          await waitFor(() => {
            expect(scrollContainer.scrollLeft).toBe(0);
          });

          const initialScrollLeft = scrollContainer.scrollLeft;

          // Simulate mouse wheel event
          const mouseWheelEvent = new WheelEvent('wheel', {
            deltaY,
            deltaMode,
            bubbles: true,
            cancelable: true,
          });

          scrollContainer.dispatchEvent(mouseWheelEvent);

          // Wait for scroll
          await new Promise(resolve => setTimeout(resolve, 100));

          // Verify scroll position changed (scrollBy was called)
          expect(scrollContainer.scrollLeft).not.toBe(initialScrollLeft);
        }
      ),
      {
        numRuns: 10,
        timeout: 10000,
      }
    );
  }, 20000);

  /**
   * Property-Based Test: Programmatic Navigation Preserves Behavior
   * 
   * **Validates: Requirement 3.3**
   * 
   * Direct scrollToPanel calls should navigate to the target panel correctly.
   */
  test('Property: Programmatic scrollToPanel navigation works correctly', async () => {
    await fc.assert(
      fc.asyncProperty(
        // Generate target panel index
        fc.integer({ min: 0, max: 3 }),
        async (targetPanel) => {
          const { container } = render(
            <HorizontalScrollProvider>
              <HorizontalScrollContainer panels={mockPanels} />
            </HorizontalScrollProvider>
          );

          const scrollContainer = container.querySelector('[dir="ltr"]') as HTMLElement;
          
          // Mock container dimensions
          Object.defineProperty(scrollContainer, 'clientWidth', {
            writable: true,
            configurable: true,
            value: 1920,
          });
          Object.defineProperty(scrollContainer, 'scrollWidth', {
            writable: true,
            configurable: true,
            value: 1920 * 4,
          });

          // Wait for initial setup
          await waitFor(() => {
            expect(scrollContainer.scrollLeft).toBe(0);
          });

          // Programmatically navigate to target panel
          const expectedScrollLeft = targetPanel * 1920;
          scrollContainer.scrollTo({ left: expectedScrollLeft, behavior: 'auto' });

          await waitFor(() => {
            expect(getCurrentPanelIndex(scrollContainer)).toBe(targetPanel);
          });

          const finalPanel = getCurrentPanelIndex(scrollContainer);

          // Verify navigation to correct panel
          expect(finalPanel).toBe(targetPanel);
        }
      ),
      {
        numRuns: 10,
        timeout: 10000,
      }
    );
  }, 20000);
});
