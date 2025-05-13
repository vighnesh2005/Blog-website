import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Mycontext from '../context_folder/context';
function Navbar() {
  const { isLoggedIn, setIsLoggedIn, setUser, setToken } = useContext(Mycontext);
  const [loginfo, setLoginfo] = useState(isLoggedIn);
  const [searchvalue,setSearchvalue] = useState("");

  useEffect(() => {
    setLoginfo(isLoggedIn);
  }, [isLoggedIn]);

  function handlelogout() {
    setIsLoggedIn(false);
    setUser("");
    setToken("");
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setLoginfo(false);
  }

  const authLinks = loginfo ? (
    <>
      <Link to="/myprofile" className="profile">Profile</Link>
      <button className='logout' onClick={handlelogout}>Logout</button>
    </>
  ) : (
    <>
      <Link to="/login" className="login">Login</Link>
      <Link to="/signup" className="signup">Sign Up</Link>
    </>
  );
  const navigate = useNavigate();
  const handleSubmit = ()=>{
    navigate(`/search/${searchvalue}`)
  }

  return (
    <nav className="navbar">
      <div className="navbar__logo">Blog Buddy</div>
      <div className="essentials">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="search-bar" id="search-bar" value={searchvalue} onChange={(e)=>(setSearchvalue(e.target.value))}/>
        <button type="submit" className="search-button">Search</button>
      </form>
      <div className="navbar__auth">
        {authLinks}
      </div>
    </nav>
  );
}

export default Navbar;
