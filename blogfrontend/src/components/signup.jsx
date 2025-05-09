function Signup() {
  return (
    <div className="signup-container">
      <div>
      <h1>Signup</h1>
      <form action={"/signup"} method="POST">
        <input type="text" name="username" placeholder="username"/>
        <br/>
        <input type="password" name="password" placeholder="password"/>
        <br />
        <input type="password" name="confirm password" placeholder="re-enter password"/>
        <br />
        <button type="submit">Signup</button>
      </form>
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
}

export default Signup;      