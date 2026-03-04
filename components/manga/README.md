# Manga Components

This directory contains reusable manga-themed UI components for the portfolio website.

## Components

- [MangaPanel](#mangapanel) - Versatile panel container with manga styling
- [SpeechBubble](#speechbubble) - Manga-style speech bubbles with variants
- [HalftonePattern](#halftonepattern) - Manga-style halftone dot pattern effect
- [ChapterHeader](#chapterheader) - Manga-style chapter headers for section dividers
- [InkEffect](#inkeffect) - Ink brush stroke effects for dividers, borders, and splash animations

---

## MangaPanel

A versatile panel container component with manga styling, scroll-triggered animations, and responsive design.

### Features

- **Border Variants**: Choose from `default`, `bordered`, or `shadowed` styles
- **Animation Variants**: Supports `fade`, `slide`, and `reveal` animations
- **Scroll-Triggered**: Automatically animates when scrolling into viewport
- **Responsive**: Adapts padding and sizing across mobile, tablet, and desktop breakpoints
- **Customizable**: Accepts custom className for additional styling

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | Required | Content to display inside the panel |
| `variant` | `'default' \| 'bordered' \| 'shadowed'` | `'default'` | Visual style variant |
| `animation` | `'fade' \| 'slide' \| 'reveal'` | `'reveal'` | Animation type when entering viewport |
| `className` | `string` | `undefined` | Additional CSS classes |

### Usage

```tsx
import { MangaPanel } from '@/components/manga/MangaPanel';

// Basic usage
<MangaPanel>
  <h2>Panel Title</h2>
  <p>Panel content goes here.</p>
</MangaPanel>

// With bordered variant and fade animation
<MangaPanel variant="bordered" animation="fade">
  <h2>Featured Project</h2>
  <p>Project description...</p>
</MangaPanel>

// With custom styling
<MangaPanel className="bg-manga-gray-50" variant="shadowed">
  <h2>Custom Panel</h2>
  <p>This panel has a custom background.</p>
</MangaPanel>
```

### Variants

#### Default
Basic manga panel with border and white background.

#### Bordered
Manga panel with border and manga-style shadow effect.

#### Shadowed
Same as bordered - includes the characteristic manga shadow.

### Animations

#### Fade
Simple opacity fade-in effect.

#### Slide
Slides in from the left with opacity fade.

#### Reveal
Combines opacity, vertical movement, and scale for a dramatic reveal effect (default).

### Responsive Behavior

The component automatically adjusts padding based on screen size:
- **Mobile** (`< 640px`): `p-4` (1rem padding)
- **Small** (`≥ 640px`): `p-6` (1.5rem padding)
- **Medium** (`≥ 768px`): `p-6` (1.5rem padding)
- **Large** (`≥ 1024px`): `p-8` (2rem padding)

### Scroll Animation

The panel uses Framer Motion's `useInView` hook with the following configuration:
- **Trigger once**: Animation plays only once when first entering viewport
- **Threshold**: 30% of the panel must be visible to trigger
- **Margin**: `-100px` bottom margin for earlier triggering

### Requirements Validated

This component validates the following requirements:
- **9.1**: Projects page manga panel-style grid layout
- **17.1**: Mobile responsive single column layout
- **17.2**: Mobile stacked manga panels
- **18.2**: Tablet 2-column grid arrangement
- **19.1**: Desktop multi-column manga panel layout
- **23.1**: Scroll-triggered panel animation

### Testing

The component includes comprehensive unit tests covering:
- Rendering children correctly
- Applying variant classes
- Custom className support
- Responsive sizing classes
- All animation variants
- Complex nested content

Run tests with:
```bash
npm test -- MangaPanel.test.tsx --watchAll=false
```

### Examples

See `MangaPanel.example.tsx` for more usage examples including:
- Different variant combinations
- Grid layouts with multiple panels
- Complex nested content
- Custom styling approaches


---

## SpeechBubble

A manga-style speech bubble component with SVG-based shapes, multiple variants, and configurable tail directions.

### Features

- **SVG-Based Shapes**: Clean, scalable bubble shapes with proper tails
- **Multiple Variants**: `speech`, `thought`, and `shout` styles
- **Configurable Tail**: Position tail in 4 directions (bottom-left, bottom-right, top-left, top-right)
- **Responsive Text**: Automatically adjusts text size across breakpoints
- **Customizable**: Accepts custom className for additional styling

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | Required | Content to display inside the bubble |
| `variant` | `'speech' \| 'thought' \| 'shout'` | `'speech'` | Style variant of the bubble |
| `tailDirection` | `'bottom-left' \| 'bottom-right' \| 'top-left' \| 'top-right'` | `'bottom-left'` | Direction of the bubble tail |
| `className` | `string` | `undefined` | Additional CSS classes |

### Usage

```tsx
import { SpeechBubble } from '@/components/manga/SpeechBubble';

// Basic speech bubble
<SpeechBubble>
  Hello! This is a speech bubble.
</SpeechBubble>

// Thought bubble with right-side tail
<SpeechBubble variant="thought" tailDirection="bottom-right">
  Hmm... I wonder what's for lunch?
</SpeechBubble>

// Shout bubble for emphasis
<SpeechBubble variant="shout" tailDirection="bottom-left">
  WATCH OUT!
</SpeechBubble>

// With custom styling
<SpeechBubble className="max-w-md" tailDirection="top-right">
  You can control the width and other properties!
</SpeechBubble>
```

### Variants

#### Speech (default)
Standard manga speech bubble with:
- Rounded corners (`rounded-2xl`)
- Standard border width (3px)
- Triangular SVG tail pointing to speaker

#### Thought
Manga thought bubble with:
- Fully rounded shape (`rounded-full`)
- Dashed border for dream-like effect
- Three small circles trailing from the bubble (instead of tail)

#### Shout
Emphatic shout bubble with:
- Sharp corners (`rounded-none`)
- Thick border (5px) for impact
- Larger triangular tail

### Tail Directions

The tail can be positioned in four directions:

- **bottom-left**: Tail points down from the left side (default)
- **bottom-right**: Tail points down from the right side
- **top-left**: Tail points up from the left side
- **top-right**: Tail points up from the right side

For thought bubbles, the direction controls where the thought circles appear.

### Responsive Behavior

The component automatically adjusts based on screen size:

**Padding:**
- **Mobile** (`< 640px`): `px-4 py-3`
- **Small** (`≥ 640px`): `px-5 py-4`
- **Medium** (`≥ 768px`): `px-6 py-4`

**Text Size:**
- **Mobile** (`< 640px`): `text-sm`
- **Small** (`≥ 640px`): `text-base`
- **Medium** (`≥ 768px`): `text-base`

### Styling Details

#### SVG Tail
The speech and shout variants use an SVG path for the tail:
- Clean, scalable rendering at any size
- Proper stroke width matching the border
- Positioned absolutely relative to the bubble
- Automatically rotated and flipped based on direction

#### Thought Circles
The thought variant uses three circular divs:
- Decreasing sizes (12px, 8px, 6px)
- Same border styling as main bubble
- Positioned in a trail from the bubble

### Requirements Validated

This component validates the following requirements:
- **14.1**: Contact page intro panel with speech bubble containing availability information

### Use Cases

#### Contact Page Introduction
```tsx
<SpeechBubble variant="speech" tailDirection="bottom-left">
  I'm currently available for freelance work and new opportunities!
  Feel free to reach out via email or connect with me on social media.
</SpeechBubble>
```

#### Character Dialogue
```tsx
<div className="flex justify-start">
  <SpeechBubble variant="speech" tailDirection="bottom-left">
    Welcome to my portfolio!
  </SpeechBubble>
</div>

<div className="flex justify-end">
  <SpeechBubble variant="speech" tailDirection="bottom-right">
    Thanks for visiting!
  </SpeechBubble>
</div>
```

#### Internal Thoughts
```tsx
<SpeechBubble variant="thought" tailDirection="bottom-left">
  I wonder if they'll like my projects...
</SpeechBubble>
```

#### Emphasis and Alerts
```tsx
<SpeechBubble variant="shout" tailDirection="bottom-left">
  CHECK OUT MY LATEST PROJECT!
</SpeechBubble>
```

### Testing

The component includes comprehensive unit tests covering:
- Rendering children correctly
- All three variants (speech, thought, shout)
- All four tail directions
- SVG tail rendering for speech/shout
- Thought circles rendering for thought variant
- Custom className support
- Responsive sizing classes

Run tests with:
```bash
npm test -- SpeechBubble.test.tsx --watchAll=false
```

### Examples

See `SpeechBubble.example.tsx` for more usage examples including:
- All variant combinations
- All tail direction options
- Multi-line content handling
- Custom styling approaches
- Real-world use cases (contact page, dialogue, etc.)

### Accessibility Considerations

- Uses semantic HTML with proper text hierarchy
- Text maintains readable contrast (black on white)
- Responsive text sizing ensures readability on all devices
- No reliance on color alone for meaning (variants use shape and border style)

### Performance

- Lightweight SVG implementation
- No external dependencies beyond React
- Minimal DOM nodes
- CSS-based styling for optimal performance


---

## HalftonePattern

A manga-style halftone pattern component that creates authentic dot-based grayscale effects commonly seen in traditional manga printing.

### Features

- **SVG-Based Pattern**: Clean, scalable pattern definition using SVG
- **Intensity Levels**: Three preset levels (`light`, `medium`, `heavy`)
- **Configurable Dot Size**: Override default dot size for custom effects
- **Configurable Density**: Automatic spacing based on intensity
- **Overlay or Background**: Can be used as an overlay or background pattern
- **Grayscale Variations**: Authentic manga aesthetic with monochrome palette
- **Unique Pattern IDs**: Prevents conflicts when multiple patterns are used on the same page

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `intensity` | `'light' \| 'medium' \| 'heavy'` | `'medium'` | Pattern intensity level |
| `dotSize` | `number` | `undefined` | Custom dot radius (overrides intensity default) |
| `className` | `string` | `undefined` | Additional CSS classes |

### Usage

```tsx
import { HalftonePattern } from '@/components/manga/HalftonePattern';

// Basic usage with default medium intensity
<div className="relative w-full h-64 bg-manga-white">
  <HalftonePattern />
  <div className="relative z-10">
    <h2>Content with halftone background</h2>
  </div>
</div>

// Light intensity for subtle effect
<div className="relative manga-panel">
  <HalftonePattern intensity="light" />
  <div className="relative z-10">
    <p>Subtle halftone texture</p>
  </div>
</div>

// Heavy intensity for dramatic effect
<div className="relative bg-manga-black h-64">
  <HalftonePattern intensity="heavy" />
  <div className="relative z-10 text-manga-white">
    <h2>DRAMATIC EFFECT!</h2>
  </div>
</div>

// Custom dot size
<div className="relative w-full h-64">
  <HalftonePattern dotSize={3} />
  <div className="relative z-10">
    <p>Custom dot size pattern</p>
  </div>
</div>
```

### Intensity Levels

Each intensity level has predefined configurations for dot size, spacing, and opacity:

#### Light
- **Dot Radius**: 1px
- **Spacing**: 8px
- **Opacity**: 0.2 (20%)
- **Use Case**: Subtle texture, background enhancement

#### Medium (default)
- **Dot Radius**: 1.5px
- **Spacing**: 6px
- **Opacity**: 0.3 (30%)
- **Use Case**: Standard manga halftone effect, general purpose

#### Heavy
- **Dot Radius**: 2px
- **Spacing**: 4px
- **Opacity**: 0.5 (50%)
- **Use Case**: Dramatic effects, emphasis, shadows

### Pattern Configuration

The component uses SVG patterns with the following structure:

```svg
<pattern id="halftone-{intensity}-{radius}-{spacing}">
  <circle cx="..." cy="..." r="..." fill="currentColor" />
</pattern>
```

**Key Features:**
- **Unique IDs**: Each pattern gets a unique ID based on its configuration
- **currentColor**: Uses CSS `currentColor` for flexible color control
- **userSpaceOnUse**: Pattern units scale with the element

### Positioning and Layering

The component is designed to be used as an overlay:

```tsx
<div className="relative">
  {/* Background or content */}
  <div className="bg-manga-gray-200">...</div>
  
  {/* Halftone overlay */}
  <HalftonePattern intensity="medium" />
  
  {/* Foreground content */}
  <div className="relative z-10">
    Content appears above the pattern
  </div>
</div>
```

**Important CSS Classes:**
- `absolute inset-0`: Covers the entire parent container
- `pointer-events-none`: Allows clicks to pass through to content below
- `aria-hidden="true"`: Hidden from screen readers (decorative only)

### Use Cases

#### Image Overlay
Add manga-style texture to images:
```tsx
<div className="relative w-full h-64 overflow-hidden">
  <img src="/project-image.jpg" alt="Project" className="w-full h-full object-cover" />
  <HalftonePattern intensity="medium" />
</div>
```

#### Section Background
Create textured section backgrounds:
```tsx
<section className="relative py-16 bg-manga-white">
  <HalftonePattern intensity="light" />
  <div className="relative z-10 container mx-auto">
    <h2>Section Title</h2>
    <p>Section content...</p>
  </div>
</section>
```

#### Manga Panel Enhancement
Add authentic manga texture to panels:
```tsx
<MangaPanel variant="bordered" className="relative">
  <HalftonePattern intensity="light" />
  <div className="relative z-10">
    <h3>Chapter 1: The Beginning</h3>
    <p>Panel content with halftone texture...</p>
  </div>
</MangaPanel>
```

#### Dramatic Effects
Create emphasis with heavy patterns:
```tsx
<div className="relative bg-manga-black h-64">
  <HalftonePattern intensity="heavy" className="text-manga-white" />
  <div className="relative z-10 flex items-center justify-center h-full">
    <h2 className="text-5xl font-heading text-manga-white">BOOM!</h2>
  </div>
</div>
```

### Color Customization

While the component defaults to `text-manga-black`, you can customize the color:

```tsx
{/* White dots on dark background */}
<div className="relative bg-manga-black">
  <HalftonePattern intensity="medium" className="text-manga-white" />
</div>

{/* Gray dots for subtle effect */}
<div className="relative bg-manga-white">
  <HalftonePattern intensity="light" className="text-manga-gray-400" />
</div>
```

### Requirements Validated

This component validates the following requirements:
- **20.1**: Apply halftone pattern effects to appropriate visual elements

### Responsive Behavior

The pattern automatically scales with its container:
- SVG pattern uses `userSpaceOnUse` for consistent sizing
- Pattern density remains constant across screen sizes
- Works seamlessly at all breakpoints (mobile, tablet, desktop)

### Performance Considerations

- **Lightweight**: Pure SVG implementation with minimal DOM nodes
- **Scalable**: Vector-based patterns scale without quality loss
- **Efficient**: Single SVG element per pattern instance
- **Reusable**: Pattern definitions can be reused across multiple elements

### Accessibility

- **aria-hidden="true"**: Pattern is decorative and hidden from screen readers
- **pointer-events-none**: Doesn't interfere with interactive elements
- **No color reliance**: Pattern is purely decorative, doesn't convey information

### Testing

The component includes comprehensive unit tests covering:
- Rendering with default props
- All three intensity levels (light, medium, heavy)
- Custom dot size configuration
- Custom className support
- Unique pattern ID generation
- Correct opacity values for each intensity
- Pointer events and accessibility attributes
- Monochrome color usage

Run tests with:
```bash
npm test -- HalftonePattern.test.tsx --watchAll=false
```

### Examples

See `HalftonePattern.example.tsx` for comprehensive usage examples including:
- All intensity levels demonstrated
- Custom dot size examples
- Image overlay usage
- Multiple patterns on the same page
- Integration with MangaPanel
- Dramatic effect examples
- Color customization approaches

### Technical Details

#### SVG Pattern Structure
```svg
<svg width="100%" height="100%">
  <defs>
    <pattern id="halftone-medium-1.5-6" 
             x="0" y="0" 
             width="6" height="6" 
             patternUnits="userSpaceOnUse">
      <circle cx="3" cy="3" r="1.5" fill="currentColor" />
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#halftone-medium-1.5-6)" />
</svg>
```

#### Pattern ID Format
`halftone-{intensity}-{dotRadius}-{spacing}`

Example: `halftone-medium-1.5-6`

This ensures unique IDs when multiple patterns with different configurations are used on the same page.

### Best Practices

1. **Use as Overlay**: Always position the pattern absolutely over content
2. **Layer Content**: Use `relative z-10` on content to ensure it appears above the pattern
3. **Choose Appropriate Intensity**: 
   - Light for subtle backgrounds
   - Medium for standard manga effects
   - Heavy for dramatic emphasis
4. **Consider Performance**: Avoid using too many heavy patterns on a single page
5. **Test Contrast**: Ensure text remains readable over the pattern
6. **Responsive Testing**: Verify pattern appearance at all breakpoints

### Common Patterns

#### Full-Page Background
```tsx
<div className="relative min-h-screen bg-manga-white">
  <HalftonePattern intensity="light" />
  <div className="relative z-10">
    {/* Page content */}
  </div>
</div>
```

#### Card Overlay
```tsx
<div className="relative manga-panel-bordered">
  <HalftonePattern intensity="medium" />
  <div className="relative z-10">
    <h3>Card Title</h3>
    <p>Card content...</p>
  </div>
</div>
```

#### Hero Section
```tsx
<section className="relative h-screen bg-manga-gray-200">
  <HalftonePattern intensity="medium" />
  <div className="relative z-10 flex items-center justify-center h-full">
    <h1 className="text-6xl font-heading">WELCOME</h1>
  </div>
</section>
```


---

## ChapterHeader

A manga-style chapter header component for creating section dividers with bold typography, optional chapter numbering, and decorative ink brush stroke elements.

### Features

- **Manga Chapter Title Styling**: Bold, uppercase typography with manga aesthetic
- **Optional Chapter Numbering**: Display chapter numbers above the title
- **Ink Brush Stroke Divider**: Decorative bottom divider with brush stroke effect
- **Decorative Lines**: Horizontal lines on both sides of the title
- **Responsive Text Sizing**: Automatically adjusts across breakpoints
- **Customizable**: Accepts custom className for additional styling

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | Required | Main chapter title text |
| `subtitle` | `string` | `undefined` | Optional subtitle text below the title |
| `chapterNumber` | `number` | `undefined` | Optional chapter number to display |
| `className` | `string` | `undefined` | Additional CSS classes |

### Usage

```tsx
import { ChapterHeader } from '@/components/manga/ChapterHeader';

// Basic usage - title only
<ChapterHeader title="Featured Projects" />

// With chapter number
<ChapterHeader title="The Beginning" chapterNumber={1} />

// With subtitle
<ChapterHeader
  title="About Me"
  subtitle="My journey as a developer"
/>

// Full example with all props
<ChapterHeader
  title="Epic Battle"
  subtitle="The final showdown begins"
  chapterNumber={42}
/>
```

### Visual Structure

The component renders with the following structure:

```
┌─────────────────────────────────────┐
│         Chapter 1 (optional)        │
│                                     │
│  ───────  TITLE TEXT  ───────      │
│                                     │
│    Subtitle text (optional)         │
│                                     │
│           ─────────                 │
└─────────────────────────────────────┘
```

**Elements:**
1. **Chapter Number** (optional): Small, uppercase text above the title
2. **Decorative Lines**: Horizontal lines flanking the title
3. **Title**: Large, bold, uppercase heading (h2)
4. **Subtitle** (optional): Smaller text below the title
5. **Ink Brush Stroke**: Bottom divider with blur effect

### Responsive Behavior

The component automatically adjusts based on screen size:

**Vertical Spacing:**
- **Mobile** (`< 640px`): `py-8` (2rem)
- **Small** (`≥ 640px`): `py-10` (2.5rem)
- **Medium** (`≥ 768px`): `py-12` (3rem)

**Title Text Size:**
- **Mobile** (`< 640px`): `text-2xl` (1.5rem)
- **Small** (`≥ 640px`): `text-3xl` (1.875rem)
- **Medium** (`≥ 768px`): `text-4xl` (2.25rem)
- **Large** (`≥ 1024px`): `text-5xl` (3rem)

**Chapter Number Text Size:**
- **Mobile** (`< 640px`): `text-sm` (0.875rem)
- **Small** (`≥ 640px`): `text-base` (1rem)
- **Medium** (`≥ 768px`): `text-lg` (1.125rem)

**Subtitle Text Size:**
- **Mobile** (`< 640px`): `text-sm` (0.875rem)
- **Small** (`≥ 640px`): `text-base` (1rem)
- **Medium** (`≥ 768px`): `text-lg` (1.125rem)

**Decorative Line Width:**
- **Mobile** (`< 640px`): Max 20% of container width
- **Small** (`≥ 640px`): Max 25% of container width
- **Medium** (`≥ 768px`): Max 30% of container width

### Styling Details

#### Typography
- **Title**: Uses `font-heading` with uppercase and wide letter spacing
- **Chapter Number**: Uppercase with wide tracking, gray color
- **Subtitle**: Uses `font-body` with standard styling

#### Decorative Elements
- **Side Lines**: Solid black lines with 1px height (`h-1`)
- **Ink Brush Stroke**: Bottom divider with blur effect for authentic brush stroke appearance
- **Spacing**: Responsive gaps between elements

#### Colors
- **Title**: `text-manga-black` (#000000)
- **Chapter Number**: `text-manga-gray-600` (#666666)
- **Subtitle**: `text-manga-gray-800` (#333333)
- **Lines**: `bg-manga-black` (#000000)

### Use Cases

#### Section Dividers
Use to separate major sections on a page:
```tsx
<section>
  <ChapterHeader title="My Skills" />
  {/* Skills content */}
</section>

<section>
  <ChapterHeader title="Experience" />
  {/* Experience content */}
</section>
```

#### Numbered Chapters
Create a story-like flow with chapter numbers:
```tsx
<ChapterHeader title="Introduction" chapterNumber={1} />
<ChapterHeader title="The Journey" chapterNumber={2} />
<ChapterHeader title="Conclusion" chapterNumber={3} />
```

#### Page Headers
Use as main page headers with subtitles:
```tsx
<ChapterHeader
  title="Projects"
  subtitle="A showcase of my recent work"
/>
```

#### Prologue/Epilogue
Use chapter number 0 for prologues:
```tsx
<ChapterHeader
  title="Prologue"
  subtitle="Before the story begins"
  chapterNumber={0}
/>
```

#### Dashboard Sections
Create "New Chapter" style dividers:
```tsx
<ChapterHeader title="Featured Work" subtitle="Latest projects" />
<FeaturedProjects />

<ChapterHeader title="About" subtitle="Get to know me" />
<AboutPreview />
```

### Requirements Validated

This component validates the following requirements:
- **1.5**: Style page titles as manga chapter names
- **20.5**: Style section headers as manga chapter headers

### Accessibility

- **Semantic HTML**: Uses `<h2>` for the title (proper heading hierarchy)
- **ARIA Hidden**: Decorative elements marked with `aria-hidden="true"`
- **Text Contrast**: High contrast black text on white background
- **Responsive Text**: Text scales appropriately for readability
- **No Color Reliance**: Structure and hierarchy don't rely on color alone

### Performance

- **Lightweight**: Pure CSS implementation with no JavaScript
- **No External Assets**: All styling is inline with Tailwind classes
- **Minimal DOM**: Simple, efficient DOM structure
- **Fast Rendering**: No animations or complex calculations

### Testing

The component includes comprehensive unit tests covering:
- Rendering title text
- Optional chapter number display
- Optional subtitle display
- Decorative lines rendering
- Ink brush stroke divider
- Custom className support
- Typography classes (bold, uppercase)
- Responsive sizing classes
- Monochrome color usage
- Semantic HTML (h2 heading)
- All props combined
- Edge cases (chapter 0, long titles)
- Text centering

Run tests with:
```bash
npm test -- ChapterHeader.test.tsx --watchAll=false
```

### Examples

See `ChapterHeader.example.tsx` for comprehensive usage examples including:
- Basic usage (title only)
- With chapter number
- With subtitle
- Full example with all props
- Multiple headers in sequence
- Custom styling
- Prologue example (chapter 0)
- Section dividers in a page

### Best Practices

1. **Heading Hierarchy**: Use ChapterHeader for h2-level headings; adjust if needed for your page structure
2. **Spacing**: Add appropriate margin/padding around the component for visual separation
3. **Title Length**: Keep titles concise; use `whitespace-nowrap` to prevent wrapping
4. **Subtitle Usage**: Use subtitles for additional context, not long descriptions
5. **Chapter Numbers**: Use consistently throughout a page or not at all
6. **Custom Styling**: Use className for background colors or additional spacing

### Common Patterns

#### Page Header
```tsx
<div className="container mx-auto">
  <ChapterHeader
    title="Projects"
    subtitle="A collection of my work"
  />
  <ProjectGrid />
</div>
```

#### Sequential Sections
```tsx
<div className="space-y-16">
  <section>
    <ChapterHeader title="Skills" chapterNumber={1} />
    <SkillsPanel />
  </section>
  
  <section>
    <ChapterHeader title="Experience" chapterNumber={2} />
    <Timeline />
  </section>
  
  <section>
    <ChapterHeader title="Interests" chapterNumber={3} />
    <InterestsPanel />
  </section>
</div>
```

#### With Background
```tsx
<div className="bg-manga-gray-50 rounded-lg">
  <ChapterHeader
    title="Contact"
    subtitle="Let's connect"
    className="px-8"
  />
  <ContactForm />
</div>
```

#### Dashboard Featured Section
```tsx
<section className="py-16">
  <ChapterHeader
    title="New Chapter"
    subtitle="Featured Projects"
  />
  <FeaturedProjects />
</section>
```

### Customization Examples

#### Custom Background
```tsx
<ChapterHeader
  title="Special Section"
  className="bg-manga-gray-50 rounded-lg px-8"
/>
```

#### Extra Spacing
```tsx
<ChapterHeader
  title="Important Section"
  className="my-16"
/>
```

#### Centered in Container
```tsx
<div className="container mx-auto max-w-4xl">
  <ChapterHeader title="Centered Title" />
</div>
```

### Technical Details

#### Component Structure
```tsx
<div className="relative w-full py-8 sm:py-10 md:py-12">
  {/* Chapter number (optional) */}
  {chapterNumber !== undefined && (
    <div className="text-center font-heading uppercase">
      Chapter {chapterNumber}
    </div>
  )}
  
  {/* Title with decorative lines */}
  <div className="relative flex items-center justify-center gap-4">
    <div className="flex-1 h-1 bg-manga-black" /> {/* Left line */}
    <h2 className="font-heading uppercase">
      {title}
    </h2>
    <div className="flex-1 h-1 bg-manga-black" /> {/* Right line */}
  </div>
  
  {/* Subtitle (optional) */}
  {subtitle && (
    <div className="text-center font-body">
      {subtitle}
    </div>
  )}
  
  {/* Ink brush stroke divider */}
  <div className="absolute bottom-0 left-1/2 -translate-x-1/2" />
</div>
```

#### CSS Classes Used
- **Layout**: `relative`, `absolute`, `flex`, `items-center`, `justify-center`
- **Spacing**: `py-8`, `gap-4`, `mb-2`, `mt-3`
- **Typography**: `font-heading`, `font-body`, `uppercase`, `tracking-wider`
- **Sizing**: `w-full`, `h-1`, `max-w-[20%]`
- **Colors**: `text-manga-black`, `text-manga-gray-600`, `bg-manga-black`
- **Effects**: `blur-[1px]`, `-translate-x-1/2`

### Integration with Other Components

#### With MangaPanel
```tsx
<MangaPanel variant="bordered">
  <ChapterHeader title="Panel Title" />
  <p>Panel content...</p>
</MangaPanel>
```

#### With HalftonePattern
```tsx
<div className="relative">
  <HalftonePattern intensity="light" />
  <div className="relative z-10">
    <ChapterHeader title="Textured Section" />
  </div>
</div>
```

#### With SpeechBubble
```tsx
<section>
  <ChapterHeader title="What People Say" />
  <SpeechBubble variant="speech">
    Great work on this project!
  </SpeechBubble>
</section>
```


---

## InkEffect

A manga-style ink brush stroke effect component for creating authentic ink dividers, borders, and splash animations throughout the site.

### Features

- **Ink Brush Stroke Dividers**: Organic, hand-drawn divider lines with texture
- **Ink Border Effects**: Frame elements with textured ink brush borders
- **Ink Splash Animation**: Interactive splash effects for buttons and hover states
- **SVG-Based Rendering**: Clean, scalable effects with organic texture filters
- **Multiple Positioning Options**: Top, bottom, left, right, or center placement
- **Optional Animation**: Animate effects on mount for dynamic reveals
- **Customizable**: Accepts custom className for additional styling

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'divider' \| 'border' \| 'splash'` | `'divider'` | Effect type |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right' \| 'center'` | `'center'` | Position of the effect (divider only) |
| `animated` | `boolean` | `false` | Whether to animate the effect on mount |
| `className` | `string` | `undefined` | Additional CSS classes |

### Usage

```tsx
import { InkEffect } from '@/components/manga/InkEffect';

// Basic divider
<div className="relative py-8">
  <InkEffect variant="divider" position="bottom" />
  <h2>Section Title</h2>
</div>

// Border around content
<div className="relative p-8">
  <InkEffect variant="border" />
  <h3>Framed Content</h3>
  <p>This content has an ink brush border.</p>
</div>

// Splash effect on button hover
<button className="manga-button relative overflow-hidden group">
  Click Me
  <InkEffect 
    variant="splash" 
    className="opacity-0 group-hover:opacity-100 transition-opacity" 
  />
</button>

// Animated divider
<div className="relative">
  <InkEffect variant="divider" position="top" animated={true} />
  <p>Content with animated ink divider</p>
</div>
```

### Variants

#### Divider
Creates an organic ink brush stroke line for section dividers:
- **SVG Path**: Curved path with natural variation
- **Texture Filter**: Fractal noise for authentic ink texture
- **Positioning**: Can be placed at top, bottom, left, right, or center
- **Responsive Width**: Automatically scales to container
- **Use Case**: Section dividers, content separators

**Visual Characteristics:**
- Organic, hand-drawn appearance
- Slight variations in thickness
- Ink texture with subtle noise
- 8px stroke width for visibility

#### Border
Creates an ink brush stroke border around content:
- **SVG Path**: Rectangular border with rounded corners
- **Texture Filter**: Fractal noise for organic edges
- **Full Coverage**: Covers entire parent container
- **Pointer Events**: None (doesn't interfere with content)
- **Use Case**: Frame important content, manga panel borders

**Visual Characteristics:**
- Frames entire element
- Organic, textured edges
- 2px stroke width for subtle effect
- Absolute positioning with inset-0

#### Splash
Creates an ink splash effect for interactive elements:
- **SVG Circles**: Main splash with 8 droplet circles
- **Irregular Shape**: Varied droplet sizes and positions
- **Low Opacity**: 15% opacity for subtle effect
- **Animation Support**: Scale and opacity animation
- **Use Case**: Button hover effects, interactive feedback

**Visual Characteristics:**
- Central splash circle (35px radius)
- 8 surrounding droplets (4-9px radius)
- Organic, irregular distribution
- Scales up to 120% of container

### Position Options (Divider Only)

The `position` prop controls where the divider is placed:

- **top**: Top edge of container (`top-0 left-0 right-0`)
- **bottom**: Bottom edge of container (`bottom-0 left-0 right-0`)
- **left**: Left edge of container (`left-0 top-0 bottom-0`)
- **right**: Right edge of container (`right-0 top-0 bottom-0`)
- **center**: Horizontally centered (`left-1/2 -translate-x-1/2`)

### Animation

When `animated={true}`, the component animates on mount:

**Divider/Border Animation:**
- Initial: `scaleX: 0, opacity: 0`
- Animate: `scaleX: 1, opacity: 1`
- Duration: 0.6s
- Easing: easeOut

**Splash Animation:**
- Initial: `scale: 0, opacity: 0`
- Animate: `scale: [0, 1.2, 1], opacity: [0, 1, 0.8]`
- Duration: 0.5s
- Easing: easeOut
- Effect: Bouncy splash appearance

### SVG Filters

Each variant includes SVG filters for authentic ink texture:

#### Ink Texture (Divider)
```svg
<filter id="ink-texture">
  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
  <feDisplacementMap scale="2" />
</filter>
```
- **Base Frequency**: 0.9 for fine texture
- **Octaves**: 4 for detailed noise
- **Displacement**: 2px for subtle variation

#### Ink Border Texture (Border)
```svg
<filter id="ink-border-texture">
  <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" />
  <feDisplacementMap scale="1.5" />
</filter>
```
- **Base Frequency**: 0.8 for medium texture
- **Octaves**: 3 for balanced detail
- **Displacement**: 1.5px for organic edges

#### Ink Splash Texture (Splash)
```svg
<filter id="ink-splash-texture">
  <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="5" />
  <feDisplacementMap scale="3" />
</filter>
```
- **Base Frequency**: 1.2 for fine detail
- **Octaves**: 5 for complex texture
- **Displacement**: 3px for irregular edges

### Use Cases

#### Section Dividers
Separate major sections with ink brush strokes:
```tsx
<section>
  <h2>Skills</h2>
  <SkillsContent />
</section>

<div className="relative h-8">
  <InkEffect variant="divider" position="center" />
</div>

<section>
  <h2>Experience</h2>
  <ExperienceContent />
</section>
```

#### Framed Content
Frame important content with ink borders:
```tsx
<div className="relative p-12 bg-manga-white">
  <InkEffect variant="border" />
  <div className="relative z-10">
    <h3>Featured Project</h3>
    <p>Project description...</p>
  </div>
</div>
```

#### Button Hover Effects
Add ink splash on button hover:
```tsx
<button className="manga-button relative overflow-hidden group">
  View Projects
  <InkEffect 
    variant="splash" 
    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
  />
</button>
```

#### Card Interactions
Add splash effect to interactive cards:
```tsx
<div className="manga-panel-bordered relative cursor-pointer group">
  <InkEffect 
    variant="splash" 
    className="opacity-0 group-hover:opacity-100 transition-opacity" 
  />
  <div className="relative z-10">
    <h3>Project Card</h3>
    <p>Click to view details</p>
  </div>
</div>
```

#### Combined Effects
Layer multiple ink effects:
```tsx
<div className="relative p-12 bg-manga-white">
  <InkEffect variant="border" />
  <InkEffect variant="divider" position="top" className="top-6" />
  
  <div className="relative z-10 text-center">
    <h2>Chapter Title</h2>
    <p>Chapter content...</p>
  </div>
  
  <InkEffect variant="divider" position="bottom" className="bottom-6" />
</div>
```

### Requirements Validated

This component validates the following requirements:
- **20.4**: Use ink brush strokes for dividers and borders
- **22.2**: Trigger ink splash effect when hovering over buttons

### Responsive Behavior

The component automatically adapts to container size:

**Divider:**
- Horizontal dividers: `w-full max-w-[80%]` (80% of container width)
- Vertical dividers: `h-full w-1` (full height, 1px width)
- SVG preserveAspectRatio: `none` (stretches to fit)

**Border:**
- Always covers full container: `inset-0`
- SVG preserveAspectRatio: `none` (stretches to fit)

**Splash:**
- Scales with container: `w-full h-full`
- Max size: `max-w-[120%] max-h-[120%]` (slightly larger than container)
- Centered: `flex items-center justify-center`

### Accessibility

- **aria-hidden="true"**: All effects are decorative and hidden from screen readers
- **pointer-events-none**: Effects don't interfere with interactive elements
- **No Color Reliance**: Effects are purely decorative, don't convey information
- **Semantic HTML**: Effects are visual enhancements only

### Performance

- **SVG-Based**: Scalable vector graphics for crisp rendering at any size
- **Lightweight**: Minimal DOM nodes per effect
- **GPU-Accelerated**: Framer Motion animations use transforms
- **Efficient Filters**: SVG filters are hardware-accelerated

### Testing

The component includes comprehensive unit tests covering:
- All three variants (divider, border, splash)
- All position options for divider
- Custom className support
- Animation prop behavior
- SVG rendering and viewBox attributes
- Path elements and attributes
- Circle elements for splash variant
- Accessibility attributes (aria-hidden)
- Pointer events
- SVG filters (ink-texture, ink-border-texture, ink-splash-texture)

Run tests with:
```bash
npm test -- InkEffect.test.tsx --watchAll=false
```

### Examples

See `InkEffect.example.tsx` for comprehensive usage examples including:
- All divider positions (top, bottom, left, right, center)
- Border variant with and without animation
- Splash variant on buttons and cards
- Combined effects (border + dividers)
- Interactive hover states
- Animated vs static effects
- Real-world use cases

### Best Practices

1. **Positioning**: Always use `relative` positioning on the parent container
2. **Z-Index**: Use `relative z-10` on content to ensure it appears above effects
3. **Overflow**: Use `overflow-hidden` on containers with splash effects
4. **Animation**: Use `animated={true}` sparingly for entrance effects
5. **Hover States**: Combine splash with CSS transitions for smooth hover effects
6. **Layering**: Layer multiple effects for rich, complex designs
7. **Spacing**: Add appropriate padding/margin when using dividers

### Common Patterns

#### Section Divider
```tsx
<div className="relative py-8">
  <InkEffect variant="divider" position="center" />
</div>
```

#### Framed Panel
```tsx
<div className="relative p-8">
  <InkEffect variant="border" />
  <div className="relative z-10">
    {/* Content */}
  </div>
</div>
```

#### Interactive Button
```tsx
<button className="manga-button relative overflow-hidden group">
  Button Text
  <InkEffect 
    variant="splash" 
    className="opacity-0 group-hover:opacity-100 transition-opacity" 
  />
</button>
```

#### Animated Entrance
```tsx
<div className="relative">
  <InkEffect variant="border" animated={true} />
  <div className="relative z-10">
    {/* Content */}
  </div>
</div>
```

### Integration with Other Components

#### With ChapterHeader
```tsx
<div className="relative">
  <ChapterHeader title="Section Title" />
  <InkEffect variant="divider" position="bottom" />
</div>
```

#### With MangaPanel
```tsx
<MangaPanel variant="bordered" className="relative">
  <InkEffect variant="border" />
  <div className="relative z-10">
    <h3>Panel Content</h3>
  </div>
</MangaPanel>
```

#### With Buttons
```tsx
<button className="manga-button relative overflow-hidden group">
  <span className="relative z-10">Click Me</span>
  <InkEffect 
    variant="splash" 
    className="opacity-0 group-hover:opacity-100 transition-opacity" 
  />
</button>
```

### Technical Details

#### Component Structure (Divider)
```tsx
<motion.div className="absolute {position-classes}">
  <svg viewBox="0 0 200 10" preserveAspectRatio="none">
    <path d="M 0 5 Q 20 3, 40 5 T 80 5..." 
          stroke="currentColor" 
          strokeWidth="8" 
          style={{ filter: 'url(#ink-texture)' }} />
    <defs>
      <filter id="ink-texture">
        <feTurbulence ... />
        <feDisplacementMap ... />
      </filter>
    </defs>
  </svg>
</motion.div>
```

#### Component Structure (Border)
```tsx
<motion.div className="absolute inset-0 pointer-events-none">
  <svg viewBox="0 0 100 100" preserveAspectRatio="none">
    <path d="M 2 2 L 98 2 L 98 98 L 2 98 Z" 
          stroke="currentColor" 
          strokeWidth="2" 
          style={{ filter: 'url(#ink-border-texture)' }} />
    <defs>
      <filter id="ink-border-texture">
        <feTurbulence ... />
        <feDisplacementMap ... />
      </filter>
    </defs>
  </svg>
</motion.div>
```

#### Component Structure (Splash)
```tsx
<motion.div className="absolute inset-0 flex items-center justify-center">
  <svg viewBox="0 0 100 100">
    <g fill="currentColor" opacity="0.15">
      <circle cx="50" cy="50" r="35" />
      <circle cx="25" cy="30" r="8" />
      {/* More droplet circles */}
    </g>
    <defs>
      <filter id="ink-splash-texture">
        <feTurbulence ... />
        <feDisplacementMap ... />
      </filter>
    </defs>
  </svg>
</motion.div>
```

### Customization Examples

#### Custom Color
```tsx
<InkEffect variant="divider" className="text-manga-gray-600" />
```

#### Custom Size
```tsx
<InkEffect variant="divider" className="h-2" /> {/* Thicker divider */}
```

#### Custom Opacity
```tsx
<InkEffect variant="splash" className="opacity-30" />
```

#### Custom Position
```tsx
<InkEffect variant="divider" position="bottom" className="bottom-4" />
```

### Troubleshooting

**Issue**: Splash effect not visible on hover
- **Solution**: Ensure parent has `relative` and `overflow-hidden` classes
- **Solution**: Use `group` and `group-hover:` classes for hover states

**Issue**: Divider not appearing
- **Solution**: Ensure parent has `relative` positioning
- **Solution**: Check that parent has sufficient height/width

**Issue**: Border not covering entire element
- **Solution**: Ensure parent has `relative` positioning
- **Solution**: Verify parent has defined dimensions

**Issue**: Animation not playing
- **Solution**: Ensure `animated={true}` prop is set
- **Solution**: Check that Framer Motion is properly installed

### Browser Compatibility

- **SVG Filters**: Supported in all modern browsers
- **Framer Motion**: Requires modern browser with JavaScript enabled
- **CSS Transforms**: Supported in all modern browsers
- **Fallback**: Effects gracefully degrade if SVG filters not supported
