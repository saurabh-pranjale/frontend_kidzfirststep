import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Cards = ({ id, pTitle, pImage, pDesc }) => {
  return (
    <Card className="h-100 shadow-sm border-0 rounded-4 overflow-hidden product-card">
      <div className="overflow-hidden">
        <Card.Img
          variant="top"
          src={pImage || 'https://via.placeholder.com/300x200?text=No+Image'}
          alt={pTitle}
          className="img-fluid product-image"
          style={{ height: '200px', objectFit: 'cover' }}
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-5 fw-semibold text-truncate">{pTitle}</Card.Title>
        <Card.Text className="text-muted small" style={{ flexGrow: 1 }}>
          {pDesc?.slice(0, 70)}...
        </Card.Text>
        <Link to={`/shop/product/${id}`} className="mt-2 w-100">
          <Button variant="primary" className="w-100 rounded-pill">
            View Details
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Cards;
