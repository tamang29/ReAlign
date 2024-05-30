import { BrowserRouter , Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import NotFound from './components/Dashboard/NotFound.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/dashboard/*" element = {<Dashboard/>}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
