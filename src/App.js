import 'bootstrap-icons/font/bootstrap-icons.css';
import Siderbar from './components/sidebar/Sidebar';

import './App.css';


function App() {

  return (
    <div className="App">
        <div className="interactive-map-container">
          <Siderbar />
          <div className="interactive-map-content"></div>
        </div>
    </div>

  );
}

export default App;
