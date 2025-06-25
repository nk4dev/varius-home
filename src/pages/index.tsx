import Layout from "@/layout/main";
import Link from "next/link";
import MotionWrapper from "@/components/animation";

export default function Home() {
  return (
    <Layout>
      <div className="p-2 flex flex-col items-center justify-center h-auto">

        <MotionWrapper s={0.5} style="h-150 w-full flex items-center justify-center">
            <h1 className="text-4xl font-bold">
              Welcome to the VARIUS!
            </h1>
        </MotionWrapper>
        <MotionWrapper s={1} style="flex flex-col bg-[#141066] h-50 w-full lg:w-1/2 md:w-2/3 sm:w-2/3 border-solid border-2 border-[#7856ff] rounded-lg flex items-start justify-center p-2">
          <h1 className="text-4xl font-bold">VX</h1>
          <Link className="text-[#7856ff] px-1 underline underline-offset-4  decoration-[#7856ff]" href="https://vx.varius.technology">
            docs
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7-7-7m7 7H3" /></svg>
          </Link>
          <Link className="text-[#7856ff] px-1 underline underline-offset-4  decoration-[#7856ff]" href="https://github.com/nknighta/vx">
            repository
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7-7-7m7 7H3" /></svg>
          </Link>
        </MotionWrapper>
        <span className="h-10"/>
        <MotionWrapper s={2} style="flex flex-col bg-[#141066] h-50 w-full lg:w-1/2 md:w-2/3 sm:w-2/3 border-solid border-2 border-[#7856ff] rounded-lg flex items-start justify-center p-2">
          <h1 className="text-4xl font-bold">Codash</h1>
          <Link className="text-[#7856ff] px-1 underline underline-offset-4  decoration-[#7856ff]" href="https://github.com/nknighta/codash">
            repository
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7-7-7m7 7H3" /></svg>
          </Link>
        </MotionWrapper>
        <span className="h-10"/>
      </div>
    </Layout >
  );
}
