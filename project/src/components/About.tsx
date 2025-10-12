import { Brain, Zap, Shield } from 'lucide-react';

export default function About() {
  return (
    <section className="py-20 px-4 bg-white/40 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          How Sentilytics Understands Human Feelings
        </h2>

        <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
          Powered by advanced AI and Natural Language Processing, trained on real-world emotions and expressions
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* AI Processing */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-purple-100">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              AI-Powered Analysis
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our neural networks analyze linguistic patterns, context, and semantic meaning to decode the emotional undertones in any text.
            </p>
          </div>

          {/* Real-Time */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-blue-100">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Instant Results
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Get comprehensive sentiment insights in seconds. Real-time processing means you never have to wait for understanding.
            </p>
          </div>

          {/* Accuracy */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-pink-100">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Context-Aware
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Beyond simple keyword matching, we understand context, sarcasm, and nuanced expressions that humans actually use.
            </p>
          </div>
        </div>

        {/* Tech Stack Badge */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-8 py-4 border-2 border-purple-200">
            <p className="text-lg font-semibold text-gray-800">
              🚀 Powered by AI + NLP — trained on real-world emotions and expressions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
