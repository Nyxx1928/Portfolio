/**
 * MangaPanel Usage Examples
 * 
 * This file demonstrates various ways to use the MangaPanel component
 */

import { MangaPanel } from './MangaPanel';

export function MangaPanelExamples() {
  return (
    <div className="space-y-8 p-8">
      {/* Example 1: Default variant with reveal animation */}
      <MangaPanel>
        <h2 className="text-2xl font-heading mb-4">Default Panel</h2>
        <p>This is a default manga panel with reveal animation.</p>
      </MangaPanel>

      {/* Example 2: Bordered variant with fade animation */}
      <MangaPanel variant="bordered" animation="fade">
        <h2 className="text-2xl font-heading mb-4">Bordered Panel</h2>
        <p>This panel has a border and shadow with fade animation.</p>
      </MangaPanel>

      {/* Example 3: Shadowed variant with slide animation */}
      <MangaPanel variant="shadowed" animation="slide">
        <h2 className="text-2xl font-heading mb-4">Shadowed Panel</h2>
        <p>This panel has a shadow effect with slide animation.</p>
      </MangaPanel>

      {/* Example 4: Custom styling */}
      <MangaPanel className="bg-manga-gray-50">
        <h2 className="text-2xl font-heading mb-4">Custom Styled Panel</h2>
        <p>This panel has custom background color applied.</p>
      </MangaPanel>

      {/* Example 5: Complex content */}
      <MangaPanel variant="bordered">
        <div className="space-y-4">
          <h2 className="text-3xl font-heading">Project Title</h2>
          <p className="text-manga-gray-600">
            A detailed description of the project goes here. This demonstrates
            how the panel can contain complex nested content.
          </p>
          <div className="flex gap-2">
            <span className="px-3 py-1 border-manga border-manga-black text-sm">
              React
            </span>
            <span className="px-3 py-1 border-manga border-manga-black text-sm">
              TypeScript
            </span>
            <span className="px-3 py-1 border-manga border-manga-black text-sm">
              Next.js
            </span>
          </div>
        </div>
      </MangaPanel>

      {/* Example 6: Grid layout with multiple panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-panel-gap">
        <MangaPanel variant="bordered" animation="fade">
          <h3 className="text-xl font-heading mb-2">Panel 1</h3>
          <p>First panel in a grid layout.</p>
        </MangaPanel>
        <MangaPanel variant="bordered" animation="fade">
          <h3 className="text-xl font-heading mb-2">Panel 2</h3>
          <p>Second panel in a grid layout.</p>
        </MangaPanel>
        <MangaPanel variant="bordered" animation="fade">
          <h3 className="text-xl font-heading mb-2">Panel 3</h3>
          <p>Third panel in a grid layout.</p>
        </MangaPanel>
      </div>
    </div>
  );
}
