import { TimelineEvent } from '@/types';

/**
 * Timeline data for the manga portfolio website
 * 
 * This file contains career milestones organized chronologically:
 * - Education: Academic achievements and degrees
 * - Work: Professional positions and employment (including internships)
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
    date: '2026-07-20',
    title: 'Bachelor of Science in Computer Science',
    description: 'Expeted to Graduate as Cum Laude from STI College Caloocan. Specialized in web development and software engineering with a focus on modern frontend technologies.',
    type: 'education',
    organization: 'STI College Caloocan',
    location: 'Caloocan City',
    isPast: true,
  },

  // Internship Experience
  {
    id: 'timeline-2',
    date: '2026-06-01',
    title: 'Frontend Development Intern',
    description: 'Completed 300 hours internship building responsive web applications with React and TypeScript. Collaborated with senior developers on UI component library and design system implementation.',
    type: 'work',
    organization: 'SOCIA I.T. Solutions',
    location: 'BGC, Taguig',
    isPast: true,
  },

  // Achievements
  {
    id: 'timeline-3',
    date: '2023-10-05',
    title: 'Certificate of Training Programming (Java) NC III',
    description: 'Completed intensive training and assessment in Java programming, covering object-oriented programming, data structures, algorithms, and enterprise application development using Java technologies.',
    type: 'achievement',
    organization: 'TCSDI (TESDA)',
    isPast: false,
  },
  {
    id: 'timeline-4',
    date: '2023-02-14',
    title: 'Java Fundamentals',
    description: 'Completed comprehensive training in core Java programming, focusing on OOP, data structures, and fundamental application development.',
    type: 'achievement',
    organization: 'STI (Oracle Academy)',
    isPast: false,
  },
];

/**
 * Get all timeline events sorted reverse chronologically (newest first)
 */
export function getTimelineEvents(): TimelineEvent[] {
  return [...timelineEvents].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Get timeline events sorted chronologically (oldest first)
 */
export function getTimelineEventsReverse(): TimelineEvent[] {
  return [...timelineEvents].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
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
