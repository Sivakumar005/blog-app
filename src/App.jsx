import { useState } from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import { Home } from './pages/Home'
import NewPost from './pages/Newpost'
import { Posts } from './pages/Posts'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/newpost' element={<NewPost/>}/>
      <Route path='/posts' element={<Posts/>}/>
      <Route path='/profile' element={<Home/>}/>
    </Routes>
  )
}

export default App
