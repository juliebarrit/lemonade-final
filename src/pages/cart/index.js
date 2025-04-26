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
  removeFromCart
} from "@/redux/cartSlice";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <Container className="mt-5 mb-5">
        <h1 className="text-center mb-4">Din Kurv</h1>

        {!isClient ? (
          <p className="text-center">Indlæser kurv...</p>
        ) : cartItems.length === 0 ? (
          <div className="text-center">
            <p>Din kurv er tom</p>
            <Link href="/products/necklaces">
              <Button variant="primary">Fortsæt med at handle</Button>
            </Link>
          </div>
        ) : (
          <>
            <Row className="mb-4">
              {cartItems.map((item) => (
                <Col md={4} sm={6} xs={12} key={item.id} className="mb-4">
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
                          <strong>Pris:</strong> {item.price * item.quantity} DKK
                        </p>
                        <p>
                          <strong>Type:</strong> {item.type}
                        </p>
                        <p>
                          <strong>Farve:</strong> {item.color}
                        </p>

                        <div className="d-flex justify-content-between align-items-center">
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
                          
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => dispatch(removeFromCart(item.id))}
                          >
                            Fjern
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            <Card className="p-4 shadow-sm">
              <h4>Ordreoversigt</h4>
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
              
              <div className="d-flex flex-wrap gap-2">
                <Button
                  variant="success"
                  className="flex-grow-1"
                  onClick={() => router.push("/checkout")}
                >
                  Til kassen
                </Button>

                <Button
                  variant="outline-danger"
                  className="flex-grow-1"
                  onClick={() => dispatch(clearCart())}
                >
                  Tøm kurv
                </Button>
              </div>
            </Card>
          </>
        )}
      </Container>
    </>
  );
}
