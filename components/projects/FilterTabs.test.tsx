import { render, screen, fireEvent } from '@testing-library/react';
import { FilterTabs } from './FilterTabs';
import { useRouter, useSearchParams } from 'next/navigation';

// Mock Next.js navigation hooks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('FilterTabs', () => {
  const mockPush = jest.fn();
  const mockSearchParams = {
    get: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
  });

  it('renders all filter tabs', () => {
    mockSearchParams.get.mockReturnValue('all');
    
    render(<FilterTabs />);
    
    expect(screen.getByText('All Projects')).toBeInTheDocument();
    expect(screen.getByText('Web Apps')).toBeInTheDocument();
    expect(screen.getByText('Mobile Apps')).toBeInTheDocument();
    expect(screen.getByText('UI/UX')).toBeInTheDocument();
    expect(screen.getByText('Other')).toBeInTheDocument();
  });

  it('highlights the active filter tab', () => {
    mockSearchParams.get.mockReturnValue('web');
    
    render(<FilterTabs />);
    
    const webTab = screen.getByText('Web Apps').closest('button');
    const allTab = screen.getByText('All Projects').closest('button');
    
    expect(webTab).toHaveClass('bg-manga-black', 'text-manga-white');
    expect(allTab).toHaveClass('bg-manga-white', 'text-manga-black');
  });

  it('defaults to "all" when no category parameter is present', () => {
    mockSearchParams.get.mockReturnValue(null);
    
    render(<FilterTabs />);
    
    const allTab = screen.getByText('All Projects').closest('button');
    expect(allTab).toHaveClass('bg-manga-black', 'text-manga-white');
  });

  it('navigates to /projects when "All Projects" is clicked', () => {
    mockSearchParams.get.mockReturnValue('web');
    
    render(<FilterTabs />);
    
    const allTab = screen.getByText('All Projects');
    fireEvent.click(allTab);
    
    expect(mockPush).toHaveBeenCalledWith('/projects');
  });

  it('updates URL parameter when a category filter is clicked', () => {
    mockSearchParams.get.mockReturnValue('all');
    
    render(<FilterTabs />);
    
    const webTab = screen.getByText('Web Apps');
    fireEvent.click(webTab);
    
    expect(mockPush).toHaveBeenCalledWith('/projects?category=web');
  });

  it('updates URL parameter for mobile category', () => {
    mockSearchParams.get.mockReturnValue('all');
    
    render(<FilterTabs />);
    
    const mobileTab = screen.getByText('Mobile Apps');
    fireEvent.click(mobileTab);
    
    expect(mockPush).toHaveBeenCalledWith('/projects?category=mobile');
  });

  it('updates URL parameter for UI/UX category', () => {
    mockSearchParams.get.mockReturnValue('all');
    
    render(<FilterTabs />);
    
    const uiuxTab = screen.getByText('UI/UX');
    fireEvent.click(uiuxTab);
    
    expect(mockPush).toHaveBeenCalledWith('/projects?category=uiux');
  });

  it('updates URL parameter for Other category', () => {
    mockSearchParams.get.mockReturnValue('all');
    
    render(<FilterTabs />);
    
    const otherTab = screen.getByText('Other');
    fireEvent.click(otherTab);
    
    expect(mockPush).toHaveBeenCalledWith('/projects?category=other');
  });

  it('has proper ARIA attributes for accessibility', () => {
    mockSearchParams.get.mockReturnValue('web');
    
    render(<FilterTabs />);
    
    const tablist = screen.getByRole('tablist');
    expect(tablist).toHaveAttribute('aria-label', 'Project category filters');
    
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(5);
    
    // Check active tab has aria-selected="true"
    const webTab = screen.getByText('Web Apps').closest('button');
    expect(webTab).toHaveAttribute('aria-selected', 'true');
    
    // Check inactive tabs have aria-selected="false"
    const allTab = screen.getByText('All Projects').closest('button');
    expect(allTab).toHaveAttribute('aria-selected', 'false');
  });

  it('applies manga chapter tab styling', () => {
    mockSearchParams.get.mockReturnValue('all');
    
    render(<FilterTabs />);
    
    const tabs = screen.getAllByRole('tab');
    tabs.forEach(tab => {
      expect(tab).toHaveClass('font-heading', 'uppercase', 'tracking-wider');
      expect(tab).toHaveClass('border-manga', 'border-manga-black');
    });
  });

  it('is scrollable on mobile (has overflow-x-auto)', () => {
    mockSearchParams.get.mockReturnValue('all');
    
    const { container } = render(<FilterTabs />);
    
    const scrollContainer = container.querySelector('.overflow-x-auto');
    expect(scrollContainer).toBeInTheDocument();
    expect(scrollContainer).toHaveClass('scrollbar-hide');
  });
});
