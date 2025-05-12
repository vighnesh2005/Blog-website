import { useEffect, useState } from "react";
import bgVideo from "../assets/video.mp4";
import BlogBox from './blogbox.jsx'
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate()
  const [data,setData] = useState([])

  const fetchData = async () => {
    const res = await axios.get('http://localhost:8000/getdata');
    setData(res.data); 
  };



  function handelclick(){
    navigate('/blogpost')
  }
  useEffect(()=>{
  fetchData();
  },[])
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
        <br/>
        The ultimate blogging website
        <br/>
        </pre>
        <div className="create-blog" onClick={handelclick}><button>Create Your Blog</button></div>
      </div>
    </div>
    <div className="all-blogs">
      <div className="scroll-content">
        {data.map((name) => (
            <BlogBox
              key={name.id}
              id={name.id}
              author={name.author}
              picture={name.picture}
              title={name.title}
              category={name.category}
            />
          ))}
        </div>

    </div>
    </>
  );
}

export default Dashboard;
