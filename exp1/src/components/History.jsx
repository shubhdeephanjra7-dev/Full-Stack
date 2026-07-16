import { PLATFORM_CONFIG } from '../utils/constants';

export const History = ({ posts, onLoad, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (posts.length === 0) {
    return (
      <div className="mt-12 text-center py-12 bg-white dark:bg-gray-800 rounded-3xl shadow-xl">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">No posts yet</h3>
        <p className="text-gray-500 dark:text-gray-400">Your saved posts will appear here</p>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
        <span>📜</span>
        Post History
      </h2>
      <div className="grid gap-4">
        {posts.map((post) => {
          const config = PLATFORM_CONFIG[post.platform];
          return (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{config.icon}</span>
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-gray-100">{config.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {post.updatedAt ? (
                        <>
                          Updated {formatDate(post.updatedAt)}
                          <span className="text-yellow-600 dark:text-yellow-400 ml-2">(edited)</span>
                        </>
                      ) : (
                        formatDate(post.createdAt)
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onLoad(post)}
                    className="px-3 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl text-sm font-medium hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(post.id)}
                    className="px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 line-clamp-3">{post.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
