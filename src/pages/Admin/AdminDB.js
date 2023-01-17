import '../../general.scss';
import '../../css/AdminDB.scss';
import { useNavigate } from 'react-router-dom';

function AdminDB() {

    const navigate = useNavigate();


    return (
      <div>
        <button id="logout" onClick={()=>{
          navigate('/login')
        }}> Log out</button>

        <div className='admindb'>
            <button>Add user</button>
            <button>Update schedule</button>
            <button>Food order</button>
            <button>Search user</button>
        </div>


      </div>
    );
  }
  
  export default AdminDB;