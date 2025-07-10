import { Route } from 'react-router-dom';
import Login from './pages/auth-view/Login';
import Register from './pages/auth-view/Register';
import HomePage from './pages/shop-view/HomePage';
import DetailProduct from './pages/shop-view/DetailProduct';
import AuthLayout from './components/auth-view/layout';
import { ShopLayout } from './components/shop-view/layout';
import Protected from './components/auth-view/Protected';
import ShoppingAccount from './pages/shop-view/account';
import ProductListing from './pages/shop-view/Listing';
import ShoppingCheckout from './pages/shop-view/Checkout';
import About from './pages/About';
import Wishlist from './pages/Wishlist';
import PaypalReturnPage from './pages/shop-view/PaypalReturnPage';
import ThankYouPage from './pages/shop-view/ThankYouPage';

const routes = [
  // Auth routes (protected)
  <Route key={'/auth'} path='/' element={<Protected><AuthLayout /></Protected>}>
    <Route index element={<Login />} />
    <Route path='register' element={<Register />} />
  </Route>,

  // ✅ Paypal routes OUTSIDE Protected and with full path
  <Route key="/paypal-return" path="/shop/paypal-return" element={<PaypalReturnPage />} />,
  <Route key="/thank-you" path="/shop/thank-you" element={<ThankYouPage />} />,

  // Shop routes (protected)
  <Route key={'/shop'} path='/shop' element={<Protected><ShopLayout /></Protected>}>
    <Route index element={<HomePage />} />
    <Route path='products' element={<ProductListing />} />
    <Route path='product/:id' element={<DetailProduct />} />
    <Route path='about' element={<About />} />
    <Route path="account" element={<ShoppingAccount />} />
    <Route path='wishlist' element={<Wishlist />} />
    <Route path='checkout' element={<ShoppingCheckout />} />
  </Route>,
];

export default routes;
