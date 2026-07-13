import { createClient } from "@libsql/client";
import "dotenv/config";

const ADMIN_EMAIL = "denizcihatgunsel@gmail.com";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!.replace(/\s/g, ""),
});

async function main() {
  console.log(`Promoting ${ADMIN_EMAIL} to admin...`);
  const res = await client.execute({
    sql: `UPDATE "User" SET role = 'admin' WHERE email = ?`,
    args: [ADMIN_EMAIL],
  });
  console.log("Rows affected:", res.rowsAffected);
  const check = await client.execute({
    sql: `SELECT email, role FROM "User" WHERE email = ?`,
    args: [ADMIN_EMAIL],
  });
  if (check.rows.length === 0) {
    console.log("WARNING: no user found with that email. Sign in once first, then re-run.");
  } else {
    console.log("Result:", check.rows[0]);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
