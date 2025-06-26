
import { Routes , Route , BrowserRouter as Router} from 'react-router-dom'
import Signin from './pages/Signin'

import CreateQuiz from './pages/CreateQuiz'
import Room from './pages/Room'
import Admin from './pages/Admin'
import Demo from './pages/Demo'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Signin/>} />
        <Route path='/create-quiz' element={<CreateQuiz/>} />
        <Route path='/signup' element={<h1>Signup</h1>} />
        <Route path='/room' element={<Room/>} />
        <Route path='/admin' element={<Admin/>} />
        <Route path='/demo' element={<Demo/>} />
      </Routes>
    </Router>
    )
}

export default App