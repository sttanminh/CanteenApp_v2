import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import db from '../../firebase';
import { onValue, ref, set } from 'firebase/database';

import '../../general.scss';
import '../../css/CanteenUpdateSchedule.scss';

function CanteenUpdateSchedule() {
  const accountRef = ref(db, '/account');
  const [accounts, setAccount] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [daylist, setDaylist] = useState([]);
  const [selectedDate, setSelectedDate] = useState(''); // Selected date state

  function getDays() {
    console.log(location.state.id);
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].id == location.state.id) {
        if (accounts[i].days == undefined) {
          setDaylist([]);
        } else {
          setDaylist(accounts[i].days);
        }
      }
    }
  }

  function updateDays(date) {
    console.log(date)
    if (date.length != 10){ // check format of dd/mm/yyyy
      window.alert("Please input date")
      return 
    }
    for (let i=0 ; i< daylist.length;i++ ){
      console.log(daylist[i].date)
      if (date == daylist[i].date){
        window.alert("date existed")
        return 
      }
    }
    const confirmed = window.confirm('Do you want to add the date' + date + '?');
    if (confirmed) {
    }
    else{
      return
    }

    let day = {
      date: date,
      foods: [],
    };

    console.log(accounts);
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].id === location.state.id) {
        const acc = ref(db, '/account/' + i);
        if (accounts[i].days == undefined) {
          let temp_days = [day];
          accounts[i].days = temp_days;
          set(acc, accounts[i]);
        } else {
          accounts[i].days.push(day);
          set(acc, accounts[i]);
        }
      }
    }
  }

  useEffect(() => {
    if (accounts) {
      setAccount([]);
    }
    const query = ref(db, 'account');
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      let temp_list = [];
      if (snapshot.exists()) {
        Object.values(data).map((acc) => {
          console.log(acc);
          temp_list.push(acc);
          setAccount(temp_list);
        });

        temp_list = [];
      }
    });
  }, []);

  useEffect(() => {
    getDays();
  }, [accounts]);

  function listingDay() {
    return daylist.map((i, index) => (
      <li>
        <button
          onClick={() => {
            navigate('/canteenfoodorder', {
              state: { id: location.state.id, date: i.date, dateIndex: index },
            });
          }}
        >
          {i.date}
        </button>
      </li>
    ));
  }

  return (
    <div className="canteenUpdateSchedule">
      <button className='add'
        id="add"
        onClick={() => {
          const dateString = selectedDate.toString();
          const dateParts = dateString.split("-");
          const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
          updateDays(formattedDate);
        }}
      >
        +
      </button>
      <button className='backbutton'
        id="back"
        onClick={() => {
          navigate('/canteendb', { state: { id: location.state.id } });
        }}
      >
        back
      </button>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      {listingDay()}
    </div>
  );
}

export default CanteenUpdateSchedule;
