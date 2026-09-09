import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Note: intentionally NOT wrapped in <StrictMode>. StrictMode double-invokes
// renders/effects in development specifically to surface side-effect bugs,
// which would double every number the render counter reports and make the
// optimized-vs-non-optimized demonstration (2 vs 7/30) inaccurate. The rest
// of the app has no StrictMode-only concerns, so it's safe to omit here.
createRoot(document.getElementById('root')).render(<App />);
