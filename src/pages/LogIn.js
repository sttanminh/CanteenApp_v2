import '../general.css';
import '../css/LogIn.css'

function LogIn() {
    return (
      <div>
        <div>
          <label>User Name</label>
          <input placeholder="Username"></input>
        </div>

        <div>
          <label>Password</label>
          <input placeholder="Username"></input>
        </div>

        <button> Sign In</button>
      </div>
    );
  }
  
  export default LogIn;