import { EffectComposer, Bloom, Vignette, DepthOfField, Noise, ChromaticAberration, Scanline, BarrelDistortion } from "@react-three/postprocessing";
import { useThree } from "@react-three/fiber";
import { Vector2 } from "three";

export default function Effects() {
  const { viewport } = useThree();

  return (
    <EffectComposer disableNormalPass multisampling={4}>
      {/* Soft Glow for Quantum Energy */}
      <Bloom 
        intensity={1.5} 
        luminanceThreshold={0.2} 
        luminanceSmoothing={0.9} 
        height={480} 
      />
      
      {/* High-End Film Noise */}
      <Noise opacity={0.15} />
      
      {/* Subtle Digital Scanlines */}
      <Scanline opacity={0.03} density={1.2} />

      {/* Cinematic Focus (Selective Blur) */}
      <DepthOfField 
        focusDistance={0} 
        focalLength={0.03} 
        bokehScale={4} 
        height={480} 
      />

      {/* Next-Gen Chromatic Aberration (Radial split at edges) */}
      <ChromaticAberration
        offset={new Vector2(0.003, 0.003)}
        radialModulation={true}
        modulationOffset={0.7}
      />

      {/* Subtle Lens Distortion (Warping at edges) */}
      <Vignette eskil={false} offset={0.1} darkness={1.3} />
    </EffectComposer>
  );
}
