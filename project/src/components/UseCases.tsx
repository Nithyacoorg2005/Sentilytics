import { useState } from 'react';
import { TrendingUp, Pen, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';

const useCases = [
  {
    icon: TrendingUp,
    title: 'For Brands',
    subtitle: 'Analyzing Customer Feedback',
    description: 'Understand customer sentiment across reviews, social media, and support tickets. Make data-driven decisions to improve products and services.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Pen,
    title: 'For Creators',
    subtitle: 'Checking Tone of Captions',
    description: 'Ensure your content hits the right emotional tone. Perfect for social media managers, copywriters, and content creators.',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
  },
  {
    icon: MessageSquare,
    title: 'For Writers & Students',
    subtitle: 'Refining Emotional Tone',
    description: 'Polish your essays, stories, and communications. Understand how your words will be perceived by your audience.',
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50',
  },
];

export default function UseCases() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % useCases.length);
  };

  const previous = () => {
    setCurrentIndex((prev) => (prev - 1 + useCases.length) % useCases.length);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Perfect For Every Use Case
        </h2>

        <p className="text-xl text-gray-600 text-center mb-16">
          From businesses to creators, Sentilytics helps everyone understand emotions
        </p>

        {/* Desktop View - All Cards */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/50"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${useCase.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {useCase.title}
                </h3>
                <p className="text-lg font-semibold text-gray-600 mb-4">
                  {useCase.subtitle}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mobile View - Carousel */}
        <div className="md:hidden relative">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-lg border border-white/50">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              return (
                <div
                  key={index}
                  className={`transition-all duration-500 ${
                    index === currentIndex ? 'block' : 'hidden'
                  }`}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${useCase.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-lg font-semibold text-gray-600 mb-4">
                    {useCase.subtitle}
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-8">
                    {useCase.description}
                  </p>
                </div>
              );
            })}

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={previous}
                className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {useCases.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-purple-500 w-8'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
