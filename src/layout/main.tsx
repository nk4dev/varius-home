import Link from "next/link";
import Head from "next/head";

export default function Layout({ children }: { children: React.ReactNode }) {
    const year = new Date().getFullYear();
    function HeadMeta () {
	    return (
		    <Head>
			<title>VARIUS</title>
		    </Head>
	    )
    }
    return (
        <div>
		<HeadMeta/>
            <header>
                <div className="bg-[#000021] text-white h-45 w-45 fixed flex items-center justify-center">
                    <div className="font-bold text-4xl">
                        VARIUS
                    </div>
                </div>
            </header>
            <main className="bg-[#000021] text-white">
                {children}
            </main>
            <footer className="bg-[#000021] text-shadow-violet-50  h-35 flex flex-col items-center justify-center">
                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>© 2021 VARIUS. All rights reserved.</p>
                </div>
                <div className="flex flex-col m-2">
                    <Link href={"https://nknighta.me"} className="text-sm text-gray-500 dark:text-gray-400 hover:underline ml-2">
                        nknighta.me
                    </Link>
                    
                    <Link href={"/"} className="text-sm text-gray-500 dark:text-gray-400 hover:underline ml-2">
                        varius.technology
                    </Link>
                    
                    <Link href={"https://nknighta.me/g"} className="text-sm text-gray-500 dark:text-gray-400 hover:underline ml-2">
                        Owner GitHub
                    </Link>
                    
                    <Link href={"https://nknighta.me/x"} className="text-sm text-gray-500 dark:text-gray-400 hover:underline ml-2">
                        Owner X (Japanese)
                    </Link>
                </div>
            </footer>
        </div>
    )
}
