import '../../general.scss';
import '../../css/CanteenFoodDetail.scss'
import { useNavigate } from 'react-router-dom';


function CanteenFoodDetail() {
    let navigate = useNavigate()


  return (
    <div className='canteenFoodDetail'>
      <h1> Date </h1>
      <h2 > Food name </h2> 
      <button onClick={()=>{
          navigate('/canteenfoodorder')
        }}>Back</button>

    </div>
  );
}

export default CanteenFoodDetail;