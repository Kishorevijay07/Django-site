import './App.css'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Register from './pages/Register'
import Login from './pages/Login'
import Protectroute from './components/protectroute'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'


function Logout() {
  localStorage.clear();
  return <Navigate to = "/login"/>
}
function RegisterandLogout(){
  localStorage.clear();
  return <Register/>
}
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/'
        element={
          <Protectroute>
            <Home/>
          </Protectroute>
        }
        />
        <Route path='/login' element={<Login/>}/>
        <Route path='/logout' element={<Logout />}/>
        <Route path='/register' element={<RegisterandLogout/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </Router>
  )
}

export default App
