import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';
import Layout from '@/components/Layout';
import ToastMessage from '@/components/ToastMessage';

export async function getServerSideProps({ params }) {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/products/${params.id}`);
    return { props: { product: response.data } };
  } catch (error) {
    return { notFound: true };
  }
}

export default function ProductPage({ product }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showToast, setShowToast] = useState(false);

  if (!product) {
    return <Layout title="Product Not Found"><h1>Product not found</h1></Layout>;
  }

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      dispatch(addToCart({
        ...product,
        quantity: quantity
      }));
      setShowToast(true);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Der opstod en fejl. Prøv igen senere.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <Layout title={product.name} description={product.description}>
      <Container className="my-5">
        <Row>
          <Col md={6} className="mb-4">
            <div className="product-image-container">
              <img 
                src={product.image} 
                alt={product.name} 
                style={{ 
                  width: '100%',
                  height: 'auto',
                  maxHeight: '500px',
                  objectFit: 'contain'
                }}
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="product-info">
              <p className="category mb-2 text-muted">LSE ACCESSORIES</p>
              <h1 className="product-title mb-3">{product.name}</h1>
              <p className="price mb-2">{product.price},00 DKK</p>
              <p className="tax-info mb-4">Inklusive skatter.</p>

              <div className="quantity-selector mb-4">
                <p className="mb-2">Antal</p>
                <div className="d-flex align-items-center">
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => handleQuantityChange(-1)}
                    className="quantity-btn"
                  >
                    -
                  </Button>
                  <span className="mx-4">{quantity}</span>
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => handleQuantityChange(1)}
                    className="quantity-btn"
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="purchase-buttons">
                <Button 
                  variant="warning" 
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={isLoading}
                  className="add-to-cart-btn w-100"
                >
                  {isLoading ? (
                    <Spinner size="sm" />
                  ) : 'Læg i indkøbskurv'}
                </Button>
              </div>

              {product.description && (
                <div className="product-description mt-4 p-3 bg-light">
                  <p>{product.description}</p>
                </div>
              )}
            </div>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={12}>
            <div className="trust-indicators p-4 bg-light rounded">
              <h4 className="mb-3">Sikkerhed & Kvalitet</h4>
              <div className="d-flex gap-4">
                <div className="trust-item">
                  <i className="bi bi-shield-check me-2"></i>
                  <h5>Sikre Materialer</h5>
                  <p>Alle vores smykker er nikkel-fri og allergitestede</p>
                </div>
                <div className="trust-item">
                  <i className="bi bi-award me-2"></i>
                  <h5>Dansk Design</h5>
                  <p>Designet med fokus på både stil og sikkerhed</p>
                </div>
                <div className="trust-item">
                  <i className="bi bi-heart me-2"></i>
                  <h5>Familievenlig</h5>
                  <p>Perfekt til unge mennesker og deres første smykker</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <ToastMessage 
        show={showToast} 
        onClose={() => setShowToast(false)}
        message={`${product.name} er blevet tilføjet til kurven!`}
      />

      <style jsx>{`
        .product-info {
          padding: 20px;
        }
        .category {
          font-size: 0.9rem;
          letter-spacing: 0.5px;
        }
        .product-title {
          font-size: 2.5rem;
          font-weight: 500;
        }
        .price {
          font-size: 1.2rem;
          font-weight: 500;
        }
        .tax-info {
          font-size: 0.9rem;
          color: #666;
        }
        .quantity-btn {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
        }
        .add-to-cart-btn {
          background-color: #ee7d24;
          border: none;
          margin-top: 1rem;
        }
        .trust-indicators {
          border: 1px solid #e0e0e0;
        }
        .trust-item {
          flex: 1;
          text-align: center;
          padding: 20px;
        }
        .trust-item h5 {
          font-size: 1.1rem;
          margin: 10px 0;
          color: #333;
        }
        .trust-item p {
          font-size: 0.9rem;
          color: #666;
          line-height: 1.4;
        }
        .bi {
          font-size: 24px;
          color: #ee7d24;
        }
      `}</style>
    </Layout>
  );
}
