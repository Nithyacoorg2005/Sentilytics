import Hero from '../components/Hero';

import About from '../components/About';
import UseCases from '../components/UseCases';
import Footer from '../components/Footer';
import HowItWorks from '../components/HowItWorks';
import WhySentilytics from '../components/WhySentilytics';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="relative z-10">
        <Hero onAnalyze={() => {}} isAnalyzing={false} selectedLanguage="auto" onLanguageChange={() => {}} />
     
        <HowItWorks />
        <WhySentilytics />
        <About />
        <UseCases />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;