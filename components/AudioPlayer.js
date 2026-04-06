import { useEffect, useRef, useState } from "react";
import { Howl, Howler } from "howler";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
  const [muted, setMuted] = useState(true);
  const [started, setStarted] = useState(false);
  const ambientRef = useRef(null);

  useEffect(() => {
    // Ambient Space Hum (Low Frequency)
    ambientRef.current = new Howl({
      src: ["https://assets.mixkit.co/sfx/preview/mixkit-deep-space-hum-low-frequency-loop-2114.mp3"],
      loop: true,
      volume: 0.3,
      autoplay: false,
    });

    return () => {
      if (ambientRef.current) ambientRef.current.unload();
    };
  }, []);

  const toggleAudio = () => {
    if (!started) {
      ambientRef.current.play();
      setStarted(true);
      setMuted(false);
      Howler.mute(false);
    } else {
      const newMuted = !muted;
      setMuted(newMuted);
      Howler.mute(newMuted);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[60] pointer-events-auto">
      <button
        onClick={toggleAudio}
        className="glass p-4 rounded-2xl flex items-center gap-3 group hover:scale-105 transition-all bg-accent/10"
      >
        <div className="text-accent">
          {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </div>
        {!started && (
          <span className="text-[10px] font-squids uppercase tracking-widest text-accent animate-pulse">
            Initialize Universe Audio
          </span>
        )}
      </button>
    </div>
  );
}
