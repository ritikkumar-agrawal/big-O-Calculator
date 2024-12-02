export interface AnalysisResult {
  timeComplexity: string;
  spaceComplexity: string;
  explanation: string;
}

export interface CodeAnalysisResponse {
  analysis: AnalysisResult;
  error?: string;
}