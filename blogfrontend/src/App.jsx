import { useState } from 'react'
import Navbar from './components/navbar.jsx'
import Signup from './components/signup.jsx'
import Login from './components/login.jsx'
import Dashboard from './components/dashboard.jsx'
import BlogPostPage from './components/blogpostpage.jsx'
import Viewblog from './components/viewblog.jsx'
import MyBlogs from './components/myblogs.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Myprofile from './components/myprofile.jsx'
import Provider from './context_folder/provider.jsx'
import Searchresult from './components/searchresult.jsx' 
import Edit from './components/edit.jsx'

function App() {

  return (
    <Provider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blogpost" element={<BlogPostPage />} />
          <Route path="/myblogs" element={<MyBlogs />} />
          <Route path="/myprofile" element={<Myprofile />} />
          <Route path ="/viewblog/:id" element = {<Viewblog />}></Route>
          <Route path ="/search/:search" element = {<Searchresult/>} ></Route>
          <Route path ="/edit/:id" element = {<Edit />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
