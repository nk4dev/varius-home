import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/themeToggle";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [scrollY, setScrollY] = useState(0);
    const [opendialog, setOpenDialog] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const linkList  = [
        { href: "/?i=repos", label: "Repos" },
        { href: "/about", label: "About" },
        { href: "/changelog/vx", label: "Changelog" }
    ];

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open and handle Escape key to close
    useEffect(() => {
        if (mobileOpen) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            const onKey = (e: KeyboardEvent) => {
                if (e.key === 'Escape') setMobileOpen(false);
            };
            document.addEventListener('keydown', onKey);
            return () => {
                document.body.style.overflow = prev;
                document.removeEventListener('keydown', onKey);
            };
        }
    }, [mobileOpen]);
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-transparent fixed top-0 left-0 w-full z-50 backdrop-blur-sm" style={{ boxShadow: scrollY > 0 ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none' }}>
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-center justify-between py-4">
                        <div className="flex items-center gap-3 flex-1">
                            <Link href="/" className="text-theme font-bold text-2xl md:text-3xl">VARIUS</Link>
                        </div>

                        {/* Desktop nav */}
                        <nav className="hidden md:flex items-center space-x-4">
                            {linkList.map(link => (
                                <Link key={link.href} href={link.href} className="text-lg text-theme hover:underline">
                                    {link.label}
                                </Link>
                            ))}
                            <ThemeToggle />
                        </nav>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button onClick={() => setMobileOpen(v => !v)} aria-label="Toggle menu" className="p-2 rounded-md border border-gray-300 text-theme">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {mobileOpen ? (
                                        <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    ) : (
                                        <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu panel */}
                {mobileOpen && (
                    <div
                        className="md:hidden fixed inset-0 z-50 flex items-center justify-center bg-[#000021cc] backdrop-blur-sm"
                        role="dialog"
                        aria-modal="true"
                        onClick={() => setMobileOpen(false)}
                    >
                        <div className="w-full h-full flex flex-col items-center justify-center px-8" onClick={(e) => e.stopPropagation()}>
                                <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="absolute top-6 right-6 p-3 rounded-md text-theme">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>

                            <nav className="space-y-8 text-center">
                                {linkList.map(link => (
                                    <Link key={link.href} href={`${link.href}`} className="block text-3xl font-semibold text-theme hover:underline" onClick={() => setMobileOpen(false)}>
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                )}
            </header>

            <main className="py-20 flex-1 bg-theme text-theme">
                {children}
            </main>

            <footer className="bg-theme text-theme flex flex-col items-center justify-center">
                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>© 2021 VARIUS. All rights reserved.</p>
                </div>
                <div className="flex flex-col m-2">
                    <h2 className="text-lg font-bold mb-2 text-gray-500">Links</h2>

                    <Link href={"https://nknighta.me"} className="text-sm text-gray-500 dark:text-gray-400 hover:underline ml-2">nknighta.me</Link>

                    <Link href={"/"} className="text-sm text-gray-500 dark:text-gray-400 hover:underline ml-2">varius.technology</Link>

                    <Link href={"https://nknighta.me/g"} className="text-sm text-gray-500 dark:text-gray-400 hover:underline ml-2">Owner GitHub</Link>

                    <Link href={"https://nknighta.me/x"} className="text-sm text-gray-500 dark:text-gray-400 hover:underline ml-2">Owner X (Japanese)</Link>

                    <h2 className="text-lg font-bold mb-2 text-gray-500">Legal</h2>
                    <Link href={"/privacy"} className="text-sm text-gray-500 dark:text-gray-400 hover:underline ml-2">Privacy Policy</Link>
                </div>
            </footer>

            {/* Sign-in dialog */}
            {opendialog && (
                <div className="fixed inset-0 bg-[#000021cc] flex items-center justify-center z-50">
                    <div className="bg-theme p-5 rounded shadow-lg w-full max-w-md mx-4 flex flex-col items-center text-theme">
                        <h2 className="text-lg font-bold mb-4">Sign In</h2>
                        <div className="w-full flex flex-col gap-3">
                            <button className="w-full bg-panel text-theme px-4 py-2 rounded-md">Google</button>
                            <button className="w-full bg-panel text-theme px-4 py-2 rounded-md">GitHub</button>
                        </div>
                        <div className="w-full flex justify-end mt-4">
                            <button onClick={() => setOpenDialog(false)} className="px-4 py-2 bg-accent text-theme rounded-md">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
