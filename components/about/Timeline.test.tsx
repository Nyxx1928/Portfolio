import { render, screen, within } from '@testing-library/react';
import { Timeline } from './Timeline';
import { TimelineEvent } from '@/types';

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useInView: () => true,
}));

// Mock useScrollAnimation hook
jest.mock('@/lib/hooks/useScrollAnimation', () => ({
  useScrollAnimation: () => ({
    ref: { current: null },
    isInView: true,
  }),
}));

describe('Timeline', () => {
  const mockEvents: TimelineEvent[] = [
    {
      id: 'event-1',
      date: '2020-01-15',
      title: 'Started New Job',
      description: 'Joined TechCorp as a Senior Developer',
      type: 'work',
      organization: 'TechCorp',
      location: 'San Francisco, CA',
      isPast: true,
    },
    {
      id: 'event-2',
      date: '2021-06-20',
      title: 'Launched Project X',
      description: 'Released a successful open-source project',
      type: 'project',
      organization: 'Personal Project',
      isPast: true,
    },
    {
      id: 'event-3',
      date: '2023-03-10',
      title: 'Current Position',
      description: 'Leading frontend architecture',
      type: 'work',
      organization: 'TechCorp',
      location: 'Remote',
      isPast: false,
    },
  ];

  it('renders timeline header', () => {
    render(<Timeline events={mockEvents} />);
    expect(screen.getByText('Timeline')).toBeInTheDocument();
  });

  it('displays all timeline events', () => {
    render(<Timeline events={mockEvents} />);
    
    expect(screen.getAllByText('Started New Job')).toHaveLength(2); // Mobile + Desktop
    expect(screen.getAllByText('Launched Project X')).toHaveLength(2);
    expect(screen.getAllByText('Current Position')).toHaveLength(2);
  });

  it('displays event descriptions', () => {
    render(<Timeline events={mockEvents} />);
    
    expect(screen.getAllByText('Joined TechCorp as a Senior Developer')).toHaveLength(2);
    expect(screen.getAllByText('Released a successful open-source project')).toHaveLength(2);
    expect(screen.getAllByText('Leading frontend architecture')).toHaveLength(2);
  });

  it('displays event dates in correct format', () => {
    render(<Timeline events={mockEvents} />);
    
    // Dates should be formatted as "Jan 2020", "Jun 2021", etc.
    expect(screen.getAllByText(/Jan 2020/i)).toHaveLength(2);
    expect(screen.getAllByText(/Jun 2021/i)).toHaveLength(2);
    expect(screen.getAllByText(/Mar 2023/i)).toHaveLength(2);
  });

  it('displays event types correctly', () => {
    render(<Timeline events={mockEvents} />);
    
    // Check for type labels
    expect(screen.getAllByText('Work')).toHaveLength(4); // 2 work events × 2 (mobile + desktop)
    expect(screen.getAllByText('Project')).toHaveLength(2);
  });

  it('displays organization information when provided', () => {
    render(<Timeline events={mockEvents} />);
    
    expect(screen.getAllByText('TechCorp')).toHaveLength(4); // 2 events × 2 (mobile + desktop)
    expect(screen.getAllByText('Personal Project')).toHaveLength(2);
  });

  it('displays location information when provided', () => {
    render(<Timeline events={mockEvents} />);
    
    expect(screen.getAllByText('San Francisco, CA')).toHaveLength(2);
    expect(screen.getAllByText('Remote')).toHaveLength(2);
  });

  it('applies "Flashback" styling to past events', () => {
    render(<Timeline events={mockEvents} />);
    
    // Check for "Flashback" labels on past events
    const flashbackLabels = screen.getAllByText('Flashback');
    expect(flashbackLabels.length).toBeGreaterThan(0);
  });

  it('does not apply "Flashback" styling to current events', () => {
    const currentEvent: TimelineEvent = {
      id: 'current',
      date: '2024-01-01',
      title: 'Current Event',
      description: 'This is happening now',
      type: 'work',
      isPast: false,
    };

    render(<Timeline events={[currentEvent]} />);
    
    // Should not have flashback styling
    const flashbackLabels = screen.queryAllByText('Flashback');
    expect(flashbackLabels).toHaveLength(0);
  });

  it('sorts events chronologically (oldest first)', () => {
    const unsortedEvents: TimelineEvent[] = [
      {
        id: 'event-3',
        date: '2023-01-01',
        title: 'Latest Event',
        description: 'Most recent',
        type: 'work',
        isPast: false,
      },
      {
        id: 'event-1',
        date: '2020-01-01',
        title: 'Oldest Event',
        description: 'First event',
        type: 'work',
        isPast: true,
      },
      {
        id: 'event-2',
        date: '2021-06-01',
        title: 'Middle Event',
        description: 'Second event',
        type: 'work',
        isPast: true,
      },
    ];

    render(<Timeline events={unsortedEvents} />);
    
    // Get all event titles (both mobile and desktop versions)
    const titles = screen.getAllByRole('heading', { level: 3 });
    
    // Check that events appear in chronological order
    // Each event appears twice (mobile + desktop), so we check pairs
    expect(titles[0]).toHaveTextContent('Oldest Event');
    expect(titles[1]).toHaveTextContent('Oldest Event');
    expect(titles[2]).toHaveTextContent('Middle Event');
    expect(titles[3]).toHaveTextContent('Middle Event');
    expect(titles[4]).toHaveTextContent('Latest Event');
    expect(titles[5]).toHaveTextContent('Latest Event');
  });

  it('handles events without organization or location', () => {
    const minimalEvent: TimelineEvent[] = [
      {
        id: 'minimal',
        date: '2022-01-01',
        title: 'Minimal Event',
        description: 'Event with minimal data',
        type: 'achievement',
        isPast: true,
      },
    ];

    render(<Timeline events={minimalEvent} />);
    
    expect(screen.getAllByText('Minimal Event')).toHaveLength(2);
    expect(screen.getAllByText('Event with minimal data')).toHaveLength(2);
  });

  it('displays correct icons for different event types', () => {
    const allTypes: TimelineEvent[] = [
      {
        id: 'edu',
        date: '2020-01-01',
        title: 'Education Event',
        description: 'Education event',
        type: 'education',
        isPast: true,
      },
      {
        id: 'work',
        date: '2021-01-01',
        title: 'Work Event',
        description: 'Work event',
        type: 'work',
        isPast: true,
      },
      {
        id: 'project',
        date: '2022-01-01',
        title: 'Project Event',
        description: 'Project event',
        type: 'project',
        isPast: true,
      },
      {
        id: 'achievement',
        date: '2023-01-01',
        title: 'Achievement Event',
        description: 'Achievement event',
        type: 'achievement',
        isPast: false,
      },
    ];

    render(<Timeline events={allTypes} />);
    
    // Check that all type labels are present (appears in mobile and desktop layouts)
    expect(screen.getAllByText('Education').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('Work').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('Project').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('Achievement').length).toBeGreaterThanOrEqual(2);
  });

  it('renders empty timeline when no events provided', () => {
    render(<Timeline events={[]} />);
    
    // Should still render the header
    expect(screen.getByText('Timeline')).toBeInTheDocument();
    
    // But no event content
    expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
  });

  it('handles single event correctly', () => {
    const singleEvent: TimelineEvent[] = [
      {
        id: 'single',
        date: '2023-01-01',
        title: 'Single Event',
        description: 'Only one event',
        type: 'work',
        organization: 'Company',
        isPast: false,
      },
    ];

    render(<Timeline events={singleEvent} />);
    
    expect(screen.getAllByText('Single Event')).toHaveLength(2);
    expect(screen.getAllByText('Only one event')).toHaveLength(2);
    expect(screen.getAllByText('Company')).toHaveLength(2);
  });

  it('applies responsive classes for mobile and desktop layouts', () => {
    const { container } = render(<Timeline events={mockEvents} />);
    
    // Check for mobile-specific classes (md:hidden)
    const mobileElements = container.querySelectorAll('.md\\:hidden');
    expect(mobileElements.length).toBeGreaterThan(0);
    
    // Check for desktop-specific classes (hidden md:flex or hidden md:block)
    const desktopElements = container.querySelectorAll('.hidden.md\\:flex, .hidden.md\\:block');
    expect(desktopElements.length).toBeGreaterThan(0);
  });
});
