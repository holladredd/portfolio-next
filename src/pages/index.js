import Head from "next/head";
import dynamic from "next/dynamic";
import HUD from "@/components/HUD";

// Strictly client-side instantiation to prevent SSR/Prerendering crashes
const TechLabScene = dynamic(() => import("@/scene/TechLabScene"), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>Dredd | Museum Facility</title>
        <meta name="description" content="Software Architect Museum Portfolio" />
      </Head>
      <main className="relative w-full h-screen overflow-hidden bg-black font-anta">
        <TechLabScene />
        <HUD />
      </main>
    </>
  );
}
