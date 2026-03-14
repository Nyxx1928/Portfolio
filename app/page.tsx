import { HeroSection } from '@/components/dashboard/HeroSection';
import { FeaturedProjects } from '@/components/dashboard/FeaturedProjects';

/**
 * Dashboard Page (/)
 * 
 * The main landing page featuring:
 * - Hero section with large headline and CTA buttons
 * - Featured projects preview
 * 
 * Requirements: 1.1, 3.1
 */
export default function DashboardPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section - Requirement 3.1, 3.2, 3.3, 3.4, 3.5, 3.6 */}
      <HeroSection />

      {/* Featured Projects Section - Requirements 4.1, 4.2, 4.3, 4.4, 17.1, 19.1 */}
      <FeaturedProjects />
    </main>
  );
}
