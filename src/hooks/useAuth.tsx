import { useSession } from "next-auth/react";

export interface AuthUser {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  provider?: "github" | "credentials" | string;
  address?: string; // Metamask用
}

export interface UseAuthReturn {
  session: any;
  status: "authenticated" | "loading" | "unauthenticated";
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  provider?: string;
}

/**
 * セッション情報と認証状態を取得するカスタムフック
 * @returns {UseAuthReturn} 認証情報と状態
 */
export function useAuth(): UseAuthReturn {
  const { data: session, status } = useSession();

  return {
    session,
    status,
    user: session?.user ? (session.user as AuthUser) : null,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    provider: session?.user?.provider,
  };
}
