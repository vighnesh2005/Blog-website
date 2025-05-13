import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Mycontext from "../context_folder/context";

function Myprofile() {
  const { user, token, setIsLoggedIn } = useContext(Mycontext);
  const [photo, setPhoto] = useState("");
  const [fileStr, setFileStr] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const prof = async () => {
      try {
        const res = await axios.post("http://localhost:8000/profile", {
          username: user,
          token: token,
        });
        if (res.data.status === "Not Logged In") {
          alert("Please login ....");
          setIsLoggedIn(false);
          navigate("/login");
        } else {
          if(res.data.photo !== "None")
            setPhoto(res.data.photo);
        }
      } catch (err) {
        console.log("Profile fetch error", err);
      }
    };
    prof();
  }, [user, token, navigate, setIsLoggedIn]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFileStr(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fileStr) return alert("Please select a file first");

    try {
      const res = await axios.post("http://localhost:8000/profpic", {
        username: user,
        token: token,
        file: fileStr, 
      });

      alert(res.data.message || "Profile picture updated");
      if (res.data.photo) setPhoto(res.data.photo);
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed");
    }
  };

  return (
    <div className="Profile">
      <div className="myprofile">
        <img
          src={
            photo === "None"
              ? "https://www.w3schools.com/howto/img_avatar.png"
              : photo
          }
          alt="Avatar"
          style={{ width: "200px" }}
        />
        <h1>{user}</h1>
        <Link to="/myblogs">My Blogs</Link>

        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Myprofile;
