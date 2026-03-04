import { renderHook } from '@testing-library/react';
import { useScrollAnimation } from './useScrollAnimation';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  useInView: jest.fn(),
}));

import { useInView } from 'framer-motion';

const mockUseInView = useInView as jest.MockedFunction<typeof useInView>;

describe('useScrollAnimation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns ref and isInView state', () => {
    mockUseInView.mockReturnValue(false);

    const { result } = renderHook(() => useScrollAnimation());

    expect(result.current.ref).toBeDefined();
    expect(result.current.ref.current).toBeNull();
    expect(result.current.isInView).toBe(false);
  });

  it('uses default options when none provided', () => {
    mockUseInView.mockReturnValue(false);

    renderHook(() => useScrollAnimation());

    expect(mockUseInView).toHaveBeenCalledWith(
      expect.objectContaining({ current: null }),
      {
        once: true,
        amount: 0.3,
        margin: '0px 0px -100px 0px',
      }
    );
  });

  it('applies custom threshold option', () => {
    mockUseInView.mockReturnValue(false);

    renderHook(() => useScrollAnimation({ threshold: 0.5 }));

    expect(mockUseInView).toHaveBeenCalledWith(
      expect.objectContaining({ current: null }),
      {
        once: true,
        amount: 0.5,
        margin: '0px 0px -100px 0px',
      }
    );
  });

  it('applies custom triggerOnce option', () => {
    mockUseInView.mockReturnValue(false);

    renderHook(() => useScrollAnimation({ triggerOnce: false }));

    expect(mockUseInView).toHaveBeenCalledWith(
      expect.objectContaining({ current: null }),
      {
        once: false,
        amount: 0.3,
        margin: '0px 0px -100px 0px',
      }
    );
  });

  it('applies custom margin option', () => {
    mockUseInView.mockReturnValue(false);

    renderHook(() => useScrollAnimation({ margin: '0px 0px -200px 0px' }));

    expect(mockUseInView).toHaveBeenCalledWith(
      expect.objectContaining({ current: null }),
      {
        once: true,
        amount: 0.3,
        margin: '0px 0px -200px 0px',
      }
    );
  });

  it('applies all custom options together', () => {
    mockUseInView.mockReturnValue(false);

    renderHook(() =>
      useScrollAnimation({
        threshold: 0.7,
        triggerOnce: false,
        margin: '50px 0px -50px 0px',
      })
    );

    expect(mockUseInView).toHaveBeenCalledWith(
      expect.objectContaining({ current: null }),
      {
        once: false,
        amount: 0.7,
        margin: '50px 0px -50px 0px',
      }
    );
  });

  it('returns isInView as true when element is in view', () => {
    mockUseInView.mockReturnValue(true);

    const { result } = renderHook(() => useScrollAnimation());

    expect(result.current.isInView).toBe(true);
  });

  it('returns isInView as false when element is not in view', () => {
    mockUseInView.mockReturnValue(false);

    const { result } = renderHook(() => useScrollAnimation());

    expect(result.current.isInView).toBe(false);
  });

  it('handles threshold of 0', () => {
    mockUseInView.mockReturnValue(false);

    renderHook(() => useScrollAnimation({ threshold: 0 }));

    expect(mockUseInView).toHaveBeenCalledWith(
      expect.objectContaining({ current: null }),
      expect.objectContaining({
        amount: 0,
      })
    );
  });

  it('handles threshold of 1', () => {
    mockUseInView.mockReturnValue(false);

    renderHook(() => useScrollAnimation({ threshold: 1 }));

    expect(mockUseInView).toHaveBeenCalledWith(
      expect.objectContaining({ current: null }),
      expect.objectContaining({
        amount: 1,
      })
    );
  });

  it('handles empty margin string', () => {
    mockUseInView.mockReturnValue(false);

    renderHook(() => useScrollAnimation({ margin: '' }));

    expect(mockUseInView).toHaveBeenCalledWith(
      expect.objectContaining({ current: null }),
      expect.objectContaining({
        margin: '',
      })
    );
  });
});
