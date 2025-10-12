import { ArrowRight, Database, Cpu, Lightbulb } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: ArrowRight,
      title: 'Input Your Text or Voice',
      description: 'Type, paste, or speak in any language. Our system handles text and voice seamlessly.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Database,
      title: 'AI Processing',
      description: 'Advanced NLP models analyze linguistic patterns, context, and emotional markers across multiple languages.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Cpu,
      title: 'Emotion Detection',
      description: 'Our neural networks identify sentiment, sarcasm, mixed emotions, and intensity levels in real-time.',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: Lightbulb,
      title: 'Get Insights',
      description: 'Receive comprehensive analysis with confidence scores, emotion wheels, and contextual explanations.',
      color: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white/40 to-purple-50/40">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered system transforms your text into emotional insights in four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-purple-100"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {index + 1}
                </div>

                <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {step.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 rounded-3xl p-8 border-2 border-purple-200">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Powered by Cutting-Edge Technology
            </h3>
            <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
              Built with advanced NLP, TensorFlow, and Hugging Face models — trained on millions of real-world expressions
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-gray-700">
              <span className="px-4 py-2 bg-white/80 rounded-full shadow">Natural Language Processing</span>
              <span className="px-4 py-2 bg-white/80 rounded-full shadow">Machine Learning</span>
              <span className="px-4 py-2 bg-white/80 rounded-full shadow">Multilingual Support</span>
              <span className="px-4 py-2 bg-white/80 rounded-full shadow">Real-Time Analysis</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
