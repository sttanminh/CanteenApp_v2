import '../../general.scss';
import '../../css/AdminDB.scss';
import { useNavigate,useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function AdminDB() {

    const navigate = useNavigate();
    const location = useLocation();


    return (
      <div>
        <button id="logout" onClick={()=>{
          navigate('/login')
        }}> Log out</button>

        <div className='admindb'>
            <button onClick={()=>{
        navigate('/adminadduser', {state: {id: location.state.id}})
      }}>Add user</button>
            <button>Update schedule</button>
            <button>Food order</button>
            <button>Search user</button>
        </div>


      </div>
    );
  }
  
  export default AdminDB;