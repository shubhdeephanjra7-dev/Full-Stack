import { useState, useRef, useEffect } from 'react';
import { PlatformSelector } from './PlatformSelector';
import { CharacterCounter } from './CharacterCounter';
import { ProgressBar } from './ProgressBar';
import { ValidationMessage } from './ValidationMessage';
import { useValidation } from '../hooks/useValidation';
import { getPlatformConfig, countWords, calculateReadingTime, countHashtags, countMentions } from '../utils/platformRules';
import { PLATFORMS } from '../utils/constants';

export const PostComposer = ({ showToast, onSave, onUpdate, onCancelEdit, editingPost }) => {
  const [text, setText] = useState('');
  const [platform, setPlatform] = useState(PLATFORMS.TWITTER);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (editingPost) {
      setText(editingPost.text);
      setPlatform(editingPost.platform);
    } else {
      setText('');
      setPlatform(PLATFORMS.TWITTER);
    }
  }, [editingPost]);

  const validation = useValidation(text, platform);
  const platformConfig = getPlatformConfig(platform);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 400) + 'px';
    }
  }, [text]);

  const handleClear = () => {
    setText('');
    if (editingPost) {
      onCancelEdit();
    } else {
      showToast('Post cleared!', 'info');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      showToast('Copied to clipboard!', 'success');
    } catch (err) {
      showToast('Failed to copy', 'error');
    }
  };

  const handleSave = () => {
    if (text.trim()) {
      onSave(text, platform);
      showToast('Post saved to history!', 'success');
    }
  };

  const handleUpdate = () => {
    if (text.trim()) {
      onUpdate(text, platform);
    }
  };

  const handleSubmit = () => {
    if (validation.isValid && text.trim()) {
      if (editingPost) {
        onUpdate(text, platform);
      } else {
        onSave(text, platform);
      }
      showToast(editingPost ? 'Post updated and submitted!' : `Post submitted to ${platformConfig.name}!`, 'success');
    }
  };

  const wordCount = countWords(text);
  const readingTime = calculateReadingTime(text);
  const hashtagCount = countHashtags(text);
  const mentionCount = countMentions(text);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 animate-slideUp">
      {editingPost && (
        <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-2xl flex items-center gap-3">
          <span className="text-2xl">✏️</span>
          <span className="text-yellow-700 dark:text-yellow-300 font-medium">You are editing an existing post</span>
        </div>
      )}
      <PlatformSelector selectedPlatform={platform} onSelect={setPlatform} />

      <div className="mb-6">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={platformConfig.placeholder}
          className="w-full p-4 text-lg border-2 border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-all duration-300"
          aria-label="Post content"
        />
      </div>

      <CharacterCounter 
        charCount={validation.charCount} 
        maxChars={platformConfig.maxChars} 
        remaining={validation.remaining} 
      />

      <ProgressBar percentage={validation.percentage} />

      <div className="flex justify-between items-center mt-6 mb-6">
        <ValidationMessage isValid={validation.isValid} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
        <div className="text-center">
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{wordCount}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Words</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{readingTime}m</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Read time</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">{hashtagCount}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Hashtags</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{mentionCount}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Mentions</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {editingPost ? (
          <>
            <button
              onClick={handleUpdate}
              disabled={!text.trim()}
              className="flex-1 py-4 px-6 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
            >
              Update Post
            </button>
            <button
              onClick={handleSubmit}
              disabled={!validation.isValid || !text.trim()}
              className="flex-1 py-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
            >
              Update & Submit
            </button>
            <button
              onClick={onCancelEdit}
              className="flex-1 py-4 px-6 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleSubmit}
              disabled={!validation.isValid || !text.trim()}
              className="flex-1 py-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
            >
              Submit Post
            </button>
            <button
              onClick={handleSave}
              disabled={!text.trim()}
              className="flex-1 py-4 px-6 bg-green-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
            >
              Save Post
            </button>
            <button
              onClick={handleCopy}
              className="flex-1 py-4 px-6 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
            >
              Copy to Clipboard
            </button>
            <button
              onClick={handleClear}
              className="flex-1 py-4 px-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold rounded-2xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300"
            >
              Clear Post
            </button>
          </>
        )}
      </div>
    </div>
  );
};
