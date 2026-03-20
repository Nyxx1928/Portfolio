import { ChapterHeader } from './ChapterHeader';

/**
 * ChapterHeader Component Examples
 * 
 * This file demonstrates various usage patterns for the ChapterHeader component.
 */

export function ChapterHeaderExamples() {
  return (
    <div className="space-y-16 p-8 bg-manga-white">
      {/* Basic usage - title only */}
      <section>
        <h3 className="text-lg font-bold mb-4 text-manga-gray-800">
          Basic Usage - Title Only
        </h3>
        <ChapterHeader title="Featured Projects" />
      </section>

      {/* With chapter number */}
      <section>
        <h3 className="text-lg font-bold mb-4 text-manga-gray-800">
          With Chapter Number
        </h3>
        <ChapterHeader title="The Beginning" chapterNumber={1} />
      </section>

      {/* With subtitle */}
      <section>
        <h3 className="text-lg font-bold mb-4 text-manga-gray-800">
          With Subtitle
        </h3>
        <ChapterHeader
          title="About Me"
          subtitle="My journey as a developer"
        />
      </section>

      {/* Full example with all props */}
      <section>
        <h3 className="text-lg font-bold mb-4 text-manga-gray-800">
          Full Example - All Props
        </h3>
        <ChapterHeader
          title="Epic Battle"
          subtitle="The final showdown begins"
          chapterNumber={42}
        />
      </section>

      {/* Multiple headers in sequence */}
      <section>
        <h3 className="text-lg font-bold mb-4 text-manga-gray-800">
          Multiple Headers in Sequence
        </h3>
        <div className="space-y-8">
          <ChapterHeader title="Skills" chapterNumber={1} />
          <div className="p-4 bg-manga-gray-50">
            <p className="text-manga-gray-800">Content for Skills section...</p>
          </div>
          
          <ChapterHeader title="Experience" chapterNumber={2} />
          <div className="p-4 bg-manga-gray-50">
            <p className="text-manga-gray-800">Content for Experience section...</p>
          </div>
          
          <ChapterHeader title="Projects" chapterNumber={3} />
          <div className="p-4 bg-manga-gray-50">
            <p className="text-manga-gray-800">Content for Projects section...</p>
          </div>
        </div>
      </section>

      {/* With custom className */}
      <section>
        <h3 className="text-lg font-bold mb-4 text-manga-gray-800">
          With Custom Styling
        </h3>
        <ChapterHeader
          title="Contact"
          subtitle="Let's connect"
          className="bg-manga-gray-50 rounded-lg"
        />
      </section>

      {/* Prologue example (chapter 0) */}
      <section>
        <h3 className="text-lg font-bold mb-4 text-manga-gray-800">
          Prologue Example
        </h3>
        <ChapterHeader
          title="Prologue"
          subtitle="Before the story begins"
          chapterNumber={0}
        />
      </section>

      {/* Section dividers in a page */}
      <section>
        <h3 className="text-lg font-bold mb-4 text-manga-gray-800">
          As Section Dividers
        </h3>
        <div className="space-y-12">
          <div>
            <ChapterHeader title="Introduction" />
            <p className="mt-6 text-manga-gray-800">
              Welcome to my portfolio. This is where I showcase my work and share my journey.
            </p>
          </div>

          <div>
            <ChapterHeader title="Latest Work" />
            <p className="mt-6 text-manga-gray-800">
              Here are some of my recent projects that I&apos;m proud of.
            </p>
          </div>

          <div>
            <ChapterHeader title="Get In Touch" />
            <p className="mt-6 text-manga-gray-800">
              Feel free to reach out if you&apos;d like to collaborate or just chat.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ChapterHeaderExamples;
