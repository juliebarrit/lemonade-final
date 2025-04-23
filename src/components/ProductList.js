import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '@/components/ProductCard';
import ToastMessage from '@/components/ToastMessage';
import { useState } from 'react';

export default function ProductList({ products, title }) {
  const [showToast, setShowToast] = useState(false);

  const handleToast = () => {
    setShowToast(true);
  };

  return (
    <Container className="mt-5 mb-5">
      <h1 className="mb-4" style={{ textAlign: 'left' }}>{title}</h1>
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
