import React from 'react'
import Header from './componenrs/Header'
import home from './pages/home.jsx'
import about from './pages/about.jsx'
import contact from './pages/contact.jsx'
import services from './pages/services.jsx'
import { Route } from 'react-router-dom'

export const App = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/home' element={<home/>}/>
        <Route path='/about' element={<about/>}/>
        <Route path='/contact' element={<contact/>}/>
        <Route path='/services' element={<services/>}/>
      </Routes>
    </>
  )
}
export default App  