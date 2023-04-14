import '../../general.scss';
import '../../css/CanteenFoodDetail.scss'
import { useNavigate,useLocation } from 'react-router-dom';
import {useState,useEffect,useRef} from 'react'
import { onValue, ref ,set} from "firebase/database";
import db from '../../firebase'
import uuid from 'react-uuid';

function UserFoodDetail() {
    let navigate = useNavigate()
    let location = useLocation()



    
    
    // Function to get the index of a day by its date in a canteen's days array
    function getDayIndexByDate(canteenIndex, date) {
      const daysList = location.state.accounts[canteenIndex].days.filter(Boolean)
      return daysList.findIndex(day => day.date === date);
    }
    
    // Function to get the index of a food by its id in a day's foods array
    function getFoodIndexById(canteenIndex, dayIndex, foodId) {
      const daysList = location.state.accounts[canteenIndex].days.filter(Boolean)
      const foods = daysList[dayIndex].foods.filter(food => food != null);
      const foodIndex = foods.findIndex(food => food.id === foodId);
      console.log('Food:', foods[foodIndex]);
      return foodIndex;
    }
    


    function updateFoodOrder(food){
      const canteenIndex = location.state.canteen;
      const dayIndex = getDayIndexByDate(canteenIndex, location.state.date);
      const foodIndex = getFoodIndexById(canteenIndex, dayIndex, food.id);
      const foodType = food.type;
      const accountId = location.state.id;
      const daysList = location.state.accounts[canteenIndex].days.filter(Boolean)
      const foods = daysList[dayIndex].foods.filter(food => food != null);
      for (let i = 0; i < foods.length; i++) {
        const f = foods[i];
        if (f.type === foodType && Array.isArray(f.order) && f.order.includes(accountId)) {
          // Account is already in the order list of a food with the same type and date
          const errorMessage = `You have already ordered a ${foodType} for ${location.state.date} (${f.name}).`;
          alert(errorMessage);
          return;
        }
      }
    
      
      const foodRef = ref(db, "/account/" + canteenIndex + "/days/"  );
      const foodsList = daysList[dayIndex].foods.filter(Boolean)
      const foodOrder = foodsList[foodIndex].order;
      if (!foodOrder){
        console.log("empty")
        foodsList[foodIndex]['order'] = [accountId];
        daysList[dayIndex]['foods'] = foodsList
        set(foodRef,daysList);
        return;
      }
      
      daysList[dayIndex].foods[foodIndex]['order'].push(accountId)
      set(foodRef,daysList);
    }

  return (
    <div className='canteenFoodDetail'>
      <h1> Date </h1>
      <p>{location.state.date}</p>
      <h2 > Food name </h2>
      <p> {location.state.food.name} </p> 
      <button onClick={()=>{
          navigate('/userfoodpick', {state:{id: location.state.id, date:location.state.date, accounts: location.state.accounts }})
        }}>Back</button>
        <button onClick={()=>{
          updateFoodOrder(location.state.food)
          navigate('/userfoodpick', {state:{id: location.state.id, date:location.state.date, accounts: location.state.accounts }})
        }}>Order</button>

    </div>
  );
}

export default UserFoodDetail;