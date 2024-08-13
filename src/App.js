import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
// import HomeIcon from '@mui/icons-material/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,

} from "react-router-dom";

import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {

  const {user} = useContext(AuthContext);
  console.log(user);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/"/> : <Register />} />
        <Route exact path="/" element={user ? <Home /> : <Login/>} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </Router>

  )
}

export default App;
