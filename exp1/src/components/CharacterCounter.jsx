export const CharacterCounter = ({ charCount, maxChars, remaining }) => {
  const getTextColor = () => {
    if (remaining < 0) return 'text-red-500';
    if (remaining < 20) return 'text-orange-500';
    return 'text-gray-700 dark:text-gray-200';
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <div className={`text-lg font-semibold ${getTextColor()}`}>
        {charCount} / {maxChars}
      </div>
      <div className={`text-sm ${getTextColor()}`}>
        {remaining >= 0 ? `${remaining} remaining` : `${Math.abs(remaining)} over`}
      </div>
    </div>
  );
};
