import { useEffect, useState } from 'react';

interface EmotionWheelProps {
  emotions: {
    joy: number;
    anger: number;
    fear: number;
    surprise: number;
    sadness: number;
    love: number;
  };
}

export default function EmotionWheel({ emotions }: EmotionWheelProps) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.5) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const emotionColors = {
    joy: '#fbbf24',
    anger: '#ef4444',
    fear: '#8b5cf6',
    surprise: '#06b6d4',
    sadness: '#3b82f6',
    love: '#ec4899',
  };

  const emotionEmojis = {
    joy: '😄',
    anger: '😤',
    fear: '😨',
    surprise: '😲',
    sadness: '😢',
    love: '❤️',
  };

  // Find dominant emotion
  const dominantEmotion = Object.entries(emotions).reduce((a, b) =>
    a[1] > b[1] ? a : b
  )[0] as keyof typeof emotions;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-72 h-72 mb-8">
        {/* Outer rotating ring */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {Object.entries(emotions).map(([emotion, value], index) => {
            const angle = (index * 60 * Math.PI) / 180;
            const radius = 120;
            const centerX = 144;
            const centerY = 144;
            const x = centerX + radius * Math.cos(angle - Math.PI / 2);
            const y = centerY + radius * Math.sin(angle - Math.PI / 2);

            return (
              <g key={emotion}>
                <circle
                  cx={x}
                  cy={y}
                  r={value / 3 + 10}
                  fill={emotionColors[emotion as keyof typeof emotionColors]}
                  opacity={0.6}
                  className="transition-all duration-1000"
                />
              </g>
            );
          })}
        </svg>

        {/* Center glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center text-5xl shadow-2xl animate-pulse-slow"
            style={{
              background: `radial-gradient(circle, ${
                emotionColors[dominantEmotion]
              }40, ${emotionColors[dominantEmotion]}10)`,
            }}
          >
            {emotionEmojis[dominantEmotion]}
          </div>
        </div>

        {/* Emotion labels */}
        {Object.entries(emotions).map(([emotion, value], index) => {
          const angle = (index * 60 * Math.PI) / 180;
          const radius = 160;
          const centerX = 144;
          const centerY = 144;
          const x = centerX + radius * Math.cos(angle - Math.PI / 2);
          const y = centerY + radius * Math.sin(angle - Math.PI / 2);

          return (
            <div
              key={emotion}
              className="absolute text-center transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}px`, top: `${y}px` }}
            >
              <div className="text-2xl mb-1">
                {emotionEmojis[emotion as keyof typeof emotionEmojis]}
              </div>
              <div className="text-xs font-semibold text-gray-700 capitalize">
                {emotion}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center text-gray-600 italic">
        Dominant emotion: <span className="font-semibold capitalize">{dominantEmotion}</span>
      </p>
    </div>
  );
}
