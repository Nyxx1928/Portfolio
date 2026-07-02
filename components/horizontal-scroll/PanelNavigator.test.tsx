import {
  HorizontalScrollProvider,
  useHorizontalScrollController,
} from '@/components/horizontal-scroll/HorizontalScrollContext';
import { PanelNavigator } from '@/components/horizontal-scroll/PanelNavigator';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect } from 'react';

function Controller({
  currentIndex,
  onScroll,
}: {
  currentIndex: number;
  onScroll: jest.Mock;
}) {
  const {
    registerScrollHandler,
    setCurrentIndexInternal,
    setHorizontalActive,
  } = useHorizontalScrollController();

  useEffect(() => {
    setHorizontalActive(true);
    setCurrentIndexInternal(currentIndex);
    registerScrollHandler((index) => onScroll(index));
  }, [currentIndex, onScroll, registerScrollHandler, setCurrentIndexInternal, setHorizontalActive]);

  return null;
}

describe('PanelNavigator', () => {
  it('renders tankobon label and tab navigation', async () => {
    const onScroll = jest.fn();

    render(
      <HorizontalScrollProvider initialTotalPanels={4}>
        <Controller currentIndex={0} onScroll={onScroll} />
        <PanelNavigator />
      </HorizontalScrollProvider>
    );

    expect(screen.getByText('VOL. 1 — pp. 1 / 4')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Previous panel' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next panel' })).not.toBeDisabled();

    await userEvent.click(screen.getByRole('tab', { name: 'Go to panel 3' }));

    await waitFor(() => expect(onScroll).toHaveBeenCalledWith(2));
  });

  it('highlights correct tab for each index', async () => {
    const onScroll = jest.fn();

    const { rerender } = render(
      <HorizontalScrollProvider initialTotalPanels={3}>
        <Controller currentIndex={0} onScroll={onScroll} />
        <PanelNavigator />
      </HorizontalScrollProvider>
    );

    let tab1 = screen.getByRole('tab', { name: 'Go to panel 1' });
    let tab2 = screen.getByRole('tab', { name: 'Go to panel 2' });
    let tab3 = screen.getByRole('tab', { name: 'Go to panel 3' });

    expect(tab1).toHaveAttribute('aria-selected', 'true');
    expect(tab2).toHaveAttribute('aria-selected', 'false');
    expect(tab3).toHaveAttribute('aria-selected', 'false');

    rerender(
      <HorizontalScrollProvider initialTotalPanels={3}>
        <Controller currentIndex={1} onScroll={onScroll} />
        <PanelNavigator />
      </HorizontalScrollProvider>
    );

    tab1 = screen.getByRole('tab', { name: 'Go to panel 1' });
    tab2 = screen.getByRole('tab', { name: 'Go to panel 2' });
    tab3 = screen.getByRole('tab', { name: 'Go to panel 3' });

    expect(tab1).toHaveAttribute('aria-selected', 'false');
    expect(tab2).toHaveAttribute('aria-selected', 'true');
    expect(tab3).toHaveAttribute('aria-selected', 'false');
  });
});
