import { IntroPanel } from '@/components/about/IntroPanel';
import { SkillsPanel } from '@/components/about/SkillsPanel';
import { Timeline } from '@/components/about/Timeline';
import { InterestsPanel } from '@/components/about/InterestsPanel';
import { AboutSectionNav } from '@/components/about/AboutSectionNav';
import { getAboutData } from '@/lib/data/about';
import { getSkills, getTools } from '@/lib/data/skills';
import { getTimelineEvents } from '@/lib/data/timeline';
import { getInterests } from '@/lib/data/interests';


export default function AboutPage() {
  const aboutData = getAboutData();
  const skills = getSkills();
  const tools = getTools();
  const timelineEvents = getTimelineEvents();
  const interests = getInterests();

  return (
    <main className="min-h-screen py-section">
      <AboutSectionNav />
      <div className="container mx-auto px-4 space-y-section">
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
    </main>
  );
}
