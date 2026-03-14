import { IntroPanel } from '@/components/about/IntroPanel';
import { SkillsPanel } from '@/components/about/SkillsPanel';
import { Timeline } from '@/components/about/Timeline';
import { InterestsPanel } from '@/components/about/InterestsPanel';
import { getAboutData } from '@/lib/data/about';
import { getSkills, getTools } from '@/lib/data/skills';
import { getTimelineEvents } from '@/lib/data/timeline';
import { getInterests } from '@/lib/data/interests';


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
  );
}
