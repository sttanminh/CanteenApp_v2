import '../../general.scss';
import '../../css/CanteenAddFood.scss'
import { useNavigate } from 'react-router-dom';

function CanteenAddFood() {
  let navigate = useNavigate()

  return (
    <div className='canteenAddFood'>
      <h1> Date </h1>
      <input placeholder='Food name'></input> 
      <button onClick={()=>{
          navigate('/canteenfoodorder')
        }}>Add</button>
      <button onClick={()=>{
          navigate('/canteenfoodorder')
        }}>Cancel</button>

    </div>
  );
}

export default CanteenAddFood;