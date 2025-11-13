import NextAuth, { type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";

// GitHub OAuth is the only authentication method
const providers = [
  GithubProvider({
    clientId: process.env.GITHUB_ID || "",
    clientSecret: process.env.GITHUB_SECRET || "",
  }),
];

export const authOptions: NextAuthOptions = {
  providers,

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = session.user || {};
      (session.user as any).id = token.id;
      (session.user as any).name = token.name;
      (session.user as any).email = token.email;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/auth/error",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
