import logo from './logo.svg';
import './App.css';
import {Router,Routes, Route} from "react-router-dom"
import LogIn from './pages/LogIn';

function App() {
  return (
    <div className="App">
      <Router>
    <Routes>
       <Route exact path="/login" compenent={LogIn}></Route>
    </Routes>
  </Router>
    </div>
  );
}

export default App;
