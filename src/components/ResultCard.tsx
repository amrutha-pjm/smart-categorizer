import { motion } from "framer-motion";
import { Sparkles, Cpu, Hash } from "lucide-react";
import { CATEGORIES, CATEGORY_COLORS, type ClassificationResult, type Category } from "@/lib/classifier";
import { cn } from "@/lib/utils";

export const ResultCard = ({ result, fileName }: { result: ClassificationResult; fileName: string }) => {
  const max = Math.max(1, ...Object.values(result.scores));
  const topMatches = result.matchedKeywords?.[result.category] ?? [];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative rounded-3xl glass shadow-card p-8 space-y-6 overflow-hidden"
    >
      <motion.div
        className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-hero opacity-20 blur-3xl"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative flex items-start justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 flex items-center gap-2">
            <Cpu className="h-3 w-3 text-accent-cyan" /> AI Classification Result
          </p>
          <h3 className="text-3xl md:text-4xl font-bold text-gradient">{result.category}</h3>
          <p className="text-sm text-muted-foreground mt-1 font-mono truncate max-w-md">{fileName}</p>
        </div>
        <div className="text-right">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-bold font-mono text-gradient"
          >
            {result.confidence}%
          </motion.div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">confidence</p>
        </div>
      </div>

      {topMatches.length > 0 && (
        <div className="relative">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 flex items-center gap-2">
            <Hash className="h-3 w-3" /> Detected signal terms
          </p>
          <div className="flex flex-wrap gap-2">
            {topMatches.map((kw, i) => (
              <motion.span
                key={kw}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.04 }}
                className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-mono text-foreground"
              >
                {kw}
              </motion.span>
            ))}
          </div>
        </div>
      )}

      <div className="relative space-y-3">
        {CATEGORIES.map((cat) => {
          const score = result.scores[cat] ?? 0;
          const pct = (score / max) * 100;
          return (
            <div key={cat}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className={cn("font-medium flex items-center gap-1.5", cat === result.category ? "text-foreground" : "text-muted-foreground")}>
                  {cat === result.category && <Sparkles className="h-3 w-3 text-accent-cyan" />}
                  {cat}
                </span>
                <span className="font-mono text-muted-foreground">{score} pts</span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={cn("h-full rounded-full bg-gradient-to-r", CATEGORY_COLORS[cat as Category])}
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
