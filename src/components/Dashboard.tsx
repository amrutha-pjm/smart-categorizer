import { motion, AnimatePresence } from "framer-motion";
import { FileText, Trash2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORY_COLORS, type Category } from "@/lib/classifier";
import { cn } from "@/lib/utils";

export interface DocRow {
  id: string;
  file_name: string;
  file_type: string;
  category: string;
  confidence: number;
  char_count: number;
  created_at: string;
}

export const Dashboard = ({ docs, onDelete }: { docs: DocRow[]; onDelete: (id: string) => void }) => {
  if (!docs.length) {
    return (
      <div className="rounded-3xl glass p-12 text-center text-muted-foreground">
        No documents categorized yet. Upload one above to get started.
      </div>
    );
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence>
        {docs.map((d, i) => (
          <motion.div
            key={d.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: i * 0.04 }}
            className="group relative rounded-2xl glass shadow-soft p-5 hover:shadow-glow transition-shadow overflow-hidden"
          >
            <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r", CATEGORY_COLORS[d.category as Category] ?? "from-muted to-muted")} />
            <div className="flex items-start justify-between gap-2">
              <div className="rounded-xl bg-secondary p-2.5">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onDelete(d.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <p className="font-semibold mt-3 truncate" title={d.file_name}>{d.file_name}</p>
            <p className="text-xs text-muted-foreground font-mono uppercase">{d.file_type} · {d.char_count.toLocaleString()} chars</p>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Category</p>
                <p className="font-semibold text-sm">{d.category}</p>
              </div>
              <div className="text-right">
                <p className="font-mono font-bold text-2xl text-gradient">{Math.round(Number(d.confidence))}%</p>
              </div>
            </div>
            <p className="mt-3 text-[10px] text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" /> {new Date(d.created_at).toLocaleString()}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
