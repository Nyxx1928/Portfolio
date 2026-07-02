import { useSyncExternalStore } from 'react';

function subscribe(): () => void {
  return () => undefined;
}

function getSnapshot(): boolean {
  return true;
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * Returns `true` only after hydration on the client.
 *
 * This is the `useSyncExternalStore` equivalent of the old "set `mounted` in a
 * `useEffect`" pattern. It is hydration-safe: it returns `false` during SSR and
 * the first render, then `true` afterwards, without calling `setState`
 * synchronously inside an effect.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
