import { AnalysisResult } from '../types';
import { ERROR_MESSAGES } from '../utils/errorMessages';
import { genAI, MODEL_CONFIG } from './gemini/config';
import { ANALYSIS_PROMPT } from './gemini/prompts';
import { parseAnalysisResponse } from './gemini/responseParser';

export async function analyzeCode(code: string): Promise<AnalysisResult> {
  if (!code.trim()) {
    throw new Error(ERROR_MESSAGES.EMPTY_CODE);
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: MODEL_CONFIG.name,
      generationConfig: {
        temperature: MODEL_CONFIG.temperature,
        maxOutputTokens: MODEL_CONFIG.maxOutputTokens,
      }
    });

    const result = await model.generateContent([
      { text: `${ANALYSIS_PROMPT}\n\n${code}` }
    ]);
    
    const response = await result.response;
    return parseAnalysisResponse(response.text());
  } catch (error) {
    console.error('Gemini API error:', error);
    if (error instanceof Error) {
      throw new Error(`${ERROR_MESSAGES.ANALYSIS_FAILED}: ${error.message}`);
    }
    throw new Error(ERROR_MESSAGES.ANALYSIS_FAILED);
  }
}