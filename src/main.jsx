import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import FormBody from './Form'
import EditUser from './edituser'
import { BrowserRouter as Routing, Routes, Route } from 'react-router-dom'
ReactDOM.createRoot(document.getElementById('root')).render(
  <Routing>
    <Routes>
      <Route path='/' element={<FormBody/>}  />
      <Route path='/Edituser/:id' element={<EditUser/>}  />
    </Routes>
  </Routing>
)
