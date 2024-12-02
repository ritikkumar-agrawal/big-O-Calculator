import { AnalysisResult } from '../../types';
import { ERROR_MESSAGES } from '../../utils/errorMessages';

export function cleanResponseText(text: string): string {
  return text
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .replace(/```/g, '')
    .trim();
}

export function validateAnalysisResult(result: any): result is AnalysisResult {
  return (
    typeof result === 'object' &&
    result !== null &&
    typeof result.timeComplexity === 'string' &&
    typeof result.spaceComplexity === 'string' &&
    typeof result.explanation === 'string' &&
    result.timeComplexity.startsWith('O(') &&
    result.spaceComplexity.startsWith('O(')
  );
}

export function parseAnalysisResponse(text: string): AnalysisResult {
  const cleanText = cleanResponseText(text);
  
  try {
    const parsedResult = JSON.parse(cleanText);
    
    if (!validateAnalysisResult(parsedResult)) {
      throw new Error(ERROR_MESSAGES.ERROR_CODE);
    }
    
    return parsedResult;
  } catch (error) {
    console.error('Response parsing error:', cleanText);
    throw new Error(ERROR_MESSAGES.PARSING_ERROR);
  }
}