"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
interface UserMenuProps {
  className?: string;
}

export function UserMenu({ className = "" }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <span className="sr-only">Toggle user menu</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-lg shadow-lg py-2 z-50">
          <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              ログイン中
            </p>
          </div>

          <Link href="/dashboard">
            <button className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm text-slate-700 dark:text-slate-300">
              ダッシュボード
            </button>
          </Link>

          <button
            onClick={async () => {
              await signOut({ redirect: true, callbackUrl: "/" });
            }}
            className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm text-red-600 dark:text-red-400 font-medium"
          >
            ログアウト
          </button>
        </div>
      )}
    </div>
  );
}
