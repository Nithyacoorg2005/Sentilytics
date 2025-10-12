import { useState } from 'react';
import Hero from './components/Hero';
import Results from './components/Results';
import About from './components/About';
import UseCases from './components/UseCases';
import Footer from './components/Footer';
import HowItWorks from './components/HowItWorks';
import WhySentilytics from './components/WhySentilytics';
import { SentimentResult } from './types';
import { analyzeSentiment } from './utils/sentimentAnalyzer';
import { detectLanguage } from './utils/languageDetector';

function App() {
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('auto');
  const [analysisHistory, setAnalysisHistory] = useState<SentimentResult[]>([]);

  const handleAnalyze = async (text: string, languageCode?: string) => {
    if (!text.trim()) return;

    setIsAnalyzing(true);

    const langCode = languageCode || selectedLanguage;
    const detectedLang = langCode === 'auto' ? detectLanguage(text) : langCode;

    const analysisResult = await analyzeSentiment(text, detectedLang);
    const finalResult: SentimentResult = {
      ...analysisResult,
      detectedLanguage: detectedLang,
    };

    setResult(finalResult);
    setAnalysisHistory(prev => [finalResult, ...prev.slice(0, 9)]);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="relative z-10">
        <Hero
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />
        {result && <Results result={result} history={analysisHistory} />}
        <HowItWorks />
        <WhySentilytics />
        <About />
        <UseCases />
        <Footer />
      </div>
    </div>
  );
}

export default App;
