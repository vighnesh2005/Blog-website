import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setIsLoading(true); // Start loading

    try {
      const res = await axios.post(
        "http://localhost:8000/signup",
        {
          username: formData.username,
          password: formData.password,
          confirm_password: formData.confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.status === "User created successfully") {
        alert("Signup successful!");
        navigate("/login");
      } else {
        alert("User already exists.");
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        alert(err.response.data.detail || "An error occurred during signup");
      } else {
        alert("An error occurred during signup");
      }
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="signup-container">
      <div>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Re-enter Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <br />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing up..." : "Signup"}
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
