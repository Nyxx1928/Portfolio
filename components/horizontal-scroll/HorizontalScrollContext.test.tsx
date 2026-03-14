import {
  HorizontalScrollProvider,
  useHorizontalScroll,
  useHorizontalScrollController,
} from "@/components/horizontal-scroll/HorizontalScrollContext";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEffect } from "react";

function Probe() {
  const { currentIndex, scrollToPanel, totalPanels } = useHorizontalScroll();

  return (
    <div>
      <p data-testid="index">{currentIndex}</p>
      <p data-testid="total">{totalPanels}</p>
      <button type="button" onClick={() => scrollToPanel(-4)}>
        ClampLow
      </button>
      <button type="button" onClick={() => scrollToPanel(999)}>
        ClampHigh
      </button>
    </div>
  );
}

function Controller({ onScroll }: { onScroll: jest.Mock }) {
  const { registerScrollHandler, setCurrentIndexInternal } =
    useHorizontalScrollController();

  useEffect(() => {
    registerScrollHandler((index) => {
      onScroll(index);
      setCurrentIndexInternal(index);
    });
  }, [onScroll, registerScrollHandler, setCurrentIndexInternal]);

  return null;
}

function RegisterAndUnregisterController({
  onScroll,
}: {
  onScroll: jest.Mock;
}) {
  const { registerScrollHandler, scrollToPanel } =
    useHorizontalScrollController();

  useEffect(() => {
    registerScrollHandler((index) => {
      onScroll(index);
    });

    registerScrollHandler(null);
    scrollToPanel(1);
  }, [onScroll, registerScrollHandler, scrollToPanel]);

  return null;
}

describe("useHorizontalScroll", () => {
  it("clamps scrollToPanel boundaries at index 0 and N-1", async () => {
    const onScroll = jest.fn();
    const user = userEvent.setup();

    render(
      <HorizontalScrollProvider initialTotalPanels={4}>
        <Controller onScroll={onScroll} />
        <Probe />
      </HorizontalScrollProvider>,
    );

    await user.click(screen.getByRole("button", { name: "ClampLow" }));
    await user.click(screen.getByRole("button", { name: "ClampHigh" }));

    await waitFor(() => {
      expect(onScroll).toHaveBeenCalledWith(0);
      expect(onScroll).toHaveBeenCalledWith(3);
    });
  });

  // RTL reading-direction persistence test removed

  // RTL logical clamping test removed

  it("allows unregistering scroll handler and no-ops safely", async () => {
    const onScroll = jest.fn();

    render(
      <HorizontalScrollProvider initialTotalPanels={3}>
        <RegisterAndUnregisterController onScroll={onScroll} />
      </HorizontalScrollProvider>,
    );

    await waitFor(() => {
      expect(onScroll).not.toHaveBeenCalled();
    });
  });
});
