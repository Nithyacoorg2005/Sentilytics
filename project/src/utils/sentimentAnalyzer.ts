import { SentimentResult } from '../types';

interface LanguageWordList {
  positive: string[];
  negative: string[];
  sarcastic: string[];
}

const multilingualWords: { [key: string]: LanguageWordList } = {
  en: {
    positive: ['love', 'great', 'amazing', 'excellent', 'wonderful', 'fantastic', 'good', 'happy', 'joy', 'perfect', 'beautiful', 'awesome', 'brilliant', 'nice'],
    negative: ['hate', 'bad', 'terrible', 'awful', 'horrible', 'disappointed', 'sad', 'angry', 'worst', 'disgusting', 'pathetic', 'useless'],
    sarcastic: ['yeah right', 'sure', 'obviously', 'totally', 'definitely', 'of course', '...', '!!!'],
  },
  es: {
    positive: ['amor', 'genial', 'increíble', 'excelente', 'maravilloso', 'fantástico', 'bueno', 'feliz', 'alegría', 'perfecto', 'hermoso'],
    negative: ['odio', 'malo', 'terrible', 'horrible', 'decepcionado', 'triste', 'enojado', 'peor', 'asqueroso'],
    sarcastic: ['claro', 'obvio', 'totalmente', 'definitivamente', 'por supuesto'],
  },
  fr: {
    positive: ['amour', 'génial', 'incroyable', 'excellent', 'merveilleux', 'fantastique', 'bon', 'heureux', 'joie', 'parfait', 'beau'],
    negative: ['déteste', 'mauvais', 'terrible', 'horrible', 'déçu', 'triste', 'en colère', 'pire', 'dégoûtant'],
    sarcastic: ['bien sûr', 'évidemment', 'totalement', 'définitivement'],
  },
  de: {
    positive: ['liebe', 'großartig', 'erstaunlich', 'ausgezeichnet', 'wunderbar', 'fantastisch', 'gut', 'glücklich', 'freude', 'perfekt', 'schön'],
    negative: ['hasse', 'schlecht', 'schrecklich', 'furchtbar', 'enttäuscht', 'traurig', 'wütend', 'schlimmste', 'ekelhaft'],
    sarcastic: ['natürlich', 'offensichtlich', 'total', 'definitiv'],
  },
  hi: {
    positive: ['प्यार', 'महान', 'अद्भुत', 'उत्कृष्ट', 'शानदार', 'बढ़िया', 'अच्छा', 'खुश', 'खुशी', 'सुंदर'],
    negative: ['नफरत', 'बुरा', 'भयानक', 'निराश', 'दुखी', 'गुस्सा', 'सबसे खराब'],
    sarcastic: ['बिल्कुल', 'ज़ाहिर', 'निश्चित'],
  },
};

export const analyzeSentiment = async (
  text: string,
  languageCode: string
): Promise<SentimentResult> => {
  await new Promise(resolve => setTimeout(resolve, 1500));

  const lowerText = text.toLowerCase();
  const words = multilingualWords[languageCode] || multilingualWords.en;

  let positiveScore = 0;
  let negativeScore = 0;
  let sarcasticScore = 0;

  words.positive.forEach(word => {
    if (lowerText.includes(word)) positiveScore++;
  });

  words.negative.forEach(word => {
    if (lowerText.includes(word)) negativeScore++;
  });

  words.sarcastic.forEach(indicator => {
    if (lowerText.includes(indicator)) sarcasticScore++;
  });

  let sentiment: SentimentResult['sentiment'] = 'neutral';
  let emotions = {
    joy: 20,
    anger: 10,
    fear: 10,
    surprise: 15,
    sadness: 10,
    love: 15,
  };
  let explanation = '';
  let confidence = 50;

  if (sarcasticScore > 0 && (positiveScore > 0 || negativeScore > 0)) {
    sentiment = 'sarcastic';
    confidence = Math.min(85, 60 + sarcasticScore * 10);
    emotions = { joy: 15, anger: 25, fear: 5, surprise: 30, sadness: 10, love: 5 };
    explanation = 'The text contains sarcastic undertones with contradictory emotional signals.';
  } else if (positiveScore > 0 && negativeScore > 0) {
    sentiment = 'mixed';
    confidence = Math.min(90, 65 + (positiveScore + negativeScore) * 5);
    emotions = { joy: 35, anger: 25, fear: 10, surprise: 15, sadness: 20, love: 20 };
    explanation = 'The text reflects conflicting emotions with both positive and negative elements.';
  } else if (positiveScore > negativeScore) {
    sentiment = 'positive';
    confidence = Math.min(95, 70 + positiveScore * 8);
    emotions = { joy: 70, anger: 5, fear: 5, surprise: 20, sadness: 5, love: 55 };
    explanation = 'The text expresses optimism and positive feelings through uplifting language.';
  } else if (negativeScore > positiveScore) {
    sentiment = 'negative';
    confidence = Math.min(95, 70 + negativeScore * 8);
    emotions = { joy: 5, anger: 60, fear: 35, surprise: 10, sadness: 70, love: 5 };
    explanation = 'The text reflects disappointment and negative emotions through critical language.';
  } else {
    sentiment = 'neutral';
    confidence = 60;
    emotions = { joy: 20, anger: 10, fear: 10, surprise: 15, sadness: 10, love: 15 };
    explanation = 'The text maintains a balanced, objective tone without strong emotional indicators.';
  }

  return {
    sentiment,
    confidence,
    emotions,
    explanation,
    timestamp: Date.now(),
    text,
  };
};
