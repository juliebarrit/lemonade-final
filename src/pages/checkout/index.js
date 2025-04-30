import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { clearCart } from '@/redux/cartSlice';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Navbar from "@/components/Navbar";

export default function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const [orderCart, setOrderCart] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Get order data from localStorage
    const savedOrder = localStorage.getItem('orderCart');
    if (savedOrder) {
      setOrderCart(JSON.parse(savedOrder));
    }

    const createOrder = async () => {
      const customerID = localStorage.getItem('customerID');
      const savedCartItems = localStorage.getItem('orderCart');
      const orderCreated = localStorage.getItem('orderCreated');

      if (!customerID || !savedCartItems || orderCreated) {
        return;
      }

      try {
        const cartItems = JSON.parse(savedCartItems);
        const orderData = {
          customerID: parseInt(customerID),
          products: cartItems.map(item => ({
            productID: parseInt(item.productID || item.id),
            quantity: parseInt(item.quantity),
            price: parseFloat(item.price),
            total_price: parseFloat(item.price * item.quantity)
          }))
        };

        const response = await fetch(`http://127.0.0.1:8000/api/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(orderData)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to create order');
        }

        const order = await response.json();
        localStorage.setItem('orderCreated', 'true');
        dispatch(clearCart());
      } catch (error) {
        console.error('Error:', error);
        alert('Der opstod en fejl ved oprettelse af ordre: ' + error.message);
      }
    };

    createOrder();
  }, [isClient]); // Remove cartItems and dispatch from dependencies

  // Cleanup function when leaving checkout page
  useEffect(() => {
    return () => {
      localStorage.removeItem('orderCreated');
    };
  }, []);

  // Remove this condition so the page always renders
  if (!isClient) return null;
  // if (!isClient || orderCart.length === 0) return null;

  const totalPrice = orderCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <Container className="mt-5 mb-5">
        <h1 className="text-center mb-4">Ordreoversigt</h1>

        <Row className="mb-4">
          {orderCart.map((item, index) => (
            <Col md={4} sm={6} xs={12} key={index} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={item.image}
                  style={{ objectFit: 'cover', height: '200px' }}
                />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                  </div>
                  <div className="mt-3">
                    <p><strong>Antal:</strong> {item.quantity}</p>
                    <p><strong>Pris:</strong> {item.price * item.quantity} DKK</p>
                    {item.type && <p><strong>Type:</strong> {item.type}</p>}
                    {item.color && <p><strong>Farve:</strong> {item.color}</p>}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Card className="p-4 shadow-sm">
          <h4>Ordre Total</h4>
          <div className="d-flex justify-content-between mb-3">
            <span>Subtotal:</span>
            <span>{totalPrice} DKK</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span>Fragt:</span>
            <span>Gratis</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between mb-4">
            <h5>Total:</h5>
            <h5>{totalPrice} DKK</h5>
          </div>
          <Button
            variant="primary"
            onClick={() => {
              localStorage.removeItem('orderCart'); // Clean up manually
              router.push('/products');
            }}
          >
            Tilbage til produkter
          </Button>
        </Card>

        <div className="text-center mt-4">
          <h2>✅ Tak for din ordre!</h2>
          <p>Vi glæder os til at sende dine smykker til dig.</p>
        </div>
      </Container>
    </>
  );
}
