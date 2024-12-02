export const ANALYSIS_PROMPT = `You are a code complexity analyzer. Analyze the following code and determine its time and space complexity.
Focus on the worst-case scenario for both time and space complexity.
Provide clear, concise explanations.

Important: Your response must be a valid JSON object with EXACTLY this structure (no markdown, no backticks):
{
  "timeComplexity": "O(...)",
  "spaceComplexity": "O(...)",
  "explanation": "..."
}

Code to analyze:`;