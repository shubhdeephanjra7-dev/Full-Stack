import { Provider } from 'react-redux';
import { store } from './store/store';
import CalendarPage from './pages/CalendarPage';

export default function App() {
  return (
    <Provider store={store}>
      <CalendarPage />
    </Provider>
  );
}
