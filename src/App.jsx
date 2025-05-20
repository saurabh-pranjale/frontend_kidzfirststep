
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
