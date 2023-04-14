import '../../general.scss';
// import '../../css/CannteenDayDetail.scss'
import { useNavigate,useLocation } from 'react-router-dom';
import { onValue, ref ,set} from "firebase/database";
import db from '../../firebase'
import { useState,useEffect,useRef } from "react"


function CanteenDays() {
    const navigate = useNavigate();
    const location = useLocation();
    const accountRef = ref(db, "/account");
    const [accounts, setAccount] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
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
    
    // Get all the days for Canteen 1
    console.log(accounts[location.state.id])
    const canteenDays = accounts[location.state.id].days.filter(Boolean);
    
    return (
        <div>
        <button onClick={()=>{
        navigate('/canteendb', {state: {id: location.state.id}})
      }}> Back</button>
        <h1>Canteen 1</h1>
        {canteenDays.map(day => (
            <button onClick={() => navigate('/canteendaydetail', { state: { id: location.state.id, date: day.date } })}>
            {day.date}
            </button>
        ))}
        </div>
    );
    }
      

export default CanteenDays;
