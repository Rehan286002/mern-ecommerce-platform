import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();

  return userInfo
    ? children
    : <Navigate to={`/login?redirect=${location.pathname}`} />;
};

export default PrivateRoute;