
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import routes from './routes.jsx';



const App = () => {

 

  return (
    <BrowserRouter>
      <Routes>
      {
      routes
      }
      </Routes>
    </BrowserRouter>
  );
};

export default App;
