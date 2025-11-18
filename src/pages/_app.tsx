import type { AppProps } from "next/app";
import { TRPCProvider } from "@/utils/trpc-provider";
import "./globals.css";
import { useEffect } from "react";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  // Initialize theme on client: localStorage -> prefers-color-scheme -> default light
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark') {
        document.documentElement.classList.add('dark');
      } else if (stored === 'light') {
        document.documentElement.classList.remove('dark');
      } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      // ignore
    }
  }, []);

  return (
      <TRPCProvider>
        <Component {...pageProps} />
      </TRPCProvider>
  );
}