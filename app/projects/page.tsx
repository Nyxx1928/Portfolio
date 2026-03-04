'use client';

import { PageTransition } from '@/components/layout/PageTransition';
import { ChapterHeader } from '@/components/manga/ChapterHeader';
import { SpeechBubble } from '@/components/manga/SpeechBubble';
import { FilterTabs } from '@/components/projects/FilterTabs';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { getProjects } from '@/lib/data/projects';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

/**
 * Projects Page Component
 * 
 * Displays all projects in a filterable manga panel-style grid.
 * Uses URL search parameters to manage filter state.
 * 
 * Features:
 * - URL-based filter state management
 * - FilterTabs for category filtering
 * - ProjectGrid for displaying projects
 * - Empty state when no projects exist
 * - Responsive layout
 * 
 * Requirements: 1.1, 11.1
 */

function ProjectsContent() {
  const searchParams = useSearchParams();
  const filter = searchParams.get('category') || 'all';
  const projects = getProjects();

  // Filter projects based on URL parameter
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  // Empty state when no projects exist at all
  if (projects.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <SpeechBubble variant="speech" tailDirection="bottom-left">
            <h2 className="text-2xl font-heading mb-4">Coming Soon!</h2>
            <p className="text-manga-gray-600">
              New projects are in the works. Check back soon to see what we've been creating!
            </p>
          </SpeechBubble>
        </div>
      </div>
    );
  }

  // Empty state when filter results in no projects
  if (filteredProjects.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Filter Tabs */}
        <div className="mb-8">
          <FilterTabs />
        </div>

        <div className="min-h-[40vh] flex items-center justify-center">
          <div className="text-center max-w-md mx-auto">
            <SpeechBubble variant="thought" tailDirection="bottom-left">
              <h3 className="text-xl font-heading mb-2">No Projects Found</h3>
              <p className="text-manga-gray-600">
                No projects match the selected category. Try selecting a different filter!
              </p>
            </SpeechBubble>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filter Tabs */}
      <div className="mb-8">
        <FilterTabs />
      </div>

      {/* ProjectGrid component */}
      <div className="mb-8" id="projects-grid">
        <ProjectGrid projects={filteredProjects} />
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <PageTransition>
      <main className="min-h-screen py-16">
        {/* Chapter Header */}
        <ChapterHeader 
          title="Projects Archive" 
          subtitle="A Collection of Creative Works"
          chapterNumber={2}
        />

        {/* Suspense boundary for useSearchParams */}
        <Suspense fallback={
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-manga-gray-600">
              Loading projects...
            </div>
          </div>
        }>
          <ProjectsContent />
        </Suspense>
      </main>
    </PageTransition>
  );
}
