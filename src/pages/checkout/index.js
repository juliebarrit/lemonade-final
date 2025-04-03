import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { clearCart } from '@/redux/cartSlice';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

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

    if (cartItems.length > 0) {
      localStorage.setItem('orderCart', JSON.stringify(cartItems));
      setOrderCart(cartItems);
      dispatch(clearCart());
    } else {
      const savedOrder = localStorage.getItem('orderCart');
      if (savedOrder) {
        setOrderCart(JSON.parse(savedOrder));
      }
    }
}, [isClient, cartItems, dispatch]);


  if (!isClient || orderCart.length === 0) return null;

  const totalPrice = orderCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalLemons = orderCart.reduce(
    (sum, item) => sum + item.lemonsUsed * item.quantity,
    0
  );

  const costPerLemon = 2;
  const profit = totalPrice - totalLemons * costPerLemon;

  return (
    <Container className="mt-5 mb-5">
      <h1 className="text-center mb-4">Order Summary</h1>

      <Row className="mb-4">
        {orderCart.map((item, index) => (
          <Col md={4} sm={6} xs={12} key={index} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={item.image}
                style={{ objectFit: 'cover', height: '200px' }}
              />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Item total:</strong> {item.price * item.quantity} DKK</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Card className="p-4 shadow-sm">
        <h4>Total:</h4>
        <p><strong>Total price:</strong> {totalPrice} DKK</p>
        <p><strong>Total lemons used:</strong> {totalLemons}</p>
        <p><strong>Profit (to me, the owner 😎):</strong> {profit} DKK</p>
        <Button
          variant="primary"
          onClick={() => {
            localStorage.removeItem('orderCart'); // Clean up manually
            router.push('/products');
          }}
        >
          Back to products
        </Button>
      </Card>

      <div className="text-center mt-4">
        <h2>✅ Thank you for your order!</h2>
        <p>Enjoy your lemonade 🧃</p>
      </div>
    </Container>
  );
}
