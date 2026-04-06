class VoiceSystem {
  constructor() {
    this.synth = typeof window !== "undefined" ? window.speechSynthesis : null;
    this.voice = null;
    this.isReady = false;
    if (this.synth) {
      this.initVoices();
      this.synth.onvoiceschanged = () => this.initVoices();
    }
  }
  initVoices() {
    const voices = this.synth.getVoices();
    this.voice = voices.find(v => v.name.includes("Google UK English Male")) || 
                 voices.find(v => v.lang === "en-GB") || 
                 voices[0];
    this.isReady = true;
  }
  speak(text, onEnd) {
    if (!this.synth || !this.isReady) return;
    this.synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (this.voice) utterance.voice = this.voice;
    utterance.pitch = 0.8;
    utterance.rate = 1.0;
    utterance.volume = 1.0;
    
    if (onEnd) {
      utterance.onend = () => onEnd();
    }
    
    this.synth.speak(utterance);
  }
}
const instance = new VoiceSystem();
export default instance;
