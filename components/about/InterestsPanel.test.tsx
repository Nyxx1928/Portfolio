import { render, screen, within } from '@testing-library/react';
import { InterestsPanel } from './InterestsPanel';
import { Interest } from '@/types';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useInView: jest.fn(() => false),
}));

// Mock MangaPanel
jest.mock('@/components/manga/MangaPanel', () => ({
  MangaPanel: ({ children }: any) => <div data-testid="manga-panel">{children}</div>,
}));

// Mock useScrollAnimation hook
jest.mock('@/lib/hooks/useScrollAnimation', () => ({
  useScrollAnimation: () => ({
    ref: { current: null },
    isInView: true,
  }),
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

describe('InterestsPanel', () => {
  const mockMangaInterests: Interest[] = [
    {
      id: 'manga-1',
      title: 'One Piece',
      type: 'manga',
      image: '/images/one-piece.jpg',
      description: 'Epic adventure story',
      rating: 10,
    },
    {
      id: 'manga-2',
      title: 'Berserk',
      type: 'manga',
      image: '/images/berserk.jpg',
      description: 'Dark fantasy masterpiece',
      rating: 10,
    },
  ];

  const mockAnimeInterests: Interest[] = [
    {
      id: 'anime-1',
      title: 'Cowboy Bebop',
      type: 'anime',
      image: '/images/cowboy-bebop.jpg',
      description: 'Timeless classic',
      rating: 10,
    },
  ];

  const mockHobbyInterests: Interest[] = [
    {
      id: 'hobby-1',
      title: 'Digital Illustration',
      type: 'hobby',
      image: '/images/illustration.jpg',
      description: 'Creating manga-style character art',
    },
    {
      id: 'hobby-2',
      title: 'Collecting Manga',
      type: 'hobby',
      image: '/images/manga-collection.jpg',
      description: 'Building a physical manga collection',
    },
  ];

  it('renders the component with header', () => {
    render(<InterestsPanel interests={mockMangaInterests} />);
    
    expect(screen.getByText('Interests & Favorites')).toBeInTheDocument();
  });

  it('displays manga interests section', () => {
    render(<InterestsPanel interests={mockMangaInterests} />);
    
    expect(screen.getByText('Favorite Manga')).toBeInTheDocument();
    expect(screen.getAllByText('One Piece').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Berserk').length).toBeGreaterThan(0);
  });

  it('displays anime interests section', () => {
    render(<InterestsPanel interests={mockAnimeInterests} />);
    
    expect(screen.getByText('Favorite Anime')).toBeInTheDocument();
    expect(screen.getAllByText('Cowboy Bebop').length).toBeGreaterThan(0);
  });

  it('displays hobbies section', () => {
    render(<InterestsPanel interests={mockHobbyInterests} />);
    
    expect(screen.getByText('Hobbies & Activities')).toBeInTheDocument();
    expect(screen.getByText('Digital Illustration')).toBeInTheDocument();
    expect(screen.getByText('Collecting Manga')).toBeInTheDocument();
  });

  it('displays all three sections when all types are present', () => {
    const allInterests = [
      ...mockMangaInterests,
      ...mockAnimeInterests,
      ...mockHobbyInterests,
    ];
    
    render(<InterestsPanel interests={allInterests} />);
    
    expect(screen.getByText('Favorite Manga')).toBeInTheDocument();
    expect(screen.getByText('Favorite Anime')).toBeInTheDocument();
    expect(screen.getByText('Hobbies & Activities')).toBeInTheDocument();
  });

  it('renders trading cards for manga interests', () => {
    render(<InterestsPanel interests={mockMangaInterests} />);
    
    const onePieceImage = screen.getByAltText('One Piece');
    expect(onePieceImage).toBeInTheDocument();
    expect(onePieceImage).toHaveAttribute('src', '/images/one-piece.jpg');
  });

  it('renders trading cards for anime interests', () => {
    render(<InterestsPanel interests={mockAnimeInterests} />);
    
    const cowboyBebopImage = screen.getByAltText('Cowboy Bebop');
    expect(cowboyBebopImage).toBeInTheDocument();
    expect(cowboyBebopImage).toHaveAttribute('src', '/images/cowboy-bebop.jpg');
  });

  it('renders hobby cards with images', () => {
    render(<InterestsPanel interests={mockHobbyInterests} />);
    
    const illustrationImage = screen.getByAltText('Digital Illustration');
    expect(illustrationImage).toBeInTheDocument();
    expect(illustrationImage).toHaveAttribute('src', '/images/illustration.jpg');
  });

  it('displays ratings for manga/anime interests', () => {
    render(<InterestsPanel interests={mockMangaInterests} />);
    
    const ratings = screen.getAllByText('10/10');
    expect(ratings.length).toBeGreaterThan(0);
  });

  it('displays descriptions in hobby cards', () => {
    render(<InterestsPanel interests={mockHobbyInterests} />);
    
    expect(screen.getByText('Creating manga-style character art')).toBeInTheDocument();
    expect(screen.getByText('Building a physical manga collection')).toBeInTheDocument();
  });

  it('renders grid layout for interests', () => {
    render(<InterestsPanel interests={mockMangaInterests} />);
    
    const gridContainer = screen.getAllByText('One Piece')[0].closest('.grid');
    expect(gridContainer).toHaveClass('grid');
  });

  it('handles empty interests array', () => {
    render(<InterestsPanel interests={[]} />);
    
    expect(screen.getByText('Interests & Favorites')).toBeInTheDocument();
    expect(screen.queryByText('Favorite Manga')).not.toBeInTheDocument();
    expect(screen.queryByText('Favorite Anime')).not.toBeInTheDocument();
    expect(screen.queryByText('Hobbies & Activities')).not.toBeInTheDocument();
  });

  it('handles interests without images', () => {
    const interestsWithoutImages: Interest[] = [
      {
        id: 'hobby-1',
        title: 'Reading',
        type: 'hobby',
        description: 'Reading manga and novels',
      },
    ];
    
    render(<InterestsPanel interests={interestsWithoutImages} />);
    
    expect(screen.getByText('Reading')).toBeInTheDocument();
    expect(screen.getByText('Reading manga and novels')).toBeInTheDocument();
  });

  it('handles interests without descriptions', () => {
    const interestsWithoutDescriptions: Interest[] = [
      {
        id: 'manga-1',
        title: 'Naruto',
        type: 'manga',
        image: '/images/naruto.jpg',
        rating: 8,
      },
    ];
    
    render(<InterestsPanel interests={interestsWithoutDescriptions} />);
    
    expect(screen.getAllByText('Naruto').length).toBeGreaterThan(0);
  });

  it('handles interests without ratings', () => {
    const interestsWithoutRatings: Interest[] = [
      {
        id: 'anime-1',
        title: 'Demon Slayer',
        type: 'anime',
        image: '/images/demon-slayer.jpg',
        description: 'Beautiful animation',
      },
    ];
    
    render(<InterestsPanel interests={interestsWithoutRatings} />);
    
    expect(screen.getAllByText('Demon Slayer').length).toBeGreaterThan(0);
    expect(screen.queryByText(/\/10/)).not.toBeInTheDocument();
  });
});
