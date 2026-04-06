/**
 * Voice System based on Browser SpeechSynthesis API
 */
class VoiceSystem {
  constructor() {
    this.synth = typeof window !== "undefined" ? window.speechSynthesis : null;
    this.voice = null;
    this.isReady = false;
    
    if (this.synth) {
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  initVoices() {
    const voices = this.synth.getVoices();
    // Try to find a "Premium" sounding voice (e.g., Google UK English male/female)
    this.voice = voices.find(v => v.name.includes("Google UK English Male")) || 
                 voices.find(v => v.lang === "en-GB") || 
                 voices[0];
    this.isReady = true;
  }

  speak(text) {
    if (!this.synth || !this.isReady) return;
    
    // Stop previous speaking
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.voice) utterance.voice = this.voice;
    
    utterance.pitch = 0.8; // Lower pitch for "Dredd" feel
    utterance.rate = 1.0;
    utterance.volume = 1.0;

    this.synth.speak(utterance);
  }
}

const instance = new VoiceSystem();
export default instance;
