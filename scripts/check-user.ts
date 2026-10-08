import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

async function main() {
  const user = await db.user.findUnique({ where: { email: "test@local.dev" } });
  console.log("User:", JSON.stringify(user, null, 2));
  
  if (user && user.password) {
    const match = await bcrypt.compare("test1234", user.password);
    console.log("\nPassword test1234 matches:", match);
  }
  
  await db.$disconnect();
}

main();
