import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Quill from 'quill';
import ImageResize from 'quill-image-resize-module-react';

Quill.register('modules/imageResize', ImageResize);

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
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
  const [content, setContent] = useState('');

  return (
    <form className='Blogform'>
        <label > Title: </label>
        <input type="text" name="Title" placeholder='Enter a Title'></input>
      <ReactQuill
        value={content}
        onChange={setContent}
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
