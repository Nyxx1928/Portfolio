import { PageTransition } from '@/components/layout/PageTransition';
import { ChapterHeader } from '@/components/manga/ChapterHeader';
import { ContactIntro } from '@/components/contact/ContactIntro';
import { ContactForm } from '@/components/contact/ContactForm';
// import { SocialLinks } from '@/components/contact/SocialLinks';

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
    <PageTransition>
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
            {/* <SocialLinks /> */}
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
