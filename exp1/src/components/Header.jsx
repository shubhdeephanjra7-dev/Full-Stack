export const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="w-full py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
            ✍️
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            PostComposer
          </h1>
        </div>
        <button
          onClick={toggleDarkMode}
          className="p-3 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 dark:border dark:border-gray-700"
          aria-label="Toggle dark mode"
        >
          <span className="text-2xl">{darkMode ? '☀️' : '🌙'}</span>
        </button>
      </div>
    </header>
  );
};
