import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';
import ToastMessage from './ToastMessage';

export default function ProductList({ products, title }) {
  const [sortBy, setSortBy] = useState("bestsellers");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    setToastMessage(`${product.name} er blevet tilføjet til kurven!`);
    setShowToast(true);
  };

  return (
    <Container className="my-5">
      <h1 className="mb-5">{title}</h1>
      <Row>
        {Array.isArray(products) && products.map((product) => (
          <Col key={product.productID} md={4} sm={6} className="mb-4">
            <ProductCard 
              product={product} 
              showToast={() => handleAddToCart(product)} 
            />
          </Col>
        ))}
      </Row>

      <ToastMessage 
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
      />
    </Container>
  );
}
