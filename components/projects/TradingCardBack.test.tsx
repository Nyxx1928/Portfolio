import { render, screen } from '@testing-library/react';
import { TradingCardBack } from './TradingCardBack';
import { Project } from '@/types';

const baseProject: Project = {
  id: '1',
  slug: 'test-project',
  title: 'Test Project',
  description: 'A test project description for the back of the card',
  fullDescription: 'Full description',
  thumbnail: '/images/test-thumb.jpg',
  screenshots: [],
  techStack: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Node.js'],
  category: ['web'],
  featured: true,
  rarity: 'common',
  stats: { code: 50, design: 75, innovation: 100 },
  cardNumber: '#001',
  challenges: [],
  learnings: [],
  impact: [],
  createdAt: '2024-01-01',
};

describe('TradingCardBack', () => {
  it('renders project title', () => {
    render(<TradingCardBack project={baseProject} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('renders shortened description', () => {
    render(<TradingCardBack project={baseProject} />);
    expect(screen.getByText(/A test project description for the back/)).toBeInTheDocument();
  });

  it('renders tech stack badges', () => {
    render(<TradingCardBack project={baseProject} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('Tailwind')).toBeInTheDocument();
  });

  it('shows overflow count when more than 4 tech items', () => {
    render(<TradingCardBack project={baseProject} />);
    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  it('renders View Details CTA', () => {
    render(<TradingCardBack project={baseProject} />);
    expect(screen.getByText('View Details →')).toBeInTheDocument();
  });
});
