import '../../general.scss';
import '../../css/CanteenFoodDetail.scss'
import { useNavigate, useLocation } from 'react-router-dom';


function CanteenFoodDetail() {
    let navigate = useNavigate()
    let location = useLocation()


  return (
    <div className='canteenFoodDetail'>
      <h1> Date </h1>
      <h2 > Food name </h2> 
      <button onClick={()=>{
          navigate('/canteenfoodorder', {state:{id: location.state.id, dateIndex: location.state.dateIndex}})
        }}>Back</button>

    </div>
  );
}

export default CanteenFoodDetail;