import { render, screen } from '@testing-library/react';
import { ChapterHeader } from './ChapterHeader';

describe('ChapterHeader', () => {
  it('renders title text', () => {
    render(<ChapterHeader title="Test Chapter" />);
    expect(screen.getByText('Test Chapter')).toBeInTheDocument();
  });

  it('renders with chapter number when provided', () => {
    render(<ChapterHeader title="Test Chapter" chapterNumber={1} />);
    expect(screen.getByText('Chapter 1')).toBeInTheDocument();
  });

  it('does not render chapter number when not provided', () => {
    render(<ChapterHeader title="Test Chapter" />);
    expect(screen.queryByText(/Chapter \d+/)).not.toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<ChapterHeader title="Test Chapter" subtitle="A new beginning" />);
    expect(screen.getByText('A new beginning')).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    const { container } = render(<ChapterHeader title="Test Chapter" />);
    const subtitles = container.querySelectorAll('.font-body');
    expect(subtitles.length).toBe(0);
  });

  it('renders decorative lines on both sides of title', () => {
    const { container } = render(<ChapterHeader title="Test Chapter" />);
    const decorativeLines = container.querySelectorAll('[aria-hidden="true"]');
    // Should have at least 2 decorative lines (left and right) plus ink brush stroke
    expect(decorativeLines.length).toBeGreaterThanOrEqual(3);
  });

  it('renders ink brush stroke divider at bottom', () => {
    const { container } = render(<ChapterHeader title="Test Chapter" />);
    const divider = container.querySelector('.absolute.bottom-0');
    expect(divider).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ChapterHeader title="Test Chapter" className="custom-class" />
    );
    const wrapper = container.querySelector('.custom-class');
    expect(wrapper).toBeInTheDocument();
  });

  it('uses bold typography for title', () => {
    const { container } = render(<ChapterHeader title="Test Chapter" />);
    const title = screen.getByText('Test Chapter');
    expect(title).toHaveClass('font-heading');
  });

  it('uses uppercase styling for title', () => {
    const { container } = render(<ChapterHeader title="Test Chapter" />);
    const title = screen.getByText('Test Chapter');
    expect(title).toHaveClass('uppercase');
  });

  it('uses uppercase styling for chapter number', () => {
    render(<ChapterHeader title="Test Chapter" chapterNumber={1} />);
    const chapterNumber = screen.getByText('Chapter 1');
    expect(chapterNumber).toHaveClass('uppercase');
  });

  it('renders title as h2 heading', () => {
    render(<ChapterHeader title="Test Chapter" />);
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('Test Chapter');
  });

  it('applies responsive text sizing classes', () => {
    render(<ChapterHeader title="Test Chapter" />);
    const title = screen.getByText('Test Chapter');
    expect(title).toHaveClass('text-2xl');
  });

  it('applies responsive padding classes', () => {
    const { container } = render(<ChapterHeader title="Test Chapter" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('py-8');
  });

  it('uses monochrome colors (manga-black)', () => {
    render(<ChapterHeader title="Test Chapter" />);
    const title = screen.getByText('Test Chapter');
    expect(title).toHaveClass('text-manga-black');
  });

  it('renders with all props combined', () => {
    render(
      <ChapterHeader
        title="Epic Chapter"
        subtitle="The journey begins"
        chapterNumber={5}
        className="my-custom-class"
      />
    );
    
    expect(screen.getByText('Epic Chapter')).toBeInTheDocument();
    expect(screen.getByText('The journey begins')).toBeInTheDocument();
    expect(screen.getByText('Chapter 5')).toBeInTheDocument();
    
    const { container } = render(
      <ChapterHeader
        title="Epic Chapter"
        subtitle="The journey begins"
        chapterNumber={5}
        className="my-custom-class"
      />
    );
    expect(container.querySelector('.my-custom-class')).toBeInTheDocument();
  });

  it('handles chapter number 0', () => {
    render(<ChapterHeader title="Prologue" chapterNumber={0} />);
    expect(screen.getByText('Chapter 0')).toBeInTheDocument();
  });

  it('handles long titles with whitespace-nowrap', () => {
    render(<ChapterHeader title="A Very Long Chapter Title" />);
    const title = screen.getByText('A Very Long Chapter Title');
    expect(title).toHaveClass('whitespace-nowrap');
  });

  it('centers title text', () => {
    render(<ChapterHeader title="Test Chapter" />);
    const title = screen.getByText('Test Chapter');
    expect(title).toHaveClass('text-center');
  });

  it('centers chapter number text', () => {
    render(<ChapterHeader title="Test Chapter" chapterNumber={1} />);
    const chapterNumber = screen.getByText('Chapter 1');
    expect(chapterNumber).toHaveClass('text-center');
  });

  it('centers subtitle text', () => {
    render(<ChapterHeader title="Test Chapter" subtitle="Subtitle" />);
    const subtitle = screen.getByText('Subtitle');
    expect(subtitle).toHaveClass('text-center');
  });
});
