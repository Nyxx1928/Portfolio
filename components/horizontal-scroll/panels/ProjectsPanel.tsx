"use client";

import { ChapterHeader } from '@/components/manga/ChapterHeader';
import { SpeechBubble } from '@/components/manga/SpeechBubble';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { getProjects } from '@/lib/data/projects';
import { useMemo, useState } from 'react';

const FILTERS = [
  { label: "All Projects", value: "all" },
  { label: "Web Apps", value: "web" },
  { label: "Mobile Apps", value: "mobile" },
  { label: "UI/UX", value: "uiux" },
  { label: "Other", value: "other" },
] as const;

export function ProjectsPanel() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]['value']>('all');
  const projects = useMemo(() => getProjects(), []);

  const filteredProjects = useMemo(() => {
    if (filter === "all") {
      return projects;
    }

    return projects.filter((project) => project.category === filter);
  }, [filter, projects]);

  return (
    <section className="min-h-screen py-16">
      <h2 data-panel-heading="true" tabIndex={-1} className="sr-only">
        Projects panel
      </h2>

      <ChapterHeader
        title="Projects Archive"
        subtitle="A Collection of Creative Works"
        chapterNumber={2}
      />

      <div className="container mx-auto px-4 py-8">
        <div
          className="mb-8 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Project category filters"
        >
          {FILTERS.map((tab) => {
            const isActive = filter === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(tab.value)}
                className={`border-manga border-manga-black px-4 py-2 font-heading text-sm uppercase tracking-wider [box-shadow:var(--manga-shadow)] transition-all duration-150 ease-out hover:translate-x-[2px] hover:translate-y-[2px] hover:[box-shadow:var(--manga-shadow-pressed)] focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] focus-visible:[box-shadow:var(--manga-shadow-pressed)] focus-visible:outline-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none ${
                  isActive
                    ? 'bg-manga-black text-manga-white'
                    : 'bg-manga-white text-manga-black hover:bg-manga-gray-50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {filteredProjects.length > 0 ? (
          <div id="projects-grid">
            <ProjectGrid projects={filteredProjects} />
          </div>
        ) : (
          <div className="min-h-[40vh] flex items-center justify-center">
            <div className="max-w-md text-center">
              <SpeechBubble variant="thought" tailDirection="bottom-left">
                <h3 className="mb-2 text-xl font-heading">No Projects Found</h3>
                <p className="text-manga-gray-600">
                  No projects match the selected category. Try selecting a
                  different filter.
                </p>
              </SpeechBubble>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
