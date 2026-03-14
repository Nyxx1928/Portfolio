export type ReadingDirection = 'ltr' | 'rtl';

export const READING_DIRECTION_KEY = 'manga-reading-direction';

export function clampPanelIndex(index: number, totalPanels: number): number {
  if (totalPanels <= 0) {
    return 0;
  }

  return Math.min(Math.max(index, 0), totalPanels - 1);
}

export function toggleReadingDirection(direction: ReadingDirection): ReadingDirection {
  return direction === 'ltr' ? 'rtl' : 'ltr';
}

export function computeContainerWidth(viewportWidth: number, panelCount: number): number {
  return viewportWidth * panelCount;
}

export function getNavigatorState(currentIndex: number, totalPanels: number) {
  return {
    label: `Panel ${currentIndex + 1} / ${totalPanels}`,
    prevDisabled: currentIndex <= 0,
    nextDisabled: currentIndex >= totalPanels - 1,
    activeDot: currentIndex,
  };
}

export function readReadingDirection(storage: Pick<Storage, 'getItem'>): ReadingDirection {
  const value = storage.getItem(READING_DIRECTION_KEY);
  return value === 'rtl' ? 'rtl' : 'ltr';
}

export function writeReadingDirection(storage: Pick<Storage, 'setItem'>, direction: ReadingDirection): void {
  storage.setItem(READING_DIRECTION_KEY, direction);
}

export function getOverlayDuration(prefersReducedMotion: boolean): number {
  return prefersReducedMotion ? 0 : 350;
}

export function shouldAdvanceInternalPanel(deltaY: number, atTop: boolean, atBottom: boolean): boolean {
  if (deltaY > 0) {
    return atBottom;
  }

  if (deltaY < 0) {
    return atTop;
  }

  return false;
}

export function getDirectionalDelta(delta: number, direction: ReadingDirection): number {
  return direction === 'ltr' ? delta : -delta;
}

export function getLogicalScrollLeft(
  rawScrollLeft: number,
  maxScrollLeft: number,
  direction: ReadingDirection
): number {
  return direction === 'ltr' ? rawScrollLeft : maxScrollLeft - rawScrollLeft;
}

export function getRawScrollLeftForIndex(
  index: number,
  panelWidth: number,
  maxScrollLeft: number,
  direction: ReadingDirection
): number {
  const logicalLeft = Math.max(0, index) * Math.max(0, panelWidth);
  const clampedLogicalLeft = Math.min(logicalLeft, Math.max(0, maxScrollLeft));
  return direction === 'ltr' ? clampedLogicalLeft : maxScrollLeft - clampedLogicalLeft;
}

export function getClosestPanelIndexFromScroll(
  rawScrollLeft: number,
  panelWidth: number,
  totalPanels: number,
  maxScrollLeft: number,
  direction: ReadingDirection
): number {
  if (panelWidth <= 0 || totalPanels <= 0) {
    return 0;
  }

  const logicalLeft = getLogicalScrollLeft(rawScrollLeft, maxScrollLeft, direction);
  return clampPanelIndex(Math.round(logicalLeft / panelWidth), totalPanels);
}

export function shouldIgnoreArrowNavigation(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  if (target.isContentEditable) {
    return true;
  }

  const interactiveTags = new Set(['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'A']);
  if (interactiveTags.has(target.tagName)) {
    return true;
  }

  const role = target.getAttribute('role');
  const interactiveRoles = new Set(['button', 'textbox', 'listbox', 'combobox', 'menuitem', 'slider', 'spinbutton']);
  return Boolean(role && interactiveRoles.has(role));
}

export function shouldEnableLenis(isHorizontalActive: boolean): boolean {
  return !isHorizontalActive;
}
