import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaHeartBroken, FaTrashAlt } from 'react-icons/fa';

const Wishlist = () => {
  // Sample static wishlist data (for UI demo)
  const wishlistItems = [
    { id: 1, title: "Cute Teddy Bear", image: "https://hips.hearstapps.com/hmg-prod/images/ride-on-toy-1621979237.jpg?crop=0.564xw:1.00xh;0.271xw,0&resize=640:*", price: "$25" },
    { id: 2, title: "Kids Story Book", image: "https://hips.hearstapps.com/hmg-prod/images/ride-on-toy-1621979237.jpg?crop=0.564xw:1.00xh;0.271xw,0&resize=640:*", price: "$15" },
    { id: 3, title: "Building Blocks Set", image: "https://hips.hearstapps.com/hmg-prod/images/ride-on-toy-1621979237.jpg?crop=0.564xw:1.00xh;0.271xw,0&resize=640:*", price: "$40" },
  ];

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center text-primary">Your Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <div className="text-center text-muted my-5">
          <FaHeartBroken size={60} />
          <p className="mt-3 fs-4">Your wishlist is empty!</p>
        </div>
      ) : (
        <Row xs={1} md={3} className="g-4">
          {wishlistItems.map(item => (
            <Col key={item.id}>
              <Card className="shadow-sm h-100">
                <Card.Img 
                  variant="top" 
                  src={item.image} 
                  alt={item.title} 
                  style={{ objectFit: "cover", height: "180px" }} 
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fs-5">{item.title}</Card.Title>
                  <Card.Text className="text-success fw-semibold">{item.price}</Card.Text>
                  <Button 
                    variant="outline-danger" 
                    className="mt-auto align-self-start"
                  >
                    <FaTrashAlt className="me-2" /> Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Wishlist;
