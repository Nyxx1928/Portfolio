import { renderHook } from '@testing-library/react';
import { useSmoothScroll } from './useSmoothScroll';
import Lenis from 'lenis';

// Mock Lenis
jest.mock('lenis');

describe('useSmoothScroll', () => {
  let mockLenis: {
    raf: jest.Mock;
    destroy: jest.Mock;
  };
  let rafSpy: jest.SpyInstance;

  beforeEach(() => {
    // Create mock Lenis instance
    mockLenis = {
      raf: jest.fn(),
      destroy: jest.fn(),
    };

    // Mock Lenis constructor
    (Lenis as jest.MockedClass<typeof Lenis>).mockImplementation(() => mockLenis as any);

    // Mock requestAnimationFrame - don't execute callback to prevent infinite loop
    rafSpy = jest.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 0);
  });

  afterEach(() => {
    jest.clearAllMocks();
    rafSpy.mockRestore();
  });

  it('initializes Lenis with correct configuration', () => {
    renderHook(() => useSmoothScroll());

    expect(Lenis).toHaveBeenCalledWith({
      duration: 1.2,
      easing: expect.any(Function),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });
  });

  it('uses correct easing function', () => {
    renderHook(() => useSmoothScroll());

    const config = (Lenis as jest.MockedClass<typeof Lenis>).mock.calls[0][0];
    const easingFn = config.easing as (t: number) => number;

    // Test easing function behavior
    expect(easingFn(0)).toBeCloseTo(0, 2);
    expect(easingFn(0.5)).toBeGreaterThan(0);
    expect(easingFn(0.5)).toBeLessThan(1);
    expect(easingFn(1)).toBeCloseTo(1, 2);
  });

  it('starts animation loop with requestAnimationFrame', () => {
    // Temporarily allow one callback execution
    rafSpy.mockImplementationOnce((cb) => {
      cb(0);
      return 0;
    });

    renderHook(() => useSmoothScroll());

    expect(rafSpy).toHaveBeenCalled();
    expect(mockLenis.raf).toHaveBeenCalledWith(0);
  });

  it('cleans up Lenis instance on unmount', () => {
    const { unmount } = renderHook(() => useSmoothScroll());

    expect(mockLenis.destroy).not.toHaveBeenCalled();

    unmount();

    expect(mockLenis.destroy).toHaveBeenCalledTimes(1);
  });

  it('creates only one Lenis instance', () => {
    renderHook(() => useSmoothScroll());

    expect(Lenis).toHaveBeenCalledTimes(1);
  });

  it('configures smooth scrolling for vertical orientation', () => {
    renderHook(() => useSmoothScroll());

    const config = (Lenis as jest.MockedClass<typeof Lenis>).mock.calls[0][0];
    expect(config.orientation).toBe('vertical');
    expect(config.smoothWheel).toBe(true);
  });

  it('configures appropriate scroll multipliers', () => {
    renderHook(() => useSmoothScroll());

    const config = (Lenis as jest.MockedClass<typeof Lenis>).mock.calls[0][0];
    expect(config.wheelMultiplier).toBe(1);
    expect(config.touchMultiplier).toBe(2);
  });

  it('disables infinite scrolling', () => {
    renderHook(() => useSmoothScroll());

    const config = (Lenis as jest.MockedClass<typeof Lenis>).mock.calls[0][0];
    expect(config.infinite).toBe(false);
  });

  it('sets duration to 1.2 seconds', () => {
    renderHook(() => useSmoothScroll());

    const config = (Lenis as jest.MockedClass<typeof Lenis>).mock.calls[0][0];
    expect(config.duration).toBe(1.2);
  });
});
