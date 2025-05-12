import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Mycontext from '../context_folder/context';

function Navbar() {
  const { isLoggedIn, setIsLoggedIn, setUser, setToken } = useContext(Mycontext);
  const [loginfo, setLoginfo] = useState(isLoggedIn);

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

  return (
    <nav className="navbar">
      <div className="navbar__logo">Blog Buddy</div>
      <div className="essentials">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <form action="/search" method="post">
        <input type="text" name="search-bar" id="search-bar" />
        <select name="category" id="category">
          <option value="all">author</option>
          <option value="tech">category</option>
          <option value="lifestyle">name of the blog</option>
        </select>
        <button type="submit" className="search-button">Search</button>
      </form>
      <div className="navbar__auth">
        {authLinks}
      </div>
    </nav>
  );
}

export default Navbar;
