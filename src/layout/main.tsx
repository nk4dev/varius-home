import Link from "next/link";
import Header from "@/components/header";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="pt-16 flex-1 bg-theme text-theme">
                {children}
            </main>

            <footer className="bg-theme text-theme flex flex-col items-center justify-center py-12">
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
        </div>
    )
}
