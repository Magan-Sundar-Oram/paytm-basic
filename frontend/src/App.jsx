import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard'
import SendMoney from './pages/SendMoney';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const AuthCheck = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" /> : children;

}


function App() {
  return (

    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<AuthCheck><Signup /></AuthCheck>} />
          <Route path='/signup' element={<AuthCheck><Signup /></AuthCheck>} />
          <Route path='/signin' element={<AuthCheck><Signin /></AuthCheck>} />
          <Route path='/dashboard'
            element={<PrivateRoute>
              <Dashboard />
            </PrivateRoute>} />

          <Route path='/sendmoney'
            element={<PrivateRoute>
              <SendMoney />
            </PrivateRoute>} />

          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      </Router>
    </AuthProvider>

  )
}

export default App
