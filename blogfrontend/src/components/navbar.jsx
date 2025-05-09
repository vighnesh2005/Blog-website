
function Navbar(props) {
    function mycomponent() {
        if(props.isLoggedIn == false) {
            return (
                <div className="navbar__auth">
                <a href="/login" className="login">Login</a>
                <a href="/signup" className="signup">Sign Up</a>
                </div>
            );
        }
        else {
            return (
                <div className="navbar__auth">
                <a href="/profile" className="profile">Profile</a>
                <a href="/logout" className="logout">Logout</a>
                </div>
            );
        }
    }
    return (
    <nav className="navbar">
      <div className="navbar__logo">Blog Buddy</div>
        <div className="essentials">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        </div>
        <>{mycomponent()}</>
    </nav>
  );
}

export default Navbar;  