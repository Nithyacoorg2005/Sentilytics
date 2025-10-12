import { useState, useRef, useEffect } from 'react';
import { Sparkles, Mic, MicOff } from 'lucide-react';
import { LANGUAGES } from '../types';

interface HeroProps {
  onAnalyze: (text: string, languageCode?: string) => void;
  isAnalyzing: boolean;
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
}

export default function Hero({ onAnalyze, isAnalyzing, selectedLanguage, onLanguageChange }: HeroProps) {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setText(transcript);
        setIsRecording(false);
        onAnalyze(transcript, selectedLanguage);
      };

      recognitionRef.current.onerror = () => {
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, [selectedLanguage, onAnalyze]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(text, selectedLanguage);
  };

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      const langCode = selectedLanguage === 'auto' ? 'en' : selectedLanguage;
      recognitionRef.current.lang = langCode === 'zh' ? 'zh-CN' : langCode === 'hi' ? 'hi-IN' : `${langCode}-${langCode.toUpperCase()}`;
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const selectedLang = LANGUAGES.find(l => l.code === selectedLanguage) || LANGUAGES[0];

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl w-full text-center">
        <div className="flex items-center justify-center mb-6 animate-fade-in">
          <Sparkles className="w-12 h-12 text-purple-500 mr-3" />
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Sentilytics
          </h1>
        </div>

        <p className="text-2xl md:text-3xl text-gray-700 mb-4 font-light animate-fade-in animation-delay-200">
          Understand What Texts Truly Mean 🌍
        </p>

        <p className="text-lg text-gray-600 mb-12 italic animate-fade-in animation-delay-400">
          "Because emotions speak louder than words."
        </p>

        <div className="mb-8 animate-fade-in animation-delay-600">
          <div className="relative inline-block">
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-200 hover:border-purple-400"
            >
              <span className="text-3xl">{selectedLang.flag}</span>
              <span className="font-semibold text-gray-700">{selectedLang.name}</span>
              <svg className={`w-5 h-5 text-gray-600 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isLanguageOpen && (
              <div className="absolute top-full mt-2 w-64 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-purple-200 max-h-96 overflow-y-auto z-50">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setIsLanguageOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-purple-50 transition-colors ${
                      selectedLanguage === lang.code ? 'bg-purple-100' : ''
                    }`}
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <div className="text-left">
                      <div className="font-semibold text-gray-800">{lang.name}</div>
                      <div className="text-sm text-gray-500">{lang.nativeName}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="animate-fade-in animation-delay-800">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/50 hover:shadow-purple-200/50 transition-all duration-300">
            <div className="relative">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste any text here... let's see how it feels 💭"
                className="w-full h-40 px-6 py-4 text-lg rounded-2xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none resize-none transition-all duration-300 bg-white/50"
                disabled={isAnalyzing || isRecording}
              />

              <button
                type="button"
                onClick={toggleRecording}
                className={`absolute bottom-4 right-4 p-4 rounded-full shadow-lg transition-all duration-300 ${
                  isRecording
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse-slow'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-110'
                }`}
                disabled={isAnalyzing}
              >
                {isRecording ? (
                  <MicOff className="w-6 h-6 text-white" />
                ) : (
                  <Mic className="w-6 h-6 text-white" />
                )}
              </button>
            </div>

            {isRecording && (
              <p className="mt-4 text-center text-purple-600 font-semibold animate-pulse">
                🎤 Listening... Speak now
              </p>
            )}

            <button
              type="submit"
              disabled={isAnalyzing || !text.trim() || isRecording}
              className="mt-6 w-full px-12 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
            >
              <span className="relative z-10">
                {isAnalyzing ? 'Analyzing...' : 'Analyze Now'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </form>

        <div className="mt-12 flex justify-center gap-8 text-4xl animate-fade-in animation-delay-1000">
          <span className="animate-float">😊</span>
          <span className="animate-float animation-delay-200">😐</span>
          <span className="animate-float animation-delay-400">😠</span>
          <span className="animate-float animation-delay-600">😏</span>
          <span className="animate-float animation-delay-800">💫</span>
        </div>
      </div>
    </section>
  );
}
