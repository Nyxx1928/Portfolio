import { FeaturedProjects } from '@/components/dashboard/FeaturedProjects';
import { HeroSection } from '@/components/dashboard/HeroSection';

export function HomePanel() {
  return (
    <section className="min-h-screen">
      <h1 data-panel-heading="true" tabIndex={-1} className="sr-only">
        Home panel
      </h1>
      <HeroSection />
      <FeaturedProjects />
    </section>
  );
}
