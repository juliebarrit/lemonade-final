import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ProductCard from '@/components/ProductCard';
import ToastMessage from '@/components/ToastMessage';
import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

export async function getServerSideProps() {
  const productsRef = collection(db, 'products');
  const snapshot = await getDocs(productsRef);
  const products = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    props: {
      products,
    },
  };
}

export default function ProductPage({ products }) {
  const [showToast, setShowToast] = useState(false);

  const handleToast = () => {
    setShowToast(true);
  };

  return (
    <Container className="mt-5 mb-5">
      <h1 className="text-center mb-4">Our Lemonades</h1>
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
