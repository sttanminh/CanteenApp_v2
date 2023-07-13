import { useState, useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { useNavigate,useLocation } from 'react-router-dom';
import db from "../../firebase";
import '../../css/CanteenSearch.scss'


function CanteenSearch() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [orderedFoodList, setOrderedFoodList] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = ref(db, "account");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      let temp_list = [];
      if (snapshot.exists()) {
        Object.values(data).map((acc) => {
          temp_list.push(acc);
          setAccounts(temp_list);
        });
      }
      temp_list = [];
      setIsLoading(false);
    });
  }, []);

  const handleSearch = () => {
    const dateString = selectedDate.toString();
    const dateParts = dateString.split("-");
    const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    console.log(formattedDate)

    if (!selectedDate || !searchValue) {
      return;
    }


    const orderedFoods = [];
    //Check in canteen 1
    let canteen1 = accounts[1]
    let canteen1_day = null
    console.log(canteen1)
    for (let i=0; i< canteen1.days.length; i++ ){

      if (canteen1.days[i].date == formattedDate){
        canteen1_day = canteen1.days[i]
        for ( let j = 0; j < canteen1_day.foods.length; j++){
          let food = canteen1_day.foods[j]
          console.log(food)
          for (let k=0; k < food.order.length; k++ ){
            if (food.order[k] == searchValue){
              orderedFoods.push(food)
            }
          }
        }
        break
      }
    }

    setOrderedFoodList([...orderedFoods])
    //Check in canteen 2
    let canteen2 = accounts[2]

  }


  function foodordered(foodlist, type){
    let res = []
    for (let i = 0; i < foodlist.length; i ++){
      let food = foodlist[i]
      if (type == food.type){
        res.push(food)
      }
    }
    return (
      res.map(i =>
        <div>
          <p> {i.name} - C{i.canteenId} </p>
        </div>)
    )
  }




  // Render loading spinner if data is still loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="CanteenSearch">
      <button onClick={()=>{navigate('/canteendb',{state:{id: location.state.id }})}} id="back"> back </button>
      <input
        id="idinput"
        type="text"
        placeholder="UserID"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      <button id="searchButton" onClick={handleSearch}>Search</button>
      {foodordered(orderedFoodList, "lunch")}
    
    </div>
  );
}

export default CanteenSearch;
