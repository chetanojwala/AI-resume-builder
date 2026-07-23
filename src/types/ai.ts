export interface ATSAnalysisResult {
  score: number; // 0 to 100
  rating: 'Needs Work' | 'Fair' | 'Good' | 'Strong' | 'Excellent';
  summaryFeedback: string;
  matchedKeywords: string[];
  missingKeywords: string[];
  categoryScores: {
    completeness: number;
    quantifiableMetrics: number;
    actionVerbs: number;
    formattingDensity: number;
    skillRelevance: number;
  };
  suggestions: {
    type: 'critical' | 'improvement' | 'positive';
    section: string;
    message: string;
    actionLabel?: string;
  }[];
}

export interface AISettings {
  provider: 'built-in' | 'openai' | 'gemini';
  apiKey?: string;
  model?: string;
}
