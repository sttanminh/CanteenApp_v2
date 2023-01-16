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
      </div>
    );
  }
  
  export default AdminDB;