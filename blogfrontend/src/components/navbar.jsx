import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Mycontext from '../context_folder/context';

function Navbar() {
  const { isLoggedIn, setIsLoggedIn, setUser, setToken } = useContext(Mycontext);
  const [loginfo, setLoginfo] = useState(isLoggedIn);
  const [searchvalue, setSearchvalue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <Link to="/myprofile" className="profile" onClick={() => setIsMenuOpen(false)}>Profile</Link>
      <button className='logout' onClick={handlelogout}>Logout</button>
    </>
  ) : (
    <>
      <Link to="/login" className="login" onClick={() => setIsMenuOpen(false)}>Login</Link>
      <Link to="/signup" className="signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
    </>
  );

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchvalue}`);
    setIsMenuOpen(false);
  }

  return (
    <nav className="navbar">
      <div className="navbar__logo">Blog Buddy</div>
      
      <button 
        className={`hamburger ${isMenuOpen ? 'active' : ''}`} 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`navbar__content ${isMenuOpen ? 'active' : ''}`}>
        <div className="essentials">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
        </div>

        <form onSubmit={handleSubmit} className="search-form">
          <input 
            type="text" 
            name="search-bar" 
            id="search-bar" 
            placeholder="Search..." 
            value={searchvalue} 
            onChange={(e) => setSearchvalue(e.target.value)}
          />
          <button type="submit" className="search-button">Search</button>
        </form>

        <div className="navbar__auth">
          {authLinks}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
