import { EmphasisText } from './EmphasisText';

/**
 * Typography utility examples for emphasis, stroke, shadow, and rotation.
 */
export default function TypographyUtilitiesExample() {
  return (
    <div className="space-y-6 p-6 bg-manga-gray-50">
      <p>
        <EmphasisText size="sm">Small emphasis</EmphasisText>
      </p>
      <p>
        <EmphasisText size="md" color="cyan-dark">
          Medium dark cyan
        </EmphasisText>
      </p>
      <p>
        <EmphasisText size="lg" stroke rotation={8}>
          Stroked + Rotated
        </EmphasisText>
      </p>
      <p>
        <EmphasisText size="xl" color="white" stroke className="bg-manga-black px-2 py-1">
          High Impact
        </EmphasisText>
      </p>
      <div className="text-emphasis text-rotate-neg-6 text-shadow-manga text-manga-cyan-primary">Utility Class Demo</div>
    </div>
  );
}
