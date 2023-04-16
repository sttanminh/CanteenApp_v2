import { useState, useEffect } from "react";
import { onValue, ref } from "firebase/database";
import db from "../../firebase";

function CanteenSearch() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    for (const canteen of accounts.filter((a) => a.type === 'canteen')) {
      console.log(canteen)
      for (const day of canteen.days) {
        if (day.date === formattedDate && day.foods) {
          for (const food of day.foods) {
            if (canteen.id === 0 || canteen.id === 1) {
              if (Array.isArray(food.order)) {
                for (const order of food.order) {
                  if (order && order.toString() === searchValue) {
                    orderedFoods.push(food);
                    break;
                  }
                }
              }
            }
          }
        }
      }
    }

    console.log(orderedFoods);
  };

  // Render loading spinner if data is still loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter user ID or food name"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default CanteenSearch;
