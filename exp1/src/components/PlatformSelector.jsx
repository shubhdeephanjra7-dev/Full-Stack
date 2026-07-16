import { PLATFORMS, PLATFORM_CONFIG } from '../utils/constants';

export const PlatformSelector = ({ selectedPlatform, onSelect }) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Select Platform</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.entries(PLATFORM_CONFIG).map(([key, config]) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
              selectedPlatform === key
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 shadow-lg'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-indigo-300'
            }`}
          >
            <div className="text-3xl mb-2">{config.icon}</div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-200">{config.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
