import { InterestsPanel } from '@/components/about/InterestsPanel';
import { IntroPanel } from '@/components/about/IntroPanel';
import { SkillsPanel } from '@/components/about/SkillsPanel';
import { Timeline } from '@/components/about/Timeline';
import { getAboutData } from '@/lib/data/about';
import { getInterests } from '@/lib/data/interests';
import { getSkills, getTools } from '@/lib/data/skills';
import { getTimelineEvents } from '@/lib/data/timeline';

export function AboutPanel() {
  const aboutData = getAboutData();
  const skills = getSkills();
  const tools = getTools();
  const timelineEvents = getTimelineEvents();
  const interests = getInterests();

  return (
    <section className="min-h-screen py-section">
      <h2 data-panel-heading="true" tabIndex={-1} className="sr-only">
        About panel
      </h2>
      <div className="container mx-auto space-y-section px-4">
        <div id="intro" className="scroll-mt-28">
          <IntroPanel
            name={aboutData.name}
            bio={aboutData.bio}
            avatarSrc={aboutData.avatarSrc}
            inspirations={aboutData.inspirations}
          />
        </div>
        <div id="skills" className="scroll-mt-28">
          <SkillsPanel skills={skills} tools={tools} />
        </div>
        <div id="timeline" className="scroll-mt-28">
          <Timeline events={timelineEvents} />
        </div>
        <div id="interests" className="scroll-mt-28">
          <InterestsPanel interests={interests} />
        </div>
      </div>
    </section>
  );
}
