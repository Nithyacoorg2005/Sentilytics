import { Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-16 px-4 bg-white/40 backdrop-blur-sm border-t border-purple-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-500" />
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Sentilytics
            </h3>
          </div>

          {/* Tagline */}
          <p className="text-gray-600 text-center max-w-2xl italic">
            "Because every word carries a feeling — Sentilytics helps you see it."
          </p>

          {/* Quote */}
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700 mb-2">
              ✨ Emotion Meets Intelligence ✨
            </p>
            <p className="text-gray-500 mb-4">
              Where science meets poetry in understanding human expression
            </p>
            <p className="text-sm text-gray-400">
              Built with NLP, TensorFlow, and Hugging Face
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-gray-600">
            <a href="#" className="hover:text-purple-600 transition-colors duration-300">
              About
            </a>
            <span className="text-gray-300">•</span>
            <a href="#" className="hover:text-purple-600 transition-colors duration-300">
              How It Works
            </a>
            <span className="text-gray-300">•</span>
            <a href="#" className="hover:text-purple-600 transition-colors duration-300">
              Use Cases
            </a>
            <span className="text-gray-300">•</span>
            <a href="#" className="hover:text-purple-600 transition-colors duration-300">
              Contact
            </a>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2 text-gray-500 text-sm pt-8 border-t border-purple-100 w-full justify-center">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
            <span>by Sentilytics</span>
            <span>•</span>
            <span>© 2025 All rights reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
