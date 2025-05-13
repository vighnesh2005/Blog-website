import React, { useContext, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Quill from 'quill';
import ImageResize from 'quill-image-resize-module-react';
import axios from 'axios';
import Mycontext from '../context_folder/context';
import { useNavigate } from 'react-router-dom';

Quill.register('modules/imageResize', ImageResize);

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

function BlogPostPage() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [title,setTitle] = useState('');
  const [category,setCategory] = useState('')
  const {user,setIsLoggedIn,token} = useContext(Mycontext);
  
  const handlesubmit = async (e)=>{
    e.preventDefault();
    
    if(content === "" || title === ""){
      alert("Fill all neccessary fields");
      return;
    }

    try{
      const res = await axios.post("http://localhost:8000/saveblog",
        {
          title:title,
          content:content,
          username:user,
          token:token,
          category:category
        },
        {
          headers:{
            'Content-Type': 'application/json'
          }
        }
      );
        if(res.data.status === 'Not Logged in'){
          setIsLoggedIn(false);  
          navigate("/login");
            return;
        }
        alert("Blog Saved successfully...");
        navigate("/myprofile"); 
    }catch(exe){
      console.log("some error occured");
      return;
    }

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

export default BlogPostPage;
