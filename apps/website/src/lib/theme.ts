export const THEME_PREFERENCES = ['system', 'light', 'dark'] as const
export type ThemePreference = (typeof THEME_PREFERENCES)[number]
export type ResolvedTheme = Exclude<ThemePreference, 'system'>

/** localStorage key for the preference. Head.astro's inline first-paint script reads the same key. */
export const THEME_STORAGE_KEY = 'theme'

export const DARK_QUERY = '(prefers-color-scheme: dark)'

export function isThemePreference(value: unknown): value is ThemePreference {
  return THEME_PREFERENCES.some((p) => p === value)
}

/** The stored preference, or 'system' when nothing valid is stored or storage is blocked. */
export function readPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    return isThemePreference(stored) ? stored : 'system'
  } catch {
    return 'system'
  }
}

export function storePreference(preference: ThemePreference): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, preference)
  } catch {
    // Blocked storage: the choice lasts for this page only.
  }
}

export function resolveTheme(preference: ThemePreference): ResolvedTheme {
  if (preference !== 'system') return preference
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light'
}

/** Writes the resolved theme and the preference (which drives the toggle's icon) onto <html>. */
export function applyTheme(preference: ThemePreference): void {
  const root = document.documentElement
  root.dataset.theme = resolveTheme(preference)
  root.dataset.themePreference = preference
}

export function nextPreference(preference: ThemePreference): ThemePreference {
  const i = THEME_PREFERENCES.indexOf(preference)
  return THEME_PREFERENCES[(i + 1) % THEME_PREFERENCES.length]
}
