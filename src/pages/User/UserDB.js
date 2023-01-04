import '../../css/UserDB.css'




function UserDB() {
  var foodList = ["Dish A","Dish B","Dish C","Dish 8","Dish 7","Dish 6","Dish 5","Dish 3","Dish 4"]
  
  function FoodListing(){
    return (
      foodList.map(d =>
        <div>
          <button id="food"> {d} </button>
        </div>)
    )
  }




    return (
      <div>
        <button id="logout"> Log out</button>
        <h1 id="userId"> 403 </h1>
        <h2> Current week:</h2>
        {FoodListing()}
       
      </div>
    );
  }
  
  export default UserDB;