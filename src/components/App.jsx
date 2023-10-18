import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import StyledComponents from './UI/MyButton'
import Navigation from './navigation/Navigation'

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path='/' element={<StyledComponents />} />
        <Route path='/catalog' element={<StyledComponents />} />
        <Route path='/contacts' element={<StyledComponents />} />
        <Route path='/admin' element={<StyledComponents />} />
      </Routes>
    </Router>
  )
}

export default App