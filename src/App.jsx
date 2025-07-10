import { Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from './store/auth'; // ✅ fix path if needed
import routes from './routes.jsx';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth()); // ✅ Trigger auth check early on load
  }, [dispatch]);

  return <Routes>{routes}</Routes>;
};

export default App;
