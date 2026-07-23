// Purpose: Main App component that displays all sections
// Explanation: Imports and renders all components

import AddPost from './components/AddPost';
import PostList from './components/PostList';
import './index.css';

function App() {
  return (
    <div className="app">
      <h1>Redux Toolkit Lab Experiment</h1>
      <div className="section">
        <AddPost />
        <PostList />
      </div>
    </div>
  );
}

export default App;
