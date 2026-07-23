// Purpose: Entry point of React app, wraps App with Redux Provider
// Explanation: Makes store available to all components

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import { store } from './app/store'; // Import our store
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wrap App with Provider and pass store */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
