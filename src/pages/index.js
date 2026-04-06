import useStore from "@/store/useStore";

export default function Home() {
  const { currentRoom } = useStore();

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
      {currentRoom !== "lobby" && (
        <button 
          onClick={() => useStore.getState().setRoom("lobby")}
          className="pointer-events-auto px-6 py-3 bg-black/60 backdrop-blur-sm border border-white/10 text-white/60 hover:text-white text-xs font-anta uppercase tracking-[0.2em] rounded-full transition-all hover:bg-white/5"
        >
          Return to Lobby
        </button>
      )}
    </div>
  );
}
