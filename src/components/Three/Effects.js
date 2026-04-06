import { EffectComposer, Bloom, Vignette, DepthOfField, Noise } from "@react-three/postprocessing";
import { useThree } from "@react-three/fiber";

export default function Effects() {
  const { viewport } = useThree();

  return (
    <EffectComposer disableNormalPass>
      {/* Soft Glow for Quantum Energy */}
      <Bloom 
        intensity={1.0} 
        luminanceThreshold={0.4} 
        luminanceSmoothing={0.9} 
        height={300} 
      />
      
      {/* Atmospheric Texture */}
      <Noise opacity={0.05} />

      {/* Cinematic Blur for Depth */}
      <DepthOfField 
        focusDistance={0} 
        focalLength={0.02} 
        bokehScale={2} 
        height={480} 
      />

      {/* Subtle Frame Focus */}
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  );
}
