import { render, screen } from '@testing-library/react';
import { TradingCardFront } from './TradingCardFront';
import { Project } from '@/types';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ priority, fill, onLoadingComplete, blurDataURL, placeholder, ...props }: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...(props as React.ImgHTMLAttributes<HTMLImageElement>)} />;
  },
}));

jest.mock('@/components/manga/HalftonePattern', () => ({
  HalftonePattern: ({ intensity, className }: { intensity?: string; className?: string }) => (
    <div data-testid="halftone-pattern" data-intensity={intensity} className={className} />
  ),
}));

jest.mock('@/components/manga/MangaImage', () => ({
  MangaImage: ({ wrapperClassName, showSkeleton, fill, ...props }: Record<string, unknown>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...(props as React.ImgHTMLAttributes<HTMLImageElement>)} />
  ),
}));

const baseProject: Project = {
  id: '1',
  slug: 'test-project',
  title: 'Test Project',
  description: 'A test project description',
  fullDescription: 'Full description',
  thumbnail: '/images/test-thumb.jpg',
  webScreenshots: [],
  mobileScreenshots: [],
  techStack: ['React', 'TypeScript'],
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

describe('TradingCardFront', () => {
  it('renders project thumbnail', () => {
    render(<TradingCardFront project={baseProject} />);
    const image = screen.getByAltText('Test Project');
    expect(image).toBeInTheDocument();
  });

  it('renders card number', () => {
    render(<TradingCardFront project={baseProject} />);
    expect(screen.getByText('#001')).toBeInTheDocument();
  });

  it('renders stat bars with correct widths', () => {
    render(<TradingCardFront project={baseProject} />);

    const codeBar = screen.getByTestId('stat-bar-code');
    const designBar = screen.getByTestId('stat-bar-design');
    const innovationBar = screen.getByTestId('stat-bar-innovation');

    expect(codeBar).toHaveStyle({ width: '50%' });
    expect(designBar).toHaveStyle({ width: '75%' });
    expect(innovationBar).toHaveStyle({ width: '100%' });
  });

  it('renders common rarity as single star', () => {
    render(<TradingCardFront project={baseProject} />);
    expect(screen.getByText('★')).toBeInTheDocument();
    expect(screen.getByText('COMMON')).toBeInTheDocument();
  });

  it('renders uncommon rarity as double star', () => {
    render(<TradingCardFront project={{ ...baseProject, rarity: 'uncommon' }} />);
    expect(screen.getByText('★★')).toBeInTheDocument();
    expect(screen.getByText('UNCOMMON')).toBeInTheDocument();
  });

  it('renders rare rarity as triple star', () => {
    render(<TradingCardFront project={{ ...baseProject, rarity: 'rare' }} />);
    expect(screen.getByText('★★★')).toBeInTheDocument();
    expect(screen.getByText('RARE')).toBeInTheDocument();
  });

  it('renders project title', () => {
    render(<TradingCardFront project={baseProject} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });
});
