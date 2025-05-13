import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Mycontext from "../context_folder/context"
import axios from "axios";
import ReactQuill from "react-quill";
import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";


const modules = {
  toolbar: [
    [{ header: [1, 2,3, false] }],
    ['bold', 'italic', 'underline'],
    ['link', 'image'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['clean']
  ],
  imageResize: {    
    parchment: Quill.import('parchment')
  }
};


function Edit(){
    const {id} = useParams();
    const {token,setIsLoggedIn} = useContext(Mycontext)
    const [content,setContent] = useState("")
    const [title,setTitle] = useState("")
    const [category,setCategory] = useState("")
    const [username,setUsername] = useState("")
    const navigate = useNavigate();
    
    useEffect(()=>{
        const func = async()=>{
            const res = await axios.post("http://localhost:8000/viewblog",
                {
                    id:parseInt(id),
                    token:token
                },{
                  headers:{
                    'Content-Type': 'application/json',
                  }
                }
            );
            if(res.data.status === "Not Logged in"){
                setIsLoggedIn(false);
                alert("Please login in ....");
                navigate('/login');
            }
            setContent(res.data.content);
            setCategory(res.data.category);
            setTitle(res.data.title);   
            setUsername(res.data.username);
        }
        func();
    },[id,token])

    const handlesubmit = async(e)=>{
        e.preventDefault();
            const res = await axios.post("http://localhost:8000/edit",
                {
                    id:id,
                    title:title,
                    content:content,
                    category:category,
                    token:token
                }
            );
            if(res.data.status === "Not Logged in"){
                setIsLoggedIn(false);
                alert("Please login in ....");
                navigate('/login');
            }
            alert("updated the blog.")
            navigate('/myblogs')
    }

    return (
        <form className='Blogform' onSubmit={handlesubmit}>
            <label > Title: </label>
            <input type="text" name="Title" placeholder='Enter a Title' value={title} onChange={(e)=>setTitle(e.target.value)}></input>
            <label > category: </label>
            <input type="text" name="category" placeholder='Enter category' value={category} onChange={(e)=>setCategory(e.target.value)}></input>
          <ReactQuill
            value={content}
              onChange={(value) => setContent(value)}
            theme="snow"
            modules={modules}
            placeholder="Write your blog..."
          />
          <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
            Submit
          </button>
        </form>
      );

}

export default Edit