import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Brain, Database, Network, Cpu, BookOpen, Sparkles, Zap } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { UploadZone } from "@/components/UploadZone";
import { ResultCard } from "@/components/ResultCard";
import { Dashboard, type DocRow } from "@/components/Dashboard";
import { classify, type ClassificationResult } from "@/lib/classifier";
import { extractText } from "@/lib/extract";

const ICONS = [Brain, Cpu, Database, Network, BookOpen];

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [latest, setLatest] = useState<{ result: ClassificationResult; fileName: string } | null>(null);
  const [docs, setDocs] = useState<DocRow[]>([]);

  const loadDocs = async () => {
    const { data, error } = await supabase
      .from("documents")
      .select("id, file_name, file_type, category, confidence, char_count, created_at")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to load documents");
      return;
    }
    setDocs((data ?? []) as DocRow[]);
  };

  useEffect(() => {
    loadDocs();
  }, []);

  const handleFile = async (file: File) => {
    setLoading(true);
    try {
      const text = await extractText(file);
      if (!text.trim()) {
        toast.error("No readable text found in file");
        return;
      }
      const result = classify(text);
      const { error } = await supabase.from("documents").insert({
        file_name: file.name,
        file_type: file.name.toLowerCase().endsWith(".pdf") ? "PDF" : "TXT",
        char_count: text.length,
        text_snippet: text.slice(0, 500),
        category: result.category,
        confidence: result.confidence,
        scores: result.scores,
      });
      if (error) throw error;
      setLatest({ result, fileName: file.name });
      toast.success(`Classified as ${result.category}`, {
        description: `${result.confidence}% confidence`,
      });
      await loadDocs();
    } catch (e: any) {
      toast.error("Processing failed", { description: e.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("documents").delete().eq("id", id);
    if (error) return toast.error("Delete failed");
    toast.success("Document removed");
    setDocs((d) => d.filter((x) => x.id !== id));
  };

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="container mx-auto pt-8 pb-6 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <motion.div
            whileHover={{ rotate: 8, scale: 1.05 }}
            className="relative rounded-xl bg-gradient-hero p-2.5 shadow-glow"
          >
            <Brain className="h-6 w-6 text-primary-foreground" />
            <motion.span
              className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-accent-cyan"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          </motion.div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              NLP · Categorization Engine
            </p>
            <h2 className="font-bold text-lg leading-tight">Smart Categorizer</h2>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden sm:flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-mono"
        >
          <Zap className="h-3.5 w-3.5 text-accent-lime" />
          <span className="text-muted-foreground">Engine</span>
          <span className="text-foreground">v2.0</span>
        </motion.div>
      </header>

      {/* Hero */}
      <section className="container mx-auto py-16 md:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-pulse" />
            Academic Project · AI-Powered Classification
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6">
            Smart Learning <br />
            <span className="text-gradient">Content Categorizer</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            Upload a PDF or text file. We'll extract the text, strip stopwords, score domain
            keywords, and tell you which CS subject it belongs to — instantly.
          </p>
        </motion.div>

        {/* Category chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mt-10"
        >
          {["Machine Learning", "Artificial Intelligence", "DBMS", "Computer Networks", "Operating Systems"].map((c, i) => {
            const Icon = ICONS[i];
            return (
              <div key={c} className="flex items-center gap-2 rounded-full glass px-4 py-2 text-sm">
                <Icon className="h-4 w-4 text-primary" />
                <span>{c}</span>
              </div>
            );
          })}
        </motion.div>
      </section>

      {/* Upload */}
      <section className="container mx-auto pb-12">
        <div className="max-w-3xl mx-auto">
          <UploadZone onFile={handleFile} loading={loading} />
        </div>
      </section>

      {/* Latest result */}
      {latest && (
        <section className="container mx-auto pb-12">
          <div className="max-w-3xl mx-auto">
            <ResultCard result={latest.result} fileName={latest.fileName} />
          </div>
        </section>
      )}

      {/* Dashboard */}
      <section className="container mx-auto pb-24">
        <div className="flex items-end justify-between mb-6 gap-4 flex-wrap">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              History
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">Categorized Documents</h2>
          </div>
          <p className="text-sm text-muted-foreground font-mono">
            {docs.length} {docs.length === 1 ? "file" : "files"} stored
          </p>
        </div>
        <Dashboard docs={docs} onDelete={handleDelete} />
      </section>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground font-mono">
        <span className="inline-flex items-center gap-2">
          <Sparkles className="h-3 w-3 text-primary" />
          Smart Learning Content Categorizer · Academic Project
        </span>
      </footer>
    </main>
  );
};

export default Index;
