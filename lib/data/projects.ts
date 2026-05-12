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
  // Chatter-sys - Java Chat System
  {
    id: '1',
    slug: 'chatter-sys',
    title: 'Chatter-sys',
    description: 'A simple chat system built in Java for learning WebSockets and Spring Boot. Features real-time messaging, user authentication, and a clean interface for instant communication.',
    fullDescription: 'Chatter-sys is a Java-based chat application developed as a learning project to master WebSockets and Spring Boot framework. The application provides real-time bidirectional communication between users, demonstrating the power of WebSocket protocol for instant messaging. Built with Spring Boot for the backend, the system includes user authentication, message persistence, chat room management, and a responsive user interface. The project showcases fundamental concepts of real-time web applications, including connection management, message broadcasting, and state synchronization. It serves as an excellent demonstration of Java backend development skills, WebSocket implementation, and understanding of real-time communication protocols. The clean architecture and well-documented code make it a valuable reference for learning Spring Boot and WebSocket integration.',
    thumbnail: '/images/projects/chatter-thumb.jpg',
    screenshots: [
      '/images/projects/chatter-1.jpg',
      '/images/projects/chatter-2.jpg',
    ],
    techStack: ['Java', 'Spring Boot', 'WebSockets'],
    category: ['web'],
    featured: true,
    repoUrl: 'https://github.com/Nyxx1928/chatter-sys',
    challenges: [
      'Implementing WebSocket connection management and reconnection logic',
      'Handling concurrent users and message broadcasting efficiently',
      'Designing a scalable architecture for real-time message delivery',
      'Managing WebSocket lifecycle and error handling',
    ],
    learnings: [
      'Deep understanding of WebSocket protocol and real-time communication',
      'Mastered Spring Boot framework and dependency injection',
      'Experience with concurrent programming and thread safety in Java',
      'Knowledge of chat application architecture and design patterns',
    ],
    impact: [
      { metric: 'Commits', value: '10+' },
      { metric: 'Learning Focus', value: 'WebSockets & Spring Boot' },
      { metric: 'Language', value: '100% Java' },
    ],
    createdAt: '2026-04-27',
  },

  // The Periodic Legends - Featured Educational Game
  {
    id: '2',
    slug: 'the-periodic-legends',
    title: 'The Periodic Legends (TPL)',
    description: 'Earth Science Educational game web analytics - Thesis project. An immersive turn-based RPG mobile application designed to enhance Earth Science education for General Academic Strand (GAS) students at Caloocan High School.',
    fullDescription: 'The Periodic Legends (TPL) is an innovative educational turn-based RPG mobile application developed as a thesis project to revolutionize Earth Science education. Designed specifically for General Academic Strand (GAS) students at Caloocan High School, this game combines engaging gameplay mechanics with curriculum-aligned learning content. Players embark on an Earth Science adventure where they learn about geological processes, atmospheric phenomena, and environmental systems through interactive battles and quests. The web analytics component provides educators with detailed insights into student engagement, learning progress, and knowledge retention. The project demonstrates how gamification can significantly improve student motivation and learning outcomes in science education.',
    thumbnail: '/images/projects/tpl-thumb.jpg',
    screenshots: [
      '/images/projects/tpl-1.jpg',
      '/images/projects/tpl-2.jpg',
      '/images/projects/tpl-3.jpg',
    ],
    techStack: ['HTML', 'JavaScript'],
    category: ['web'],
    featured: true,
    demoUrl: 'https://tpl-web-copy.vercel.app',
    repoUrl: 'https://github.com/Nyxx1928/the-periodic-legends-web',
    challenges: [
      'Balancing educational content with engaging gameplay mechanics',
      'Aligning game content with official GAS curriculum requirements',
      'Designing analytics that provide actionable insights for educators',
      'Creating an intuitive interface for students with varying tech literacy',
    ],
    learnings: [
      'Experience in educational game design and gamification principles',
      'Understanding of curriculum development and learning outcome assessment',
      'Knowledge of web analytics implementation and data visualization',
      'Insights into user experience design for educational applications',
    ],
    impact: [
      { metric: 'Deployments', value: '3+' },
      { metric: 'Commits', value: '3+' },
      { metric: 'Target Audience', value: 'GAS Students' },
    ],
    createdAt: '2024-08-15',
  },

  // Accugeo Website - Construction Materials Testing
  {
    id: '3',
    slug: 'accugeo-website',
    title: 'Accugeo Website',
    description: 'Landing page for Accugeo Construction Materials and Testing Site. A professional corporate website showcasing construction testing services, company information, and client resources.',
    fullDescription: 'Accugeo Website is a professional corporate landing page developed for Accugeo Construction Materials and Testing Site. The website serves as the digital presence for a construction materials testing company, providing comprehensive information about their services, testing capabilities, certifications, and industry expertise. Built with modern web technologies, the site features a clean, professional design that instills confidence in potential clients. It includes detailed service descriptions, case studies, contact forms, and resource sections for clients. The website is fully responsive, optimized for search engines, and designed to convert visitors into leads. The project demonstrates the ability to create professional corporate websites that effectively communicate brand value and technical expertise.',
    thumbnail: '/images/projects/accugeo-thumb.jpg',
    screenshots: [
      '/images/projects/accugeo-1.jpg',
      '/images/projects/accugeo-2.jpg',
      '/images/projects/accugeo-3.jpg',
    ],
    techStack: ['TypeScript', 'CSS', 'JavaScript', 'Dockerfile', 'Next.js'],
    category: ['web', 'uiux'],
    featured: true,
    demoUrl: 'https://accugeo.vercel.app',
    repoUrl: 'https://github.com/Nyxx1928/Accugeo-Website',
    challenges: [
      'Translating technical construction testing services into accessible web content',
      'Designing a professional interface that appeals to B2B construction clients',
      'Optimizing site performance while maintaining high-quality imagery',
      'Implementing effective SEO strategies for local construction industry',
    ],
    learnings: [
      'Experience in B2B website design and conversion optimization',
      'Understanding of construction industry terminology and client needs',
      'Knowledge of corporate branding and professional web design principles',
      'Expertise in Next.js optimization and deployment strategies',
    ],
    impact: [
      { metric: 'Deployments', value: '43+' },
      { metric: 'Commits', value: '112+' },
      { metric: 'Contributors', value: '3' },
    ],
    createdAt: '2025-02-10',
  },

  // LinkGuard - Featured Security Project
  {
    id: '4',
    slug: 'linkguard',
    title: 'LinkGuard',
    description: 'Network intelligence platform that resolves emails/URLs/domains to IPs, enriches them with ISP/ASN/location/proxy/hosting metadata, assigns deterministic risk scores, and persists/shareable lookup history via a Laravel backend and React frontend.',
    fullDescription: 'LinkGuard is a comprehensive network intelligence platform designed to enhance security and threat detection. The system analyzes emails, URLs, and domains to extract IP addresses, then enriches this data with detailed metadata including ISP information, ASN details, geolocation data, proxy detection, and hosting provider information. It features a sophisticated risk scoring algorithm that assigns deterministic risk scores to help identify potential threats. Built with a Laravel backend for robust API handling and data persistence, and a React frontend for intuitive user interaction. The platform maintains a complete lookup history that can be shared across teams for collaborative threat analysis.',
    thumbnail: '/images/projects/linkguard-thumb.jpg',
    screenshots: [
      '/images/projects/linkguard-1.jpg',
      '/images/projects/linkguard-2.jpg',
      '/images/projects/linkguard-3.jpg',
    ],
    techStack: ['Laravel', 'React', 'JavaScript', 'PHP', 'Blade', 'HTML', 'CSS', 'Shell', 'Dockerfile'],
    category: ['web'],
    featured: true,
    demoUrl: 'https://geo-tracker-eight-blond.vercel.app',
    repoUrl: 'https://github.com/Nyxx1928/LinkGuard',
    challenges: [
      'Implementing accurate IP resolution from various input formats (emails, URLs, domains)',
      'Designing a deterministic risk scoring algorithm that balances accuracy with performance',
      'Managing and persisting large volumes of lookup history data efficiently',
      'Integrating multiple third-party APIs for metadata enrichment',
    ],
    learnings: [
      'Deep understanding of network protocols and IP resolution techniques',
      'Experience with threat intelligence and security scoring methodologies',
      'Mastered Laravel backend architecture for high-performance API services',
      'Gained expertise in data enrichment pipelines and metadata aggregation',
    ],
    impact: [
      { metric: 'Deployments', value: '139+' },
      { metric: 'Commits', value: '160+' },
      { metric: 'Active Status', value: 'Production' },
    ],
    createdAt: '2025-04-25',
  },

  // Happy Valentines Day - Featured Full-Stack Application
  {
    id: '5',
    slug: 'happy-valentines-day',
    title: "Valentine's Love Wall",
    description: 'A full-stack application for sharing love notes and messages, built with NestJS backend and Next.js frontend. Features real-time message posting, moderation, and a beautiful Valentine-themed interface.',
    fullDescription: "Valentine's Love Wall is a heartwarming full-stack web application that allows users to share love notes, messages, and Valentine's wishes in a public digital space. Built with a modern tech stack featuring NestJS for the backend API and Next.js for the frontend, the application provides a seamless and responsive user experience. The platform includes real-time message posting, content moderation capabilities, user authentication, and a beautifully designed Valentine-themed interface with animations and interactive elements. The application demonstrates proficiency in full-stack development, including RESTful API design, database management, frontend state management, and deployment strategies. It showcases the ability to create engaging, user-friendly applications with both aesthetic appeal and robust functionality.",
    thumbnail: '/images/projects/hvd-thumb.jpg',
    screenshots: [
      '/images/projects/hvd-1.jpg',
      '/images/projects/hvd-2.jpg',
      '/images/projects/hvd-3.jpg',
    ],
    techStack: ['TypeScript', 'JavaScript', 'CSS', 'Batchfile', 'Shell', 'Dockerfile', 'NestJS', 'Next.js'],
    category: ['web'],
    featured: true,
    demoUrl: 'https://hvd-ten.vercel.app',
    repoUrl: 'https://github.com/Nyxx1928/HVD',
    challenges: [
      'Implementing real-time message updates without overwhelming the server',
      'Designing an effective content moderation system to filter inappropriate content',
      'Creating an engaging and responsive Valentine-themed UI with smooth animations',
      'Managing state synchronization between frontend and backend',
    ],
    learnings: [
      'Mastered NestJS backend architecture and dependency injection patterns',
      'Experience with Next.js server-side rendering and static generation',
      'Understanding of real-time communication patterns and WebSocket alternatives',
      'Knowledge of content moderation strategies and implementation',
    ],
    impact: [
      { metric: 'Deployments', value: '31+' },
      { metric: 'Commits', value: '64+' },
      { metric: 'Status', value: 'Production' },
    ],
    createdAt: '2026-01-20',
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
export function getProjectsByCategory(category: 'web' | 'mobile' | 'uiux' | 'other'): Project[] {
  return projects.filter(project => project.category.includes(category));
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
export function getCategories(): Array<'web' | 'mobile' | 'uiux' | 'other'> {
  return ['web', 'mobile', 'uiux', 'other'];
}
