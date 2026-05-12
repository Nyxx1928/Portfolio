import type { PanelConfig } from "@/components/horizontal-scroll/HorizontalScrollContainer";
import { AboutPanel } from "@/components/horizontal-scroll/panels/AboutPanel";
import { ContactPanel } from "@/components/horizontal-scroll/panels/ContactPanel";
import { HomePanel } from "@/components/horizontal-scroll/panels/HomePanel";
import { ProjectsPanel } from "@/components/horizontal-scroll/panels/ProjectsPanel";

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
