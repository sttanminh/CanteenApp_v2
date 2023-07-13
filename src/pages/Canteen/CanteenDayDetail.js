import '../../general.scss';
// import '../../css/CannteenDayDetail.scss'
import { useNavigate,useLocation } from 'react-router-dom';
import { onValue, ref ,set} from "firebase/database";
import db from '../../firebase'
import { useState,useEffect,useRef } from "react"


function CanteenDayDetail() {

  const navigate = useNavigate();
  const location = useLocation();
  const accountRef = ref(db, "/account");
  const [accounts, setAccount] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

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
      setIsLoading(false)
    });
  }, []);

  // Function to get the food details for a specific date and session
  function getFoodDetails(date, session) {
    let user 
    if (location.state.id  == 1){
      user = "canteen01"
    }
    else{
      user = "canteen02"
    }
    const canteen = accounts.find(acc => acc.username === user);
    const day = canteen.days.find(d => d.date === date);
    const foods = day.foods.filter(f => f.type === session);
    return foods.map(f => ({
      name: f.name,
      orderCount: Array.isArray(f.order) ? f.order.length : f.order || 0
    }));
  }

  // Render loading spinner if data is still loading
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <button onClick={()=>{
        navigate('/canteendays', {state: {id: location.state.id}})
      }}> Back</button>
      <h1>Canteen 1</h1>

      <h2>Morning</h2>
      {getFoodDetails(location.state.date, "morning").map(f => (
        <div>
          <p>{f.name} - Orders: {f.orderCount}</p>
        </div>
      ))}

      <h2>Lunch</h2>
      {getFoodDetails(location.state.date, "lunch").map(f => (
        <div>
          <p>{f.name} - Orders: {f.orderCount}</p>
        </div>
      ))}

    </div>
  );
}

export default CanteenDayDetail;
