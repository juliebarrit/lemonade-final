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
    <div
      style={{
        backgroundColor: "#ff77a3", // Updated pink color
        padding: "2rem 0",
      }}
    >
      <Container
        className="mt-5 mb-5"
        style={{
          borderRadius: "1rem",
          padding: "2rem",
          backgroundColor: "transparent",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#333',
          }}
        >
          ✨ Nyeste Kollektion ✨
        </h2>
        <Row>
          {products.map((product) => (
            <Col md={6} lg={6} xl={6} key={product.id} className="mb-4">
              <Card
                className="h-100 border-0"
                style={{
                  background: 'white',
                  borderRadius: '0',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  overflow: 'hidden',
                }}
              >
                <div className="text-center p-4">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    style={{
                      objectFit: 'contain',
                      height: '300px',
                      width: 'auto',
                      maxWidth: '100%',
                    }}
                  />
                </div>
                <Card.Body className="text-center pt-0">
                  <Card.Title style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                    {product.name}
                  </Card.Title>
                  <div style={{ 
                    color: '#333', 
                    fontWeight: 'bold',
                    marginBottom: '1rem'
                  }}>
                    {product.price} DKK
                  </div>
                  <Button
                    className="mt-2"
                    style={{
                      backgroundColor: '#ff77a3', // Updated pink color
                      border: 'none',
                      borderRadius: '4px',
                      fontWeight: '600',
                      color: '#fff',
                      padding: '0.5rem 1.5rem',
                    }}
                    onClick={() => handleAdd(product)}
                  >
                    Tilføj til kurv
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <ToastMessage show={showToast} onClose={() => setShowToast(false)} />
      </Container>
    </div>
  );
}
