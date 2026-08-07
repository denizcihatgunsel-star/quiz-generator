import { createClient } from "@libsql/client";
import "dotenv/config";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

const result = await client.execute(
  "SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name"
);

async function main() {
  console.log(`Database: ${process.env.TURSO_DATABASE_URL}`);
  console.log("Tables:");
  for (const row of result.rows) {
    console.log("-", row.name);
  }
}

main();

