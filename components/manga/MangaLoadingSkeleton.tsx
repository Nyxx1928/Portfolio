'use client';

import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';

interface MangaLoadingSkeletonProps {
  panels?: 1 | 2 | 3;
  variant?: 'page' | 'card' | 'list';
}

export function MangaLoadingSkeleton({
  panels = 2,
  variant = 'page',
}: MangaLoadingSkeletonProps) {
  const reducedMotion = usePrefersReducedMotion();

  const panelCount = variant === 'page' ? panels : variant === 'card' ? panels : 1;

  if (variant === 'card') {
    return (
      <div className="flex gap-4 w-full" role="status" aria-label="Loading content">
        <div className="flex gap-4 w-full" aria-hidden="true">
          {Array.from({ length: panelCount }).map((_, i) => (
            <svg
              key={i}
              className="flex-1 h-48"
              viewBox="0 0 200 200"
              preserveAspectRatio="none"
            >
              <rect
                x="2"
                y="2"
                width="196"
                height="196"
                rx="4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-manga-gray-200"
                strokeDasharray="800"
                strokeDashoffset={reducedMotion ? '0' : '800'}
                style={
                  reducedMotion
                    ? {}
                    : {
                        animation: `drawBorder 1.2s ease-out ${i * 0.4}s forwards`,
                      }
                }
              />
              <line
                x1="12"
                y1="50"
                x2="188"
                y2="50"
                stroke="currentColor"
                strokeWidth="2"
                className="text-manga-gray-200"
                strokeLinecap="round"
                opacity={reducedMotion ? 0.3 : 0}
                style={
                  reducedMotion
                    ? {}
                    : {
                        animation: `fadeInLines 0.4s ease-out ${i * 0.4 + 0.6}s forwards`,
                      }
                }
              />
              <line
                x1="12"
                y1="70"
                x2="150"
                y2="70"
                stroke="currentColor"
                strokeWidth="2"
                className="text-manga-gray-200"
                strokeLinecap="round"
                opacity={reducedMotion ? 0.3 : 0}
                style={
                  reducedMotion
                    ? {}
                    : {
                        animation: `fadeInLines 0.4s ease-out ${i * 0.4 + 0.8}s forwards`,
                      }
                }
              />
              <line
                x1="12"
                y1="90"
                x2="120"
                y2="90"
                stroke="currentColor"
                strokeWidth="2"
                className="text-manga-gray-200"
                strokeLinecap="round"
                opacity={reducedMotion ? 0.3 : 0}
                style={
                  reducedMotion
                    ? {}
                    : {
                        animation: `fadeInLines 0.4s ease-out ${i * 0.4 + 1.0}s forwards`,
                      }
                }
              />
            </svg>
          ))}
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className="w-full" role="status" aria-label="Loading content">
        <div aria-hidden="true">
          <svg
            className="w-full h-48"
            viewBox="0 0 600 200"
            preserveAspectRatio="none"
          >
            <rect
              x="2"
              y="2"
              width="596"
              height="196"
              rx="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-manga-gray-200"
              strokeDasharray="1600"
              strokeDashoffset={reducedMotion ? '0' : '1600'}
              style={
                reducedMotion
                  ? {}
                  : { animation: 'drawBorder 1.2s ease-out forwards' }
              }
            />
            {Array.from({ length: 6 }).map((_, i) => (
              <line
                key={i}
                x1="12"
                y1={`${30 + i * 28}`}
                x2={i % 2 === 0 ? '500' : '400'}
                y2={`${30 + i * 28}`}
                stroke="currentColor"
                strokeWidth="2"
                className="text-manga-gray-200"
                strokeLinecap="round"
                opacity={reducedMotion ? 0.3 : 0}
                style={
                  reducedMotion
                    ? {}
                    : {
                        animation: `fadeInLines 0.3s ease-out ${1.2 + i * 0.15}s forwards`,
                      }
                }
              />
            ))}
          </svg>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full" role="status" aria-label="Loading content">
      <div aria-hidden="true">
        {Array.from({ length: panelCount }).map((_, i) => (
          <svg
            key={i}
            className="w-full h-64 mb-4"
            viewBox="0 0 800 300"
            preserveAspectRatio="none"
          >
            <rect
              x="2"
              y="2"
              width="796"
              height="296"
              rx="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-manga-gray-200"
              strokeDasharray="2200"
              strokeDashoffset={reducedMotion ? '0' : '2200'}
              style={
                reducedMotion
                  ? {}
                  : {
                      animation: `drawBorder 1.2s ease-out ${i * 0.4}s forwards`,
                    }
              }
            />
            <line
              x1="16"
              y1="60"
              x2="600"
              y2="60"
              stroke="currentColor"
              strokeWidth="2"
              className="text-manga-gray-200"
              strokeLinecap="round"
              opacity={reducedMotion ? 0.3 : 0}
              style={
                reducedMotion
                  ? {}
                  : {
                      animation: `fadeInLines 0.4s ease-out ${i * 0.4 + 0.6}s forwards`,
                    }
              }
            />
            <line
              x1="16"
              y1="90"
              x2="450"
              y2="90"
              stroke="currentColor"
              strokeWidth="2"
              className="text-manga-gray-200"
              strokeLinecap="round"
              opacity={reducedMotion ? 0.3 : 0}
              style={
                reducedMotion
                  ? {}
                  : {
                      animation: `fadeInLines 0.4s ease-out ${i * 0.4 + 0.8}s forwards`,
                    }
              }
            />
            <line
              x1="16"
              y1="120"
              x2="550"
              y2="120"
              stroke="currentColor"
              strokeWidth="2"
              className="text-manga-gray-200"
              strokeLinecap="round"
              opacity={reducedMotion ? 0.3 : 0}
              style={
                reducedMotion
                  ? {}
                  : {
                      animation: `fadeInLines 0.4s ease-out ${i * 0.4 + 1.0}s forwards`,
                    }
              }
            />
          </svg>
        ))}
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
