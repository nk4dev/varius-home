import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";

// 保護されたページのリスト
const protectedRoutes = ["/dashboard"];

export default withAuth(
  function middleware(req: NextRequest) {
    // カスタムロジックが必要な場合はここに記述
    return;
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // トークンがある場合は認証済み
        if (token) return true;

        // 保護されたページへのアクセスはログインが必須
        return !protectedRoutes.some((route) =>
          req.nextUrl.pathname.startsWith(route)
        );
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    /*
     * 除外パターン:
     * - api/auth/* (NextAuth.js routes)
     * - _next/static/* (_next/static files)
     * - _next/image/* (_next/image files)
     * - favicon.ico (favicon file)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
