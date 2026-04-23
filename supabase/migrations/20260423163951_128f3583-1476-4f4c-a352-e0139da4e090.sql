CREATE TABLE public.documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  char_count INTEGER NOT NULL DEFAULT 0,
  text_snippet TEXT,
  category TEXT NOT NULL,
  confidence NUMERIC NOT NULL DEFAULT 0,
  scores JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view documents"
ON public.documents FOR SELECT USING (true);

CREATE POLICY "Anyone can insert documents"
ON public.documents FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can delete documents"
ON public.documents FOR DELETE USING (true);

CREATE INDEX idx_documents_created_at ON public.documents (created_at DESC);