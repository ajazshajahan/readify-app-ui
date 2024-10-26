
import { Route, Routes, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import { Home } from './pages/Home';
import { Books } from './pages/Books';
import { BookManagement } from './pages/BookManagement';
import {UserManagement} from './pages/UserManagement';
import Profile from './pages/Profile';
import { Navbar } from './components/Navbar';
import { AuthProvider } from './pages/AuthContext'; // Ensure this is imported


function App() {
  return (
    <AuthProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/books" element={<Books />} />
          <Route path="/bookManagement" element={<BookManagement />} />
          <Route path="/userManagement" element={<UserManagement/> } />
          <Route path="/contact" element={<Contact />} />
          {/* Add a catch-all route for 404 */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
