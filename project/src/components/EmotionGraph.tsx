import { SentimentResult } from '../types';

interface EmotionGraphProps {
  history: SentimentResult[];
}

export default function EmotionGraph({ history }: EmotionGraphProps) {
  if (history.length === 0) return null;

  const sentimentToValue: { [key: string]: number } = {
    positive: 80,
    mixed: 50,
    neutral: 50,
    sarcastic: 30,
    negative: 20,
  };

  const maxDataPoints = 10;
  const displayHistory = history.slice(0, maxDataPoints).reverse();

  const maxValue = 100;
  const height = 200;
  const width = 600;
  const padding = 40;

  const points = displayHistory.map((result, index) => {
    const x = padding + (index * (width - padding * 2)) / Math.max(displayHistory.length - 1, 1);
    const value = sentimentToValue[result.sentiment] || 50;
    const y = height - padding - ((value / maxValue) * (height - padding * 2));
    return { x, y, result };
  });

  const pathD = points.map((point, index) =>
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');

  const getSentimentColor = (sentiment: string) => {
    const colors: { [key: string]: string } = {
      positive: '#10b981',
      neutral: '#6b7280',
      negative: '#ef4444',
      sarcastic: '#f59e0b',
      mixed: '#8b5cf6',
    };
    return colors[sentiment] || '#6b7280';
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-purple-100">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Emotion Timeline</h3>

      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ minWidth: '400px' }}>
          <defs>
            <linearGradient id="graphGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          <line
            x1={padding}
            y1={height - padding}
            x2={width - padding}
            y2={height - padding}
            stroke="#e5e7eb"
            strokeWidth="2"
          />

          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={height - padding}
            stroke="#e5e7eb"
            strokeWidth="2"
          />

          <text x={padding - 30} y={padding} className="text-xs fill-gray-500">100</text>
          <text x={padding - 25} y={height / 2} className="text-xs fill-gray-500">50</text>
          <text x={padding - 20} y={height - padding + 5} className="text-xs fill-gray-500">0</text>

          {points.length > 1 && (
            <>
              <path
                d={`${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`}
                fill="url(#graphGradient)"
              />

              <path
                d={pathD}
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}

          {points.map((point, index) => (
            <g key={index}>
              <circle
                cx={point.x}
                cy={point.y}
                r="6"
                fill={getSentimentColor(point.result.sentiment)}
                className="transition-all duration-300 hover:r-8"
              />
              <circle
                cx={point.x}
                cy={point.y}
                r="10"
                fill={getSentimentColor(point.result.sentiment)}
                opacity="0.2"
                className="animate-pulse-slow"
              />
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-gray-600">Positive</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-500"></div>
          <span className="text-gray-600">Neutral</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-gray-600">Negative</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <span className="text-gray-600">Sarcastic</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          <span className="text-gray-600">Mixed</span>
        </div>
      </div>
    </div>
  );
}
