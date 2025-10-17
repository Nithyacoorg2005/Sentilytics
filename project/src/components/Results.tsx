import React from 'react';
import { CheckCircle, XCircle, MinusCircle, BarChart, Percent, Smile, Frown, Meh } from 'lucide-react';

// This interface should match the one in Dashboard.tsx
interface AnalysisResult {
  text: string;
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  confidence: number;
  emotions: { [key: string]: number };
  explanation: string;
  detectedLanguage: string;
}

// --- 1. ROBUST SENTIMENT STYLES (THE FIX) ---
// We've created a complete map for all possible sentiment values.
// We also include a 'default' to prevent crashes if the API sends an unexpected value.
const sentimentStyles = {
  Positive: {
    icon: <Smile className="h-16 w-16 text-green-500" />,
    textColor: 'text-green-600',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-300',
    progressColor: 'bg-green-500',
  },
  Negative: {
    icon: <Frown className="h-16 w-16 text-red-500" />,
    textColor: 'text-red-600',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-300',
    progressColor: 'bg-red-500',
  },
  Neutral: {
    icon: <Meh className="h-16 w-16 text-gray-500" />,
    textColor: 'text-gray-600',
    bgColor: 'bg-gray-100',
    borderColor: 'border-gray-300',
    progressColor: 'bg-gray-500',
  },
  default: { // Fallback to prevent errors
    icon: <Meh className="h-16 w-16 text-gray-500" />,
    textColor: 'text-gray-600',
    bgColor: 'bg-gray-100',
    borderColor: 'border-gray-300',
    progressColor: 'bg-gray-500',
  }
};


const Results = ({ result }: { result: AnalysisResult }) => {
  // Safely get the style object, falling back to 'default' if sentiment is somehow invalid
  const styles = sentimentStyles[result.sentiment] || sentimentStyles.default;

  // Sort emotions by score for display
  const sortedEmotions = Object.entries(result.emotions)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 7); // Show top 7 emotions

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className={`w-full bg-white rounded-2xl shadow-lg border ${styles.borderColor} p-6 transition-all duration-500 ease-in-out transform hover:shadow-2xl`}>
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 border-b pb-4">
          <div className="flex items-center gap-4">
            {styles.icon}
            <div>
              <h2 className={`text-3xl font-bold ${styles.textColor}`}>{result.sentiment}</h2>
              <p className="text-gray-500 text-sm">Analysis complete</p>
            </div>
          </div>
          <div className="text-center md:text-right mt-4 md:mt-0">
              <p className="text-lg font-semibold text-gray-700">Confidence</p>
              <p className={`text-4xl font-bold ${styles.textColor}`}>{result.confidence.toFixed(1)}%</p>
          </div>
        </div>

        {/* Explanation Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Summary</h3>
          <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{result.explanation}</p>
        </div>
        
        {/* Emotion Breakdown Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Emotion Breakdown</h3>
          <div className="space-y-3">
            {sortedEmotions.map(([emotion, score]) => (
              <div key={emotion}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 capitalize">{emotion}</span>
                  <span className="text-sm font-medium text-gray-500">{score.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`${styles.progressColor} h-2.5 rounded-full transition-all duration-500`}
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Results;
