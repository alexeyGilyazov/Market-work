import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import StyledComponents from './UI/MyButton'
import Navigation from './navigation/Navigation'
import AdminPage from './adminPage/AdminPage'

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path='/' element={<StyledComponents />} />
        <Route path='/admin' element={<AdminPage />} />
      </Routes>
    </Router>
  )
}

export default App