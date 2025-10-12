import { Globe, Heart, Zap, Shield, Users, TrendingUp } from 'lucide-react';

export default function WhySentilytics() {
  const reasons = [
    {
      icon: Globe,
      title: 'Multilingual Magic',
      description: 'Understand emotions in any language. From English to Hindi, Spanish to Chinese — we speak them all.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Heart,
      title: 'Context Matters',
      description: 'We read between the lines. Our AI understands sarcasm, mixed feelings, and subtle emotional nuances.',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Real-time sentiment analysis in seconds. No waiting, no delays — instant emotional intelligence.',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data stays yours. We analyze locally and never store sensitive information.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Users,
      title: 'For Everyone',
      description: 'Whether you are a brand, creator, student, or professional — Sentilytics adapts to your needs.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: TrendingUp,
      title: 'Track Trends',
      description: 'See how emotions evolve over time with our emotion timeline and historical tracking.',
      gradient: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <section className="py-20 px-4 bg-white/40 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Why Sentilytics?
          </h2>
          <p className="text-2xl text-gray-700 mb-4 italic">
            "Because understanding tone matters more than words."
          </p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI reads between the lines — in any language
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/50 group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${reason.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {reason.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 rounded-full px-12 py-6 border-2 border-purple-300 shadow-xl">
            <p className="text-2xl font-bold text-gray-800 mb-2">
              One world. One emotion detector.
            </p>
            <p className="text-lg text-gray-600">
              See what your words truly mean — in any language
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
