import dynamic from "next/dynamic";
import LabHUD from "@/ui/LabHUD";

const TechLabScene = dynamic(() => import("@/scene/TechLabScene"), { ssr: false });

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen text-white bg-black">
      <TechLabScene />
      <LabHUD />
      {children}
    </div>
  );
}
