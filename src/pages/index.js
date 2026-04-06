import Head from "next/head";
import TechLabScene from "@/scene/TechLabScene";
import HUD from "@/components/HUD";

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
