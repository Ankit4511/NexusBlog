import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import Context from '../context/Context';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(Context);
  const location = useLocation();

    console.log("PROTECTED ROUTE:", isAuthenticated);


  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;