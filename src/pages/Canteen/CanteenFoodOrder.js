import '../../general.scss';
import '../../css/CanteenFoodOrder.scss'
import { useNavigate } from 'react-router-dom';

function CanteenFoodOrder() {

  let navigate = useNavigate()
  var morning = ["A","B","C","D","E","B","C","D","B","C","D"]
  var lunch = ["A","B","C"]
  var night = ["A","B","C"]

  function listingFood(foods){
    return(
      foods.map(i=>
            <li>
                <button  onClick={()=>{
          navigate('/canteenfooddetail')
        }}> {i}</button>
            </li>
        )

    )
  }



    return (
      <div className='canteenFoodOrder'>
        <button id="back"> back </button>
        <label id='sessionLabel'>Morning: </label>
        <button onClick={()=>{
          navigate('/canteenaddfood')
        }} id='add'>+</button>
        <ul>
          {listingFood(morning)}
        </ul>
        <label id='sessionLabel'>Lunch: </label>
        <button onClick={()=>{
          navigate('/canteenaddfood')
        }}  id='add'>+</button>
        <ul>
          {listingFood(lunch)}
        </ul>
        <label id='sessionLabel'>Dinner: </label>
        <button onClick={()=>{
          navigate('/canteenaddfood')
        }} id='add'>+</button>
        <ul>
          {listingFood(night)}
        </ul>
      </div>
    );
  }
  
  export default CanteenFoodOrder;