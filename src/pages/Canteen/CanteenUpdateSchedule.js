import '../../general.scss';
import '../../css/CanteenUpdateSchedule.scss';

function CanteenUpdateSchedule() {

  let demeDayList = ["1","2","3","4","5"]


  function listingDay(days){
    return(
      days.map(i=>
            <li>
                <button > {i}</button>
            </li>
        )

    )
  }

    return (
      <div className='canteenUpdateSchedule'>
           <label>Choose a date</label>
          {listingDay(demeDayList)}
      </div>
    );
  }
  
  export default CanteenUpdateSchedule;