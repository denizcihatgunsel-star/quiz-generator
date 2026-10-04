/**
 * Seasonal theme toggle
 * 
 * Halloween is active when:
 * 1. NEXT_PUBLIC_SEASONAL_THEME === 'halloween' (no default fallback to ON)
 * 2. AND current date is before 2026-11-01 00:00 Europe/Istanbul
 * 3. OR ?halloween=1 query param is present (preview override)
 */

export function isHalloweenActive(searchParams?: URLSearchParams | null): boolean {
  // Query param override for preview
  if (searchParams && searchParams.get('halloween') === '1') {
    return true;
  }

  // Check env var (must be explicitly set)
  const themeEnv = process.env.NEXT_PUBLIC_SEASONAL_THEME;
  if (themeEnv !== 'halloween') {
    return false;
  }

  // Check date cutoff
  try {
    const now = new Date();
    const cutoff = new Date('2026-11-01T00:00:00+03:00'); // Istanbul timezone
    return now < cutoff;
  } catch {
    return false;
  }
}
