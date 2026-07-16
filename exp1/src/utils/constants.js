export const PLATFORMS = {
  TWITTER: 'twitter',
  LINKEDIN: 'linkedin',
  FACEBOOK: 'facebook',
  INSTAGRAM: 'instagram'
};

export const PLATFORM_CONFIG = {
  [PLATFORMS.TWITTER]: {
    name: 'Twitter (X)',
    icon: '𝕏',
    maxChars: 280,
    placeholder: "What's happening?",
    color: '#1DA1F2'
  },
  [PLATFORMS.LINKEDIN]: {
    name: 'LinkedIn',
    icon: 'in',
    maxChars: 3000,
    placeholder: 'Share your professional thoughts...',
    color: '#0077B5'
  },
  [PLATFORMS.FACEBOOK]: {
    name: 'Facebook',
    icon: 'f',
    maxChars: 63206,
    placeholder: "What's on your mind?",
    color: '#1877F2'
  },
  [PLATFORMS.INSTAGRAM]: {
    name: 'Instagram',
    icon: '📷',
    maxChars: 2200,
    placeholder: 'Write a caption...',
    color: '#E4405F'
  }
};
