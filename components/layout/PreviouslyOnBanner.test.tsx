import { render, act } from '@testing-library/react';
import { PreviouslyOnBanner } from './PreviouslyOnBanner';

const STORAGE_KEY = 'manga-portfolio-history';

function setMockHistory(data: unknown) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function clearMockHistory() {
  localStorage.removeItem(STORAGE_KEY);
}

describe('PreviouslyOnBanner', () => {
  beforeEach(() => {
    clearMockHistory();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    clearMockHistory();
  });

  it('does not render on first visit (no localStorage entry)', () => {
    const { container } = render(<PreviouslyOnBanner />);
    expect(container.firstChild).toBeNull();
  });

  it('initializes localStorage on first visit with visitCount=1', () => {
    render(<PreviouslyOnBanner />);
    const raw = localStorage.getItem(STORAGE_KEY);
    expect(raw).not.toBeNull();
    const data = JSON.parse(raw!);
    expect(data.visitCount).toBe(1);
    expect(data.lastSection).toBe('/');
  });

  it('does not render when visitCount is 0', () => {
    setMockHistory({ visitCount: 0, lastSection: '/', lastSectionLabel: 'the Home page' });
    const { container } = render(<PreviouslyOnBanner />);
    expect(container.firstChild).toBeNull();
  });

  it('renders banner on second visit', () => {
    setMockHistory({ visitCount: 1, lastSection: '/', lastSectionLabel: 'the Home page' });
    const { container } = render(<PreviouslyOnBanner />);
    expect(container.firstChild).not.toBeNull();
  });

  it('increments visitCount on subsequent visits', () => {
    setMockHistory({ visitCount: 1, lastSection: '/', lastSectionLabel: 'the Home page' });
    render(<PreviouslyOnBanner />);
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = JSON.parse(raw!);
    expect(data.visitCount).toBe(2);
  });

  it('shows "PREVIOUSLY ON..." header text', () => {
    setMockHistory({ visitCount: 1, lastSection: '/', lastSectionLabel: 'the Home page' });
    const { getByText } = render(<PreviouslyOnBanner />);
    expect(getByText(/Previously On/i)).toBeInTheDocument();
  });

  it('shows "Continue Reading" link', () => {
    setMockHistory({ visitCount: 1, lastSection: '/', lastSectionLabel: 'the Home page' });
    const { getByText } = render(<PreviouslyOnBanner />);
    expect(getByText(/Continue Reading/i)).toBeInTheDocument();
  });

  it('has role="status" and aria-live="polite"', () => {
    setMockHistory({ visitCount: 1, lastSection: '/projects', lastSectionLabel: 'the Projects page' });
    const { container } = render(<PreviouslyOnBanner />);
    const statusEl = container.querySelector('[role="status"]');
    expect(statusEl).toBeInTheDocument();
    expect(statusEl).toHaveAttribute('aria-live', 'polite');
  });

  it('sets auto-dismiss timer on mount', () => {
    jest.spyOn(global, 'setTimeout');
    setMockHistory({ visitCount: 1, lastSection: '/', lastSectionLabel: 'the Home page' });
    render(<PreviouslyOnBanner />);
    expect(setTimeout).toHaveBeenCalled();
  });
});
