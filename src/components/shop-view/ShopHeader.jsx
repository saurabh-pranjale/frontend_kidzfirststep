import { Link, useNavigate } from "react-router-dom";
import { House, LogOut, Menu, ShoppingCart, User } from "lucide-react";
import { FaUserCircle } from "react-icons/fa"; // Add this import
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logoutUser } from "../../store/auth/index";
import { fetchCartItems } from "../../store/cart/index";
import UserCartWrapper from "./UserCartWrapper";
import { Dropdown, Button, Offcanvas } from "react-bootstrap";
import { shoppingViewHeaderMenuItems } from "../../config/index";

import "./ShopHeader.css"; // <-- Added import here


// Render navigation links
function MenuItems({ onClick }) {
  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      {shoppingViewHeaderMenuItems.map(({ id, label, path }) => (
        <li className="nav-item" key={id}>
          <Link
            to={path}
            className="nav-link"
            onClick={onClick}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function HeaderRightContent({ onClose, setShowCart }) {
  const { user } = useSelector((state) => state.auth);
  const {cartItems} = useSelector((state)=> state.shopCart)
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    onClose?.();
  };

  return (
    <div className="d-flex align-items-center gap-3 flex-column flex-lg-row">
      {/* Cart button */}
      <Button
        variant="outline-secondary"
        onClick={() => setShowCart(true)}
        aria-label="Open shopping cart"
      >
        <ShoppingCart className="me-1" />
        Cart  
      </Button>

      {/* User Dropdown */}
      <Dropdown align="end" className="outline-dark">
        <Dropdown.Toggle
          variant="dark-outline"
          id="user-dropdown"
          className="d-flex dark-outline align-items-center text-white fw-bold gap-2"
          aria-label="User menu"
        >
          <FaUserCircle size={24} /> {/* Profile icon */}
         
          {user?.name?.[0]?.toUpperCase() || ""}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Header>
            Logged in as {user?.userName || "User"}
          </Dropdown.Header>
          <Dropdown.Divider />
          <Dropdown.Item
            onClick={() => {
              navigate("/shop/account");
              onClose?.();
            }}
          >
            <User className="me-2" />
            Account
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout}>
            <LogOut className="me-2" />
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

function ShopHeader() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();

  // Fetch cart items when user ID is available or changes
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user?.id]);

  return (
    <header className="shop-header sticky-top border-bottom shadow-sm">
      <nav className="navbar navbar-expand-lg px-3">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Logo */}
          <Link
            to="/"
            className="navbar-brand text-warning fw-bold d-flex align-items-center"
            aria-label="KidzFirstSTEP Home"
          >
            <House className="me-2" />
            KidzFirstSTEP
          </Link>

          {/* Mobile menu toggle */}
          <Button
            variant="outline-secondary"
            className="d-lg-none"
            onClick={() => setShowOffcanvas(true)}
            aria-label="Open menu"
          >
            <Menu />
          </Button>

          {/* Desktop Navigation */}
          <div className="collapse navbar-collapse d-none d-lg-flex justify-content-between">
            <MenuItems />
            {isAuthenticated && <HeaderRightContent setShowCart={setShowCart} />}
          </div>
        </div>
      </nav>

      {/* Offcanvas for mobile menu */}
      <Offcanvas
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        placement="start"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <MenuItems onClick={() => setShowOffcanvas(false)} />
          {isAuthenticated && (
            <HeaderRightContent
              onClose={() => setShowOffcanvas(false)}
              setShowCart={setShowCart}
            />
          )}
        </Offcanvas.Body>
      </Offcanvas>

      {/* Custom Cart Offcanvas */}
      {showCart && (
        <div className="cart-overlay-wrapper">
          <UserCartWrapper
            cartItems={Array.isArray(cartItems?.items) ? cartItems.items : []}
            setOpenCartSheet={setShowCart}
          />
        </div>
      )}
    </header>
  );
}

export default ShopHeader;
