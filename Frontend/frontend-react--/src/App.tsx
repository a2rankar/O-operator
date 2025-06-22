import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  Login  from './pages/Login/Login'
import './App.css'
import Registration from './pages/Registration/Registration';
import TicketLists from './pages/Tickets/TicketList';
import TicketDetail from './pages/TicketDetail/TicketDetail';
function App() {
  return (

    <Router>
        <Routes>
           <Route path='/login' element={<Login/>}/>
           <Route path='/registration' element={<Registration/>}/>
           <Route path='/tickets' element={<TicketLists/>}/>
           <Route path="/ticketDetail/:id" element={<TicketDetail/>} />

        </Routes>
      </Router>

  )
}

export default App
