import dynamic from 'next/dynamic';
import { PageTransition } from '@/components/layout/PageTransition';
import { IntroPanel } from '@/components/about/IntroPanel';
import { getAboutData } from '@/lib/data/about';
import { getSkills, getTools } from '@/lib/data/skills';
import { getTimelineEvents } from '@/lib/data/timeline';
import { getInterests } from '@/lib/data/interests';

// Dynamic imports for heavier below-the-fold components (code-splitting)
const SkillsPanel = dynamic(
  () => import('@/components/about/SkillsPanel').then((m) => m.SkillsPanel),
  { loading: () => <SectionSkeleton /> }
);
const Timeline = dynamic(
  () => import('@/components/about/Timeline').then((m) => m.Timeline),
  { loading: () => <SectionSkeleton /> }
);
const InterestsPanel = dynamic(
  () => import('@/components/about/InterestsPanel').then((m) => m.InterestsPanel),
  { loading: () => <SectionSkeleton /> }
);

/** Lightweight skeleton shown while lazy components load */
function SectionSkeleton() {
  return (
    <div className="border-manga border-manga-black bg-manga-white p-8 animate-pulse min-h-[200px]">
      <div className="h-6 w-48 bg-manga-gray-200 mb-4" />
      <div className="h-4 w-full bg-manga-gray-200 mb-2" />
      <div className="h-4 w-3/4 bg-manga-gray-200" />
    </div>
  );
}

/**
 * About Page (/about)
 * 
 * Displays personal bio, skills, timeline, and interests in manga-style panels.
 * 
 * Features:
 * - IntroPanel: Photo/avatar with bio and inspirations
 * - SkillsPanel: Technical skills with RPG-style stat bars
 * - Timeline: Career milestones in manga panel strip format
 * - InterestsPanel: Hobbies and favorites as trading cards
 * 
 * Requirements: 1.1
 */
export default function AboutPage() {
  const aboutData = getAboutData();
  const skills = getSkills();
  const tools = getTools();
  const timelineEvents = getTimelineEvents();
  const interests = getInterests();

  return (
    <PageTransition>
      <main className="min-h-screen py-section">
        <div className="container mx-auto px-4 space-y-section">
          {/* Introduction Panel - Requirements 5.1, 5.2, 5.3 */}
          <IntroPanel
            name={aboutData.name}
            bio={aboutData.bio}
            avatarSrc={aboutData.avatarSrc}
            inspirations={aboutData.inspirations}
          />
          
          {/* Skills Panel - Requirements 6.1, 6.2, 6.3 */}
          <SkillsPanel skills={skills} tools={tools} />
          
          {/* Timeline - Requirements 7.1, 7.2, 7.3 */}
          <Timeline events={timelineEvents} />
          
          {/* Interests Panel - Requirements 8.1, 8.2, 8.3 */}
          <InterestsPanel interests={interests} />
        </div>
      </main>
    </PageTransition>
  );
}
