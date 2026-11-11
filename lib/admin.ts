// Site owner / administrator emails. These accounts are granted full admin
// access (the admin panel + user management) regardless of their stored `role`.
// Keep this in sync with the dashboard's admin panel gate.
export const ADMIN_EMAILS = new Set<string>([
  "denizcihatgunsel@gmail.com",
]);

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.has(email.trim().toLowerCase());
}
