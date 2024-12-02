import React from 'react';
import { Clock, Box, Info } from 'lucide-react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import type { AnalysisResult } from '../types';

interface AnalysisResultProps {
  result: AnalysisResult | null;
  error?: string;
}

export function AnalysisResult({ result, error }: AnalysisResultProps) {
  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Time Complexity</h3>
          </div>
          <p className="text-lg font-mono">{result.timeComplexity}</p>
        </div>
        
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Box className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-900">Space Complexity</h3>
          </div>
          <p className="text-lg font-mono">{result.spaceComplexity}</p>
        </div>
      </div>

      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold">Explanation</h3>
        </div>
        <SyntaxHighlighter
          language="plaintext"
          style={github}
          className="rounded-md"
        >
          {result.explanation}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}