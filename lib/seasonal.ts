/**
 * Seasonal theme toggle
 *
 * Nothing Halloween shows on or after 2026-11-01 00:00 Europe/Istanbul,
 * whatever the env var, query param or cookie says. Before that, Halloween is active when:
 * 1. ?halloween=1 query param is present (preview override, persisted in a cookie that expires at the cutoff)
 * 2. OR cookie 'seasonal' === 'halloween'
 * 3. OR NEXT_PUBLIC_SEASONAL_THEME === 'halloween'
 *
 * ?halloween=0 clears the cookie
 */

const STORAGE_KEY = 'seasonal';
const CUTOFF = new Date('2026-11-01T00:00:00+03:00'); // Europe/Istanbul

function clearCookie() {
  if (typeof window !== 'undefined') {
    document.cookie = `${STORAGE_KEY}=; path=/; max-age=0`;
  }
}

export function isHalloweenSeason(now: Date = new Date()): boolean {
  return now < CUTOFF;
}

export function isHalloweenActive(searchParams?: URLSearchParams | null): boolean {
  // Hard cutoff wins over everything, and drops any leftover cookie
  if (!isHalloweenSeason()) {
    clearCookie();
    return false;
  }

  // Explicit disable
  if (searchParams && searchParams.get('halloween') === '0') {
    clearCookie();
    return false;
  }

  // Query param override for preview; cookie never outlives the cutoff
  if (searchParams && searchParams.get('halloween') === '1') {
    if (typeof window !== 'undefined') {
      const maxAge = Math.max(0, Math.min(60 * 60 * 24 * 30, Math.floor((CUTOFF.getTime() - Date.now()) / 1000)));
      document.cookie = `${STORAGE_KEY}=halloween; path=/; max-age=${maxAge}; expires=${CUTOFF.toUTCString()}`;
    }
    return true;
  }

  // Cookie persistence
  if (typeof window !== 'undefined') {
    const cookies = document.cookie.split(';');
    const seasonalCookie = cookies.find(c => c.trim().startsWith(`${STORAGE_KEY}=`));
    if (seasonalCookie?.includes('halloween')) {
      return true;
    }
  }

  // Env var (must be explicitly set)
  return process.env.NEXT_PUBLIC_SEASONAL_THEME === 'halloween';
}

// Server-side helper to check cookie from headers
export function isHalloweenActiveFromCookie(cookieHeader?: string | null): boolean {
  if (!isHalloweenSeason()) return false;
  if (!cookieHeader) return false;
  const cookies = cookieHeader.split(';');
  const seasonalCookie = cookies.find(c => c.trim().startsWith(`${STORAGE_KEY}=`));
  return seasonalCookie?.includes('halloween') ?? false;
}
