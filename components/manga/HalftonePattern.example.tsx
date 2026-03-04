import { HalftonePattern } from './HalftonePattern';

/**
 * HalftonePattern Examples
 * 
 * Demonstrates various usage patterns for the HalftonePattern component
 */
export function HalftonePatternExamples() {
  return (
    <div className="space-y-8 p-8">
      <h1 className="text-3xl font-heading uppercase">Halftone Pattern Examples</h1>

      {/* Light Intensity */}
      <div>
        <h2 className="text-xl font-heading mb-4">Light Intensity</h2>
        <div className="relative w-full h-48 bg-manga-white border-manga border-manga-black">
          <HalftonePattern intensity="light" />
          <div className="relative z-10 flex items-center justify-center h-full">
            <p className="text-2xl font-heading">LIGHT HALFTONE</p>
          </div>
        </div>
      </div>

      {/* Medium Intensity */}
      <div>
        <h2 className="text-xl font-heading mb-4">Medium Intensity (Default)</h2>
        <div className="relative w-full h-48 bg-manga-white border-manga border-manga-black">
          <HalftonePattern intensity="medium" />
          <div className="relative z-10 flex items-center justify-center h-full">
            <p className="text-2xl font-heading">MEDIUM HALFTONE</p>
          </div>
        </div>
      </div>

      {/* Heavy Intensity */}
      <div>
        <h2 className="text-xl font-heading mb-4">Heavy Intensity</h2>
        <div className="relative w-full h-48 bg-manga-white border-manga border-manga-black">
          <HalftonePattern intensity="heavy" />
          <div className="relative z-10 flex items-center justify-center h-full">
            <p className="text-2xl font-heading">HEAVY HALFTONE</p>
          </div>
        </div>
      </div>

      {/* Custom Dot Size */}
      <div>
        <h2 className="text-xl font-heading mb-4">Custom Dot Size</h2>
        <div className="relative w-full h-48 bg-manga-white border-manga border-manga-black">
          <HalftonePattern dotSize={3} />
          <div className="relative z-10 flex items-center justify-center h-full">
            <p className="text-2xl font-heading">CUSTOM DOT SIZE</p>
          </div>
        </div>
      </div>

      {/* As Image Overlay */}
      <div>
        <h2 className="text-xl font-heading mb-4">As Image Overlay</h2>
        <div className="relative w-full h-64 bg-manga-gray-200 border-manga border-manga-black overflow-hidden">
          {/* Simulated image background */}
          <div className="absolute inset-0 bg-gradient-to-br from-manga-gray-400 to-manga-gray-600" />
          <HalftonePattern intensity="medium" />
          <div className="relative z-10 flex items-center justify-center h-full">
            <p className="text-3xl font-heading text-manga-white text-outline">
              MANGA EFFECT
            </p>
          </div>
        </div>
      </div>

      {/* Multiple Patterns */}
      <div>
        <h2 className="text-xl font-heading mb-4">Multiple Patterns Side by Side</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="relative h-32 bg-manga-white border-manga border-manga-black">
            <HalftonePattern intensity="light" />
            <div className="relative z-10 flex items-center justify-center h-full">
              <p className="font-heading text-sm">LIGHT</p>
            </div>
          </div>
          <div className="relative h-32 bg-manga-white border-manga border-manga-black">
            <HalftonePattern intensity="medium" />
            <div className="relative z-10 flex items-center justify-center h-full">
              <p className="font-heading text-sm">MEDIUM</p>
            </div>
          </div>
          <div className="relative h-32 bg-manga-white border-manga border-manga-black">
            <HalftonePattern intensity="heavy" />
            <div className="relative z-10 flex items-center justify-center h-full">
              <p className="font-heading text-sm">HEAVY</p>
            </div>
          </div>
        </div>
      </div>

      {/* In Manga Panel */}
      <div>
        <h2 className="text-xl font-heading mb-4">In Manga Panel</h2>
        <div className="relative manga-panel-bordered">
          <HalftonePattern intensity="light" />
          <div className="relative z-10">
            <h3 className="text-2xl font-heading mb-4">CHAPTER 1: THE BEGINNING</h3>
            <p className="text-manga-black leading-relaxed">
              This is an example of halftone pattern used as a subtle background
              effect in a manga panel. The pattern adds texture and authenticity
              to the manga aesthetic without overwhelming the content.
            </p>
          </div>
        </div>
      </div>

      {/* Dramatic Effect */}
      <div>
        <h2 className="text-xl font-heading mb-4">Dramatic Effect</h2>
        <div className="relative w-full h-64 bg-manga-black border-manga border-manga-black overflow-hidden">
          <HalftonePattern intensity="heavy" className="text-manga-white" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4">
            <p className="text-5xl font-heading text-manga-white">
              BOOM!
            </p>
            <p className="text-lg text-manga-white">
              Dramatic manga moment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
