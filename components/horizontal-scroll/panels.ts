import type { PanelConfig } from "@/components/horizontal-scroll/HorizontalScrollContainer";
import dynamic from "next/dynamic";
import { AboutPanel } from "@/components/horizontal-scroll/panels/AboutPanel";
import { ContactPanel } from "@/components/horizontal-scroll/panels/ContactPanel";
import { HomePanel } from "@/components/horizontal-scroll/panels/HomePanel";
import type { ComponentType } from "react";

/**
 * ProjectsPanel is client-only because it uses client-side hooks
 * like `useSearchParams`. Loading it with dynamic import and
 * { ssr: false } prevents server-side rendering errors during
 * the Next.js build/prerender step.
 */
const ProjectsPanel = dynamic(
  () =>
    import("@/components/horizontal-scroll/panels/ProjectsPanel").then(
      (mod) => mod.ProjectsPanel,
    ),
  { ssr: false },
) as unknown as ComponentType;

export const PANELS: PanelConfig[] = [
  { id: "home", label: "Home panel", component: HomePanel, allowInternalScroll: true },
  { id: "about", label: "About panel", component: AboutPanel, allowInternalScroll: true },
  {
    id: "projects",
    label: "Projects panel",
    component: ProjectsPanel,
    allowInternalScroll: true,
  },
  { id: "contact", label: "Contact panel", component: ContactPanel, allowInternalScroll: true },
];
