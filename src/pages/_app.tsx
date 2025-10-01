import type { AppProps } from "next/app";
import "./globals.css";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  // Prevent font loading on Cloudflare Workers
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Client-side only code
    }
  }, []);

  return <Component {...pageProps} />
}