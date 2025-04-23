import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '@/components/ProductCard'; // Ensure this is a default import
import ToastMessage from '@/components/ToastMessage'; // Ensure this is a default import
import { useState } from 'react';

export default function ProductList({ products, title }) {
  const [showToast, setShowToast] = useState(false);

  const handleToast = () => {
    setShowToast(true);
  };

  return (
    <Container className="mt-5 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 style={{ textAlign: 'left' }}>{title}</h1>
        <small>{products.length} produkter</small>
      </div>
      <Row>
        {products.map(product => (
          <Col md={4} sm={6} xs={12} key={product.id} className="mb-4">
            <ProductCard product={product} showToast={handleToast} />
          </Col>
        ))}
      </Row>
      <ToastMessage show={showToast} onClose={() => setShowToast(false)} />
    </Container>
  );
}
