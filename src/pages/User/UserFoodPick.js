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

  // Load account
  useEffect(() => {
    const query = ref(db, "account");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      let temp_list = []
      if (snapshot.exists()) {
        Object.values(data).map((acc) => {
          console.log(acc)
          temp_list.push(acc)
          console.log(accounts)
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

  function listingFood(foods, type, canteen){
    if (!accounts || foods.length === 0) {
      return(
        <div>
          <p> nothing yet </p>
        </div>
      )
    }
    console.log(foods);
    return foods.filter(i => i.type === type).map(i => (
      <li>
        <button onClick={() => navigate('/userfooddetail',{state:{food: i, date: location.state.date, id: location.state.id , accounts:  accounts, canteen: canteen }} )}> {i.name}</button>
      </li>
    ));
  }
  
  function getFoodByDate(canteen, date, account){
    console.log(account)
    const daysList = account[canteen].days.filter(Boolean)
    for (var i = 0; i < daysList.length; i++){
      console.log(i)
      console.log(daysList[i].date, date)
      if (daysList[i].date == date){
        if (!daysList[i].foods){
          console.log("not thing yet")
          return []
        }
        console.log(daysList[i].foods)
        let foods = daysList[i].foods
        console.log(foods)
        return foods
      }
    }
    return []
  }

  return (
    <div id='userFoodPick'>
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
    </div>
  );
}


  
  export default UserFoodPick;