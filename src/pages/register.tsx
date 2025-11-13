import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 to-slate-800">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="bg-white dark:bg-slate-950 rounded-lg shadow-lg p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Varius Home
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              新規アカウント登録
            </p>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-center">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              このアプリケーションはGitHubアカウントでのみログインできます。
            </p>
            <Link
              href="/login"
              className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              ログインページへ
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
              ログインページからGitHubアカウントでログインしてください。
              <br />
              初回ログイン時に自動的にアカウントが作成されます。
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
