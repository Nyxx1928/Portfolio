import { Timeline } from './Timeline';
import { TimelineEvent } from '@/types';

/**
 * Timeline Component Examples
 * 
 * Demonstrates various use cases for the Timeline component:
 * - Full timeline with all event types
 * - Past events with "Flashback" styling
 * - Current/future events
 * - Events with and without organization/location
 * - Responsive behavior
 */

// Example 1: Full timeline with mixed event types
const fullTimelineEvents: TimelineEvent[] = [
  {
    id: 'timeline-1',
    date: '2018-09-01',
    title: 'Started Computer Science Degree',
    description: 'Began Bachelor of Science in Computer Science, focusing on software engineering and web development.',
    type: 'education',
    organization: 'Tech University',
    location: 'San Francisco, CA',
    isPast: true,
  },
  {
    id: 'timeline-2',
    date: '2020-06-01',
    title: 'Junior Frontend Developer',
    description: 'First professional role building responsive web applications with React and TypeScript.',
    type: 'work',
    organization: 'StartupCo',
    location: 'San Francisco, CA',
    isPast: true,
  },
  {
    id: 'timeline-3',
    date: '2021-11-01',
    title: 'Launched First Open Source Project',
    description: 'Released DevTools CLI, a command-line utility for developers. Gained 500+ GitHub stars.',
    type: 'project',
    organization: 'Personal Project',
    isPast: true,
  },
  {
    id: 'timeline-4',
    date: '2022-05-20',
    title: 'AWS Certified Developer',
    description: 'Earned AWS Certified Developer - Associate certification.',
    type: 'achievement',
    organization: 'Amazon Web Services',
    isPast: true,
  },
  {
    id: 'timeline-5',
    date: '2023-01-10',
    title: 'Lead Frontend Engineer',
    description: 'Currently leading frontend architecture and development for enterprise applications.',
    type: 'work',
    organization: 'TechCorp',
    location: 'Remote',
    isPast: false,
  },
  {
    id: 'timeline-6',
    date: '2024-02-14',
    title: 'Open Source Contributor Badge',
    description: 'Recognized as top contributor to React ecosystem projects. 100+ merged pull requests.',
    type: 'achievement',
    organization: 'GitHub',
    isPast: false,
  },
];

export function FullTimelineExample() {
  return (
    <div className="min-h-screen bg-manga-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-heading uppercase tracking-wider mb-8 text-center">
          Full Timeline Example
        </h1>
        <Timeline events={fullTimelineEvents} />
      </div>
    </div>
  );
}

// Example 2: Education-focused timeline
const educationEvents: TimelineEvent[] = [
  {
    id: 'edu-1',
    date: '2015-09-01',
    title: 'High School Graduation',
    description: 'Graduated with honors, specializing in mathematics and computer science.',
    type: 'education',
    organization: 'Lincoln High School',
    location: 'Portland, OR',
    isPast: true,
  },
  {
    id: 'edu-2',
    date: '2017-06-15',
    title: 'Frontend Development Bootcamp',
    description: 'Completed intensive 12-week bootcamp specializing in React and modern web development.',
    type: 'education',
    organization: 'Code Academy',
    location: 'Online',
    isPast: true,
  },
  {
    id: 'edu-3',
    date: '2019-05-20',
    title: 'Bachelor of Science - Computer Science',
    description: 'Graduated with honors. Senior thesis on progressive web applications.',
    type: 'education',
    organization: 'Tech University',
    location: 'San Francisco, CA',
    isPast: true,
  },
];

export function EducationTimelineExample() {
  return (
    <div className="min-h-screen bg-manga-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-heading uppercase tracking-wider mb-8 text-center">
          Education Timeline
        </h1>
        <Timeline events={educationEvents} />
      </div>
    </div>
  );
}

// Example 3: Work experience timeline
const workEvents: TimelineEvent[] = [
  {
    id: 'work-1',
    date: '2019-06-01',
    title: 'Junior Frontend Developer',
    description: 'Built responsive web applications and collaborated with design team on UI component library.',
    type: 'work',
    organization: 'StartupCo',
    location: 'San Francisco, CA',
    isPast: true,
  },
  {
    id: 'work-2',
    date: '2021-03-15',
    title: 'Frontend Developer',
    description: 'Promoted to mid-level developer. Led development of company design system.',
    type: 'work',
    organization: 'StartupCo',
    location: 'San Francisco, CA',
    isPast: true,
  },
  {
    id: 'work-3',
    date: '2022-08-01',
    title: 'Senior Frontend Engineer',
    description: 'Joined to architect and build next-generation e-commerce platform. Led team of 5 developers.',
    type: 'work',
    organization: 'TechCorp',
    location: 'Remote',
    isPast: true,
  },
  {
    id: 'work-4',
    date: '2023-01-10',
    title: 'Lead Frontend Engineer',
    description: 'Currently leading frontend architecture and managing cross-functional teams.',
    type: 'work',
    organization: 'TechCorp',
    location: 'Remote',
    isPast: false,
  },
];

export function WorkTimelineExample() {
  return (
    <div className="min-h-screen bg-manga-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-heading uppercase tracking-wider mb-8 text-center">
          Work Experience Timeline
        </h1>
        <Timeline events={workEvents} />
      </div>
    </div>
  );
}

// Example 4: Projects timeline
const projectEvents: TimelineEvent[] = [
  {
    id: 'proj-1',
    date: '2020-11-01',
    title: 'DevTools CLI',
    description: 'Released command-line utility for developers. Gained 500+ GitHub stars and active community.',
    type: 'project',
    organization: 'Personal Project',
    isPast: true,
  },
  {
    id: 'proj-2',
    date: '2021-07-15',
    title: 'TaskMaster Pro',
    description: 'Built and launched comprehensive task management application. Reached 2,500+ active users.',
    type: 'project',
    organization: 'Side Project',
    isPast: true,
  },
  {
    id: 'proj-3',
    date: '2022-03-20',
    title: 'CodeSnap Browser Extension',
    description: 'Released browser extension for capturing code screenshots. 50,000+ users across Chrome and Firefox.',
    type: 'project',
    organization: 'Personal Project',
    isPast: true,
  },
  {
    id: 'proj-4',
    date: '2024-01-15',
    title: 'Manga Reader App',
    description: 'Cross-platform mobile app for manga enthusiasts. Currently at 100,000+ downloads with 4.7/5 rating.',
    type: 'project',
    organization: 'Side Project',
    isPast: false,
  },
];

export function ProjectsTimelineExample() {
  return (
    <div className="min-h-screen bg-manga-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-heading uppercase tracking-wider mb-8 text-center">
          Projects Timeline
        </h1>
        <Timeline events={projectEvents} />
      </div>
    </div>
  );
}

// Example 5: Achievements timeline
const achievementEvents: TimelineEvent[] = [
  {
    id: 'ach-1',
    date: '2020-12-01',
    title: 'AWS Certified Developer',
    description: 'Earned AWS Certified Developer - Associate certification.',
    type: 'achievement',
    organization: 'Amazon Web Services',
    isPast: true,
  },
  {
    id: 'ach-2',
    date: '2021-10-15',
    title: 'Speaker at React Conference',
    description: 'Presented talk on "Building Accessible React Applications" to 200+ attendees.',
    type: 'achievement',
    organization: 'React Conf West',
    location: 'Seattle, WA',
    isPast: true,
  },
  {
    id: 'ach-3',
    date: '2022-05-20',
    title: 'Employee of the Quarter',
    description: 'Recognized for exceptional contributions to product development and team mentorship.',
    type: 'achievement',
    organization: 'TechCorp',
    isPast: true,
  },
  {
    id: 'ach-4',
    date: '2024-02-14',
    title: 'Open Source Contributor Badge',
    description: 'Recognized as top contributor to React ecosystem. 100+ merged pull requests.',
    type: 'achievement',
    organization: 'GitHub',
    isPast: false,
  },
];

export function AchievementsTimelineExample() {
  return (
    <div className="min-h-screen bg-manga-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-heading uppercase tracking-wider mb-8 text-center">
          Achievements Timeline
        </h1>
        <Timeline events={achievementEvents} />
      </div>
    </div>
  );
}

// Example 6: Minimal timeline (events without organization/location)
const minimalEvents: TimelineEvent[] = [
  {
    id: 'min-1',
    date: '2021-01-01',
    title: 'Started Learning React',
    description: 'Began journey into modern frontend development.',
    type: 'education',
    isPast: true,
  },
  {
    id: 'min-2',
    date: '2022-06-01',
    title: 'First Freelance Project',
    description: 'Completed first paid web development project.',
    type: 'work',
    isPast: true,
  },
  {
    id: 'min-3',
    date: '2023-12-01',
    title: 'Portfolio Website Launch',
    description: 'Launched personal portfolio with manga-inspired design.',
    type: 'project',
    isPast: false,
  },
];

export function MinimalTimelineExample() {
  return (
    <div className="min-h-screen bg-manga-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-heading uppercase tracking-wider mb-8 text-center">
          Minimal Timeline (No Organization/Location)
        </h1>
        <Timeline events={minimalEvents} />
      </div>
    </div>
  );
}

// Example 7: Empty timeline
export function EmptyTimelineExample() {
  return (
    <div className="min-h-screen bg-manga-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-heading uppercase tracking-wider mb-8 text-center">
          Empty Timeline
        </h1>
        <Timeline events={[]} />
      </div>
    </div>
  );
}

// Example 8: Single event timeline
const singleEvent: TimelineEvent[] = [
  {
    id: 'single-1',
    date: '2024-01-01',
    title: 'Current Position',
    description: 'Leading frontend development at a growing tech company.',
    type: 'work',
    organization: 'TechCorp',
    location: 'Remote',
    isPast: false,
  },
];

export function SingleEventTimelineExample() {
  return (
    <div className="min-h-screen bg-manga-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-heading uppercase tracking-wider mb-8 text-center">
          Single Event Timeline
        </h1>
        <Timeline events={singleEvent} />
      </div>
    </div>
  );
}
