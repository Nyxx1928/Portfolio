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
  it('renders panel count text and boundary disabled states', async () => {
    const onScroll = jest.fn();

    render(
      <HorizontalScrollProvider initialTotalPanels={4}>
        <Controller currentIndex={0} onScroll={onScroll} />
        <PanelNavigator />
      </HorizontalScrollProvider>
    );

    expect(screen.getByText('Panel 1 / 4')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Previous panel' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next panel' })).not.toBeDisabled();

    await userEvent.click(screen.getByRole('button', { name: 'Go to panel 3' }));

    await waitFor(() => expect(onScroll).toHaveBeenCalledWith(2));
  });
});
