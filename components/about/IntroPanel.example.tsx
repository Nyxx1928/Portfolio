import { IntroPanel } from './IntroPanel';

/**
 * IntroPanel Component Examples
 * 
 * This file demonstrates various usage examples of the IntroPanel component
 * for the About page introduction section.
 */

export default function IntroPanelExamples() {
  return (
    <div className="space-y-12 p-8 bg-manga-gray-50">
      <h1 className="text-4xl font-heading uppercase">IntroPanel Examples</h1>

      {/* Example 1: Standard Usage */}
      <section>
        <h2 className="text-2xl font-heading uppercase mb-4">Standard Usage</h2>
        <IntroPanel
          name="Alex Chen"
          bio="A full-stack developer and manga enthusiast who combines technical expertise with creative storytelling. Passionate about building immersive web experiences that push the boundaries of design and functionality."
          avatarSrc="/images/avatar-placeholder.jpg"
          inspirations={[
            'One Piece',
            'Berserk',
            'Vagabond',
            'Death Note',
            'Fullmetal Alchemist',
            'Monster',
          ]}
        />
      </section>

      {/* Example 2: Minimal Inspirations */}
      <section>
        <h2 className="text-2xl font-heading uppercase mb-4">Minimal Inspirations</h2>
        <IntroPanel
          name="Jordan Smith"
          bio="Frontend developer specializing in React and Next.js. I love creating pixel-perfect interfaces with smooth animations."
          avatarSrc="/images/avatar-placeholder.jpg"
          inspirations={['Cowboy Bebop', 'Samurai Champloo']}
        />
      </section>

      {/* Example 3: Many Inspirations */}
      <section>
        <h2 className="text-2xl font-heading uppercase mb-4">Many Inspirations</h2>
        <IntroPanel
          name="Taylor Kim"
          bio="UI/UX designer and developer with a deep appreciation for Japanese visual culture. I draw inspiration from manga panel layouts and apply those principles to modern web design."
          avatarSrc="/images/avatar-placeholder.jpg"
          inspirations={[
            'One Piece',
            'Naruto',
            'Bleach',
            'Hunter x Hunter',
            'My Hero Academia',
            'Demon Slayer',
            'Attack on Titan',
            'Jujutsu Kaisen',
            'Chainsaw Man',
            'Spy x Family',
          ]}
        />
      </section>

      {/* Example 4: Short Bio */}
      <section>
        <h2 className="text-2xl font-heading uppercase mb-4">Short Bio</h2>
        <IntroPanel
          name="Sam Lee"
          bio="Developer. Designer. Manga fan."
          avatarSrc="/images/avatar-placeholder.jpg"
          inspirations={['Akira', 'Ghost in the Shell', 'Evangelion']}
        />
      </section>

      {/* Example 5: Long Bio */}
      <section>
        <h2 className="text-2xl font-heading uppercase mb-4">Long Bio</h2>
        <IntroPanel
          name="Morgan Davis"
          bio="I'm a creative technologist with over 10 years of experience building web applications. My journey into development started with a fascination for how manga artists use visual storytelling techniques—the way they guide the reader's eye through panel layouts, create dramatic tension with composition, and convey emotion through minimalist line work. These principles have deeply influenced my approach to UI/UX design. I believe that great web experiences, like great manga, should be intuitive, engaging, and leave a lasting impression. When I'm not coding, you'll find me sketching character designs, studying panel compositions, or adding to my ever-growing manga collection."
          avatarSrc="/images/avatar-placeholder.jpg"
          inspirations={[
            'Vagabond',
            'Vinland Saga',
            'Berserk',
            'Blade of the Immortal',
          ]}
        />
      </section>

      {/* Example 6: Single Inspiration */}
      <section>
        <h2 className="text-2xl font-heading uppercase mb-4">Single Inspiration</h2>
        <IntroPanel
          name="Casey Brown"
          bio="Backend engineer who appreciates clean code and clean art. Inspired by the minimalist storytelling of classic manga."
          avatarSrc="/images/avatar-placeholder.jpg"
          inspirations={['Lone Wolf and Cub']}
        />
      </section>
    </div>
  );
}
