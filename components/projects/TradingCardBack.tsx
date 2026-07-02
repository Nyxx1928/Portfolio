'use client';

import { Project } from '@/types';

interface TradingCardBackProps {
  project: Project;
}

export function TradingCardBack({ project }: TradingCardBackProps) {
  const summary =
    project.description.length > 120
      ? `${project.description.slice(0, 120)}...`
      : project.description;

  return (
    <div className="absolute inset-0 flex flex-col justify-between p-5 backface-hidden rotateY-180 bg-manga-white border border-manga-black">
      <div className="space-y-4">
        <h3 className="text-lg font-heading uppercase leading-tight">
          {project.title}
        </h3>

        <p className="text-xs text-manga-gray-600 leading-relaxed">
          {summary}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="border border-manga-black px-1.5 py-0.5 text-[10px] font-mono"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-[10px] text-manga-gray-600 font-mono">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      </div>

      <span className="block w-full border border-manga-black bg-manga-black px-3 py-2 text-center text-xs font-heading uppercase tracking-wider text-manga-white transition-colors hover:bg-manga-white hover:text-manga-black">
        View Details →
      </span>
    </div>
  );
}
