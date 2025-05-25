import React from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="py-5">
      <h1 className="mb-4 text-center text-primary">About KidzFirstSTEP</h1>
      <Row className="align-items-center gy-4">
        <Col md={6}>
          <Image 
            src="https://images.unsplash.com/photo-1542831371-d531d36971e6?auto=format&fit=crop&w=800&q=80" 
            alt="Kids Learning" 
            fluid 
            rounded 
            className="shadow"
          />
        </Col>
        <Col md={6}>
          <h3 className="mb-3">Our Mission</h3>
          <p className="fs-5 text-secondary">
            At KidzFirstSTEP, we are dedicated to providing the best educational products and experiences for children. Our mission is to empower kids to learn, explore, and grow in a fun and safe environment.
          </p>
          <h3 className="mt-4 mb-3">Why Choose Us?</h3>
          <ul className="fs-5 text-secondary">
            <li>Curated high-quality products tailored for kids</li>
            <li>Exceptional customer service and support</li>
            <li>Safe and secure shopping experience</li>
            <li>Passion for child development and education</li>
          </ul>
        </Col>
      </Row>

      <Card className="mt-5 p-4 bg-info text-white text-center shadow rounded-4">
        <h4>Contact Us</h4>
        <p>Email: support@kidzfirststep.com</p>
        <p>Phone: +1 (555) 123-4567</p>
        <p>Address: 123 Kids Lane, Learning City, Education State</p>
      </Card>
    </Container>
  );
};

export default About;
