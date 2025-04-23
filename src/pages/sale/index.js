import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';

export default function SalePage() {
  const [saleItems, setSaleItems] = useState([
    { id: 0, name: '', image: '', originalPrice: 0, salePrice: 0 }
  ]); // Ensure consistent initial state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSaleItems() {
      try {
        const response = await fetch('/api/sale');
        const data = await response.json();
        setSaleItems(data);
      } catch (error) {
        console.error('Failed to fetch sale items:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSaleItems();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">🔥 On Sale</h1>
      <Row>
        {saleItems.map((item) => (
          <Col key={item.id} sm={6} md={4} lg={3} className="mb-4">
            <Card>
              <Card.Img variant="top" src={item.image} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  <del>${item.originalPrice}</del> <strong>${item.salePrice}</strong>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
