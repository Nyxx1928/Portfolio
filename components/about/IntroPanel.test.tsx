import { render, screen } from '@testing-library/react';
import { IntroPanel } from './IntroPanel';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useInView: () => true,
}));

describe('IntroPanel', () => {
  const mockProps = {
    name: 'John Doe',
    bio: 'A passionate developer who loves creating manga-inspired web experiences.',
    avatarSrc: '/images/avatar.jpg',
    inspirations: ['One Piece', 'Berserk', 'Vagabond', 'Death Note'],
  };

  it('renders the name correctly', () => {
    render(<IntroPanel {...mockProps} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders the bio text', () => {
    render(<IntroPanel {...mockProps} />);
    expect(
      screen.getByText('A passionate developer who loves creating manga-inspired web experiences.')
    ).toBeInTheDocument();
  });

  it('renders the avatar image with correct alt text', () => {
    render(<IntroPanel {...mockProps} />);
    const avatar = screen.getByAltText('John Doe - Portfolio Avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', '/images/avatar.jpg');
  });

  it('renders the inspirations section header', () => {
    render(<IntroPanel {...mockProps} />);
    expect(screen.getByText('Manga & Anime Inspirations')).toBeInTheDocument();
  });

  it('renders all inspirations in the list', () => {
    render(<IntroPanel {...mockProps} />);
    mockProps.inspirations.forEach((inspiration) => {
      expect(screen.getByText(inspiration)).toBeInTheDocument();
    });
  });

  it('renders correct number of inspiration items', () => {
    render(<IntroPanel {...mockProps} />);
    const inspirationElements = screen.getAllByText(/One Piece|Berserk|Vagabond|Death Note/);
    expect(inspirationElements).toHaveLength(4);
  });

  it('renders with empty inspirations array', () => {
    const propsWithNoInspirations = {
      ...mockProps,
      inspirations: [],
    };
    render(<IntroPanel {...propsWithNoInspirations} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Manga & Anime Inspirations')).toBeInTheDocument();
  });

  it('renders with single inspiration', () => {
    const propsWithOneInspiration = {
      ...mockProps,
      inspirations: ['One Piece'],
    };
    render(<IntroPanel {...propsWithOneInspiration} />);
    expect(screen.getByText('One Piece')).toBeInTheDocument();
  });

  it('renders with long bio text', () => {
    const longBio = 'A'.repeat(500);
    const propsWithLongBio = {
      ...mockProps,
      bio: longBio,
    };
    render(<IntroPanel {...propsWithLongBio} />);
    expect(screen.getByText(longBio)).toBeInTheDocument();
  });

  it('renders with special characters in name', () => {
    const propsWithSpecialChars = {
      ...mockProps,
      name: "John O'Doe-Smith",
    };
    render(<IntroPanel {...propsWithSpecialChars} />);
    expect(screen.getByText("John O'Doe-Smith")).toBeInTheDocument();
  });
});
