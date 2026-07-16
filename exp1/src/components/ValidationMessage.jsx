export const ValidationMessage = ({ isValid }) => {
  return (
    <div className="flex items-center gap-2 animate-fadeIn">
      {isValid ? (
        <>
          <span className="text-green-500 text-xl">✓</span>
          <span className="text-green-600 dark:text-green-400 font-medium">Valid post</span>
        </>
      ) : (
        <>
          <span className="text-red-500 text-xl">⚠</span>
          <span className="text-red-600 dark:text-red-400 font-medium">Character limit exceeded</span>
        </>
      )}
    </div>
  );
};
