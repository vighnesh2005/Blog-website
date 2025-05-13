import Myblogbox from "./myblogbox";
import Mycontext from "../context_folder/context.js";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const { user, setIsLoggedIn, token } = useContext(Mycontext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.post("http://localhost:8000/myblogs", {
          username: user, 
          token: token
        });

        if (res.data.status === "Not Logged in") {
          alert("Please login....");
          setIsLoggedIn(false);
          navigate("/login");
          return;
        }

        setBlogs(res.data.blogs);
      } catch (err) {
        console.log("something went wrong");
      }
    };
    fetchBlogs();
  }, []);

  return (
    
    <div className="searchresults-container">
      {blogs.map((blog, index) => (
        <Link to={`/edit/${blog.id}`} >
        <Myblogbox
          key={index}
          id = {blog.id}
          picture={blog.picture}
          title={blog.title}
          category={blog.category}
          createdat={blog.createdat}
        />
      </Link>

      ))}
    </div>
  );
}

export default MyBlogs;
