import { Link } from 'react-router-dom'; // <-- 1. Import Link
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

      {/* --- 2. Add the Navigation Section Here --- */}
      <nav className="absolute top-4 right-4 md:top-6 md:right-8 z-20">
        <div className="flex items-center space-x-4">
          <Link 
            to="/login" 
            className="px-4 py-2 text-sm font-semibold text-gray-700 transition-colors duration-200 bg-white/50 rounded-lg backdrop-blur-sm hover:bg-white"
          >
            Sign In
          </Link>
          <Link 
            to="/signup" 
            className="px-4 py-2 text-sm font-bold text-white transition-transform duration-200 transform bg-purple-600 rounded-lg hover:scale-105"
          >
            Sign Up
          </Link>
        </div>
      </nav>

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