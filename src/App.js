import './App.css';
import {Route, Router, Routes, Link, BrowserRouter} from "react-router-dom";
import LogIn from './pages/LogIn';
const Home = () =>{
  return <h1>asdasddas</h1>
}

function App() {
  return (
    <div>

        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<LogIn/>}></Route>

        </Routes>
        </BrowserRouter>

      </div>
  );
}

export default App;
