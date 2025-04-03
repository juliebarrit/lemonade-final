import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';
import { useState } from 'react';
import ToastMessage from './ToastMessage';

export default function TrendingProducts({ products }) {
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const handleAdd = (product) => {
    dispatch(addToCart(product));
    setShowToast(true);
  };

  return (
    <Container className="mt-5 mb-5">
      <h2 className="text-center mb-4">Trending Products</h2>
      <Row>
        {products.map((product) => (
          <Col md={3} sm={6} xs={12} key={product.id} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={product.image}
                style={{ objectFit: 'cover', height: '200px' }}
              />
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text className="text-muted" style={{ fontSize: '0.9rem' }}>
                  {product.description}
                </Card.Text>
                <div>
                  <div><strong>{product.price} DKK</strong></div>
                  <Button
                    variant="success"
                    className="mt-2 w-100"
                    onClick={() => handleAdd(product)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <ToastMessage
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </Container>
  );
}
