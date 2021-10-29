import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import store from './store';
import {Provider} from 'react-redux';

import RouteBox from './main/RouteBox';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <RouteBox />
    </div>
    </Provider>
  );
}

export default App;
