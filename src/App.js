import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from './redux/authSlice';

import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddJob from './pages/AddJob';
import Job from './pages/Job';
import EditJob from './pages/EditJob';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

const App = () => {
  const user = useSelector(selectUser);

  return (
    <Router>
      <main className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/add" element={<AddJob />} />
          <Route path="/job/view/:id" element={<Job />} />
          <Route path="/job/edit/:id" element={<EditJob />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App;