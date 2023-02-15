import '../../general.scss';
import '../../css/CanteenAddFood.scss'
import { useNavigate,useLocation } from 'react-router-dom';
import {useState,useEffect,useRef} from 'react'
import { onValue, ref ,set} from "firebase/database";
import db from '../../firebase'
import uuid from 'react-uuid';


function CanteenAddFood() {
  let navigate = useNavigate()
  const location = useLocation();
  const [accounts, setAccount] = useState([])
  let foodName = ""


  useEffect(() => {
    if (accounts){
      setAccount([])
    }
    const query = ref(db, "account");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      let temp_list = []
      if (snapshot.exists()) {
        Object.values(data).map((acc) => {
          console.log(acc)
          temp_list.push(acc)
          setAccount(temp_list);
        });
       
      }
      temp_list = []
    });
    
    
    }, []);

  function updateFood(food){

    var foodObj = {
      name: food,
      type: location.state.type,
      order: 0,
      id: uuid()

    }
    

    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].id == location.state.id){
        
        const foodRef = ref(db, "/account/" + i + "/days/" + location.state.dateIndex)
        if (accounts[i].days[location.state.dateIndex].foods == undefined){
          console.log("empty")
          accounts[i].days[location.state.dateIndex].foods = [foodObj]
          set(foodRef,accounts[i].days[location.state.dateIndex])
          return 
        }
        accounts[i].days[location.state.dateIndex].foods.push(foodObj)
        set(foodRef,accounts[i].days[location.state.dateIndex])
        console.log(accounts[i].days[location.state.dateIndex].foods)
      }
    }
  }


  useEffect(() => {

    console.log(location.state.dateIndex)

    }, []);


  return (
    <div className='canteenAddFood'>
      <h1> Date </h1>
      <input placeholder='Food name' onChange={(e) => foodName = e.target.value }></input> 
      <button onClick={()=>{
          updateFood(foodName)
          navigate('/canteenfoodorder', {state:{id: location.state.id, type: "lunch", dateIndex: location.state.dateIndex}})
        }}>Add</button>
      <button onClick={()=>{
          navigate('/canteenfoodorder', {state:{id: location.state.id, type: "lunch", dateIndex: location.state.dateIndex}})
        }}>Cancel</button>

    </div>
  );
}

export default CanteenAddFood;