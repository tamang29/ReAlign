import { BrowserRouter , Routes, Route} from 'react-router-dom';
import Home from './pages/Home.js'
import Dashboard from './pages/Dashboard.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
            path = ""
            element = {<Home/>}
            />
            <Route path="/dashboard" element = {<Dashboard/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
