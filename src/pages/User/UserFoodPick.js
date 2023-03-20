import '../../general.scss';
import '../../css/UserFoodPick.scss'
import { useNavigate } from 'react-router-dom';

function UserFoodPick() {
  const navigate = useNavigate();


  var morning = ["A","B","C","D","E","B","C","D","B","C","D"]
  var lunch = ["A","B","C"]
  var night = ["A","B","C"]

  function listingFood(foods){
    return(
      foods.map(i=>
            <li>
                <button onClick={()=>{
        navigate('/userfooddetail')
      }}> {i}</button>
            </li>
        )

    )
  }



    return (
      <div id='userFoodPick'>
        <button onClick={()=>{
        navigate('/userdb')
      }} id="back"> back </button>
        <label id='sessionLabel'>Morning: </label>
        <ul>
          {listingFood(morning)}
        </ul>
        <label id='sessionLabel'>Lunch: </label>
        <ul>
          {listingFood(lunch)}
        </ul>
        <label id='sessionLabel'>Dinner: </label>
        <ul>
          {listingFood(night)}
        </ul>

      </div>
    );
  }
  
  export default UserFoodPick;