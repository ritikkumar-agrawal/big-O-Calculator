import { GoogleGenerativeAI } from '@google/generative-ai';
import { ERROR_MESSAGES } from '../../utils/errorMessages';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error(ERROR_MESSAGES.ERROR_CODE);
}

export const genAI = new GoogleGenerativeAI(API_KEY);

export const MODEL_CONFIG = {
  name: 'gemini-1.5-flash-8b',
  temperature: 0.7,
  maxOutputTokens: 1024,
};