'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/themeToggle";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";

interface HeaderProps {
    linkList?: { href: string; label: string }[];
}

export default function Header({ linkList }: HeaderProps) {
    const [scrollY, setScrollY] = useState(0);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // デフォルトリンク
    const defaultLinks = [
        { href: "/about", label: "About" },
    ];

    const links = linkList || defaultLinks;

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // モバイル判定
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // モバイルメニュー開閉時のbody scroll制御
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

    const shadowStyle = scrollY > 0 ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none';

    return (
        <header 
            className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-sm transition-shadow duration-200"
            style={{ boxShadow: shadowStyle }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* ロゴ */}
                    <Link href="/" className="shrink-0">
                        <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-white bg-clip-text text-transparent">
                            VARIUS | VX
                        </span>
                    </Link>

                    {/* デスクトップナビゲーション */}
                    <nav className="hidden md:flex md:items-center md:flex-1 md:justify-center md:gap-8">
                        <NavigationMenu>
                            <NavigationMenuList className="flex gap-4">
                                {links.map((link) => (
                                    <NavigationMenuItem key={link.href}>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                href={link.href}
                                                className="relative px-3 py-2 text-sm font-medium transition-colors hover:text-primary group"
                                            >
                                                {link.label}
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </nav>

                    {/* 右側：テーマトグル + ユーザーメニュー + モバイルメニューボタン */}
                    <div className="flex items-center gap-4">
                        <ThemeToggle />

                        {/* モバイルメニューボタン */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* モバイルナビゲーション */}
            {mobileOpen && (
                <div className="md:hidden bg-background/95 backdrop-blur-sm border-b border-border">
                    <div className="px-4 py-4 space-y-2">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent transition-colors"
                                onClick={() => setMobileOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
