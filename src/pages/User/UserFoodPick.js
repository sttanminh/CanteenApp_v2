import '../../general.css';
import '../../css/UserFoodPick.css'

function UserFoodPick() {


  var morning = ["A","B","C","D","E"]
  var lunch = ["A","B","C"]
  var night = ["A","B","C"]

  function listingFood(foods){
    return(
      foods.map(i=>
            <li>
                <button > {i}</button>
            </li>
        )

    )
  }



    return (
      <div>
        <button id="back"> back </button>
        <label>Morning: </label>
        <ul>
          {listingFood(morning)}
        </ul>
        <label>Lunch: </label>
        <ul>
          {listingFood(lunch)}
        </ul>
        <label>Dinner: </label>
        <ul>
          {listingFood(night)}
        </ul>

      </div>
    );
  }
  
  export default UserFoodPick;