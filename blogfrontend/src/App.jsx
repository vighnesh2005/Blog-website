import { useState } from 'react'
import Navbar from './components/navbar.jsx'
import Signup from './components/signup.jsx'
import Login from './components/login.jsx'
import Dashboard from './components/dashboard.jsx'
import BlogPostPage from './components/blogpostpage.jsx'
import SearchResults from './components/searchresults.jsx'
import MyBlogs from './components/myblogs.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Myprofile from './components/myprofile.jsx'
import Provider from './context_folder/provider.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Provider>
      <BrowserRouter>
        <Navbar isLoggedIn={true} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blogpost/:id" element={<BlogPostPage />} />
          <Route path="/searchresults" element={<SearchResults />} />
          <Route path="/myblogs" element={<MyBlogs />} />
          <Route path="/myprofile" element={<Myprofile />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
