import './App.css';
import LoginPage from './pages/loginPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupPage from './pages/signupPage';
import HomePage from './pages/homePage';
import { Provider } from 'react-redux';
import store from './store'; // Import your Redux store
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Home from './components/Home/home';
import ProfilePage from './pages/profilePage';
import AdminLoginPage from './pages/adminLoginPage';
import AdminDashboard from './pages/adminDashboard';
import AdminEditPage from './pages/adminEditPage';
import Cookies from 'js-cookie';
import AdminAdd from './pages/adminAdd';
function App() {
  const token = useSelector((state) => state.auth.token); 
  const admin = localStorage.getItem('admin')
  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path='/' element={token?(<HomePage />): (
              <LoginPage />
            )} />
        <Route path="/login" element={token?(<HomePage />):(<LoginPage />)} />
        <Route path='/signup' element={token?(<HomePage />):(<SignupPage />)} />
        <Route path='/profile' element={token?(<ProfilePage />):(<Navigate  to={'/login'}/>)} />
        <Route path='/admin' element={<AdminLoginPage />} />
        <Route path='/dashboard' element={admin?(<AdminDashboard />):(<AdminLoginPage />)} />
        <Route path='/edit' element={admin?(<AdminEditPage />):(<Navigate  to={'/admin'}/>)} />
        <Route path='/add' element={admin?(<AdminAdd />):(<Navigate  to={'/admin'}/>)} />
        

      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
