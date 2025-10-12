export const detectLanguage = (text: string): string => {
  const lowerText = text.toLowerCase();

  const patterns = {
    es: /\b(el|la|los|las|un|una|está|son|por|para|con|pero|muy|que|como|todo|todos)\b/g,
    fr: /\b(le|la|les|un|une|est|sont|pour|avec|mais|très|que|comme|tout|tous)\b/g,
    de: /\b(der|die|das|ein|eine|ist|sind|für|mit|aber|sehr|dass|wie|alle)\b/g,
    hi: /[\u0900-\u097F]+/g,
    zh: /[\u4E00-\u9FFF]+/g,
    ja: /[\u3040-\u309F\u30A0-\u30FF]+/g,
    ar: /[\u0600-\u06FF]+/g,
    pt: /\b(o|a|os|as|um|uma|está|são|por|para|com|mas|muito|que|como|todo|todos)\b/g,
    ru: /[\u0400-\u04FF]+/g,
    it: /\b(il|lo|la|i|gli|le|un|uno|una|è|sono|per|con|ma|molto|che|come|tutto|tutti)\b/g,
  };

  let maxMatches = 0;
  let detectedLang = 'en';

  for (const [lang, pattern] of Object.entries(patterns)) {
    const matches = text.match(pattern);
    const count = matches ? matches.length : 0;

    if (count > maxMatches) {
      maxMatches = count;
      detectedLang = lang;
    }
  }

  return detectedLang;
};

export const getLanguageName = (code: string): string => {
  const names: { [key: string]: string } = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    hi: 'Hindi',
    zh: 'Chinese',
    ja: 'Japanese',
    ar: 'Arabic',
    pt: 'Portuguese',
    ru: 'Russian',
    it: 'Italian',
  };

  return names[code] || 'English';
};

export const getLanguageFlag = (code: string): string => {
  const flags: { [key: string]: string } = {
    en: '🇬🇧',
    es: '🇪🇸',
    fr: '🇫🇷',
    de: '🇩🇪',
    hi: '🇮🇳',
    zh: '🇨🇳',
    ja: '🇯🇵',
    ar: '🇸🇦',
    pt: '🇵🇹',
    ru: '🇷🇺',
    it: '🇮🇹',
  };

  return flags[code] || '🌍';
};
