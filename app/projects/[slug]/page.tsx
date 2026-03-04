import { notFound } from 'next/navigation';
import { getProjects, getProjectBySlug } from '@/lib/data/projects';
import { PageTransition } from '@/components/layout/PageTransition';
import { ProjectDetail } from '@/components/projects/ProjectDetail';

/**
 * Project Detail Page
 * 
 * Dynamic route for individual project detail pages.
 * Uses Next.js App Router conventions with static generation.
 * 
 * Features:
 * - Dynamic [slug] route parameter
 * - Static generation via generateStaticParams
 * - 404 handling for invalid project slugs
 * - Full project detail display with ProjectDetail component
 * 
 * Requirements: 1.1, 12.1, 12.2, 12.3
 */

/**
 * Generate static params for all projects
 * This enables static generation at build time for all project pages
 */
export async function generateStaticParams() {
  const projects = getProjects();
  
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

/**
 * Generate metadata for the project page
 */
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }
  
  return {
    title: `${project.title} | Projects`,
    description: project.description,
  };
}

/**
 * Project Detail Page Component
 */
export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  
  // Handle 404 for invalid project slugs
  if (!project) {
    notFound();
  }
  
  return (
    <PageTransition>
      <main className="min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <ProjectDetail project={project} />
        </div>
      </main>
    </PageTransition>
  );
}
