import Link from 'next/link';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function CustomNavbar() {
  const cartItems = useSelector((state) => state.cart.items);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="text-center mb-4">
      <h1 className="mb-3" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
        <span style={{ color: '#ff69b4', WebkitTextStroke: '1px black' }}>L</span>
        <span style={{ color: '#000', fontWeight: 'bold' }}>•</span>
        <span style={{ color: '#ffa500', WebkitTextStroke: '1px black' }}>S</span>
        <span style={{ color: '#000', fontWeight: 'bold' }}>•</span>
        <span style={{ color: '#32cd32', WebkitTextStroke: '1px black' }}>E</span>
      </h1>
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <NavDropdown title="Jewelry" id="jewelry-dropdown">
                <Link href="/products?category=earrings" passHref legacyBehavior>
                  <NavDropdown.Item>Earrings</NavDropdown.Item>
                </Link>
                <Link href="/products?category=necklaces" passHref legacyBehavior>
                  <NavDropdown.Item>Necklaces</NavDropdown.Item>
                </Link>
                <Link href="/products?category=bracelets" passHref legacyBehavior>
                  <NavDropdown.Item>Bracelets</NavDropdown.Item>
                </Link>
                <Link href="/products?category=rings" passHref legacyBehavior>
                  <NavDropdown.Item>Rings</NavDropdown.Item>
                </Link>
              </NavDropdown>
              <Link href="/cart" passHref legacyBehavior>
                <Nav.Link>
                  🛒 Cart{' '}
                  {isClient && cartItems.length > 0 && (
                    <Badge bg="secondary" className="ms-1">
                      {cartItems.length}
                    </Badge>
                  )}
                </Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
