import '../general.scss';
import '../css/LogIn.scss'

function LogIn() {
    return (
      <div className='login'>
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