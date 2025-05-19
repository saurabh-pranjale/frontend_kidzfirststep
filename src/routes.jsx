import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import { Route } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import DetailProduct from './pages/DetailProduct';
import AuthLayout from './components/Header/auth-view/layout';
import { ShopLayout } from './components/Header/shop-view/layout';


const routes = [

  <Route key={'/auth'} path='/' element={<AuthLayout />}>
    <Route key={'/'} path='' element={<Login />} />,
    <Route key={'register'} path='register' element={<Register />} />,
  </Route>,

  <Route key={'homed'} path='/home' element={<ShopLayout />}>
    <Route key={'home'} path='' element={<HomePage />} />,
    <Route key={'products'} path='products' element={<ProductPage />} />,
    <Route key={'product'} path='product/:id' element={<DetailProduct />} />
  </Route>,

];


export default routes;
