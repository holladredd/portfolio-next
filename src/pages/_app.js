import "@/styles/globals.css";
import dynamic from "next/dynamic";
import HUD from "@/components/HUD";

// Persistent Client-side 3D Scene
const TechLabScene = dynamic(() => import("@/scene/TechLabScene"), {
  ssr: false,
});

export default function App({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-black overflow-hidden select-none">
      <TechLabScene />
      <HUD />

      {/* Component serves as the URL anchor and 2D overlay layer */}
      <Component {...pageProps} />
    </div>
  );
}
