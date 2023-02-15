import '../../general.scss';
import '../../css/CanteenUpdateSchedule.scss';
import { useNavigate,useLocation } from 'react-router-dom';
import db from '../../firebase'
import { onValue, ref ,set} from "firebase/database";
import {useState,useEffect,useRef} from 'react'

function CanteenUpdateSchedule() {



  const accountRef = ref(db, "/account")
  const [accounts, setAccount] = useState([])
  const navigate = useNavigate();
  const location = useLocation();
  let [daylist, setDaylist] = useState([])
  let id
  
 



  function getDays() {
    console.log(location.state.id)
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].id == location.state.id){
        if (accounts[i].days == undefined ){
          setDaylist([])
        }
        else{
          setDaylist(accounts[i].days)
        }
    }
  }
}

function updateDays(id,date){

  let day = {
    date: date,
    foods: []
  }

  console.log(accounts)
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].id === location.state.id){
      const acc = ref(db, "/account/" + i )
      if (accounts[i].days == undefined){
        let temp_days = [day]
        accounts[i].days = temp_days
        set(acc,accounts[i])

      }
      else{
        accounts[i].days.push(day)
        set(acc,accounts[i])
      }
    } 
  }

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
          console.log(acc)
          temp_list.push(acc)
          setAccount(temp_list);
        });
       
      }
      temp_list = []
    });
    
    
    }, []);


    useEffect(()=>{
      getDays()
    },[accounts])

  

  function listingDay(){

    return(
      
      
      daylist.map((i, index)=>
            <li>
                <button onClick={()=>{
                  console.log(location.state.id)
                  console.log(index)
                  navigate('/canteenfoodorder', {state:{id: location.state.id, date: i.date, dateIndex: index}})
      }}> {i.date}</button>
            </li>
        )

    )
  }

    return (
      
      <div className='canteenUpdateSchedule'>
        <button id="add" onClick={()=>{
          updateDays(id, "03/09/2023")
        }}> + </button>
        <button id="back" onClick={()=>{
              navigate('/canteendb', {state:{id: location.state.id}})
            }}> back </button>
           <label>Choose a date</label>
          {listingDay()}
      </div>
    );
  }
  
  export default CanteenUpdateSchedule;