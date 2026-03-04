/**
 * FilterTabs Component Examples
 * 
 * This file demonstrates various usage examples of the FilterTabs component.
 */

import { FilterTabs } from './FilterTabs';

export default function FilterTabsExamples() {
  return (
    <div className="space-y-12 p-8 bg-manga-gray-50">
      <section>
        <h2 className="text-2xl font-heading mb-4">Default State (All Projects)</h2>
        <p className="text-manga-gray-600 mb-4">
          FilterTabs with "All Projects" active (default when no category parameter is present)
        </p>
        <div className="bg-manga-white p-6 border-manga border-manga-black">
          <FilterTabs />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-heading mb-4">Manga Chapter Tab Styling</h2>
        <p className="text-manga-gray-600 mb-4">
          The tabs are styled as manga chapter tabs with:
        </p>
        <ul className="list-disc list-inside text-manga-gray-600 mb-4 space-y-1">
          <li>Bold uppercase typography (font-heading)</li>
          <li>Black borders (border-manga)</li>
          <li>Active state: black background with white text</li>
          <li>Inactive state: white background with black text</li>
          <li>Corner decorations on active tab</li>
          <li>Animated active indicator line</li>
        </ul>
        <div className="bg-manga-white p-6 border-manga border-manga-black">
          <FilterTabs />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-heading mb-4">Responsive Behavior</h2>
        <p className="text-manga-gray-600 mb-4">
          On mobile devices (narrow viewports), the tabs become horizontally scrollable.
          Try resizing your browser window to see the effect.
        </p>
        <div className="bg-manga-white p-6 border-manga border-manga-black">
          <div className="max-w-xs mx-auto">
            <FilterTabs />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-heading mb-4">Integration with Projects Page</h2>
        <p className="text-manga-gray-600 mb-4">
          The FilterTabs component is designed to work with URL search parameters.
          When a tab is clicked:
        </p>
        <ul className="list-disc list-inside text-manga-gray-600 mb-4 space-y-1">
          <li>"All Projects" → navigates to /projects</li>
          <li>"Web Apps" → navigates to /projects?category=web</li>
          <li>"Mobile Apps" → navigates to /projects?category=mobile</li>
          <li>"UI/UX" → navigates to /projects?category=uiux</li>
          <li>"Other" → navigates to /projects?category=other</li>
        </ul>
        <div className="bg-manga-white p-6 border-manga border-manga-black">
          <FilterTabs />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-heading mb-4">Accessibility Features</h2>
        <p className="text-manga-gray-600 mb-4">
          The component includes proper ARIA attributes:
        </p>
        <ul className="list-disc list-inside text-manga-gray-600 mb-4 space-y-1">
          <li>role="tablist" on the container</li>
          <li>aria-label="Project category filters" for screen readers</li>
          <li>role="tab" on each button</li>
          <li>aria-selected indicates active tab</li>
          <li>aria-controls links to the projects grid</li>
        </ul>
        <div className="bg-manga-white p-6 border-manga border-manga-black">
          <FilterTabs />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-heading mb-4">Animation Effects</h2>
        <p className="text-manga-gray-600 mb-4">
          The component includes Framer Motion animations:
        </p>
        <ul className="list-disc list-inside text-manga-gray-600 mb-4 space-y-1">
          <li>Hover scale effect on inactive tabs</li>
          <li>Tap scale effect on all tabs</li>
          <li>Corner decorations animate in on active tab</li>
          <li>Active indicator line smoothly transitions between tabs</li>
        </ul>
        <div className="bg-manga-white p-6 border-manga border-manga-black">
          <FilterTabs />
        </div>
      </section>
    </div>
  );
}
