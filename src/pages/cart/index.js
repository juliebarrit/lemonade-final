import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  ButtonGroup,
} from "react-bootstrap";
import {
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "@/redux/cartSlice";
import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // sørg for at du har dette i toppen

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter(); // inde i CartPage komponenten

  useEffect(() => {
    setIsClient(true);
  }, []);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalLemons = cartItems.reduce(
    (sum, item) => sum + item.lemonsUsed * item.quantity,
    0
  );

  return (
    <Container className="mt-5 mb-5">
      <h1 className="text-center mb-4">Your Cart</h1>

      {!isClient ? (
        <p className="text-center">Loading cart...</p>
      ) : cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty 🍋</p>
      ) : (
        <>
          <Row className="mb-4">
            {cartItems.map((item, index) => (
              <Col md={4} sm={6} xs={12} key={index} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={item.image}
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>{item.description}</Card.Text>
                    </div>
                    <div className="mt-3">
                      <p>
                        <strong>Price:</strong> {item.price * item.quantity} DKK
                      </p>
                      <p>
                        <strong>Lemons:</strong>{" "}
                        {item.lemonsUsed * item.quantity}
                      </p>

                      <ButtonGroup size="sm">
                        <Button
                          variant="outline-secondary"
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                        >
                          −
                        </Button>
                        <Button variant="light" disabled>
                          {item.quantity}
                        </Button>
                        <Button
                          variant="outline-secondary"
                          onClick={() => dispatch(increaseQuantity(item.id))}
                        >
                          +
                        </Button>
                      </ButtonGroup>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Card className="p-4 shadow-sm">
            <h4>Total:</h4>
            <p>
              <strong>Price:</strong> {totalPrice} DKK
            </p>
            <Button
              variant="success"
              className="mt-2 me-2"
              onClick={() => router.push("/checkout")}
            >
              Checkout
            </Button>

            <Button
              variant="outline-danger"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </Button>
          </Card>
        </>
      )}
    </Container>
  );
}
