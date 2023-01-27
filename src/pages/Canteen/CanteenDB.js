import '../../general.scss';
import { useNavigate } from 'react-router-dom';

function CanteenDB() {
  const navigate = useNavigate();


  return (
    <div>
      <button id="logout" onClick={()=>{
        navigate('/login')
      }}> Log out</button>

      <div className='admindb'>
          <button onClick={()=>{
        navigate('/canteenupdateschedule')
      }}>Update schedule</button>
          <button>Food order</button>
          <button>Search user</button>
      </div>


    </div>
  );
}
  
  
  export default CanteenDB;