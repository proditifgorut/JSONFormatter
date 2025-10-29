import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface JsonNodeProps {
  data: any;
  name: string;
  isRoot?: boolean;
  depth?: number;
}

const JsonNode: React.FC<JsonNodeProps> = ({ data, name, isRoot = false, depth = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(depth < 2);

  const getValueType = (value: any): string => {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';
    return typeof value;
  };

  const getValueColor = (type: string): string => {
    switch (type) {
      case 'string': return 'text-green-400';
      case 'number': return 'text-blue-400';
      case 'boolean': return 'text-yellow-400';
      case 'null': return 'text-gray-400';
      default: return 'text-purple-300';
    }
  };

  const renderValue = (value: any, key: string) => {
    const type = getValueType(value);

    if (type === 'object' || type === 'array') {
      const count = type === 'array' ? value.length : Object.keys(value).length;
      const preview = type === 'array' ? `[${count}]` : `{${count}}`;

      return (
        <div>
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="cursor-pointer hover:bg-slate-800/50 rounded px-2 py-1 inline-flex items-center gap-2 transition-colors"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-purple-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-purple-400" />
            )}
            <span className="text-purple-300 font-semibold">{key}:</span>
            <span className="text-gray-400 text-xs">{preview}</span>
          </div>
          
          {isExpanded && (
            <div className="ml-6 border-l-2 border-purple-500/20 pl-4 mt-1">
              {type === 'array' ? (
                value.map((item: any, index: number) => (
                  <JsonNode
                    key={index}
                    data={item}
                    name={`[${index}]`}
                    depth={depth + 1}
                  />
                ))
              ) : (
                Object.entries(value).map(([k, v]) => (
                  <JsonNode
                    key={k}
                    data={v}
                    name={k}
                    depth={depth + 1}
                  />
                ))
              )}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="px-2 py-1">
        <span className="text-purple-300 font-semibold">{key}:</span>{' '}
        <span className={getValueColor(type)}>
          {type === 'string' ? `"${value}"` : String(value)}
        </span>
      </div>
    );
  };

  if (isRoot) {
    const type = getValueType(data);
    return (
      <div>
        {type === 'array' ? (
          data.map((item: any, index: number) => (
            <JsonNode
              key={index}
              data={item}
              name={`[${index}]`}
              depth={depth}
            />
          ))
        ) : type === 'object' ? (
          Object.entries(data).map(([key, value]) => (
            <JsonNode
              key={key}
              data={value}
              name={key}
              depth={depth}
            />
          ))
        ) : (
          <span className={getValueColor(type)}>
            {type === 'string' ? `"${data}"` : String(data)}
          </span>
        )}
      </div>
    );
  }

  return renderValue(data, name);
};

export default JsonNode;
