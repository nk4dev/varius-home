import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { LoginButtons } from "@/components/loginButtons";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  // 既にログイン済みの場合はリダイレクト
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push(router.query.callbackUrl as string || "/");
    }
  }, [isAuthenticated, isLoading, router]);

  const callbackUrl = (router.query.callbackUrl as string) || "/";

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 to-slate-800">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="bg-white dark:bg-slate-950 rounded-lg shadow-lg p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Varius Home
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              ログインして続行
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <LoginButtons
              callbackUrl={callbackUrl}
              className="mt-6"
            />
          )}

          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
              アカウントをお持ちでない場合は、
              <br />
              <Link href="/register" className="text-blue-600 dark:text-blue-400 hover:underline">
                こちらから登録してください
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-slate-300">
          <Link href="/" className="hover:text-white transition-colors">
            ホームページに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
