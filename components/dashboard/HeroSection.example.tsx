import { HeroSection } from './HeroSection';

/**
 * HeroSection Component Examples
 * 
 * This file demonstrates various usage patterns for the HeroSection component.
 */

export default function HeroSectionExamples() {
  return (
    <div className="space-y-16 p-8 bg-manga-gray-50">
      {/* Example 1: Default Hero Section */}
      <div>
        <h2 className="text-2xl font-heading mb-4">Default Hero Section</h2>
        <p className="mb-4 text-manga-gray-800">
          Uses default headline, subheadline, and avatar placeholder.
        </p>
        <HeroSection />
      </div>

      {/* Example 2: Custom Content */}
      <div>
        <h2 className="text-2xl font-heading mb-4">Custom Content</h2>
        <p className="mb-4 text-manga-gray-800">
          Custom headline and subheadline text.
        </p>
        <HeroSection
          headline="John Doe"
          subheadline="Full-Stack Developer & UI/UX Designer"
        />
      </div>

      {/* Example 3: With Custom Styling */}
      <div>
        <h2 className="text-2xl font-heading mb-4">With Custom Styling</h2>
        <p className="mb-4 text-manga-gray-800">
          Additional custom classes applied to the section.
        </p>
        <HeroSection
          headline="Creative Developer"
          subheadline="Building Beautiful Web Experiences"
          className="bg-manga-white"
        />
      </div>

      {/* Example 4: Short Headline */}
      <div>
        <h2 className="text-2xl font-heading mb-4">Short Headline</h2>
        <p className="mb-4 text-manga-gray-800">
          Works well with shorter text content.
        </p>
        <HeroSection
          headline="Hi, I'm Alex"
          subheadline="Designer & Developer"
        />
      </div>

      {/* Example 5: Long Headline */}
      <div>
        <h2 className="text-2xl font-heading mb-4">Long Headline</h2>
        <p className="mb-4 text-manga-gray-800">
          Handles longer headlines with proper text wrapping.
        </p>
        <HeroSection
          headline="Welcome to My Creative Portfolio Showcase"
          subheadline="Exploring the intersection of design, technology, and storytelling through innovative digital experiences"
        />
      </div>
    </div>
  );
}
