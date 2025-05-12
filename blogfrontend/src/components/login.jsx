import { useContext, useState } from 'react';
import axios from 'axios';
import Mycontext from '../context_folder/context';
import { useNavigate } from 'react-router-dom'; // Correct import for useNavigate
import { Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate(); 
  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const { setToken, setUser, setIsLoggedIn } = useContext(Mycontext); // Use useContext inside the component

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitfunc = async (e) => {
    e.preventDefault();

    if (data.password === '' || data.username === '') {
      alert('Fill all values');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:8000/login',
        {
          username: data.username,
          password: data.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Login successful:', res.data);

      setToken(res.data.token); // Set token directly
      setUser(res.data.username); // Set user directly
      setIsLoggedIn(true);
      navigate('/'); // Redirect to dashboard
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <div>
        <h1>Login</h1>
        <form onSubmit={submitfunc}>
          <input
            type="text"
            name="username"
            value={data.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <br />
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <br />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
