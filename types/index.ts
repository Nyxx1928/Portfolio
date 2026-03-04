// Data Models

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  thumbnail: string;
  screenshots: string[];
  techStack: string[];
  category: 'web' | 'mobile' | 'uiux' | 'other';
  featured: boolean;
  demoUrl?: string;
  repoUrl?: string;
  challenges: string[];
  learnings: string[];
  impact: ProjectImpact[];
  createdAt: string;
}

export interface ProjectImpact {
  metric: string;
  value: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'design' | 'tools' | 'other';
  icon?: string;
}

export interface Tool {
  name: string;
  category: string;
}

export interface TimelineEvent {
  id: string;
  date: string; // ISO date string
  title: string;
  description: string;
  type: 'education' | 'work' | 'project' | 'achievement';
  organization?: string;
  location?: string;
  isPast: boolean;
}

export interface Interest {
  id: string;
  title: string;
  type: 'manga' | 'anime' | 'hobby';
  image?: string;
  description?: string;
  rating?: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Navigation and Theme

export interface NavLink {
  label: string;
  href: string;
  icon?: string;
}

export interface MonochromePalette {
  black: '#000000';
  white: '#FFFFFF';
  gray: {
    900: '#1A1A1A';
    800: '#333333';
    600: '#666666';
    400: '#999999';
    200: '#E5E5E5';
    50: '#F5F5F5';
  };
}

export interface MangaTheme {
  colors: MonochromePalette;
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
  spacing: {
    panelGap: string;
    sectionPadding: string;
  };
  breakpoints: {
    mobile: '640px';
    tablet: '1024px';
  };
}
