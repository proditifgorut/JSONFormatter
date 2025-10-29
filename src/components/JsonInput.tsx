import React, { useState } from 'react';
import { Send, FileJson, Link2, Trash2, Loader2 } from 'lucide-react';
import axios from 'axios';

interface JsonInputProps {
  onSubmit: (data: any) => void;
  onError: (error: string) => void;
  onClear: () => void;
}

const JsonInput: React.FC<JsonInputProps> = ({ onSubmit, onError, onClear }) => {
  const [input, setInput] = useState('');
  const [inputMode, setInputMode] = useState<'json' | 'url'>('json');
  const [loading, setLoading] = useState(false);

  const exampleJson = {
    user: {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      active: true
    },
    posts: [
      { id: 1, title: 'Hello World', likes: 42 },
      { id: 2, title: 'JSON Formatter', likes: 128 }
    ]
  };

  const handleSubmit = async () => {
    if (!input.trim()) {
      onError('Input tidak boleh kosong');
      return;
    }

    setLoading(true);

    try {
      if (inputMode === 'json') {
        const parsed = JSON.parse(input);
        onSubmit(parsed);
      } else {
        const response = await axios.get(input);
        onSubmit(response.data);
      }
    } catch (err: any) {
      if (inputMode === 'json') {
        onError('Invalid JSON format. Periksa kembali syntax JSON Anda.');
      } else {
        onError(`Error fetching URL: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInput('');
    onClear();
  };

  const loadExample = () => {
    setInput(JSON.stringify(exampleJson, null, 2));
    setInputMode('json');
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 shadow-xl overflow-hidden">
      <div className="p-6 border-b border-purple-500/20">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <FileJson className="w-5 h-5 text-purple-400" />
          Input
        </h2>
        
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setInputMode('json')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              inputMode === 'json'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                : 'bg-slate-700 text-purple-300 hover:bg-slate-600'
            }`}
          >
            <FileJson className="w-4 h-4 inline mr-2" />
            JSON Text
          </button>
          <button
            onClick={() => setInputMode('url')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              inputMode === 'url'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                : 'bg-slate-700 text-purple-300 hover:bg-slate-600'
            }`}
          >
            <Link2 className="w-4 h-4 inline mr-2" />
            API URL
          </button>
        </div>

        {inputMode === 'json' ? (
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste your JSON here... e.g., {"name": "John", "age": 30}'
            className="w-full h-64 bg-slate-900/50 text-purple-100 rounded-lg p-4 font-mono text-sm border border-purple-500/20 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
          />
        ) : (
          <input
            type="url"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="https://api.example.com/data"
            className="w-full bg-slate-900/50 text-purple-100 rounded-lg p-4 font-mono text-sm border border-purple-500/20 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          />
        )}
      </div>

      <div className="p-6 bg-slate-900/30 flex flex-wrap gap-3">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 min-w-[140px] bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-6 rounded-lg font-semibold shadow-lg shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Format JSON
            </>
          )}
        </button>
        
        <button
          onClick={loadExample}
          className="bg-slate-700 hover:bg-slate-600 text-purple-300 py-3 px-6 rounded-lg font-semibold transition-all"
        >
          Load Example
        </button>
        
        <button
          onClick={handleClear}
          className="bg-red-600/20 hover:bg-red-600/30 text-red-400 py-3 px-6 rounded-lg font-semibold transition-all border border-red-500/20"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default JsonInput;
