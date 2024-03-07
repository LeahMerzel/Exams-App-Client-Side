import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './components/auth/UserContext';
import Header from './components/layout/Header';
import AdminDashboard from './components/pages/dashboards/AdminDashboard';
import TeacherDashboard from './components/pages/dashboards/TeacherDashboard';
import StudentDashboard from './components/pages/dashboards/StudentsDashboard';
import HomePage from './components/pages/HomePage'
import AboutPage from './components/pages/AboutPage'; 
import ContactPage from './components/pages/ContactPage'; 
import Footer from './components/layout/Footer';
import Container from 'react-bootstrap/Container';
import Login from './components/auth/Login'; 
import Register from './components/auth/Register';
import AdminHome from './components/pages/AdminHome';
import TeacherHome from './components/pages/TeacherHome';
import StudentHome from './components/pages/StudentHome';

const App = () => {
  
  return (
    <Container >
    <Router>
      <div>
        <UserProvider >
        <Header />
        <ToastContainer />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/admin-home" element={<AdminHome />} />
            <Route path="/teacher-home" element={<TeacherHome />} />
            <Route path="/student-home" element={<StudentHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        </UserProvider>
      </div>
    </Router>
    </Container>
  );
};

// NotFoundPage component to handle 404 cases
const NotFoundPage = () => (
  <div>
    <h2>404 - Not Found</h2>
    <p>The page you are looking for does not exist.</p>
  </div>
);

export default App;
