import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/signup'
import { Signin } from './pages/signin'
import { Blog } from './pages/blog'
import { Blogs } from './pages/blogs'
import { Publish } from './pages/publish'
import { Edit } from './pages/edit'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path='/'  element={<Blogs/>} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/publish" element={<Publish/>}/>
          <Route path="/blog/:id/edit" element={<Edit/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App