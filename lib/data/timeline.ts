import { TimelineEvent } from '@/types';

/**
 * Timeline data for the manga portfolio website
 * 
 * This file contains career milestones organized chronologically:
 * - Education: Academic achievements and degrees
 * - Work: Professional positions and employment
 * - Project: Significant personal or professional projects
 * - Achievement: Awards, certifications, and notable accomplishments
 * 
 * Events marked with isPast: true receive "Flashback" visual styling
 * to distinguish past experiences from current/future milestones.
 */

export const timelineEvents: TimelineEvent[] = [
  // Education
  {
    id: 'timeline-1',
    date: '2015-09-01',
    title: 'Started Computer Science Degree',
    description: 'Began Bachelor of Science in Computer Science, focusing on software engineering and web development.',
    type: 'education',
    organization: 'Tech University',
    location: 'San Francisco, CA',
    isPast: true,
  },
  {
    id: 'timeline-2',
    date: '2017-06-15',
    title: 'Frontend Development Bootcamp',
    description: 'Completed intensive 12-week bootcamp specializing in React, JavaScript, and modern web development practices.',
    type: 'education',
    organization: 'Code Academy',
    location: 'Online',
    isPast: true,
  },
  {
    id: 'timeline-3',
    date: '2019-05-20',
    title: 'Graduated with Honors',
    description: 'Earned Bachelor of Science in Computer Science with honors. Senior thesis on progressive web applications.',
    type: 'education',
    organization: 'Tech University',
    location: 'San Francisco, CA',
    isPast: true,
  },

  // Work Experience
  {
    id: 'timeline-4',
    date: '2018-06-01',
    title: 'Junior Frontend Developer',
    description: 'First professional role building responsive web applications with React and TypeScript. Collaborated with design team on UI component library.',
    type: 'work',
    organization: 'StartupCo',
    location: 'San Francisco, CA',
    isPast: true,
  },
  {
    id: 'timeline-5',
    date: '2020-03-15',
    title: 'Frontend Developer',
    description: 'Promoted to mid-level developer. Led development of company design system and mentored junior developers.',
    type: 'work',
    organization: 'StartupCo',
    location: 'San Francisco, CA',
    isPast: true,
  },
  {
    id: 'timeline-6',
    date: '2021-08-01',
    title: 'Senior Frontend Engineer',
    description: 'Joined as senior engineer to architect and build next-generation e-commerce platform. Led team of 5 developers.',
    type: 'work',
    organization: 'TechCorp',
    location: 'Remote',
    isPast: true,
  },
  {
    id: 'timeline-7',
    date: '2023-01-10',
    title: 'Lead Frontend Engineer',
    description: 'Currently leading frontend architecture and development for enterprise applications. Managing cross-functional teams and driving technical strategy.',
    type: 'work',
    organization: 'TechCorp',
    location: 'Remote',
    isPast: false,
  },

  // Projects
  {
    id: 'timeline-8',
    date: '2019-11-01',
    title: 'Launched First Open Source Project',
    description: 'Released DevTools CLI, a command-line utility for developers. Gained 500+ GitHub stars and active community.',
    type: 'project',
    organization: 'Personal Project',
    isPast: true,
  },
  {
    id: 'timeline-9',
    date: '2020-07-15',
    title: 'TaskMaster Pro Launch',
    description: 'Built and launched comprehensive task management application. Reached 2,500+ active users within first year.',
    type: 'project',
    organization: 'Side Project',
    isPast: true,
  },
  {
    id: 'timeline-10',
    date: '2022-03-20',
    title: 'CodeSnap Browser Extension',
    description: 'Released browser extension for capturing code screenshots. Achieved 50,000+ users across Chrome and Firefox.',
    type: 'project',
    organization: 'Personal Project',
    isPast: true,
  },
  {
    id: 'timeline-11',
    date: '2023-09-10',
    title: 'Enterprise Design System Overhaul',
    description: 'Led complete redesign of Fortune 500 company design system. Improved development efficiency by 40%.',
    type: 'project',
    organization: 'TechCorp',
    isPast: true,
  },
  {
    id: 'timeline-12',
    date: '2024-01-15',
    title: 'Manga Reader App Launch',
    description: 'Released cross-platform mobile app for manga enthusiasts. Currently at 100,000+ downloads with 4.7/5 rating.',
    type: 'project',
    organization: 'Side Project',
    isPast: false,
  },

  // Achievements
  {
    id: 'timeline-13',
    date: '2019-12-01',
    title: 'AWS Certified Developer',
    description: 'Earned AWS Certified Developer - Associate certification, demonstrating cloud architecture expertise.',
    type: 'achievement',
    organization: 'Amazon Web Services',
    isPast: true,
  },
  {
    id: 'timeline-14',
    date: '2020-10-15',
    title: 'Speaker at React Conference',
    description: 'Presented talk on "Building Accessible React Applications" at regional React conference. 200+ attendees.',
    type: 'achievement',
    organization: 'React Conf West',
    location: 'Seattle, WA',
    isPast: true,
  },
  {
    id: 'timeline-15',
    date: '2021-05-20',
    title: 'Employee of the Quarter',
    description: 'Recognized for exceptional contributions to product development and team mentorship.',
    type: 'achievement',
    organization: 'TechCorp',
    isPast: true,
  },
  {
    id: 'timeline-16',
    date: '2022-08-10',
    title: 'Published Technical Article',
    description: 'Article on "Modern Frontend Architecture Patterns" featured on CSS-Tricks. 50,000+ views.',
    type: 'achievement',
    organization: 'CSS-Tricks',
    isPast: true,
  },
  {
    id: 'timeline-17',
    date: '2023-11-05',
    title: 'Accessibility Champion Award',
    description: 'Awarded for leading company-wide accessibility initiative and achieving WCAG 2.1 AA compliance.',
    type: 'achievement',
    organization: 'TechCorp',
    isPast: true,
  },
  {
    id: 'timeline-18',
    date: '2024-02-14',
    title: 'Open Source Contributor Badge',
    description: 'Recognized as top contributor to React ecosystem projects. 100+ merged pull requests.',
    type: 'achievement',
    organization: 'GitHub',
    isPast: false,
  },
];

/**
 * Get all timeline events sorted chronologically (oldest first)
 */
export function getTimelineEvents(): TimelineEvent[] {
  return [...timelineEvents].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

/**
 * Get timeline events sorted reverse chronologically (newest first)
 */
export function getTimelineEventsReverse(): TimelineEvent[] {
  return [...timelineEvents].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Get timeline events by type
 */
export function getTimelineEventsByType(type: TimelineEvent['type']): TimelineEvent[] {
  return timelineEvents.filter(event => event.type === type);
}

/**
 * Get education events
 */
export function getEducationEvents(): TimelineEvent[] {
  return getTimelineEventsByType('education');
}

/**
 * Get work experience events
 */
export function getWorkEvents(): TimelineEvent[] {
  return getTimelineEventsByType('work');
}

/**
 * Get project events
 */
export function getProjectEvents(): TimelineEvent[] {
  return getTimelineEventsByType('project');
}

/**
 * Get achievement events
 */
export function getAchievementEvents(): TimelineEvent[] {
  return getTimelineEventsByType('achievement');
}

/**
 * Get past events (for "Flashback" styling)
 */
export function getPastEvents(): TimelineEvent[] {
  return timelineEvents.filter(event => event.isPast);
}

/**
 * Get current/future events
 */
export function getCurrentEvents(): TimelineEvent[] {
  return timelineEvents.filter(event => !event.isPast);
}

/**
 * Get events by year
 */
export function getEventsByYear(year: number): TimelineEvent[] {
  return timelineEvents.filter(event => 
    new Date(event.date).getFullYear() === year
  );
}

/**
 * Get all unique years from timeline
 */
export function getTimelineYears(): number[] {
  const years = timelineEvents.map(event => 
    new Date(event.date).getFullYear()
  );
  return Array.from(new Set(years)).sort((a, b) => a - b);
}

/**
 * Get a single timeline event by id
 */
export function getTimelineEventById(id: string): TimelineEvent | undefined {
  return timelineEvents.find(event => event.id === id);
}

/**
 * Get recent events (last N events)
 */
export function getRecentEvents(limit: number = 5): TimelineEvent[] {
  return getTimelineEventsReverse().slice(0, limit);
}
