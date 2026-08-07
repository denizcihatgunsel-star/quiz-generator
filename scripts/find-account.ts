import { createClient } from "@libsql/client";
import "dotenv/config";

async function main() {
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });

  const result = await client.execute(
    "SELECT email, name, role, createdAt, CASE WHEN password = '' THEN 'no-password (google)' ELSE 'has-password (len ' || length(password) || ')' END AS pw FROM User WHERE email LIKE '%deniz%' OR email = 'denizcihatgunsel@gmail.com'"
  );

  for (const row of result.rows) {
    console.log("-", row.email, "|", row.name, "|", row.role, "|", row.createdAt, "|", row.pw);
  }
  if (result.rows.length === 0) {
    console.log("No account found with 'deniz' or denizcihatgunsel@gmail.com");
  }
}

main();
