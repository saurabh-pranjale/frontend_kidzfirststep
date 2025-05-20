import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../../../store/auth/index'; // adjust path as needed

const Protected = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading, isAuthenticated } = useSelector((state) => state.auth);
  

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    // If authenticated and on root, redirect to /home
    if (isAuthenticated && window.location.pathname === '/') {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
};

export default Protected;
