import '../../general.scss';
import { useNavigate,useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function CanteenDB() {
  const navigate = useNavigate();
  const location = useLocation();
  let id 
  useEffect(()=> {
    id = location.state.id
    console.log(id)
  },[])


  return (
    <div>
      <button id="logout" onClick={()=>{
        navigate('/login')
      }}> Log out</button>

      <div className='admindb'>
          <button onClick={()=>{
        navigate('/canteenupdateschedule', {state: {id: id}})
      }}>Update schedule</button>
          <button>Food order</button>
          <button>Search user</button>
      </div>


    </div>
  );
}
  
  
  export default CanteenDB;