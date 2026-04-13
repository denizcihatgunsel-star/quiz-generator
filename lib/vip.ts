// Emails that automatically get a pro plan on signup
// Add emails here and they'll get pro instead of free when they register
export const VIP_EMAILS: Record<string, string> = {
  "macidayhan.melekoglu@bogazici.edu.tr": "pro",
  "macidayhan@gmail.com": "pro",
  "sonicihat@gmail.com": "team",
};

export function getVipPlan(email: string): string {
  return VIP_EMAILS[email.toLowerCase()] || "free";
}
