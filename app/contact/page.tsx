import dynamic from 'next/dynamic';
import { ChapterHeader } from '@/components/manga/ChapterHeader';
import { ContactIntro } from '@/components/contact/ContactIntro';
import { ContactForm } from '@/components/contact/ContactForm';

// Dynamic import for below-the-fold social links section
const SocialLinks = dynamic(
  () => import('@/components/contact/SocialLinks').then((m) => m.SocialLinks),
  {
    loading: () => (
      <div className="border-manga border-manga-black bg-manga-white p-8 animate-pulse min-h-[150px]">
        <div className="h-6 w-40 bg-manga-gray-200 mb-4" />
        <div className="h-4 w-full bg-manga-gray-200" />
      </div>
    ),
  }
);

/**
 * Contact Page (/contact)
 * 
 * Displays contact form and social links in manga-style panels.
 * 
 * Features:
 * - ContactIntro: Speech bubble with availability info
 * - ContactForm: Form with validation styled as manga dialogue boxes
 * - SocialLinks: Social media badges and email
 * 
 * Requirements: 1.1
 */
export default function ContactPage() {
  return (
    <main className="min-h-screen py-16">
      {/* Chapter Header */}
      <ChapterHeader 
        title="Get In Touch" 
        subtitle="Let's Create Something Together"
        chapterNumber={4}
      />

      <div className="container mx-auto px-4 py-section">
        <div className="max-w-4xl mx-auto space-y-section">
          {/* Contact Introduction - Requirements 14.1, 14.2 */}
          <ContactIntro />

          {/* Contact Form - Requirements 13.1, 13.2, 13.3, 13.4, 13.5, 16.1, 16.2 */}
          <ContactForm />

          {/* Social Links - Requirements 15.1, 15.2, 15.3, 15.4, 22.2 */}
          <SocialLinks
            links={[
              { platform: 'github', url: 'https://github.com', username: 'mangadev' },
              { platform: 'linkedin', url: 'https://linkedin.com/in/mangadev', username: 'mangadev' },
              { platform: 'twitter', url: 'https://twitter.com/mangadev', username: 'mangadev' },
            ]}
            email="hello@mangaportfolio.dev"
            location="Tokyo, Japan"
          />
        </div>
      </div>
    </main>
  );
}
