import { useContext } from 'react';
import Login from './components/Login'
import SignUp from './components/SignUp'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from "./context/AuthContext";
import HomePage from './components/HomePage';
import ErrorPage from './components/ErrorPage';


function App() {

  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
