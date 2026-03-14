import {
  HorizontalScrollProvider,
  useHorizontalScrollController,
} from '@/components/horizontal-scroll/HorizontalScrollContext';
import { Navigation } from '@/components/layout/Navigation';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect } from 'react';

function Controller({ onScroll }: { onScroll: jest.Mock }) {
  const { registerScrollHandler, setHorizontalActive, setTotalPanelsInternal } = useHorizontalScrollController();

  useEffect(() => {
    setHorizontalActive(true);
    setTotalPanelsInternal(4);
    registerScrollHandler((index) => onScroll(index));
  }, [onScroll, registerScrollHandler, setHorizontalActive, setTotalPanelsInternal]);

  return null;
}

function InactiveHandlerController() {
  const { setHorizontalActive, setTotalPanelsInternal, registerScrollHandler } = useHorizontalScrollController();

  useEffect(() => {
    setHorizontalActive(true);
    setTotalPanelsInternal(4);
    registerScrollHandler(null);
  }, [registerScrollHandler, setHorizontalActive, setTotalPanelsInternal]);

  return null;
}

describe('Navigation', () => {
  it('calls scrollToPanel instead of routing when horizontal mode is active', async () => {
    const onScroll = jest.fn();

    render(
      <HorizontalScrollProvider>
        <Controller onScroll={onScroll} />
        <Navigation />
      </HorizontalScrollProvider>
    );

    await userEvent.click(screen.getByRole('link', { name: 'Projects' }));

    await waitFor(() => {
      expect(onScroll).toHaveBeenCalledWith(2);
    });
  });

  it('does not attempt panel scroll when horizontal mode is active but handler is not ready', async () => {
    const onScroll = jest.fn();

    render(
      <HorizontalScrollProvider>
        <InactiveHandlerController />
        <Navigation />
      </HorizontalScrollProvider>
    );

    await userEvent.click(screen.getByRole('link', { name: 'Projects' }));

    await waitFor(() => {
      expect(onScroll).not.toHaveBeenCalled();
    });
  });
});
