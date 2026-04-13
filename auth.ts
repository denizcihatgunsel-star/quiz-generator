import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
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
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        try {
          const existing = await db.user.findUnique({
            where: { email: user.email },
          });

          if (!existing) {
            const newUser = await db.user.create({
              data: {
                name: user.name ?? "",
                email: user.email,
                password: "",
                role: "student", // default, updated via set-role redirect
              },
            });
            await db.subscription.create({
              data: { userId: newUser.id, plan: getVipPlan(user.email), status: "active" },
            });
          }
        } catch (err) {
          console.error("Google signIn callback error:", err);
          // Don't block sign-in — let user in even if DB fails
        }
      }
      return true;
    },
    async jwt({ token, account }) {
      // For Google users, look up the database ID by email
      if (account?.provider === "google" && token.email) {
        const dbUser = await db.user.findUnique({
          where: { email: token.email },
        });
        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
        }
      }
      // For credentials users, id is already set from authorize()
      if (!token.id && token.sub) {
        const dbUser = await db.user.findUnique({
          where: { id: token.sub },
        });
        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
        }
      }
      // Refresh role from DB periodically
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
