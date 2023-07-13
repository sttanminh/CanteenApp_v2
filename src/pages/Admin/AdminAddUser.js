import '../../general.scss';
import { ref, set } from "firebase/database";
import db from '../../firebase';
import { useState,useEffect,useRef } from "react"

function AdminAddUser() {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const password = username;
    const id = Math.floor(Math.random() * 10000000) + 1
    // Create a new user object
    const newUser = {
      id: id, // Generate a unique ID
      username: username,
      password: password,
      type: "user",
      days: []
    };

    // Add the new user to the database
    const accountRef = ref(db, 'account/' + newUser.id);
    set(accountRef, newUser);

    // Clear the input field
    setUsername('');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}

export default AdminAddUser;