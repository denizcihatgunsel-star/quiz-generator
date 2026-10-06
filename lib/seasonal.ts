/**
 * Seasonal theme toggle
 * 
 * Halloween is active when:
 * 1. NEXT_PUBLIC_SEASONAL_THEME === 'halloween' (no default fallback to ON)
 * 2. AND current date is before 2026-11-01 00:00 Europe/Istanbul
 * 3. OR ?halloween=1 query param is present (preview override)
 * 4. OR cookie 'seasonal' === 'halloween' (persisted from ?halloween=1)
 * 
 * ?halloween=0 clears the cookie
 */

const STORAGE_KEY = 'seasonal';

export function isHalloweenActive(searchParams?: URLSearchParams | null): boolean {
  // Check for explicit disable
  if (searchParams && searchParams.get('halloween') === '0') {
    if (typeof window !== 'undefined') {
      document.cookie = `${STORAGE_KEY}=; path=/; max-age=0`;
    }
    return false;
  }
  
  // Query param override for preview
  if (searchParams && searchParams.get('halloween') === '1') {
    if (typeof window !== 'undefined') {
      // Set cookie for 30 days
      document.cookie = `${STORAGE_KEY}=halloween; path=/; max-age=${60 * 60 * 24 * 30}`;
    }
    return true;
  }
  
  // Check cookie persistence
  if (typeof window !== 'undefined') {
    const cookies = document.cookie.split(';');
    const seasonalCookie = cookies.find(c => c.trim().startsWith(`${STORAGE_KEY}=`));
    if (seasonalCookie?.includes('halloween')) {
      return true;
    }
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

// Server-side helper to check cookie from headers
export function isHalloweenActiveFromCookie(cookieHeader?: string | null): boolean {
  if (!cookieHeader) return false;
  const cookies = cookieHeader.split(';');
  const seasonalCookie = cookies.find(c => c.trim().startsWith(`${STORAGE_KEY}=`));
  return seasonalCookie?.includes('halloween') ?? false;
}
