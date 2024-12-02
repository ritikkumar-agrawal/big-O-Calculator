import React from 'react';
import { Code2 } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  isLoading: boolean;
}

export function CodeEditor({ code, onChange, isLoading }: CodeEditorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-2">
        <Code2 className="w-5 h-5 text-white" />
        <h2 className="text-white font-semibold">Code Input</h2>
      </div>
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        disabled={isLoading}
        className="w-full h-64 p-4 font-mono text-sm bg-gray-800 border text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-70"
        placeholder="Enter your code here..."
      />
    </div>
  );
}