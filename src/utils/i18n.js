/**
 * i18n.js — Simple localization for English, Hindi, and Assamese.
 * No external library needed — just a dictionary lookup.
 */

export const LANGUAGES = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिंदी' },
  { code: 'as', label: 'Assamese', nativeLabel: 'অসমীয়া' },
];

const translations = {
  // Header
  'header.title': {
    en: 'Kiran',
    hi: 'किरण',
    as: 'কিৰণ',
  },
  'header.tagline': {
    en: 'Because every child is special.',
    hi: 'क्योंकि हर बच्चा खास है।',
    as: 'কাৰণ প্ৰতিটো শিশু বিশেষ।',
  },

  // Input
  'input.placeholder': {
    en: 'Ask a question...',
    hi: 'कोई सवाल पूछें...',
    as: 'এটা প্ৰশ্ন সুধিব...',
  },
  'input.disclaimer': {
    en: 'Kiran can make mistakes. Please verify information.',
    hi: 'किरण से गलतियाँ हो सकती हैं। कृपया जानकारी सत्यापित करें।',
    as: 'কিৰণৰ ভুল হ\'ব পাৰে। অনুগ্ৰহ কৰি তথ্য যাচাই কৰক।',
  },

  // Buttons
  'button.send': {
    en: 'Send',
    hi: 'भेजें',
    as: 'পঠাওক',
  },
  'button.newChat': {
    en: 'New chat',
    hi: 'नई बातचीत',
    as: 'নতুন বাৰ্তালাপ',
  },
  'button.copied': {
    en: 'Copied!',
    hi: 'कॉपी हो गया!',
    as: 'কপি হ\'ল!',
  },
  'button.copy': {
    en: 'Copy',
    hi: 'कॉपी',
    as: 'কপি',
  },

  // Welcome message
  'welcome.title': {
    en: 'I\'m Kiran 🌸',
    hi: 'मैं किरण हूँ 🌸',
    as: 'মই কিৰণ 🌸',
  },
  'welcome.subtitle': {
    en: 'Ask me anything about MRC. I know lots about the aunties and uncles here and all the children they help!',
    hi: 'MRC के बारे में मुझसे कुछ भी पूछें. मैं यहाँ के सभी चाचा-चाची और उनकी मदद पाने वाले बच्चों के बारे में बहुत कुछ जानती हूँ!',
    as: 'MRC ৰ বিষয়ে মোক যিকোনো কথা সুধিব পাৰে. ইয়াত থকা সকলো কাকা-মামী আৰু তেওঁলোকে সহায় কৰা শিশুসকলৰ বিষয়ে মই বহুত জানো!',
  },

  // Suggested question chips
  'chip.cerebralPalsy': {
    en: 'What is Cerebral Palsy?',
    hi: 'सेरेब्रल पाल्सी क्या है?',
    as: 'চেৰিব্ৰেল পালচি কি?',
  },
  'chip.notSpeaking': {
    en: 'My child isn\'t speaking yet',
    hi: 'मेरा बच्चा अभी बोल नहीं रहा',
    as: 'মোৰ সন্তানে এতিয়াও কথা কোৱা নাই',
  },
  'chip.fee': {
    en: 'Is there a fee for services?',
    hi: 'क्या सेवाओं के लिए कोई शुल्क है?',
    as: 'সেৱাৰ বাবে কোনো মাচুল আছে নে?',
  },
  'chip.enroll': {
    en: 'How do I enroll my child?',
    hi: 'मैं अपने बच्चे का नामांकन कैसे करूँ?',
    as: 'মই মোৰ সন্তানক কেনেকৈ নামভৰ্তি কৰিম?',
  },
  'chip.autism': {
    en: 'What are signs of Autism?',
    hi: 'ऑटिज़्म के लक्षण क्या हैं?',
    as: 'অটিজমৰ লক্ষণ কি কি?',
  },
  'chip.hiding': {
    en: 'People say I should hide my child',
    hi: 'लोग कहते हैं मुझे अपने बच्चे को छुपाना चाहिए',
    as: 'মানুহে কয় মই মোৰ সন্তানক লুকুৱাই ৰাখিব লাগে',
  },

  // Errors
  'error.generic': {
    en: 'Something went wrong. Please try again.',
    hi: 'कुछ गलत हो गया। कृपया फिर से कोशिश करें।',
    as: 'কিবা ভুল হ\'ল। অনুগ্ৰহ কৰি পুনৰ চেষ্টা কৰক।',
  },
  'error.network': {
    en: 'Unable to connect. Please check your internet connection.',
    hi: 'कनेक्ट नहीं हो पा रहा। कृपया अपना इंटरनेट कनेक्शन जाँचें।',
    as: 'সংযোগ কৰিব পৰা নাই। অনুগ্ৰহ কৰি আপোনাৰ ইণ্টাৰনেট সংযোগ পৰীক্ষা কৰক।',
  },
  'error.limitReached': {
    en: 'Chatbot limit reached. Please try again later.',
    hi: 'चैटबॉट की सीमा समाप्त। कृपया बाद में पुनः प्रयास करें।',
    as: 'চাটবটৰ সীমা শেষ। অনুগ্ৰহ কৰি পাছত পুনৰ চেষ্টা কৰক।',
  },

  // Accessibility
  'aria.sendButton': {
    en: 'Send message',
    hi: 'संदेश भेजें',
    as: 'বাৰ্তা পঠাওক',
  },
  'aria.newChat': {
    en: 'New chat',
    hi: 'नई बातचीत',
    as: 'নতুন বাৰ্তালাপ',
  },
  'aria.toggleTheme': {
    en: 'Toggle dark/light mode',
    hi: 'डार्क/लाइट मोड बदलें',
    as: 'ডাৰ্ক/লাইট মোড সলনি কৰক',
  },
  'aria.copyMessage': {
    en: 'Copy message',
    hi: 'संदेश कॉपी करें',
    as: 'বাৰ্তা কপি কৰক',
  },
};

/**
 * Get a translated string by key and language code.
 * Falls back to English if the key or language is missing.
 */
export function t(key, lang = 'en') {
  const entry = translations[key];
  if (!entry) return key; // fallback: return the key itself
  return entry[lang] || entry['en'] || key;
}
