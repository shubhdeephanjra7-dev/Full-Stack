import { PLATFORM_CONFIG } from './constants';

export const getPlatformConfig = (platform) => {
  return PLATFORM_CONFIG[platform] || null;
};

export const countWords = (text) => {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
};

export const calculateReadingTime = (text) => {
  const wordCount = countWords(text);
  const wordsPerMinute = 200;
  return Math.ceil(wordCount / wordsPerMinute);
};

export const countHashtags = (text) => {
  const hashtagMatches = text.match(/#\w+/g);
  return hashtagMatches ? hashtagMatches.length : 0;
};

export const countMentions = (text) => {
  const mentionMatches = text.match(/@\w+/g);
  return mentionMatches ? mentionMatches.length : 0;
};
