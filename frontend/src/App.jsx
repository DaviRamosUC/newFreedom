import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import './App.css'
import { ToastContainer } from 'react-toastify';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import AboutPage from './pages/AboutPage'
import CoursesPage from './pages/CoursesPage'
import BlogPage from './pages/BlogPage'
import ContactPage from './pages/ContactPage'
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <div className='w-screen h-screen'>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/about' element={<AboutPage />} />
          <Route exact path='/register' element={<RegisterPage />} />
          <Route exact path='/login' element={<LoginPage />} />
          <Route exact path='/dashboard' element={<DashboardPage />} />
          <Route exact path='/profile' element={<ProfilePage />} />
          <Route exact path='/contact' element={<ContactPage />} />
          <Route exact path='/courses' element={<CoursesPage />} />
          <Route exact path='/blog' element={<BlogPage />} />
          <Route exact path='/purchases' element={<BlogPage />} />
          <Route exact path='/products' element={<BlogPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  )
}

export default App
