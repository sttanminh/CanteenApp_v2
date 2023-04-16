import '../../general.scss';
import '../../css/UserFoodPick.scss'
import { useNavigate,useLocation } from 'react-router-dom';
import { onValue, ref ,set} from "firebase/database";
import db from '../../firebase'
import { useState,useEffect,useRef } from "react"

function UserFoodPick() {
  const navigate = useNavigate();
  const location = useLocation();
  const accountRef = ref(db, "/account");
  const [accounts, setAccount] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [foodList, setFoodList] = useState([]);

  // Load account
  useEffect(() => {
    const query = ref(db, "account");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      let temp_list = []
      if (snapshot.exists()) {
        Object.values(data).map((acc) => {
          temp_list.push(acc)
          setAccount(temp_list);
        });
       
      }
      temp_list = []
      setIsLoading(false)
    });
    
  }, []);

// Render loading spinner if data is still loading
if (isLoading) {
  return <div>Loading...</div>
}


function handleFoodSelection(food, canteenIndex) {
  food['canteenId'] = canteenIndex
  const updatedFoodList = [...foodList];
  const existingIndex = updatedFoodList.findIndex(f => f.id === food.id && f.canteenId === canteenIndex);
  if (existingIndex !== -1) {
    updatedFoodList.splice(existingIndex, 1);
  } else {
    updatedFoodList.push({ ...food, canteenId: canteenIndex });
  }
  setFoodList(updatedFoodList);
  console.log(updatedFoodList)
  console.log("Food:", foodList)
}

function listingFood(foods, type, canteen) {
  if (!accounts || foods.length === 0) {
    return (
      <div>
        <p>Nothing available for {type} session in canteen {canteen}</p>
      </div>
    )
  }
  return (
    <ul>
      {foods.filter(i => i.type === type).map(i => (
        <li key={i.id}>
          <label>
            <input
              type="checkbox"
              
              onChange={() => 
                handleFoodSelection(i,canteen)}
            />
            <span onClick={() => navigate('/userfooddetail', { state: { food: i, date: location.state.date, id: location.state.id, accounts: accounts, canteen: canteen } })}>{i.name}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}

  
  function getFoodByDate(canteen, date, account){
    const daysList = account[canteen].days.filter(Boolean)
    for (var i = 0; i < daysList.length; i++){
      if (daysList[i].date == date){
        if (!daysList[i].foods){
          console.log("not thing yet")
          return []
        }
        let foods = daysList[i].foods
        return foods
      }
    }
    return []
  }

    
  


  function submitFoodSelection() {
    const canteenIndex = 0; // replace with the actual canteen index
    const dayIndex = getDayIndexByDate(canteenIndex, location.state.date);
    const foodRef = ref(db, `/account/${canteenIndex}/days/${dayIndex}/foods`);
    console.log("Food:", foodList)
  
    
    

    // Display a confirmation message
    const confirmation = window.confirm(`You have ordered the following items:\n${foodList.map(food => `- ${food.name}`).join('\n')}\n\nDo you confirm your selection?`);
    if (confirmation) {
      // Iterate through the selected food items and add them to the database
      foodList.forEach(food => {
        updateFoodOrder(food, canteenIndex, dayIndex, foodRef);
      });
      alert('Your order has been submitted successfully!');
      setFoodList([]); // clear the foodList state
      window.location.reload()
    } else {
      // do nothing
    }
  }
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
    
    // Function to get the index of a food by its id in a day's foods array
    function getFoodIndexById(canteenIndex, dayIndex, foodId) {
      const daysList = location.state.accounts[canteenIndex].days.filter(Boolean)
      const foods = daysList[dayIndex].foods.filter(food => food != null);
      const foodIndex = foods.findIndex(food => food.id === foodId);
      console.log('Food:', foods[foodIndex]);
      return foodIndex;
    }

  function updateFoodOrder(food){
    const canteenIndex = food.canteenId;
    const dayIndex = getDayIndexByDate(canteenIndex, location.state.date);
    const foodIndex = getFoodIndexById(canteenIndex, dayIndex, food.id);
    const foodType = food.type;
    const accountId = location.state.id;
    const daysList = accounts[canteenIndex].days.filter(Boolean)
    const foods = daysList[dayIndex].foods.filter(food => food != null);
    
    
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
    console.log(daysList[dayIndex].foods[foodIndex]['order'])
    daysList[dayIndex].foods[foodIndex]['order'].push(accountId)
    console.log(daysList[dayIndex].foods[foodIndex]['order'])
    set(foodRef,daysList);
  }

  return (
    <div id='userFoodPick'>
      {console.log(accounts)}
      <button onClick={()=>{navigate('/userdb',{state:{id: location.state.id }})}} id="back"> back </button>
      <h1>Canteen 1</h1>
      <label id='sessionLabel'>Morning: </label>
      <ul>
        {listingFood(getFoodByDate(0,location.state.date,accounts), "morning",0)}
      </ul>
      <label id='sessionLabel'>Lunch: </label>
      <ul>
        {listingFood(getFoodByDate(0,location.state.date,accounts), "lunch",0)}
      </ul>

      <h1>Canteen 2</h1>
      <label id='sessionLabel'>Morning: </label>
      <ul>
        {listingFood(getFoodByDate(1,location.state.date,accounts), "morning",1)}
      </ul>
      <label id='sessionLabel'>Lunch: </label>
      <ul>
        {listingFood(getFoodByDate(1,location.state.date,accounts), "lunch",1)}
      </ul>
      <button onClick={()=>{
        submitFoodSelection()
      }}> Order </button>
    </div>
  );
}


  
  export default UserFoodPick;