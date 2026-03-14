import { ContactForm } from '@/components/contact/ContactForm';
import { ContactIntro } from '@/components/contact/ContactIntro';
import { SocialLinks } from '@/components/contact/SocialLinks';
import { ChapterHeader } from '@/components/manga/ChapterHeader';

export function ContactPanel() {
  return (
    <section className="min-h-screen py-16">
      <h2 data-panel-heading="true" tabIndex={-1} className="sr-only">
        Contact panel
      </h2>

      <ChapterHeader
        title="Get In Touch"
        subtitle="Let's Create Something Together"
        chapterNumber={4}
      />

      <div className="container mx-auto px-4 py-section">
        <div className="mx-auto max-w-4xl space-y-section">
          <ContactIntro />
          <ContactForm />
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
    </section>
  );
}
