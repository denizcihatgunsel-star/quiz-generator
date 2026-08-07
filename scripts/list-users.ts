import { createClient } from "@libsql/client";
import "dotenv/config";

async function main() {
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });

  const result = await client.execute(
    "SELECT email, name, role, CASE WHEN password = '' THEN 'no-password (google)' ELSE 'has-password' END AS pw FROM User ORDER BY createdAt DESC LIMIT 20"
  );

  console.log(`Database: ${process.env.TURSO_DATABASE_URL}`);
  for (const row of result.rows) {
    console.log("-", row.email, "|", row.name, "|", row.role, "|", row.pw);
  }
}

main();
