export interface SentimentResult {
  sentiment: 'positive' | 'neutral' | 'negative' | 'sarcastic' | 'mixed';
  confidence: number;
  emotions: {
    joy: number;
    anger: number;
    fear: number;
    surprise: number;
    sadness: number;
    love: number;
  };
  explanation: string;
  timestamp: number;
  text: string;
  detectedLanguage?: string;
  translatedText?: string;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
}

export const LANGUAGES: Language[] = [
  { code: 'auto', name: 'Auto-Detect', flag: '🌍', nativeName: 'Auto-Detect' },
  { code: 'en', name: 'English', flag: '🇬🇧', nativeName: 'English' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳', nativeName: 'हिन्दी' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹', nativeName: 'Português' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺', nativeName: 'Русский' },
  { code: 'it', name: 'Italian', flag: '🇮🇹', nativeName: 'Italiano' },
];
