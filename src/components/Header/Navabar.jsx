import { Navbar,Container,Nav,NavDropdown } from "react-bootstrap"
import { FaRegUserCircle } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";

Navbar

const Navabar = () => {
  return (
    <Navbar expand="lg" className="bg-info">
      <Container>
        <Navbar.Brand href="#home" className="fw-bolder p-1 shadow-lg">KidzFirstSTEP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
            

             <Nav.Link href="#link">About</Nav.Link>


              <Nav.Link href="#link">WishList</Nav.Link>

              <Nav.Link><FaRegUserCircle size={26}/></Nav.Link>

             <Nav.Link><BsCartCheck size={26}/></Nav.Link>

             

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navabar