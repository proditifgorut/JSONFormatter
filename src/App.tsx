import React, { useState } from 'react';
import JsonInput from './components/JsonInput';
import JsonViewer from './components/JsonViewer';
import Header from './components/Header';
import { Code2, Sparkles } from 'lucide-react';

function App() {
  const [jsonData, setJsonData] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const handleJsonSubmit = (data: any) => {
    setJsonData(data);
    setError('');
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setJsonData(null);
  };

  const handleClear = () => {
    setJsonData(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptLTQgMjBjLTIuMjEgMC00IDEuNzktNCA0czEuNzkgNCA0IDQgNC0xLjc5IDQtNC0xLjc5LTQtNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
      
      <div className="relative z-10">
        <Header />
        
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg shadow-purple-500/50">
              <Code2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 flex items-center justify-center gap-2">
              API Response Formatter
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </h1>
            <p className="text-lg text-purple-200 max-w-2xl mx-auto">
              Format dan tampilkan JSON API dengan cantik dan mudah dibaca. Paste JSON atau masukkan URL API endpoint.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <JsonInput 
              onSubmit={handleJsonSubmit} 
              onError={handleError}
              onClear={handleClear}
            />
            
            <JsonViewer 
              data={jsonData} 
              error={error}
            />
          </div>
        </div>

        <footer className="text-center py-8 text-purple-300 text-sm">
          <p>Built with React + TypeScript + Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
