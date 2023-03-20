import '../../css/UserDB.scss'
import '../../general.scss';
import db from '../../firebase'
import { onValue, ref ,set} from "firebase/database";
import {useState,useEffect,useRef} from 'react'
import { useNavigate,useLocation } from 'react-router-dom';



function UserDB() {
  const navigate = useNavigate();
  const [accounts, setAccount] = useState([])
  const today = new Date()
  const canteen1Index = 0
  const canteen2Index = 1
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let currentDate = `${day}/${month}/${year}`;
  console.log(currentDate);


  useEffect(() => {
    if (accounts){
      setAccount([])
    }
    const query = ref(db, "account");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      let temp_list = []
      if (snapshot.exists()) {
        for (var i = 0; i < 2; i++) {
          temp_list.push(Object.values(data)[i])
        }
      }
      setAccount(temp_list);
      temp_list = []
      }
    );
    
    
    }, []);

    function getFoodByDate(canteen, date, account){
      let foods = []
      let canteenID = -1
      if (canteen == 1) {
        canteenID = canteen1Index
      }
      else{
        canteenID = canteen2Index
      }
      for (var i = 0; i < account[canteenID].days.length; i++){
        if (account[canteenID].days[i].date == date){
          if (account[canteenID].days[i].foods){
            console.log("not thing yet")
            return []
          }
          
          foods = account[canteenID].days[i].foods
          return foods
        }
      }
    }

    function getAvailableDay(){
      let days = []
      for (let i = 0; i < accounts.length; i++){
        for (let j = 0; j < accounts[i].days.length; j++){
          if (!(days.includes(accounts[i].days[j].date)) && (accounts[i].days[j].foods) ){
            days.push(accounts[i].days[j].date)
          }

        }
      }
      console.log(days)
      return days
    }



  function stringToDateConverter(dateString){
    var dateParts = dateString.split("/");
    var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    return dateObject
  }


  function listing(items){
    return (
      items.map(d =>
        <div>
          <button  onClick={()=>{
        navigate('/userfoodpick')
      }} > {d} </button>
        </div>)
    )
  }

  



    return (
      <div className='userDB'>
        <button id="logout" onClick={()=>{
        navigate('/login')
      }}> Log out</button>
        <h1 id="userId"> 403 </h1>
        <h2> User dashboard:</h2>

        <div id="fooddiv">{listing(getAvailableDay())}</div>
        
       
      </div>
    );
  }
  
  export default UserDB;