import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, Play } from "lucide-react";

export function PhoneScrollSim() {
  return (
    <div className="relative mx-auto" style={{ width: 220 }}>
      <div className="relative aspect-[9/19] rounded-[2rem] bg-black ring-2 ring-white/10 overflow-hidden glow-cyan">
        <div className="absolute inset-x-12 top-1.5 h-4 rounded-b-2xl bg-black z-30"/>
        <div className="absolute inset-0 scanlines opacity-30 z-20 pointer-events-none"/>
        {/* Reel stack */}
        <motion.div
          className="absolute inset-0 flex flex-col"
          animate={{ y: ["0%", "-100%", "-200%", "0%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", times: [0, 0.35, 0.7, 1] }}
        >
          {[
            "from-cyan-400/60 to-violet-500/60",
            "from-fuchsia-500/60 to-rose-500/60",
            "from-emerald-400/60 to-cyan-400/60",
          ].map((g, i) => (
            <div key={i} className={`relative shrink-0 h-full w-full bg-gradient-to-br ${g}`}>
              <div className="absolute inset-0 ring-grid opacity-30"/>
              <Play className="absolute inset-0 m-auto size-10 text-white/70"/>
              <div className="absolute right-2 bottom-12 flex flex-col gap-3 text-white/90">
                <Heart className="size-5"/><MessageCircle className="size-5"/><Share2 className="size-5"/>
              </div>
              <div className="absolute left-2 right-12 bottom-3 text-[10px] text-white/90">
                <div className="font-semibold">@creator{i+1}</div>
                <div className="opacity-80 truncate">Reel #{i+1} · tap to play</div>
              </div>
            </div>
          ))}
        </motion.div>
        {/* Thumb cursor */}
        <motion.div
          className="absolute z-30 size-8 rounded-full bg-white/30 ring-2 ring-cyan-300 backdrop-blur-md"
          animate={{
            top: ["70%", "30%", "70%", "30%"],
            left: ["55%", "55%", "55%", "55%"],
            scale: [1, 0.85, 1, 0.85],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="mt-2 text-center text-[10px] text-muted-foreground">AI scroll simulation</div>
    </div>
  );
}
