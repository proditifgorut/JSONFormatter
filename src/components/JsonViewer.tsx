import React, { useState } from 'react';
import { Copy, Download, Check, AlertCircle, Eye } from 'lucide-react';
import JsonNode from './JsonNode';

interface JsonViewerProps {
  data: any;
  error: string;
}

const JsonViewer: React.FC<JsonViewerProps> = ({ data, error }) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'tree' | 'raw'>('tree');

  const handleCopy = () => {
    if (data) {
      navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (data) {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'formatted-response.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const getDataStats = () => {
    if (!data) return null;
    const jsonString = JSON.stringify(data);
    const size = new Blob([jsonString]).size;
    const lines = jsonString.split('\n').length;
    
    return {
      size: size < 1024 ? `${size} bytes` : `${(size / 1024).toFixed(2)} KB`,
      lines
    };
  };

  const stats = getDataStats();

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 shadow-xl overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-purple-500/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-purple-400" />
            Output
          </h2>
          
          {data && (
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('tree')}
                className={`py-1.5 px-3 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'tree'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-700 text-purple-300 hover:bg-slate-600'
                }`}
              >
                Tree
              </button>
              <button
                onClick={() => setViewMode('raw')}
                className={`py-1.5 px-3 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'raw'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-700 text-purple-300 hover:bg-slate-600'
                }`}
              >
                Raw
              </button>
            </div>
          )}
        </div>

        {stats && (
          <div className="flex gap-4 text-sm text-purple-300">
            <span>Size: {stats.size}</span>
            <span>•</span>
            <span>Lines: {stats.lines}</span>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto p-6">
        {error ? (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-red-400 font-semibold mb-1">Error</h3>
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          </div>
        ) : data ? (
          viewMode === 'tree' ? (
            <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <JsonNode data={data} name="root" isRoot={true} />
            </div>
          ) : (
            <pre className="bg-slate-900/50 rounded-lg p-4 font-mono text-sm text-purple-100 overflow-x-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          )
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-purple-400" />
            </div>
            <p className="text-purple-300 text-lg">No data to display</p>
            <p className="text-purple-400 text-sm mt-2">Format some JSON to see the result here</p>
          </div>
        )}
      </div>

      {data && (
        <div className="p-6 bg-slate-900/30 border-t border-purple-500/20 flex gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-purple-300 py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                Copy JSON
              </>
            )}
          </button>
          
          <button
            onClick={handleDownload}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-purple-300 py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download
          </button>
        </div>
      )}
    </div>
  );
};

export default JsonViewer;
