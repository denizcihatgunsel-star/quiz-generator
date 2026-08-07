import { createClient } from "@libsql/client";
import "dotenv/config";

const EMAILS = [
  "denizcihatgunsem@gmail.com",
  "denizcigunse3l@gmail.com",
  "denizcihadgunsel@gmail.com",
  "niggadeniz@gmail.com",
];

function placeholders(n: number) {
  return new Array(n).fill("?").join(",");
}

async function main() {
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });

  const rows = await client.execute(
    `SELECT id, email FROM User WHERE email IN (${placeholders(EMAILS.length)})`,
    EMAILS
  );
  const ids = rows.rows.map((r) => r.id as string);

  if (ids.length === 0) {
    console.log("No matching accounts found — nothing to delete.");
    return;
  }

  console.log("Deleting accounts:", rows.rows.map((r) => r.email).join(", "));

  const teams = await client.execute(
    `SELECT id FROM Team WHERE ownerId IN (${placeholders(ids.length)})`,
    ids
  );
  const teamIds = teams.rows.map((r) => r.id as string);
  if (teamIds.length > 0) {
    await client.execute(
      `UPDATE User SET teamId = NULL WHERE teamId IN (${placeholders(teamIds.length)})`,
      teamIds
    );
    await client.execute(
      `DELETE FROM ClassroomParticipant WHERE sessionId IN (SELECT id FROM ClassroomSession WHERE hostId IN (${placeholders(ids.length)}))`,
      ids
    );
    await client.execute(
      `DELETE FROM ClassroomSession WHERE hostId IN (${placeholders(ids.length)})`,
      ids
    );
    await client.execute(
      `DELETE FROM Team WHERE ownerId IN (${placeholders(ids.length)})`,
      ids
    );
  }

  for (const table of ["Subscription", "UsageRecord", "SavedQuiz", "FlashcardReview", "UserStreak", "XpEvent", "ApiKey"]) {
    await client.execute(
      `DELETE FROM "${table}" WHERE userId IN (${placeholders(ids.length)})`,
      ids
    );
  }

  await client.execute(
    `DELETE FROM PasswordResetToken WHERE email IN (${placeholders(EMAILS.length)})`,
    EMAILS
  );
  await client.execute(
    `DELETE FROM User WHERE id IN (${placeholders(ids.length)})`,
    ids
  );

  const after = await client.execute(
    `SELECT COUNT(*) AS n FROM User WHERE email IN (${placeholders(EMAILS.length)})`,
    EMAILS
  );
  console.log(`Remaining matching accounts: ${after.rows[0].n}`);
  console.log("Done.");
}

main();
