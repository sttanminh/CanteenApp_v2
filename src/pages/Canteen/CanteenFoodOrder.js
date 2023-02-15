import '../../general.scss';
import '../../css/CanteenFoodOrder.scss'
import { useNavigate,useLocation } from 'react-router-dom';
import { onValue, ref ,set} from "firebase/database";
import {useState,useEffect,useRef} from 'react'
import db from '../../firebase'

function CanteenFoodOrder() {

  let navigate = useNavigate()
  const accountRef = ref(db, "/account")
  const [accounts, setAccount] = useState([])
  const [foods, setFoods] = useState([])
  const [morningState, setMorning] = useState([])
  const [lunchState, setLunch] = useState([])
  const location = useLocation();
  


function listingFood(foodList){
  console.log(foodList)
  return(
    foodList.map(i=>
          <li>
              <button  onClick={()=>{
                navigate('/canteenfooddetail', {state:{id: location.state.id, dateIndex: location.state.dateIndex}})
              }}> {i.name}</button>
          </li>
      )

  )
}


function getFoods(accs) {
  for (let i = 0; i < accs.length; i++) {
    if (accs[i].id == location.state.id){
      if (accs[i].days[location.state.dateIndex].foods == undefined){
        console.log("empty")
        return 
      }
      setFoods( accs[i].days[location.state.dateIndex].foods )
      console.log(foods)


      return
      
    
    }
  }
}

  function getFoodByType(foods,type){
    var list = []
    for (let i = 0; i < foods.length; i++) {
      if (foods[i].type == type){
        list.push(foods[i])
      }
    }
    console.log(list)
    return list
  }





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
          temp_list.push(acc)
          setAccount(temp_list);

        });
       
      }

      getFoods(temp_list)


      temp_list = [] 



    });
    
    }, []);
   
    


    return (
      <div className='canteenFoodOrder'>
        <button id="back" onClick={()=>{
        navigate('/canteenupdateschedule', {state:{id: location.state.id}})
      }}> back </button>
        <label id='sessionLabel'>Morning: </label>
        <button onClick={()=>{
          navigate('/canteenaddfood', {state:{id: location.state.id, type: "morning", dateIndex: location.state.dateIndex}})
        }} id='add'>+</button>
        <ul>
          {
            listingFood(getFoodByType(foods,"morning"))
            }

        </ul>
        <label id='sessionLabel'>Lunch: </label>
        <button onClick={()=>{
          navigate('/canteenaddfood', {state:{id: location.state.id, type: "lunch", dateIndex: location.state.dateIndex}})
        }}  id='add'>+</button>
        <ul>
          {listingFood(getFoodByType(foods,"lunch"))}
        </ul>
       
      </div>
    );
  }
  
  export default CanteenFoodOrder;