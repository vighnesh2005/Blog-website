import { Link } from "react-router-dom";

function Myprofile() {
  return (
    <div className="Profile">
      <div className="myprofile">
        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" style={{width: "200px"}} />
        <h1>Vighnesh</h1>
      <p>This is a description....</p>
      <Link to="/myblogs">my blogs</Link>
      <form method="POST" action="/profpic">
        <input type="file" placeholder="change profpic"/>
        <button type="submit">submit</button>
      </form>

      </div>
      
    </div>
  );
}

export default Myprofile;