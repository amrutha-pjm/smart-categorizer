// Hybrid keyword + weighted NLP classifier for learning content
export const CATEGORIES = [
  "Machine Learning",
  "Artificial Intelligence",
  "DBMS",
  "Computer Networks",
  "Operating Systems",
] as const;

export type Category = (typeof CATEGORIES)[number];

// Each keyword has a weight reflecting how strongly it indicates the category.
// Multi-word phrases get extra weight because they're less ambiguous.
type WeightedKeyword = [string, number];

const KEYWORDS: Record<Category, WeightedKeyword[]> = {
  "Machine Learning": [
    ["machine learning", 5], ["deep learning", 5], ["neural network", 4], ["neural networks", 4],
    ["gradient descent", 4], ["backpropagation", 4], ["random forest", 3], ["decision tree", 3],
    ["support vector machine", 4], ["convolutional", 4], ["recurrent", 3], ["lstm", 3], ["gru", 3],
    ["regression", 2], ["classification", 2], ["clustering", 2], ["supervised", 3], ["unsupervised", 3],
    ["reinforcement learning", 5], ["training", 1], ["dataset", 2], ["feature engineering", 3],
    ["feature", 1], ["model", 1], ["loss function", 3], ["cross entropy", 3], ["softmax", 3],
    ["overfitting", 3], ["underfitting", 3], ["regularization", 3], ["dropout", 3], ["batch normalization", 3],
    ["tensorflow", 3], ["pytorch", 3], ["keras", 3], ["scikit", 3], ["sklearn", 3], ["xgboost", 3],
    ["kmeans", 3], ["k-means", 3], ["svm", 2], ["knn", 2], ["naive bayes", 3], ["boosting", 2], ["bagging", 2],
    ["validation", 1], ["accuracy", 1], ["precision", 2], ["recall", 2], ["f1 score", 3],
    ["confusion matrix", 3], ["epoch", 2], ["learning rate", 3], ["hyperparameter", 3], ["embedding", 2],
    ["pca", 2], ["dimensionality reduction", 3], ["autoencoder", 3], ["gan", 2], ["transfer learning", 3],
  ],
  "Artificial Intelligence": [
    ["artificial intelligence", 5], ["intelligent agent", 4], ["expert system", 4], ["knowledge base", 3],
    ["heuristic", 3], ["a* search", 4], ["minimax", 4], ["alpha beta", 4], ["alpha-beta", 4],
    ["inference engine", 4], ["reasoning", 2], ["first order logic", 4], ["propositional logic", 4],
    ["prolog", 3], ["fuzzy logic", 4], ["genetic algorithm", 4], ["evolutionary", 3],
    ["natural language processing", 5], ["nlp", 3], ["computer vision", 4], ["robotics", 3],
    ["turing test", 4], ["perceptron", 3], ["bayesian network", 4], ["markov decision", 4],
    ["ontology", 3], ["semantic web", 4], ["planning", 2], ["chatbot", 3], ["llm", 3],
    ["large language model", 5], ["transformer", 3], ["attention mechanism", 4], ["agent", 1],
    ["search algorithm", 3], ["constraint satisfaction", 4], ["game playing", 3], ["state space", 3],
    ["depth first", 2], ["breadth first", 2], ["uniform cost", 3], ["greedy search", 3],
    ["knowledge representation", 4], ["semantic network", 4], ["frame", 1], ["script", 1],
  ],
  "DBMS": [
    ["database management", 5], ["dbms", 5], ["relational database", 5], ["sql", 3], ["nosql", 4],
    ["query", 2], ["select statement", 3], ["join", 2], ["inner join", 3], ["outer join", 3],
    ["primary key", 4], ["foreign key", 4], ["candidate key", 4], ["super key", 4],
    ["normalization", 4], ["denormalization", 4], ["1nf", 3], ["2nf", 3], ["3nf", 3], ["bcnf", 4],
    ["functional dependency", 4], ["transaction", 3], ["acid", 3], ["isolation level", 4],
    ["indexing", 3], ["b-tree", 3], ["btree", 3], ["hash index", 3], ["clustered index", 4],
    ["trigger", 2], ["view", 1], ["stored procedure", 4], ["entity relationship", 4], ["er diagram", 4],
    ["mongodb", 3], ["postgres", 3], ["postgresql", 3], ["mysql", 3], ["oracle", 2], ["sqlite", 3],
    ["tuple", 2], ["attribute", 1], ["entity", 1], ["schema", 2], ["rdbms", 4],
    ["concurrency control", 4], ["deadlock", 2], ["rollback", 3], ["commit", 2], ["savepoint", 3],
    ["data warehouse", 4], ["olap", 3], ["oltp", 3], ["sharding", 3], ["replication", 2],
  ],
  "Computer Networks": [
    ["computer network", 5], ["computer networks", 5], ["tcp", 3], ["udp", 3], ["tcp/ip", 4],
    ["ip address", 4], ["subnet mask", 4], ["subnetting", 4], ["router", 3], ["switch", 2],
    ["packet switching", 4], ["circuit switching", 4], ["protocol", 1], ["osi model", 5],
    ["osi layer", 4], ["data link layer", 4], ["network layer", 4], ["transport layer", 4],
    ["application layer", 4], ["physical layer", 4], ["ethernet", 3], ["wifi", 2], ["802.11", 3],
    ["lan", 2], ["wan", 2], ["man", 1], ["dns", 3], ["dhcp", 3], ["http", 2], ["https", 2],
    ["ftp", 3], ["smtp", 3], ["pop3", 3], ["imap", 3], ["socket", 2], ["bandwidth", 2],
    ["latency", 2], ["throughput", 2], ["firewall", 3], ["vpn", 3], ["topology", 3],
    ["routing algorithm", 4], ["distance vector", 4], ["link state", 4], ["congestion control", 4],
    ["three way handshake", 4], ["ipv4", 3], ["ipv6", 3], ["mac address", 4], ["gateway", 2],
    ["nat", 3], ["arp", 3], ["icmp", 3], ["bgp", 3], ["ospf", 3],
  ],
  "Operating Systems": [
    ["operating system", 5], ["kernel", 3], ["process scheduling", 5], ["cpu scheduling", 5],
    ["thread", 2], ["multithreading", 3], ["context switch", 4], ["deadlock", 3],
    ["semaphore", 4], ["mutex", 3], ["monitor", 2], ["synchronization", 3], ["critical section", 4],
    ["paging", 4], ["segmentation", 3], ["virtual memory", 5], ["page fault", 4], ["page table", 4],
    ["tlb", 3], ["file system", 4], ["inode", 3], ["interrupt", 3], ["system call", 4], ["syscall", 3],
    ["linux", 2], ["unix", 2], ["windows kernel", 4], ["shell", 1], ["fork", 2], ["exec", 2],
    ["round robin", 4], ["priority scheduling", 4], ["fcfs", 3], ["sjf", 3], ["srtf", 3],
    ["multilevel queue", 4], ["ipc", 3], ["inter process", 4], ["pipe", 2], ["message queue", 3],
    ["buffer", 1], ["spooling", 3], ["thrashing", 4], ["working set", 3], ["lru", 3], ["fifo", 2],
    ["banker's algorithm", 4], ["bankers algorithm", 4], ["mutual exclusion", 4],
    ["producer consumer", 4], ["readers writers", 4], ["dining philosophers", 4],
  ],
};

const STOPWORDS = new Set([
  "a","an","the","is","are","was","were","be","been","being","of","in","on",
  "at","to","for","with","by","and","or","but","if","then","else","this",
  "that","these","those","it","its","as","from","into","than","so","such",
  "can","will","would","should","could","may","might","do","does","did",
  "have","has","had","not","no","yes","i","you","he","she","they","we","us",
  "our","your","their","my","me","him","her","them","also","very","more",
  "most","some","any","all","each","other","there","here","what","which",
  "who","whom","when","where","why","how",
]);

export function preprocess(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w && w.length > 1 && !STOPWORDS.has(w))
    .join(" ");
}

export interface ClassificationResult {
  category: Category;
  confidence: number;
  scores: Record<Category, number>;
  matchedKeywords: Record<Category, string[]>;
}

export function classify(text: string): ClassificationResult {
  const cleaned = " " + preprocess(text) + " ";
  const scores = {} as Record<Category, number>;
  const matchedKeywords = {} as Record<Category, string[]>;
  let total = 0;

  for (const cat of CATEGORIES) {
    let score = 0;
    const matches: string[] = [];
    for (const [kw, weight] of KEYWORDS[cat]) {
      const needle = " " + kw.toLowerCase() + " ";
      let idx = 0;
      let count = 0;
      while ((idx = cleaned.indexOf(needle, idx)) !== -1) {
        count++;
        idx += needle.length;
      }
      if (count > 0) {
        score += count * weight;
        matches.push(kw);
      }
    }
    scores[cat] = score;
    matchedKeywords[cat] = matches.slice(0, 8);
    total += score;
  }

  let best: Category = CATEGORIES[0];
  let bestScore = -1;
  for (const cat of CATEGORIES) {
    if (scores[cat] > bestScore) {
      bestScore = scores[cat];
      best = cat;
    }
  }

  // Confidence boost: dominant category gets bonus, low total gets penalty
  let confidence = 0;
  if (total > 0) {
    const ratio = bestScore / total;
    confidence = Math.min(99, Math.round(ratio * 100 * (1 + Math.min(0.3, total / 200))));
  }
  return { category: best, confidence, scores, matchedKeywords };
}

export const CATEGORY_COLORS: Record<Category, string> = {
  "Machine Learning": "from-fuchsia-500 to-purple-600",
  "Artificial Intelligence": "from-cyan-400 to-blue-600",
  "DBMS": "from-amber-400 to-orange-600",
  "Computer Networks": "from-emerald-400 to-teal-600",
  "Operating Systems": "from-rose-400 to-pink-600",
};
