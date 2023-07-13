import '../general.scss';
import '../css/LogIn.scss'
import { useNavigate,useLocation } from 'react-router-dom';
import db from '../firebase'
import { onValue, ref ,set} from "firebase/database";
import { useState,useEffect,useRef } from "react"



function LogIn({route,navigation }) {
  

  let navigate = useNavigate()
  const accountRef = ref(db, "/account")
  const [accounts, setAccount] = useState([])
  let username = ""
  let password = ""

  function updateDays(id,date){
    let day = {
      date: date,
      foods: []
    }
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].id === id){
        console.log(accounts[i].days)
        accounts[i].days.push(day)
      } 
    }
    set(accountRef,accounts)

  }

  function resetDatabase() {
    let current = []
    for (let i = 0; i< 3; i++ ) {
      current.push(accounts[i])
    }
    
    set(accountRef,current)
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

    function login(username, password){
      set(accountRef,accounts)
      for (let i = 0; i < accounts.length; i++) {
        console.log(i)
        if (accounts[i].username == username){
          if (accounts[i].password == password){
            if (accounts[i].type == "admin"){
              navigate('/admindb',{state: {id: accounts[i].id}})
              return
            }
            else if (accounts[i].type == "user"){
              console.log(accounts[i])
              console.log(accounts[i].id)
              navigate('/userdb',{state: {id: accounts[i].id}})
              return
            }
            else if (accounts[i].type == "canteen"){
              console.log(accounts[i].id)
              navigate('/canteendb',{state: {id: accounts[i].id}})
              return
            }
          }
        } 
      }


      window.alert("User or password incorrect")
    }

  

    return (
      <div className='login'>
       
        <div>
          <label>User Name</label>
          <input placeholder="Username" onChange={(e) => username = e.target.value}></input>
        </div>

        <div>
          <label>Password</label>
          <input placeholder="Username" onChange={(e) => password = e.target.value}></input>
        </div>

        <button onClick={()=>{
          console.log(username,password)
          login(username,password)
        }}>Log in</button>
      </div>
    );
  }
  
  export default LogIn;