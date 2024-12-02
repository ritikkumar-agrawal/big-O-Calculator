import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { CodeEditor } from './components/CodeEditor';
import { AnalysisResult } from './components/AnalysisResult';
import { analyzeCode } from './services/gemini';
import { ERROR_MESSAGES } from './utils/errorMessages';
import type { AnalysisResult as AnalysisResultType } from './types';

function App() {
  const [code, setCode] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResultType | null>(null);
  const [error, setError] = useState<string>();

  const handleAnalyze = async () => {
    if (!code.trim()) {
      setError(ERROR_MESSAGES.EMPTY_CODE);
      return;
    }

    setIsAnalyzing(true);
    setError(undefined);

    try {
      const analysis = await analyzeCode(code);
      setResult(analysis);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : ERROR_MESSAGES.ANALYSIS_FAILED;
      setError(errorMessage);
      setResult(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Brain className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-white">Big O Calculator</h1>
        </div>

        <div className="space-y-6">
          {/* <div className="bg-neutral-800 text-white p-4 rounded-md"> */}
            <CodeEditor
              code={code}
              onChange={setCode}
              isLoading={isAnalyzing}
            />
          {/* </div> */}


          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !code.trim()}
            className="w-full py-2 px-4 bg-white text-neutral-900 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Code'}
          </button>

          <AnalysisResult result={result} error={error} />
          <div className="flex flex-col justify-center items-center">
            <h6 className='text-white' >Built 🛠️ by Ritik</h6>
            <a
              href="https://github.com/ritikkumar-agrawal"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 text-center"
            >
              Lets Connect on Github
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;