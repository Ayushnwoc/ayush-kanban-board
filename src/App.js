import './App.css';
import NavigationBar from './components/NavigationBar';
import Dashboard from './components/HomePage';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationBar />
      <Dashboard />
    </Provider>
  );
}

export default App;
