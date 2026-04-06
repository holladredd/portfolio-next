import { EffectComposer, Bloom, Vignette, DepthOfField, Noise, ChromaticAberration, Scanline } from "@react-three/postprocessing";
import { useThree } from "@react-three/fiber";
import { Vector2 } from "three";

export default function Effects() {
  const { viewport } = useThree();

  return (
    <EffectComposer disableNormalPass>
      {/* Soft Glow for Quantum Energy */}
      <Bloom 
        intensity={1.2} 
        luminanceThreshold={0.3} 
        luminanceSmoothing={0.9} 
        height={480} 
      />
      
      {/* Atmospheric Texture & Jitter */}
      <Noise opacity={0.08} />
      <Scanline opacity={0.02} density={1.5} />

      {/* Cinematic Blur for Depth */}
      <DepthOfField 
        focusDistance={0} 
        focalLength={0.02} 
        bokehScale={3} 
        height={480} 
      />

      {/* Next-Gen Chromatic Aberration (Edge Split) */}
      <ChromaticAberration
        offset={new Vector2(0.002, 0.002)}
        radialModulation={true}
        modulationOffset={0.5}
      />

      {/* Subtle Frame Focus */}
      <Vignette eskil={false} offset={0.05} darkness={1.2} />
    </EffectComposer>
  );
}
