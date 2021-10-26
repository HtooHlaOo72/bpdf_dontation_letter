import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import DonateForm from './components/DonateForm';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import RouteBox from './main/RouteBox';

function App() {
  return (
    <div className="App">
      <RouteBox />
    </div>
  );
}

export default App;
