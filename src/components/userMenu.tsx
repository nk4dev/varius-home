"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface UserMenuProps {
  className?: string;
}

export function UserMenu({ className = "" }: UserMenuProps) {
  const { user, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <Link href="/login">
        <Button variant="default" size="sm">
          ログイン
        </Button>
      </Link>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        {user?.image ? (
          <Image
            src={user.image}
            alt={user?.name || "User"}
            className="w-8 h-8 rounded-full"
            width={32}
            height={32}
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
            {user?.name?.charAt(0) || "U"}
          </div>
        )}
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {user?.name || "User"}
        </span>
        <svg
          className={`w-4 h-4 text-slate-600 dark:text-slate-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-lg shadow-lg py-2 z-50">
          <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              ログイン中
            </p>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {user?.name}
            </p>
            {user?.email && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {user.email}
              </p>
            )}
            {user?.provider && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Provider: {user.provider}
              </p>
            )}
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
