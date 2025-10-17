import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import axios from 'axios';

// Import all your page components
// NOTE: Ensure these paths are correct for your project structure
import Hero from '../components/Hero';
import About from '../components/About';
import UseCases from '../components/UseCases';
import Footer from '../components/Footer';
import HowItWorks from '../components/HowItWorks';
import WhySentilytics from '../components/WhySentilytics';
import Results from '../components/Results';

// --- CORRECTED INTERFACE ---
// This now matches the JSON response from your Python API
interface AnalysisResult {
  text: string;
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  confidence: number;
  emotions: { [key: string]: number }; // This represents a dictionary of emotions
  explanation: string;
  detectedLanguage: string;
}

const Dashboard = () => {
    const { token, logout } = useAuth(); 

    // --- State for the Analysis Tool ---
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // --- CORRECTED API CALL ---
    const handleAnalyze = async (textToAnalyze: string) => {
        if (!textToAnalyze.trim()) return;

        setIsLoading(true);
        setError('');
        setResult(null);

        try {
            // Use the full URL of your running Flask server
            const response = await axios.post(
                'http://127.0.0.1:5001/api/analyze/sentiment', 
                { text: textToAnalyze }
            );
            setResult(response.data);
        } catch (err) {
            setError('Failed to connect to the analysis server. Is it running?');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 relative overflow-hidden">
            {/* You can add your animated background orbs here if you have them */}

            <nav className="absolute top-4 right-4 md:top-6 md:right-8 z-20">
                <div className="flex items-center space-x-4">
                    {token ? (
                        <button onClick={logout} className="px-4 py-2 text-sm font-bold text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition-colors">
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white/50 rounded-lg shadow-sm hover:bg-white/80 transition-colors">
                                Sign In
                            </Link>
                            <Link to="/signup" className="px-4 py-2 text-sm font-bold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 transition-colors">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            <div className="relative z-10">
                {/* Pass the state and function down to the Hero component */}
                <Hero 
                  isLoggedIn={!!token} 
                  onAnalyze={handleAnalyze} 
                  isAnalyzing={isLoading}
                  selectedLanguage="auto" 
                  onLanguageChange={() => {}} 
                />

                {/* --- Conditionally Render the Results or Error --- */}
                {error && <div className="max-w-2xl mx-auto p-4 -mt-4 mb-4 text-center text-red-800 bg-red-100 rounded-lg shadow-sm">{error}</div>}
                
                {result && <Results result={result} />}

                {/* Your other landing page sections */}
                <HowItWorks />
                <WhySentilytics />
                <About />
                <UseCases />
                <Footer />
            </div>
        </div>
    );
};

export default Dashboard;

