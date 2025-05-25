import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import Cards from '../../components/Header/Products/Cards';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/',{withCredentials:true});
      setProducts(res.data);
    } catch (error) {
      setError('Something went wrong while fetching products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4 fw-bold display-6 text-uppercase text-primary">Explore Our Products</h2>

      {loading && (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {error && <Alert variant="danger" className="text-center">{error}</Alert>}

      <Row className="g-4">
        {products.map((product) => (
          <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
            <Cards
              id={product._id}
              pTitle={product.title}
              pImage={product.image?.[0]}
              pDesc={product.description}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductPage;
