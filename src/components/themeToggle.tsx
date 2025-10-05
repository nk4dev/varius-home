import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const v = document.documentElement.classList.contains('dark');
    setIsDark(v);
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains('dark');
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    setIsDark(next);
  }

  return (
    <button onClick={toggle} aria-label="Toggle theme" className="p-2 rounded-md border">
      {isDark ? '🌙' : '☀️'}
    </button>
  );
}
