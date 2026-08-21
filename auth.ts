import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { db } from "@/lib/db";
import { getVipPlan } from "@/lib/vip";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) return null;

        const user = await db.user.findUnique({ where: { email } });
        if (!user) return null;

        // Gate until verified
        if (!user.emailVerified) return null;

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return null;

        return { id: user.id, email: user.email, name: user.name ?? undefined };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.provider === "google" && token.email) {
        try {
          const dbUser = await db.user.upsert({
            where: { email: token.email },
            update: {},
            create: {
              name: user?.name ?? "",
              email: token.email,
              password: "",
              role: "student",
              emailVerified: new Date(),
              subscription: {
                create: { plan: getVipPlan(token.email), status: "active" },
              },
            },
            select: { id: true, role: true },
          });
          token.id = dbUser.id;
          token.role = dbUser.role;
        } catch (err) {
          console.error("Google provisioning error:", err);
        }
      }
      if (!token.id && token.sub) {
        const dbUser = await db.user.findUnique({
          where: { id: token.sub },
        });
        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
        }
      }
      if (token.id && !token.role) {
        const dbUser = await db.user.findUnique({ where: { id: token.id as string } });
        if (dbUser) token.role = dbUser.role;
      }
      return token;
    },
    session({ session, token }) {
      if (token.id) session.user.id = token.id as string;
      if (token.role) (session.user as unknown as Record<string, unknown>).role = token.role;
      return session;
    },
  },
});