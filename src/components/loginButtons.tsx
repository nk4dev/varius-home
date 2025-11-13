"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface LoginButtonsProps {
  callbackUrl?: string;
  className?: string;
}

export function LoginButtons({ callbackUrl = "/", className = ""}: LoginButtonsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGitHubLogin = () => {
    setIsLoading(true);
    signIn("github", { callbackUrl });
  };

  return (
    <div className={className}>
      <Button
        type="button"
        onClick={handleGitHubLogin}
        disabled={isLoading}
        className="w-full"
        size="lg"
      >
        {isLoading ? "リダイレクト中..." : "GitHubでログイン"}
      </Button>
    </div>
  );
}
