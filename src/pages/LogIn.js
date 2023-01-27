import '../general.scss';
import '../css/LogIn.scss'
import { useNavigate } from 'react-router-dom';
import db from '../firebase'
import { onValue, ref } from "firebase/database";
import { useState,useEffect,useRef } from "react"



function LogIn() {

  let navigate = useNavigate()
  const accountRef = ref(db, "/account")
  const [accounts, setAccount] = useState([])
  let userame = ""
  let password = ""



  useEffect(() => {
    if (accounts.lengtht == 0) {
      return 
    }
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

    function login(username, password){
      
      for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].username == username){
          if (accounts[i].password == password){
            if (accounts[i].type == "admin"){
              navigate('/admindb')
              return
            }
            else if (accounts[i].type == "user"){
              navigate('/userdb')
              return
            }
            else if (accounts[i].type == "canteen"){
              navigate('/canteendb')
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
          <input placeholder="Username" onChange={(e) => userame = e.target.value}></input>
        </div>

        <div>
          <label>Password</label>
          <input placeholder="Username" onChange={(e) => password = e.target.value}></input>
        </div>

        <button onClick={()=>{
          console.log(accounts)
          console.log(password)
          login(userame,password)
        }}>Log in</button>
      </div>
    );
  }
  
  export default LogIn;