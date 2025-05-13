import { useEffect, useState } from "react";
import bgVideo from "../assets/video.mp4";
import BlogBox from "./blogbox.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/getdata");
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); 
  }, []);

  function handleClick() {
    navigate("/blogpost");
  }

  return (
    <>
      <div className="Hero-section">
        <video autoPlay loop muted className="video-background">
          <source src={bgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="Hero">
          <pre>
            Welcome To The blog Buddy.
            <br />
            The ultimate blogging website
            <br />
          </pre>
          <div className="create-blog" onClick={handleClick}>
            <button>Create Your Blog</button>
          </div>
        </div>
      </div>
      <div className="all-blogs">
        <div className="scroll-content">
          {data.map((blog) => (
            <BlogBox
              key={blog.id}
              id={blog.id}
              author={blog.author}
              picture={blog.picture}
              title={blog.title}
              category={blog.category}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
