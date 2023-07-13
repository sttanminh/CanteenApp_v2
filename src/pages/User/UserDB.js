import '../../css/UserDB.scss'
import '../../general.scss';
import db from '../../firebase'
import { onValue, ref ,set} from "firebase/database";
import {useState,useEffect,useRef} from 'react'
import { useNavigate,useLocation } from 'react-router-dom';



function UserDB() {
  const navigate = useNavigate();
  const [accounts, setAccount] = useState([])
  const location = useLocation();
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

  


    function getAvailableDay(){
      let days = []
      for (let i = 0; i < accounts.length; i++){
        if (accounts[i].days){
          let daysList = accounts[i].days.filter(Boolean)
          for (let j = 0; j < daysList.length; j++){
            if (!(days.includes(daysList[j].date)) && (daysList[j].foods) ){
              days.push(daysList[j].date)
            }

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
            console.log(location.state.id)
        navigate('/userfoodpick', {state:{id: location.state.id, date:d, accounts: accounts }})
      }} > {d} </button>
        </div>)
    )
  }

  



    return (
      <div className='userDB'>
        <button id="logout" onClick={()=>{
        navigate('/login')
      }}> Log out</button>
        <h2> User dashboard:</h2>

        <div id="fooddiv">{listing(getAvailableDay())}</div>
        {console.log()}
       
      </div>
    );
  }
  
  export default UserDB;