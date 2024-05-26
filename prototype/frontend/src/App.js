import { BrowserRouter , Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Settings from './pages/Settings.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path = "/*" element = {<Dashboard/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
