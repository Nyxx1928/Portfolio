/**
 * Accent color examples for cyan usage in buttons, text, and backgrounds.
 */
export default function AccentColorsExample() {
  return (
    <div className="space-y-6 p-6 bg-manga-white">
      <div className="flex flex-wrap gap-3">
        <button className="manga-button-primary">Primary Cyan</button>
        <button className="manga-button-light">Light Cyan</button>
        <button className="manga-button-dark">Dark Cyan</button>
        <button className="manga-button-outline-cyan">Outline Cyan</button>
      </div>

      <p className="text-manga-black">
        Normal copy with <span className="text-manga-cyan-dark font-semibold">dark cyan emphasis</span>.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 bg-manga-cyan-primary text-manga-black border border-manga-cyan-dark">Primary Accent Block</div>
        <div className="p-4 bg-manga-cyan-light text-manga-black border border-manga-cyan-dark">Light Accent Block</div>
        <div className="p-4 bg-manga-cyan-dark text-manga-white border border-manga-cyan-dark">Dark Accent Block</div>
      </div>
    </div>
  );
}
