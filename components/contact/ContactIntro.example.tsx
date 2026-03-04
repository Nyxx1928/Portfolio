import { ContactIntro } from './ContactIntro';

/**
 * ContactIntro Component Examples
 * 
 * Demonstrates various configurations of the ContactIntro component
 * for the manga portfolio website contact page.
 */

export default function ContactIntroExamples() {
  return (
    <div className="space-y-12 p-8 bg-manga-gray-50">
      <h1 className="text-4xl font-heading uppercase tracking-wider mb-8">
        ContactIntro Examples
      </h1>

      {/* Example 1: Default Configuration */}
      <section className="space-y-4">
        <h2 className="text-2xl font-heading uppercase tracking-wider">
          1. Default Configuration
        </h2>
        <p className="text-manga-gray-600">
          Default availability message with email and form as preferred methods.
        </p>
        <ContactIntro />
      </section>

      {/* Example 2: Custom Availability Message */}
      <section className="space-y-4">
        <h2 className="text-2xl font-heading uppercase tracking-wider">
          2. Custom Availability Message
        </h2>
        <p className="text-manga-gray-600">
          Custom message indicating full-time availability.
        </p>
        <ContactIntro 
          availability="Currently seeking full-time opportunities in web development and UI/UX design!"
        />
      </section>

      {/* Example 3: Email Only */}
      <section className="space-y-4">
        <h2 className="text-2xl font-heading uppercase tracking-wider">
          3. Email Only Contact
        </h2>
        <p className="text-manga-gray-600">
          Prefer email communication only.
        </p>
        <ContactIntro 
          availability="Best reached via email for project inquiries."
          preferredMethods={['email']}
        />
      </section>

      {/* Example 4: All Contact Methods */}
      <section className="space-y-4">
        <h2 className="text-2xl font-heading uppercase tracking-wider">
          4. All Contact Methods
        </h2>
        <p className="text-manga-gray-600">
          Showing all available contact method options.
        </p>
        <ContactIntro 
          availability="I'm flexible with communication methods - choose what works best for you!"
          preferredMethods={['email', 'form', 'calendar', 'chat']}
        />
      </section>

      {/* Example 5: Limited Availability */}
      <section className="space-y-4">
        <h2 className="text-2xl font-heading uppercase tracking-wider">
          5. Limited Availability
        </h2>
        <p className="text-manga-gray-600">
          Message indicating limited availability with scheduling preference.
        </p>
        <ContactIntro 
          availability="Currently booked until March 2024, but accepting project inquiries for Q2!"
          preferredMethods={['calendar', 'email']}
        />
      </section>

      {/* Example 6: Urgent Response */}
      <section className="space-y-4">
        <h2 className="text-2xl font-heading uppercase tracking-wider">
          6. Quick Response Emphasis
        </h2>
        <p className="text-manga-gray-600">
          Emphasizing quick response time.
        </p>
        <ContactIntro 
          availability="Available immediately for urgent projects! I typically respond within 24 hours."
          preferredMethods={['chat', 'email', 'form']}
        />
      </section>

      {/* Example 7: Freelance Focus */}
      <section className="space-y-4">
        <h2 className="text-2xl font-heading uppercase tracking-wider">
          7. Freelance Focus
        </h2>
        <p className="text-manga-gray-600">
          Targeting freelance and contract work.
        </p>
        <ContactIntro 
          availability="Open for freelance projects, consulting, and short-term contracts!"
          preferredMethods={['form', 'email']}
        />
      </section>

      {/* Example 8: No Preferred Methods */}
      <section className="space-y-4">
        <h2 className="text-2xl font-heading uppercase tracking-wider">
          8. No Preferred Methods Listed
        </h2>
        <p className="text-manga-gray-600">
          Simple availability message without method preferences.
        </p>
        <ContactIntro 
          availability="Feel free to reach out through any channel below!"
          preferredMethods={[]}
        />
      </section>

      {/* Example 9: Collaboration Focus */}
      <section className="space-y-4">
        <h2 className="text-2xl font-heading uppercase tracking-wider">
          9. Collaboration Focus
        </h2>
        <p className="text-manga-gray-600">
          Emphasizing collaboration and partnership opportunities.
        </p>
        <ContactIntro 
          availability="Always excited to collaborate with fellow creators and developers on interesting projects!"
          preferredMethods={['email', 'calendar']}
        />
      </section>

      {/* Example 10: Custom Styling */}
      <section className="space-y-4">
        <h2 className="text-2xl font-heading uppercase tracking-wider">
          10. With Custom Styling
        </h2>
        <p className="text-manga-gray-600">
          Component with additional custom classes applied.
        </p>
        <ContactIntro 
          availability="Let's work together to bring your ideas to life!"
          preferredMethods={['form', 'email']}
          className="shadow-manga-hover"
        />
      </section>
    </div>
  );
}
