import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  onFile: (file: File) => void;
  loading: boolean;
}

export const UploadZone = ({ onFile, loading }: Props) => {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDrag(false);
      const f = e.dataTransfer.files?.[0];
      if (f) onFile(f);
    },
    [onFile]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={handleDrop}
      onClick={() => !loading && inputRef.current?.click()}
      className={cn(
        "relative cursor-pointer rounded-3xl border-2 border-dashed p-12 text-center transition-all glass overflow-hidden group",
        drag ? "border-primary shadow-glow scale-[1.01]" : "border-border hover:border-primary/60"
      )}
    >
      <div className="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-10 transition-opacity" />
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.txt,text/plain,application/pdf"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
          e.target.value = "";
        }}
      />
      <div className="relative flex flex-col items-center gap-4">
        {loading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              className="rounded-2xl bg-gradient-hero p-5 shadow-glow"
            >
              <Loader2 className="h-10 w-10 text-primary-foreground" />
            </motion.div>
            <div>
              <p className="text-xl font-semibold">Analyzing content…</p>
              <p className="text-sm text-muted-foreground mt-1">
                Extracting text · removing stopwords · scoring keywords
              </p>
            </div>
          </>
        ) : (
          <>
            <motion.div
              whileHover={{ scale: 1.05, rotate: -3 }}
              className="rounded-2xl bg-gradient-hero p-5 shadow-glow"
            >
              <Upload className="h-10 w-10 text-primary-foreground" />
            </motion.div>
            <div>
              <p className="text-xl font-semibold">
                Drop your file here, or <span className="text-gradient">browse</span>
              </p>
              <p className="text-sm text-muted-foreground mt-1 flex items-center justify-center gap-2">
                <FileText className="h-4 w-4" /> PDF or TXT · processed locally in your browser
              </p>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};
