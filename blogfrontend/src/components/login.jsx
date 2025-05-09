function Login() {
  return (
    <div className="signup-container">
      <div>
      <h1>Login</h1>
      <form action={"/login"} method="POST">
        <input type="text" name="username" placeholder="username"/>
        <br/>
        <input type="password" name="password" placeholder="password"/>
        <br />
        <button type="submit">Signup</button>
      </form>
        <p>Doesn't have an account? <a href="/login">Signup</a></p>
      </div>
    </div>
  );
}

export default Login;