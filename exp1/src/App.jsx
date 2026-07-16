import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PostComposer } from './components/PostComposer';
import { History } from './components/History';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [toast, setToast] = useState(null);
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('postHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('postHistory', JSON.stringify(posts));
  }, [posts]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSavePost = (text, platform) => {
    if (!text.trim()) return;
    const newPost = {
      id: Date.now(),
      text,
      platform,
      createdAt: new Date().toISOString()
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const handleUpdatePost = (text, platform) => {
    if (!text.trim() || !editingPost) return;
    setPosts(prev => prev.map(post => 
      post.id === editingPost.id 
        ? { ...post, text, platform, updatedAt: new Date().toISOString() }
        : post
    ));
    setEditingPost(null);
    showToast('Post updated!', 'success');
  };

  const handleLoadPost = (post) => {
    setEditingPost(post);
    showToast('Post loaded for editing!', 'success');
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    showToast('Editing cancelled', 'info');
  };

  const handleDeletePost = (postId) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
    if (editingPost && editingPost.id === postId) {
      setEditingPost(null);
    }
    showToast('Post deleted!', 'info');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'}`}>
      <Header darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
      <main className="px-4 pb-12">
        <PostComposer 
          showToast={showToast} 
          onSave={handleSavePost} 
          onUpdate={handleUpdatePost}
          onCancelEdit={handleCancelEdit}
          editingPost={editingPost}
        />
        <History 
          posts={posts} 
          onLoad={handleLoadPost} 
          onDelete={handleDeletePost} 
        />
      </main>
      <Footer />
      
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-fadeIn">
          <div className={`px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 ${
            toast.type === 'success' ? 'bg-green-500 text-white' : 
            toast.type === 'error' ? 'bg-red-500 text-white' : 
            'bg-indigo-500 text-white'
          }`}>
            <span className="text-xl">
              {toast.type === 'success' ? '✓' : toast.type === 'error' ? '✗' : 'ℹ️'}
            </span>
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
