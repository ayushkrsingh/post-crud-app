import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import CreatePost from './pages/CreatePost.jsx'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<h1>Home Page</h1>} />
        <Route path='/posts' element={<div>Posts</div>} />
        <Route path='/create-post' element={<CreatePost/>} />
      </Routes>
    </Router>
  )
}

export default App