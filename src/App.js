import './App.css';
import {Route, Router, Routes, Link, BrowserRouter} from "react-router-dom";
import LogIn from './pages/LogIn';
import AdminAddUser from './pages/Admin/AdminAddUser';
import AdminDB from './pages/Admin/AdminDB';
import CanteenDayDetai from './pages/Canteen/CanteenDayDetail';
import CanteenDB from './pages/Canteen/CanteenDayDetail';
import CanteenFoodOrder from './pages/Canteen/CanteenDayDetail';
import CanteenSearch from './pages/Canteen/CanteenDayDetail';
import CanteenUpdateScheule from './pages/Canteen/CanteenDayDetail';
import UserDB from './pages/User/UserDB';
import UserFoodDetail from './pages/User/UserFoodDetail';
import UserFoodPick from './pages/User/UserFoodPick';




function App() {
  return (
    <div>

        <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LogIn/>}></Route>
          <Route path='/userdb' element={<UserDB/>}></Route>
          <Route path='/userfooddetail' element={<UserFoodDetail/>}></Route>
          <Route path='/userfoodpick' element={<UserFoodPick/>}></Route>
          <Route path='/adminadduser' element={<AdminAddUser/>}></Route>
          <Route path='/admindb' element={<AdminDB/>}></Route>
          <Route path='/canteendb' element={<CanteenDB/>}></Route>
          <Route path='/canteendaydetail' element={<CanteenDayDetai/>}></Route>
          <Route path='/canteenfoodorder' element={<CanteenFoodOrder/>}></Route>
          <Route path='/canteensearch' element={<CanteenSearch/>}></Route>
          <Route path='/canteenupdateschedule' element={<CanteenUpdateScheule/>}></Route>
        </Routes>
        </BrowserRouter>

      </div>
  );
}

export default App;
