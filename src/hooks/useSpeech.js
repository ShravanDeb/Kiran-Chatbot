import { useState, useCallback, useRef } from 'react';

export function useSpeech(language) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingText, setSpeakingText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const speak = useCallback((text) => {
    if (!('speechSynthesis' in window)) return;
    if (language === 'as') return;

    window.speechSynthesis.cancel();

    if (speakingText === text && isSpeaking) {
      setIsSpeaking(false);
      setSpeakingText('');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    const langMap = { en: 'en-IN', hi: 'hi-IN' };
    const langCode = langMap[language] || 'en-IN';
    utterance.lang = langCode;

    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v => v.lang.startsWith(langCode) && v.name.includes('Neural'))
      || voices.find(v => v.lang.startsWith(langCode) && v.name.includes('Natural'))
      || voices.find(v => v.lang.startsWith(langCode) && v.name.includes('Online'))
      || voices.find(v => v.lang.startsWith(langCode) && v.name.includes('Microsoft'))
      || voices.find(v => v.lang.startsWith(langCode))
      || voices.find(v => v.lang.startsWith('hi'));
    if (preferred) {
      utterance.voice = preferred;
      utterance.lang = preferred.lang;
    }

    utterance.rate = 0.85;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setSpeakingText(text);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeakingText('');
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setSpeakingText('');
    };

    window.speechSynthesis.speak(utterance);
  }, [language, isSpeaking, speakingText]);

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeakingText('');
    }
  }, []);

  const startListening = useCallback((onResult) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser.");
      return;
    }

    try {
      const recog = new SpeechRecognition();
      recog.continuous = true;
      recog.interimResults = true;
      const langMap = { en: 'en-IN', hi: 'hi-IN', as: 'as-IN' };
      recog.lang = langMap[language] || 'en-US';

      recog.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          currentTranscript += event.results[i][0].transcript;
        }
        if (onResult) onResult(currentTranscript);
      };

      recog.onerror = (event) => {
        setIsListening(false);
        recognitionRef.current = null;
      };

      recog.onend = () => {
        setIsListening(false);
        recognitionRef.current = null;
      };

      recog.start();
      recognitionRef.current = recog;
      setIsListening(true);
    } catch (e) {
      // speech recognition not available
    }
  }, [language]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, []);

  const toggleListening = useCallback((onResult) => {
    if (isListening) {
      stopListening();
    } else {
      startListening(onResult);
    }
  }, [isListening, startListening, stopListening]);

  const hasSpeechRecognition = !!(
    typeof window !== 'undefined' &&
    (window.SpeechRecognition || window.webkitSpeechRecognition)
  );

  return {
    speak,
    stopSpeaking,
    isSpeaking,
    speakingText,
    isListening,
    toggleListening,
    hasSpeechRecognition
  };
}
