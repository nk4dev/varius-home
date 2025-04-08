import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-white/30 dark:bg-zinc-800/30">
        <div className="flex flex-col items-center justify-between p-24">
          <h1 className="text-4xl font-bold">
            Welcome <br />
            to <br />
            <span className="text-blue-500">VARIUS</span>!<br />
          </h1>
        </div>
      </div>
    </main>
  );
}
