import { useMemo } from 'react';
import { t } from '../utils/i18n';

const CHIP_KEYS = [
  'chip.cerebralPalsy',
  'chip.notSpeaking',
  'chip.fee',
  'chip.enroll',
  'chip.autism',
  'chip.hiding',
];

const LANG_CODES = ['en', 'hi', 'as'];

function detectLang(text) {
  if (/[\u0980-\u09FF]/.test(text)) return 'as';
  if (/[\u0900-\u097F]/.test(text)) return 'hi';
  return 'en';
}

export default function SuggestedChips({ language, onChipClick, filterText }) {
  const chipLang = filterText ? detectLang(filterText) : language;

  const filtered = useMemo(() => {
    if (!filterText || !filterText.trim()) return CHIP_KEYS;
    const q = filterText.trim();

    return CHIP_KEYS.filter(key =>
      LANG_CODES.some(lang => {
        const label = t(key, lang);
        return label !== key && label.includes(q);
      })
    );
  }, [filterText]);

  if (filtered.length === 0) return null;

  return (
    <div className="chips-container">
      <div className="chips-scroll">
        {filtered.map(key => (
          <button
            key={key}
            className="chip"
            onClick={() => onChipClick(t(key, chipLang))}
          >
            {t(key, chipLang)}
          </button>
        ))}
      </div>
    </div>
  );
}
