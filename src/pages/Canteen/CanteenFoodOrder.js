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
  const location = useLocation();
  var morning = []
  var lunch = []


function listingFood(foods){
  return(
    foods.map(i=>
          <li>
              <button  onClick={()=>{
        navigate('/canteenfooddetail')
      }}> {i}</button>
          </li>
      )

  )
}
function updateFood(foods){}


function getFoods() {
  console.log(location.state.dateIndex)
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].id == location.state.id){
      if (accounts[i].days[location.state.dateIndex].foods == undefined){
        console.log("empty")
        return 
      }
      console.log(accounts[i].days[location.state.dateIndex].foods)
    }
  }
}





  useEffect(() => {
    const query = ref(db, "account");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        Object.values(data).map((acc) => {
          setAccount((accounts) => [...accounts, acc]);
        });
       
      }
    });
    
    }, []);

   



    return (
      <div className='canteenFoodOrder'>
        {/* <button  onClick={()=>{
        getFoods()
      }}> test </button>  */}
        <button id="back" onClick={()=>{
        navigate('/canteenupdateschedule', {state:{id: location.state.id}})
      }}> back </button>
        <label id='sessionLabel'>Morning: </label>
        <button onClick={()=>{
          navigate('/canteenaddfood', {state:{id: location.state.id, type: "morning", dateIndex: location.state.dateIndex}})
        }} id='add'>+</button>
        <ul>
          {listingFood(morning)}
        </ul>
        <label id='sessionLabel'>Lunch: </label>
        <button onClick={()=>{
          navigate('/canteenaddfood', {state:{id: location.state.id, type: "lunch", dateIndex: location.state.dateIndex}})
        }}  id='add'>+</button>
        <ul>
          {listingFood(lunch)}
        </ul>
       
      </div>
    );
  }
  
  export default CanteenFoodOrder;