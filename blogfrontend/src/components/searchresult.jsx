import { useState, useEffect } from 'react';
import BlogBox from './blogbox.jsx'
import { useParams } from 'react-router-dom';
import axios from 'axios';
function Searchresult(){
    const {search} = useParams();
    const [blogs,setBlogs] = useState([]);
    useEffect(()=>{
        const func = async ()=>{
            const res = await axios.post("http://localhost:8000/search",
                {
                    search:search
                }
            );
            setBlogs(res.data);
        }
        func();
    },[])
    return(
        <div>
            {blogs.map((blog,index) => (
            <BlogBox
              key={index}
              id={blog.id}
              author={blog.author}
              picture={blog.picture}
              title={blog.title}
              category={blog.category}
            />
          ))}
        </div>
    )
}

export default Searchresult;