import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { checkAuth } from "../../store/auth/index";

function Protected({ children }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading, isAuthenticated } = useSelector((state) => state.auth);

  console.log("loading:",loading,"authenticate:",isAuthenticated)

  // Run auth check on initial mount only
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

 if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
      
        </div>
      </div>
    );
  }

  const path = location.pathname;
  const isAuthPage = path === "/" || path === "/register";

  // If not authenticated and trying to access a protected page
  if (!isAuthenticated && !isAuthPage) {
    return <Navigate to="/" replace />;
  }

  // If authenticated and trying to access login/register
  if (isAuthenticated && isAuthPage) {
    return <Navigate to="/shop" replace />;
  }
  
  console.log(isAuthenticated,isAuthPage,"hello js")
  // Allow rendering
  return <>{children}</>;
}

export default Protected;
