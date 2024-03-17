import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
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
import TakeExam from './components/exams/TakeExam';
import GetStarted from './components/auth/GetStarted';
import CreateNewExam from './components/exams/CreateNewExam';
import CreateNewUser from './components/users/CreateNewUser';
import CreateNewCourse from './components/courses/CreateNewCourse';

const App = () => {
  
  return (
    <Container>
      <Router>
        <UserProvider>
            <div>
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
                  <Route path="/get-started" element={<GetStarted />} />
                  <Route path="/take-exam" element={<TakeExam />} />
                  <Route path="/create-new-user" element={<CreateNewUser />} />
                  <Route path="/create-new-exam" element={<CreateNewExam />} />
                  <Route path="/create-new-course" element={<CreateNewCourse />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
        </UserProvider>
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
