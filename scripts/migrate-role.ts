import { createClient } from "@libsql/client";
import "dotenv/config";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

async function main() {
  console.log("Adding role column to User table...");
  try {
    await client.execute(`ALTER TABLE "User" ADD COLUMN "role" TEXT NOT NULL DEFAULT 'student'`);
    console.log("OK: Added role column");
  } catch (err) {
    const msg = String(err);
    if (msg.includes("duplicate column")) {
      console.log("Column already exists, skipping");
    } else {
      console.error("Error:", err);
    }
  }
  console.log("Done!");
}

main();
