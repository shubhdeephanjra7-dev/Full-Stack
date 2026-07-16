export const ProgressBar = ({ percentage }) => {
  const getColor = () => {
    if (percentage > 100) return 'bg-red-500';
    if (percentage > 90) return 'bg-orange-500';
    if (percentage > 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
        <span>Character Usage</span>
        <span className="font-semibold">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ease-out ${getColor()}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
};
