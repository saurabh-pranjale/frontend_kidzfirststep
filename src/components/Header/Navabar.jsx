import { Navbar, Container, Nav } from "react-bootstrap";
import { FaRegUserCircle } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";
import { Link } from 'react-router-dom'; // ✅ Import Link

const Navabar = () => {
  return (
    <Navbar expand="lg" className="bg-info">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bolder p-1 shadow-lg">KidzFirstSTEP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link> {/* ✅ Changed */}
            <Nav.Link as={Link} to="/home/products">Products</Nav.Link> {/* ✅ Changed */}
            <Nav.Link as={Link} to="/home/about">About</Nav.Link>
            <Nav.Link as={Link} to="/home/wishlist">Wishlist</Nav.Link>
            <Nav.Link><FaRegUserCircle size={26} /></Nav.Link>
            <Nav.Link><BsCartCheck size={26} /></Nav.Link>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navabar;
