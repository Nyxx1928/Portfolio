import { SocialLinks } from './SocialLinks';

/**
 * Example usage of the SocialLinks component
 */

// Example 1: Full configuration with all props
export function SocialLinksFullExample() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <SocialLinks
        email="contact@example.com"
        links={[
          {
            platform: 'github',
            url: 'https://github.com/username',
            username: 'username',
          },
          {
            platform: 'linkedin',
            url: 'https://linkedin.com/in/username',
            username: 'username',
          },
          {
            platform: 'twitter',
            url: 'https://twitter.com/username',
            username: 'username',
          },
        ]}
        location="Tokyo, Japan"
      />
    </div>
  );
}

// Example 2: Email and social links only (no location)
export function SocialLinksNoLocationExample() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <SocialLinks
        email="hello@portfolio.dev"
        links={[
          {
            platform: 'github',
            url: 'https://github.com/devuser',
            username: 'devuser',
          },
          {
            platform: 'linkedin',
            url: 'https://linkedin.com/in/devuser',
            username: 'devuser',
          },
        ]}
      />
    </div>
  );
}

// Example 3: Minimal - email only
export function SocialLinksEmailOnlyExample() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <SocialLinks email="minimal@example.com" />
    </div>
  );
}

// Example 4: Social links only (no email)
export function SocialLinksSocialOnlyExample() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <SocialLinks
        links={[
          {
            platform: 'github',
            url: 'https://github.com/opensource',
            username: 'opensource',
          },
          {
            platform: 'twitter',
            url: 'https://twitter.com/opensource',
            username: 'opensource',
          },
        ]}
        location="San Francisco, CA"
      />
    </div>
  );
}

// Example 5: All social platforms
export function SocialLinksAllPlatformsExample() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <SocialLinks
        email="allplatforms@example.com"
        links={[
          {
            platform: 'github',
            url: 'https://github.com/fullstack',
            username: 'fullstack',
          },
          {
            platform: 'linkedin',
            url: 'https://linkedin.com/in/fullstack',
            username: 'fullstack',
          },
          {
            platform: 'twitter',
            url: 'https://twitter.com/fullstack',
            username: 'fullstack',
          },
        ]}
        location="Remote"
      />
    </div>
  );
}

// Example 6: Long email address (testing responsive behavior)
export function SocialLinksLongEmailExample() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <SocialLinks
        email="very.long.email.address.for.testing@subdomain.example.com"
        links={[
          {
            platform: 'github',
            url: 'https://github.com/testuser',
            username: 'testuser',
          },
        ]}
      />
    </div>
  );
}
