import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string;
      provider?: string;
      address?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    provider?: string;
    address?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    provider?: string;
    address?: string;
  }
}
