import { useState, useEffect } from 'react';
import { getPlatformConfig } from '../utils/platformRules';

export const useValidation = (text, platform) => {
  const [isValid, setIsValid] = useState(true);
  const [charCount, setCharCount] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const config = getPlatformConfig(platform);
    if (!config) return;

    const count = text.length;
    const remainingChars = config.maxChars - count;
    const percentageUsed = Math.min((count / config.maxChars) * 100, 100);

    setCharCount(count);
    setRemaining(remainingChars);
    setPercentage(percentageUsed);
    setIsValid(remainingChars >= 0);
  }, [text, platform]);

  return {
    isValid,
    charCount,
    remaining,
    percentage
  };
};
