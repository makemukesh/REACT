import React from 'react'
import Header from './components/Header'
import home from './pages/Home'
import about from './pages/About'
import contact from './pages/Contact'
import services from './pages/Services'
import { Routes, Route } from 'react-router-dom'

export const App = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/Home' element={<home/>}/>
        <Route path='/About' element={<about/>}/>
        <Route path='/Contact' element={<contact/>}/>
        <Route path='/Services' element={<services/>}/>
      </Routes>
    </>
  )
}
export default App  