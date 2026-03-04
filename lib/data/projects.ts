import { Project } from '@/types';

/**
 * Sample project data for the manga portfolio website
 * 
 * This file contains sample projects across different categories:
 * - Web applications
 * - Mobile applications
 * - UI/UX design projects
 * - Other projects
 * 
 * Featured projects are displayed on the dashboard homepage.
 */

export const projects: Project[] = [
  // Featured Web Project 1
  {
    id: '1',
    slug: 'task-master-pro',
    title: 'TaskMaster Pro',
    description: 'A powerful task management application with real-time collaboration, drag-and-drop interface, and advanced filtering capabilities.',
    fullDescription: 'TaskMaster Pro is a comprehensive task management solution designed for teams and individuals who need to stay organized. Built with modern web technologies, it features real-time synchronization, intuitive drag-and-drop task organization, customizable workflows, and powerful analytics. The application supports multiple project views including Kanban boards, Gantt charts, and calendar views.',
    thumbnail: '/images/projects/taskmaster-thumb.jpg',
    screenshots: [
      '/images/projects/taskmaster-1.jpg',
      '/images/projects/taskmaster-2.jpg',
      '/images/projects/taskmaster-3.jpg',
      '/images/projects/taskmaster-4.jpg',
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'WebSocket'],
    category: 'web',
    featured: true,
    demoUrl: 'https://taskmaster-demo.example.com',
    repoUrl: 'https://github.com/username/taskmaster-pro',
    challenges: [
      'Implementing real-time synchronization across multiple users without conflicts',
      'Optimizing drag-and-drop performance with large datasets',
      'Designing an intuitive UX that works for both beginners and power users',
    ],
    learnings: [
      'Mastered WebSocket implementation for real-time features',
      'Learned advanced state management patterns for complex UI interactions',
      'Gained experience with database optimization for high-traffic applications',
    ],
    impact: [
      { metric: 'Active Users', value: '2,500+' },
      { metric: 'Tasks Completed', value: '50,000+' },
      { metric: 'User Satisfaction', value: '4.8/5' },
    ],
    createdAt: '2024-01-15',
  },

  // Featured Mobile Project
  {
    id: '2',
    slug: 'manga-reader-app',
    title: 'Manga Reader',
    description: 'A sleek mobile app for reading manga with offline support, customizable reading modes, and a vast library of titles.',
    fullDescription: 'Manga Reader is a feature-rich mobile application that provides manga enthusiasts with the ultimate reading experience. The app includes offline reading capabilities, multiple reading modes (single page, double page, scroll), customizable themes, bookmark synchronization, and a recommendation engine. Built with React Native for cross-platform compatibility.',
    thumbnail: '/images/projects/manga-reader-thumb.jpg',
    screenshots: [
      '/images/projects/manga-reader-1.jpg',
      '/images/projects/manga-reader-2.jpg',
      '/images/projects/manga-reader-3.jpg',
    ],
    techStack: ['React Native', 'TypeScript', 'Redux', 'Firebase', 'Expo'],
    category: 'mobile',
    featured: true,
    demoUrl: 'https://apps.apple.com/manga-reader',
    challenges: [
      'Implementing efficient image caching for offline reading',
      'Optimizing memory usage when displaying high-resolution manga pages',
      'Creating smooth page transitions that feel natural',
    ],
    learnings: [
      'Deep understanding of React Native performance optimization',
      'Experience with mobile-specific UX patterns and gestures',
      'Knowledge of app store submission and review processes',
    ],
    impact: [
      { metric: 'Downloads', value: '100,000+' },
      { metric: 'Daily Active Users', value: '15,000+' },
      { metric: 'App Store Rating', value: '4.7/5' },
    ],
    createdAt: '2023-11-20',
  },

  // Featured UI/UX Project
  {
    id: '3',
    slug: 'design-system-revamp',
    title: 'Enterprise Design System',
    description: 'Complete redesign and documentation of a design system for a Fortune 500 company, improving consistency and development speed.',
    fullDescription: 'Led the comprehensive overhaul of an enterprise design system serving 200+ designers and developers. The project involved auditing existing components, establishing design tokens, creating accessible components, and building extensive documentation. The new system reduced design-to-development time by 40% and improved accessibility compliance across all products.',
    thumbnail: '/images/projects/design-system-thumb.jpg',
    screenshots: [
      '/images/projects/design-system-1.jpg',
      '/images/projects/design-system-2.jpg',
      '/images/projects/design-system-3.jpg',
      '/images/projects/design-system-4.jpg',
    ],
    techStack: ['Figma', 'Storybook', 'React', 'TypeScript', 'CSS-in-JS'],
    category: 'uiux',
    featured: true,
    demoUrl: 'https://design-system-demo.example.com',
    challenges: [
      'Balancing flexibility with consistency across diverse product needs',
      'Migrating 50+ existing products to the new design system',
      'Ensuring WCAG 2.1 AA compliance for all components',
    ],
    learnings: [
      'Mastered design token architecture and theming strategies',
      'Gained expertise in accessibility standards and testing',
      'Learned effective documentation and communication strategies',
    ],
    impact: [
      { metric: 'Development Time Saved', value: '40%' },
      { metric: 'Components Created', value: '120+' },
      { metric: 'Team Adoption', value: '100%' },
    ],
    createdAt: '2023-09-10',
  },

  // Web Project 2
  {
    id: '4',
    slug: 'ecommerce-platform',
    title: 'Artisan Marketplace',
    description: 'A modern e-commerce platform connecting independent artists with customers, featuring secure payments and seller analytics.',
    fullDescription: 'Artisan Marketplace is a full-featured e-commerce platform built specifically for independent artists and craftspeople. The platform includes seller storefronts, inventory management, secure payment processing via Stripe, order tracking, customer reviews, and comprehensive analytics dashboards. The site is optimized for SEO and mobile shopping.',
    thumbnail: '/images/projects/marketplace-thumb.jpg',
    screenshots: [
      '/images/projects/marketplace-1.jpg',
      '/images/projects/marketplace-2.jpg',
      '/images/projects/marketplace-3.jpg',
    ],
    techStack: ['Next.js', 'TypeScript', 'Stripe', 'MongoDB', 'AWS S3', 'Vercel'],
    category: 'web',
    featured: false,
    demoUrl: 'https://artisan-marketplace.example.com',
    repoUrl: 'https://github.com/username/artisan-marketplace',
    challenges: [
      'Implementing secure payment processing with Stripe',
      'Handling image uploads and optimization at scale',
      'Creating a fair and transparent seller rating system',
    ],
    learnings: [
      'Experience with payment gateway integration and PCI compliance',
      'Understanding of e-commerce UX best practices',
      'Knowledge of SEO optimization for product pages',
    ],
    impact: [
      { metric: 'Active Sellers', value: '500+' },
      { metric: 'Monthly Transactions', value: '$50,000+' },
      { metric: 'Customer Retention', value: '65%' },
    ],
    createdAt: '2023-07-22',
  },

  // Mobile Project 2
  {
    id: '5',
    slug: 'fitness-tracker',
    title: 'FitQuest',
    description: 'A gamified fitness tracking app that turns workouts into RPG-style quests with achievements and social challenges.',
    fullDescription: 'FitQuest reimagines fitness tracking by incorporating RPG game mechanics. Users create characters, complete workout quests, level up their stats, unlock achievements, and compete with friends. The app integrates with popular fitness devices and includes workout plans, nutrition tracking, and progress analytics.',
    thumbnail: '/images/projects/fitquest-thumb.jpg',
    screenshots: [
      '/images/projects/fitquest-1.jpg',
      '/images/projects/fitquest-2.jpg',
      '/images/projects/fitquest-3.jpg',
    ],
    techStack: ['React Native', 'TypeScript', 'GraphQL', 'Node.js', 'PostgreSQL'],
    category: 'mobile',
    featured: false,
    demoUrl: 'https://play.google.com/fitquest',
    challenges: [
      'Integrating with multiple fitness device APIs (Fitbit, Apple Health, Google Fit)',
      'Designing engaging gamification mechanics that motivate users',
      'Ensuring accurate calorie and activity tracking',
    ],
    learnings: [
      'Experience with health and fitness API integrations',
      'Understanding of gamification psychology and user motivation',
      'Knowledge of data visualization for health metrics',
    ],
    impact: [
      { metric: 'Active Users', value: '25,000+' },
      { metric: 'Workouts Logged', value: '200,000+' },
      { metric: 'User Engagement', value: '4.2 sessions/week' },
    ],
    createdAt: '2023-05-18',
  },

  // UI/UX Project 2
  {
    id: '6',
    slug: 'banking-app-redesign',
    title: 'Mobile Banking Redesign',
    description: 'Complete UX overhaul of a mobile banking app, focusing on accessibility and simplified navigation for senior users.',
    fullDescription: 'Redesigned a mobile banking application to better serve senior citizens and users with accessibility needs. The project involved extensive user research, usability testing, and iterative design. Key improvements included larger touch targets, simplified navigation, voice commands, and high-contrast themes. The redesign increased user satisfaction scores by 45%.',
    thumbnail: '/images/projects/banking-thumb.jpg',
    screenshots: [
      '/images/projects/banking-1.jpg',
      '/images/projects/banking-2.jpg',
      '/images/projects/banking-3.jpg',
    ],
    techStack: ['Figma', 'Adobe XD', 'UserTesting', 'Maze', 'Principle'],
    category: 'uiux',
    featured: false,
    challenges: [
      'Balancing security requirements with ease of use',
      'Designing for users with varying levels of tech literacy',
      'Meeting strict financial industry accessibility standards',
    ],
    learnings: [
      'Deep understanding of inclusive design principles',
      'Experience conducting user research with diverse demographics',
      'Knowledge of financial app security and compliance requirements',
    ],
    impact: [
      { metric: 'User Satisfaction', value: '+45%' },
      { metric: 'Task Completion Rate', value: '+30%' },
      { metric: 'Support Calls', value: '-25%' },
    ],
    createdAt: '2023-03-14',
  },

  // Web Project 3
  {
    id: '7',
    slug: 'blog-platform',
    title: 'DevBlog CMS',
    description: 'A developer-focused blogging platform with markdown support, syntax highlighting, and built-in analytics.',
    fullDescription: 'DevBlog CMS is a modern blogging platform designed specifically for developers and technical writers. It features markdown editing with live preview, syntax highlighting for 100+ languages, code snippet embedding, SEO optimization, RSS feeds, and built-in analytics. The platform supports custom themes and plugins.',
    thumbnail: '/images/projects/devblog-thumb.jpg',
    screenshots: [
      '/images/projects/devblog-1.jpg',
      '/images/projects/devblog-2.jpg',
    ],
    techStack: ['Next.js', 'MDX', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
    category: 'web',
    featured: false,
    demoUrl: 'https://devblog-cms.example.com',
    repoUrl: 'https://github.com/username/devblog-cms',
    challenges: [
      'Implementing efficient markdown parsing and rendering',
      'Creating a flexible plugin system',
      'Optimizing SEO for dynamic content',
    ],
    learnings: [
      'Mastered MDX and content management patterns',
      'Experience with technical SEO optimization',
      'Understanding of plugin architecture design',
    ],
    impact: [
      { metric: 'Active Blogs', value: '1,200+' },
      { metric: 'Articles Published', value: '15,000+' },
      { metric: 'Monthly Readers', value: '500,000+' },
    ],
    createdAt: '2023-01-08',
  },

  // Other Project 1
  {
    id: '8',
    slug: 'cli-tool',
    title: 'DevTools CLI',
    description: 'A command-line tool that automates common development workflows and project scaffolding.',
    fullDescription: 'DevTools CLI is a powerful command-line utility that streamlines developer workflows. It includes project generators, code scaffolding, automated testing setup, deployment scripts, and integration with popular development tools. The CLI is extensible through plugins and supports custom templates.',
    thumbnail: '/images/projects/cli-thumb.jpg',
    screenshots: [
      '/images/projects/cli-1.jpg',
      '/images/projects/cli-2.jpg',
    ],
    techStack: ['Node.js', 'TypeScript', 'Commander.js', 'Inquirer.js', 'Chalk'],
    category: 'other',
    featured: false,
    repoUrl: 'https://github.com/username/devtools-cli',
    challenges: [
      'Creating an intuitive CLI interface with good error messages',
      'Supporting multiple project types and frameworks',
      'Ensuring cross-platform compatibility (Windows, Mac, Linux)',
    ],
    learnings: [
      'Experience building developer tools and CLIs',
      'Understanding of Node.js package publishing and versioning',
      'Knowledge of terminal UI/UX best practices',
    ],
    impact: [
      { metric: 'NPM Downloads', value: '10,000+' },
      { metric: 'GitHub Stars', value: '500+' },
      { metric: 'Contributors', value: '15' },
    ],
    createdAt: '2022-11-30',
  },

  // Other Project 2
  {
    id: '9',
    slug: 'browser-extension',
    title: 'CodeSnap',
    description: 'A browser extension for capturing and sharing beautiful code screenshots with customizable themes.',
    fullDescription: 'CodeSnap is a browser extension that makes it easy to capture and share code snippets as beautiful images. It features syntax highlighting, multiple themes, customizable backgrounds, watermarks, and direct sharing to social media. The extension supports all major programming languages and integrates with GitHub.',
    thumbnail: '/images/projects/codesnap-thumb.jpg',
    screenshots: [
      '/images/projects/codesnap-1.jpg',
      '/images/projects/codesnap-2.jpg',
    ],
    techStack: ['TypeScript', 'React', 'Chrome Extension API', 'Prism.js', 'Canvas API'],
    category: 'other',
    featured: false,
    demoUrl: 'https://chrome.google.com/webstore/codesnap',
    repoUrl: 'https://github.com/username/codesnap',
    challenges: [
      'Working within browser extension security constraints',
      'Implementing high-quality image rendering with Canvas API',
      'Supporting multiple browsers with different extension APIs',
    ],
    learnings: [
      'Experience with browser extension development',
      'Understanding of Canvas API and image manipulation',
      'Knowledge of Chrome Web Store publishing process',
    ],
    impact: [
      { metric: 'Chrome Users', value: '50,000+' },
      { metric: 'Screenshots Created', value: '1M+' },
      { metric: 'Extension Rating', value: '4.9/5' },
    ],
    createdAt: '2022-09-15',
  },
];

/**
 * Get all projects
 */
export function getProjects(): Project[] {
  return projects;
}

/**
 * Get featured projects only
 */
export function getFeaturedProjects(): Project[] {
  return projects.filter(project => project.featured);
}

/**
 * Get projects by category
 */
export function getProjectsByCategory(category: Project['category']): Project[] {
  return projects.filter(project => project.category === category);
}

/**
 * Get a single project by slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug);
}

/**
 * Get all unique categories
 */
export function getCategories(): Project['category'][] {
  return ['web', 'mobile', 'uiux', 'other'];
}
