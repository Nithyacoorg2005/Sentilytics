import { SentimentResult } from '../types';
import EmotionWheel from './EmotionWheel';
import EmotionGraph from './EmotionGraph';
import { Download, Share2, Volume2 } from 'lucide-react';
import { getLanguageName, getLanguageFlag } from '../utils/languageDetector';

interface ResultsProps {
  result: SentimentResult;
  history: SentimentResult[];
}

const sentimentConfig = {
  positive: {
    emoji: '😊',
    color: 'from-green-400 to-emerald-500',
    textColor: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-300',
    label: 'Positive',
  },
  neutral: {
    emoji: '😐',
    color: 'from-gray-400 to-slate-500',
    textColor: 'text-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-300',
    label: 'Neutral',
  },
  negative: {
    emoji: '😠',
    color: 'from-red-400 to-rose-500',
    textColor: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-300',
    label: 'Negative',
  },
  sarcastic: {
    emoji: '😏',
    color: 'from-amber-400 to-orange-500',
    textColor: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-300',
    label: 'Sarcastic',
  },
  mixed: {
    emoji: '💫',
    color: 'from-purple-400 to-indigo-500',
    textColor: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-300',
    label: 'Mixed',
  },
};

export default function Results({ result, history }: ResultsProps) {
  const config = sentimentConfig[result.sentiment];

  const handleDownload = () => {
    const data = {
      text: result.text,
      sentiment: result.sentiment,
      confidence: result.confidence,
      emotions: result.emotions,
      explanation: result.explanation,
      detectedLanguage: result.detectedLanguage,
      timestamp: new Date(result.timestamp).toLocaleString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sentilytics-analysis-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const shareText = `Sentiment Analysis Result:\n${config.label} (${result.confidence}% confidence)\n${result.explanation}\n\nAnalyzed with Sentilytics`;

    if (navigator.share) {
      try {
        await navigator.share({ text: shareText });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Result copied to clipboard!');
    }
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        `The sentiment is ${config.label} with ${result.confidence} percent confidence. ${result.explanation}`
      );
      speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in your browser.');
    }
  };

  return (
    <section className="py-20 px-4" id="results">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-white/50 animate-fade-in">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <div className={`text-8xl animate-bounce-slow ${config.textColor}`}>
                {config.emoji}
              </div>
            </div>

            <h2 className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
              {config.label} Sentiment
            </h2>

            {result.detectedLanguage && (
              <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-200">
                <span className="text-2xl">{getLanguageFlag(result.detectedLanguage)}</span>
                <span className="text-sm font-semibold text-blue-700">
                  Detected: {getLanguageName(result.detectedLanguage)}
                </span>
              </div>
            )}

            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${config.color} transition-all duration-1000 ease-out`}
                  style={{ width: `${result.confidence}%` }}
                ></div>
              </div>
              <span className="text-2xl font-semibold text-gray-700">
                {result.confidence}%
              </span>
            </div>

            <p className={`text-lg ${config.textColor} font-medium px-4 py-3 ${config.bgColor} rounded-2xl inline-block border ${config.borderColor} mb-6`}>
              {result.explanation}
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-purple-300 text-purple-700 font-semibold rounded-full hover:bg-purple-50 transition-all duration-300 hover:scale-105 shadow-md"
              >
                <Download className="w-5 h-5" />
                Download
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-pink-300 text-pink-700 font-semibold rounded-full hover:bg-pink-50 transition-all duration-300 hover:scale-105 shadow-md"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
              <button
                onClick={handleSpeak}
                className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-blue-300 text-blue-700 font-semibold rounded-full hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-md"
              >
                <Volume2 className="w-5 h-5" />
                Listen
              </button>
            </div>
          </div>

          {/* Emotion Wheel */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">
              Emotion Intensity
            </h3>
            <EmotionWheel emotions={result.emotions} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {Object.entries(result.emotions).map(([emotion, value]) => (
              <div key={emotion} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-700 capitalize">
                    {emotion}
                  </span>
                  <span className="text-sm font-semibold text-gray-600">
                    {value}%
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000 ease-out"
                    style={{ width: `${value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {history.length > 1 && <EmotionGraph history={history} />}
        </div>
      </div>
    </section>
  );
}
