
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
        <form action="/search" method="post">
        <input type="text" name="search-bar" id="search-bar" />
        <select name="category" id="category">
            <option value="all">author</option>
            <option value="tech">category</option>
            <option value="lifestyle">name of the blog</option>
        </select>
        <button type="submit" className="search-button">Search</button>
        </form>
        <>{mycomponent()}</>
    </nav>
  );
}

export default Navbar;  