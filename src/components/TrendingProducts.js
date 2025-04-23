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
        backgroundColor: "var(--main-color)", // Use main color for full-width background
        padding: "2rem 0",
      }}
    >
      <Container
        className="mt-5 mb-5"
        style={{
          borderRadius: "1rem",
          padding: "2rem",
          backgroundColor: "transparent", // Ensure inner container is transparent
        }}
      >
        <h2
          className="text-center mb-5"
          style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: '#3a5a40', // Deep pastel green for title
          }}
        >
          NEW IN
        </h2>
        <Row>
          {products.map((product) => (
            <Col md={3} sm={6} xs={12} key={product.id} className="mb-4">
              <Card
                className="h-100 border-0"
                style={{
                  background: 'rgba(207, 235, 199, 0.7)', 
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(74, 112, 89, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                }}
              >
                <Card.Img
                  variant="top"
                  src={product.image}
                  style={{
                    objectFit: 'cover',
                    height: '220px',
                    borderTopLeftRadius: '20px',
                    borderTopRightRadius: '20px',
                  }}
                />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title style={{ fontWeight: '700', color: '#1b1b1b' }}>
                      {product.name}
                    </Card.Title>
                    <Card.Text
                      style={{
                        fontSize: '0.95rem',
                        color: '#2b2b2b',
                        marginBottom: '1rem',
                      }}
                    >
                      {product.description}
                    </Card.Text>
                  </div>
                  <div>
                    <div style={{ color: '#333', fontWeight: 'bold' }}>
                      {product.price} DKK
                    </div>
                    <Button
                      className="mt-3 w-100"
                      style={{
                        background: 'linear-gradient(135deg, #a9d6ae, #d0eecd)', // minty pastel gradient
                        border: 'none',
                        fontWeight: '600',
                        color: '#1c1c1c',
                        borderRadius: '30px',
                        padding: '0.6rem 1.2rem',
                        boxShadow: '0 4px 12px rgba(168, 200, 180, 0.4)',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.04)';
                        e.target.style.boxShadow = '0 6px 16px rgba(100, 150, 120, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = '0 4px 12px rgba(168, 200, 180, 0.4)';
                      }}
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

        <ToastMessage show={showToast} onClose={() => setShowToast(false)} />
      </Container>
    </div>
  );
}
