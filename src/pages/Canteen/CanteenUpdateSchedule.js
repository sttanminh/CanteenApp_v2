import '../../general.scss';
import '../../css/CanteenUpdateSchedule.scss';
import { useNavigate } from 'react-router-dom';

function CanteenUpdateSchedule() {

  const navigate = useNavigate();
  let demeDayList = ["1","2","3","4","5"]


  function listingDay(days){
    return(
      

      days.map(i=>
            <li>
                <button onClick={()=>{
        navigate('/canteenfoodorder')
      }}> {i}</button>
            </li>
        )

    )
  }

    return (
      
      <div className='canteenUpdateSchedule'>
        <button id="back" onClick={()=>{
              navigate('/canteendb')
            }}> back </button>
           <label>Choose a date</label>
          {listingDay(demeDayList)}
      </div>
    );
  }
  
  export default CanteenUpdateSchedule;