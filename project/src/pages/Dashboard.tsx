// File: /src/pages/Dashboard.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import axios from 'axios';

// Import all your page components
import Hero from '../components/Hero';
import About from '../components/About';
import UseCases from '../components/UseCases';
import Footer from '../components/Footer';
import HowItWorks from '../components/HowItWorks';
import WhySentilytics from '../components/WhySentilytics';
import Results from '../components/Results'; // Import the Results component

// Define the shape of the result data
interface AnalysisResult {
  score: number;
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  emotion?: string; // Optional emotion
}

const Dashboard = () => {
    const { token, logout } = useAuth(); 

    // --- State for the Analysis Tool ---
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // --- Function to Handle the API Call ---
    const handleAnalyze = async (textToAnalyze: string) => {
        if (!textToAnalyze.trim()) return;

        setIsLoading(true);
        setError('');
        setResult(null);

        try {
            // This is the protected backend endpoint we created
            const response = await axios.post('/api/analyze/sentiment', { text: textToAnalyze });
            setResult(response.data);
        } catch (err) {
            setError('Failed to analyze sentiment. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 relative overflow-hidden">
            {/* ... (your animated background orbs) ... */}

            <nav className="absolute top-4 right-4 md:top-6 md:right-8 z-20">
                <div className="flex items-center space-x-4">
                    {token ? (
                        <button onClick={logout} className="px-4 py-2 text-sm font-bold text-white bg-red-500 rounded-lg">
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white/50 rounded-lg">
                                Sign In
                            </Link>
                            <Link to="/signup" className="px-4 py-2 text-sm font-bold text-white bg-purple-600 rounded-lg">
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
                  // These props are no longer needed here if Hero manages them
                  selectedLanguage="auto" 
                  onLanguageChange={() => {}} 
                />

                {/* --- Conditionally Render the Results --- */}
                {error && <div className="max-w-2xl mx-auto p-3 -mt-4 text-center text-red-700 bg-red-100 rounded-md">{error}</div>}
                
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