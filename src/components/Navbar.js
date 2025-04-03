import Link from 'next/link';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function CustomNavbar() {
  const cartItems = useSelector((state) => state.cart.items);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Dette kører kun på klienten
    setIsClient(true);
  }, []);

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm mb-4">
      <Container>
        <Link href="/" passHref legacyBehavior>
          <Navbar.Brand>Lemonade Stand 🍋</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link href="/products" passHref legacyBehavior>
              <Nav.Link>Products</Nav.Link>
            </Link>
            <Link href="/cart" passHref legacyBehavior>
              <Nav.Link>
                Cart{' '}
                {isClient && cartItems.length > 0 && (
                  <Badge bg="success">{cartItems.length}</Badge>
                )}
              </Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
